'use strict';

module.exports = {
    responseSuccess(options, config = {}) {
        let {
            app,
            logger,
        } = this;
        const {
            callbackSuccess,
            successCode,
            codes,
        } = Object.assign(config, app.config.response);
        const stringOptions = Object.prototype.toString.apply(options) === '[object Object]';
        let {
            code = successCode,
            data = options,
            msg = codes[successCode],
            status,
        } = stringOptions
            ? options
            : {};
        status && (this.status = status);
        this.body = callbackSuccess({
            data,
            code,
            msg,
        });
    },
    responseError(options, config = {}) {
        let {
            app,
            logger,
        } = this;
        const {
            codes,
            errorCode,
            callbackError,
        } = Object.assign(config, app.config.response);
        
        let { app, logger } = this;
        let { callbackError, errorCode, codes, errorMsgHock } = app.config.response;
        if (!code) code = errorCode;
        let msg = message
            ? message
            : Object.prototype.toString.apply(data) === '[object Object]'
                ? errorMsgHock(data)
                : codes[code];
        this.body = callbackError({ code: 'xx', data: error, msg });
        if (typeof status !== 'undefined') this.status = status;
    },
};
// data = {}
