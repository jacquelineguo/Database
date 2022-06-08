const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // constructor of Mailer
  constructor({ subject, recipients }, content) {
    super();
    // initialize the sendGrid API
    this.sgApi = sendgrid(keys.sendGridKey);
    // indicate who sends this mail
    this.from_email = new helper.Email('ranqin1995@gmail.com');
    this.subject = subject;
    // create email body
    this.body = new helper.Content('text/html', content);
    // create email recipients in the format of Email object
    this.recipients = this.formatAddresses(recipients);
    // add them into this class
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  // change email into instances of helper.Email object
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  // make the link in the body trackable
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  // add recipients into this class
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  // send the Mailer request
  async send() {
    // create a request
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      // transfer the body to json
      body: this.toJSON()
    });
    // send the request
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
