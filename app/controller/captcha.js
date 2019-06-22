'use strict';

const { Controller } = require('egg');

module.exports = class CaptchaController extends Controller {
    async sendToEmail() {
        const { ctx, service, app } = this;
        try {
            let { email } = await ctx.validateBody({
                email: [ 'nonempty', 'isEmail' ],
            });
            await service.captcha.sendToEmail(email);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }
};
