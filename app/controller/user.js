'use strict';

const { Controller } = require('egg');

module.exports = class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { username, password, phone } = ctx.request.body;
    }
};
