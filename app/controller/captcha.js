'use strict';

const { Controller } = require('egg');

module.exports = class CaptchaController extends Controller {
    async sendToEmail() {
        const { ctx } = this;
        const { email } = ctx.request.body;
        console.log(email);
        ctx.body = '发送成功';
    }
};
