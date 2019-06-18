'use strict';

const nodemailer = require('nodemailer');

module.exports = app => {
    app.addSingleton('email', createOneClient);
};

class Clinet {
    constructor(config, app) {
        this.app = app;
        this.config = config;
        this.smtpTransport = null;
        this.init();
    }
    init() {
        const { app, config } = this;
        const { host, port, auth } = config;
        app.coreLogger.info(`[wow-egg-email] connecting host:${host} port:${port} auth:${auth}`);
        this.smtpTransport = nodemailer.createTransport(config);
    }
    async send(to, subject, html) {
        const { auth } = this.config;
        this._log(`[wow-egg-email] send to:${to} subject:${subject} html:${html} `);
        const result = this.smtpTransport.sendMail({ to, subject, html });
        console.log(result);
        // return n
    }
    _log(str) {
        this.app.coreLogger.info(str);
    }
}

function createOneClient(config, app) {
    app.coreLogger.info('[egg-email] connecting %s@%s:%s/%', config.host, config.port, config.auth);
    return nodemailer.createTransport(config);
}
