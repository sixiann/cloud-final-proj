const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const util = require('../utils/util');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users';

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    const newsletter = userInfo.newsletter;
    if (!username || !name || !email || !password) {
        return util.buildResponse(401, {
            message: 'All fields are required'
        });
    }

    if (!email.includes('@') || !email.includes('.')) {
        return util.buildResponse(401, {
            message: 'Not a valid email address'
        });
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'Username already exists in our db, please choose a different username'
        });
    }

    const encryptedPass = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPass,
        newsletter: newsletter,
        saved_startups: [],
        saved_investors: []
    };

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Server error, please try again later'
        });
    }
    
    sendEmail(user.name, user.email);

    return util.buildResponse(200, { username: username});
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username,

        }
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error);
    });
}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error);
    });
}

async function sendEmail(name, emailAddress) {
    var ses = new aws.SES({ region: "us-east-1" });

    var params = {
        Destination: {
            ToAddresses: [emailAddress],
        },
        Message: {
            Body: {
            Text: { Data: `Hi ${name},\n\nYou are now registered. Thank you for making an account with StartupsNYC.` },
            },

            Subject: { Data: "Welcome from StartupsNYC!" },
        },
        Source: "startupsnyc@proton.me",
    };
    
    return ses.sendEmail(params).promise()

}

module.exports.register = register;