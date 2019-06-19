'use strict';

const nodemailer = require('nodemailer');

function createClient(config, app) {
    console.log('config', config)
    const { host, port, auth, useLog = true } = config;
    const _log = (str) => useLog && app.logger.info(str);
    console.log(`[wow-egg-email] connecting host:${host} port:${port} auth:${auth}`);
    const smtpTransport = nodemailer.createTransport(config);
    smtpTransport.send = async ({ to, subject, html }) => {
        console.log(`[wow-egg-email] send start to:${to} subject:${subject} html:${html} `);
        const result = await smtpTransport.sendMail({ from: auth.user, to, subject, html });
        _log(`[wow-egg-email] send end to:${to} subject:${subject} html:${html} result: ${result}`);
    };
    return smtpTransport;
}

module.exports = app => {
    app.addSingleton('email', createClient);
};
