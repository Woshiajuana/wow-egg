'use strict';

const { Controller } = require('egg');

module.exports = class UserController extends Controller {
    async register() {
        const { ctx, service, app } = this;
        try {
            let { email, password, phone } = await ctx.validateBody({
                email: [ 'nonempty', 'isEmail' ],
            });

        } catch (err) {
            ctx.respError(err);
        }
    }
};
