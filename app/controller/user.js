'use strict';

const { Controller } = require('egg');

module.exports = class UserController extends Controller {
    async register() {
        const { ctx, service, app } = this;
        try {
            const { email, password, phone } = ctx.request.body;
        } catch (err) {
            ctx.respError(err);
        }
    }
};
