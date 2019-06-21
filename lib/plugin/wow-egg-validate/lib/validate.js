'use strict';

class Validate {
    constructor(app, config) {
        this.app = app;
        this.config = config;
    }
    async check(source, expect) {
        let result = {};
        if (typeof expect === 'function') expect = expect(this.config.regular || {});
        try {
            forEach(expect, (uses, key) => {
                const value = source[key];
                const type = typeof value === 'undefined';
                if (!uses || !uses.length) return !type && (result[key] = value);
                forEach(uses, (use) => {
                    let { nonempty, prompt, rule, callback } = use;
                    callback && callback(source);
                    if (nonempty && (type || value === '')) {
                        throw { prompt: prompt || '缺少必要参数', key };
                    }
                    if (typeof rule === 'function' && !rule(value, source)) {
                        throw { prompt: prompt || '参数格式错误', key };
                    }
                    if (typeof rule === 'object' && !rule.text(value)) {
                        throw { prompt: prompt || '参数格式错误', key };
                    }
                });
                !type && (result[key] = value);
            });
            return Promise.resolve(result);
        } catch (err) {
            let { prompt, key } = err;
            result = prompt && key ? `${prompt}:${key}` : typeof err === 'object' ? JSON.stringify(err) : err;
            return Promise.reject(result);
        }
    }
}

function forEach(obj, callback) {
    if (Object.prototype.toString.call(obj) === '[object Array]') return obj.forEach(callback);
    for (let key in obj) {
        callback && callback(obj[key], key);
    }
}

function createClient(config, app) {
    const { useLog = true } = config;
    const _log = (str) => useLog && app.logger.info(str);
    _log('[wow-egg-validate] create start');
    return new Validate(app, config);
}

module.exports = app => {
    app.addSingleton('validate', createClient);
};
