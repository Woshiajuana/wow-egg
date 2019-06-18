'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/register', controller.view.register);
    router.post('/user/register', controller.user.register);
    router.post('/code/email/send', controller.captcha.sendToEmail);
};
