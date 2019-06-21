'use strict';

/**
 * egg-wow-response default config
 * @member Config#validate
 * @property {String} SOME_KEY - some description
 */
exports.validate = {
    app: true,
    agent: false,
    client: {
        callbackSuccess: ({ code, data, msg }) => {
            return { code, data, msg };
        },
        callbackError: ({ code, data, msg }) => {
            return { code, data, msg };
        },
    },
};
