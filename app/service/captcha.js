'use strict';

const { Service } = require('egg');
const randomString = require('randomstring');
const ms = require('ms');

module.exports = class CaptchaService extends Service {

    /**
     * 根据邮件生成
     * @param   email   [String]    邮箱
     * */
    async emailSend(email) {
        const { logger, app, config, service } = this;
        const { redis } = app;
        const captcha = randomString.generate({ length: 6, charset: 'numeric' });
        const codeEmailMaxAge = ms(config.codeEmailMaxAge || '5m');
        app.email.sendMail({
            from: 'zhigang.chen@owulia.com',
            to: '979703986@qq.com',
            subject: 'hello world',
            html: '<a href="link">点击链接进行验证</a>',
        }, (err) => {
            logger.info(`发送邮件错误${err}`);
        });
        logger.info(`CodeService.generateByEmail=> email:${email} captcha:${captcha} codeEmailMaxAge:${codeEmailMaxAge}`);
        const redisKey = `captcha:${email}`;
        await redis.set(redisKey, captcha, 'EX', codeEmailMaxAge * 0.001);
    }
};
