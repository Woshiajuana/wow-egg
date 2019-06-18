'use strict';

const nodemailer = require('nodemailer');

module.exports = app => {
    app.addSingleton('email', createOneClient);
};

function createOneClient(config, app) {
    app.coreLogger.info('[egg-email] connecting %s@%s:%s/%', config.host, config.port, config.auth);
    return nodemailer.createTransport(config);
}
