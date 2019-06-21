'use strict';

const { Controller } = require('egg');

module.exports = class CaptchaController extends Controller {
    async sendToEmail() {
        const { ctx, service, app } = this;
        console.log(ctx.validateS)
        console.log(service.validateS)
        console.log(app.validateS)
        try {
            let {
                email,
            } = await app.validate.check(ctx.request.body, (regular) => {
                return {
                    email: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: regular.isEmail,
                            prompt: '参数格式错误',
                        },
                    ],
                };
            });
            console.log(email);
            await service.captcha.sendToEmail(email);
            ctx.body = '发送成功';
        } catch (err) {
            console.log('错误', err);
            ctx.body = err;
        }
    }
};
