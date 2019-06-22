'use strict';

module.exports = {
    responseSuccess(data = {}, msg) {
        let { app, logger } = this;
        let { callbackSuccess, callbackError } = app.config.response;
        this.body = callbackSuccess({ code: 'xx', data, msg });
    },
    responseError() {
        let { app, logger } = this;
        let { callbackSuccess, callbackError } = app.config.response;
        this.body = callbackSuccess({ code: 'xx', data, msg });
    },
};
