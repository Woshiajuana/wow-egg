'use strict';

module.exports = {
    responseSuccess(data = {}, message) {
        let { app, logger } = this;
        let { callbackSuccess, successCode, returnCodes } = app.config.response;
        let { msg, status } = returnCodes[successCode];
        this.body = callbackSuccess({ code: successCode, data, msg: message || msg });
        if (typeof status !== 'undefined') this.status = status;
    },
    responseError(data, message) {
        let { app, logger } = this;
        let { callbackError, errorCode, returnCodes } = app.config.response;
        let { msg, status } = returnCodes[errorCode];
        this.body = callbackError({ code: 'xx', data: error, msg });
        if (typeof status !== 'undefined') this.status = status;
    },
};
