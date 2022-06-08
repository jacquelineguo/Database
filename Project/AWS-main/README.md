How to run the project on EC2 machine:
1. SSH to access EC2 instance
2. Start docker service:
sudo service docker start
sudo usermod -a -G docker ec2-user

3. enter the path of route file
cd AWS-main/server/routes/

4. open and edit surveyRoutes.js and save changes:
sudo vim surveyRoutes.js

5. run the whole program
cd ~/AWS-main/
docker-compose build (need some time to build)
docker-compose up (wait until no new messages pop up)

6. open the EC2 endpoint and 3000 port to see the result

7. stop the docker-compose:
control + C


How to run our project on EC2 instance ec2forProject:

1. SSH to access EC2 instance

2. Go to both AWS/client and AWS/server to run the project

The command to run our application on EC2 instance ec2forProject is:
cd AWS/client
pm2 start --name client npm -- start
cd AWS/server
pm2 start index.js --name server


How to send email and receive click event notification using AWS SES and SNS：

1. Create a user in IAM with full access to AWS SES, replace ‘accessKeyId’ and ‘secretAccessKey’ in the code with the new credential(MailerAWS.js,)
2. Go to AWS SES, add your email to verified identities, so that you can receive survey emails from the application.(Our AWS SES is in a sandbox setting now, only verified users can send or receive email. If we send a request to AWS, we may be able to jump out of the sandbox, it is more for business applications.) 
3. Go to AWS SNS, create a topic under SNS.
4. Run the Emaily application.
5. Create subscription to the topic, protocol is HTTP, endpoint is:
http://ec2-url/api/surveys/webhooks 
6. Go back to AWS SES and create a Configuration set, in the “Event destinations” tag, select Event types Clicks, destination type is SNS, and select the SNS topic. 
7. Change the ConfigurationSetName in MailerAWS.js to the configuration set name you just created.
8. Rerun Emaily application and send survey email to the verified email address you provided in step 2.



