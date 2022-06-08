const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const MailerAWS = require("../services/MailerAWS");
const bodyParser = require('body-parser')
const superagent = require('superagent');
const surveyDDBModel = require('../models/SurveyDDB');
const { randomUUID } = require('crypto');

module.exports = app => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveysDDB = await surveyDDBModel.scan("_user").eq(req.user.id).attributes(["title", "body", "subject", "recipients", "yes", "no", "_user", "dateSent", "lastResponded"]).exec();

        res.send(surveysDDB);
    });

    // after clicking the options, redirect to the 'thanks' page
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', async (req, res) => {
        if (req.is('text/*')) {
            const resp = JSON.parse(req.body);
            //console.log(resp.SubscribeURL);
            if (resp.SubscribeURL) {
                superagent.get(resp.SubscribeURL).end((err, res) => {
                    if (err) {
                        console.error(new Date(), `Error at subscription: ${err.name}`);
                        //res.sendStatus(500);
                    } else {
                        console.log(new Date(), `success to subscribe`);
                        //res.sendStatus(200);
                    }
                });
            } else {
                const message = JSON.parse(resp.Message);
                const p = new Path('/api/surveys/:surveyId/:choice');
                // use the chain() function to deal with paths
                const event = _.chain(message)
                    .map(({mail, click}) => {
                        let email = message.mail.destination[0];
                        // extract the surveyId and choice form path
                        const match = p.test(new URL(message.click.link).pathname);
                        console.log("match found: " + match.surveyId);
                        console.log("match found: " + match.choice);
                        if (match) {
                            return {email, surveyId: match.surveyId, choice: match.choice};
                        }
                    })
                    // remove undefined empty object
                    .compact()
                    // remove repeated object
                    .uniqBy('email', 'surveyId')
                    .each(async ({surveyId, email, choice}) => {
                        updateChoice = {};
                        updateChoice[choice] = 1;
                        await surveyDDBModel.update({"id": surveyId}, {
                            recipients: [{"email": email, "responded": true}],
                            "$ADD": updateChoice,
                            lastResponded: new Date()
                        });
                    })
                    .value();

                
                console.log("end")
                res.send({});
            }
        }

        
    });

    // first check if login by requireLogin middleware
    // and then check if user has enough credits
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // extract data
        const {title, subject, body, recipients} = req.body;
        // create a new instance for dynamoDB
        const surveyDDB = new surveyDDBModel({
            "id": randomUUID(),
            "title": title,
            "subject": subject,
            "body": body,
            "recipients": recipients.split(',').map(email => ({"email": email.trim()})),
            "_user": req.user.id,
            dateSent: Date.now()
        });
        // Great place to send an email!

        try {
            // send the mailer to sendGrid
            // await mailer.send();
            await MailerAWS(surveyDDB, surveyTemplate(surveyDDB), "blithe2021@gmail.com");
            // store the data to dynamoDB
            await surveyDDB.save();

            // update the credit
            req.user.credits -= 1;
            // save the updated user data
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
