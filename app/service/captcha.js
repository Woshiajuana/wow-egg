'use strict';

const { Service } = require('egg');
const randomString = require('randomstring');
const ms = require('ms');

module.exports = class CaptchaService extends Service {

    /**
     * 根据邮件生成
     * @param   email   [String]    邮箱
     * */
    async sendToEmail(email) {
        const { logger, app, config } = this;
        const { redis } = app;
        const captcha = randomString.generate({ length: 6, charset: 'numeric' });
        const codeEmailMaxAge = ms(config.codeEmailMaxAge || '5m');
        await app.email.send({ to: email, subject: 'WOW-EGG REGISTER', html: captcha });
        logger.info(`[captcha sendToEmail] => email:${email} captcha:${captcha} codeEmailMaxAge:${codeEmailMaxAge}`);
        const redisKey = `captcha:${email}`;
        await redis.set(redisKey, captcha, 'EX', codeEmailMaxAge * 0.001);
    }

    async checkByEmail(email, captcha) {
        const { logger, app, config } = this;
        const { redis } = app;
        const redisKey = `captcha:${email}`;
        const redisCaptcha = await redis.get(redisKey);
        const result = captcha === redisCaptcha;
        logger.info(`[captcha checkByEmail] => email:${email} captcha: ${captcha} redisCaptcha:${redisCaptcha} result:${result}`);
        return result ? Promise.resolve() : Promise.reject('验证码错误');
    }
};
