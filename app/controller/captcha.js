'use strict';

const { Controller } = require('egg');

module.exports = class CaptchaController extends Controller {
    async sendToEmail() {
        const { ctx, service } = this;
        const { email } = ctx.request.body;
        console.log(email);
        service.captcha.sendToEmail(email);
        ctx.body = '发送成功';
    }
};
