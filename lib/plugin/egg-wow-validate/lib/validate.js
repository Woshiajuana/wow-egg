'use strict';

class Validate {
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this._log('start register');
    }
    async check(source, expect, config = {}) {
        this.config = Object.assign({}, this.config, config);
        let { regular, mode, errPrompt } = this.config;
        if (typeof expect === 'function') expect = expect(regular);
        let sucResult = {};
        let errResult = [];
        try {
            forEach(expect, (uses, key) => {
                const value = source[key];
                const isUndefined = typeof value === 'undefined';
                if (!uses || !uses.length) return !isUndefined && (sucResult[key] = value);
                forEach(uses, (use) => {
                    let { nonempty, prompt, rule } = use;
                    let err = '';
                    if (nonempty && (isUndefined || value === '' || value === null)) {
                        err = { prompt: prompt || errPrompt.nonempty, key };
                        throw err;
                    }
                    if (typeof rule === 'function' && !rule(value, source)) {
                        err = { prompt: prompt || errPrompt.rule, key };
                        throw err;
                    }
                    if (typeof rule === 'object' && !rule.text(value)) {
                        err = { prompt: prompt || errPrompt.rule, key };
                        throw err;
                    }
                });
                !isUndefined && (sucResult[key] = value);
            });
            return Promise.resolve(sucResult);
        } catch (err) {
            let { prompt, key } = err;
            errResult = prompt && key ? `${prompt}:${key}` : typeof err === 'object' ? JSON.stringify(err) : err;
            return Promise.reject(errResult);
        }
    }
    core() {

    }
    _log(str) {
        let { useLog = true } = this.config;
        useLog && this.app.logger.info(`[egg-wow-validate] ${str}`);
    }
}

function forEach(obj, callback) {
    if (Object.prototype.toString.call(obj) === '[object Array]') return obj.forEach(callback);
    for (let key in obj) {
        callback && callback(obj[key], key);
    }
}

function createClient(config, app) {
    return new Validate(app, config);
}

module.exports = app => {
    app.addSingleton('validate', createClient);
};
