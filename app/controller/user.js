'use strict';

const { Controller } = require('egg');

module.exports = class UserController extends Controller {
    async register() {
        const { ctx, service, app } = this;
        try {
            let { email, password, captcha } = await ctx.validateBody({
                email: [ 'nonempty', 'isEmail' ],
                captcha: [ 'nonempty' ],
                password: [ 'nonempty' ],
            });
            await service.captcha.checkByEmail(email, captcha);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }
};
