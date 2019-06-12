'use strict';

const { Controller } = require('egg');

module.exports = class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { email, password, phone } = ctx.request.body;
    }
};
