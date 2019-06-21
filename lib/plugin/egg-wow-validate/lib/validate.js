'use strict';

let validator = require('validator');

function nonempty(value) {
    return typeof value !== 'undefined' && value !== '' && value !== null;
}

class Validate {
    constructor(app, config) {
        this.app = app;
        this.config = config;
        this.regular = Object.assign({ nonempty }, validator, this.config.regular);
        this._log('start register');
    }
    initResult() {
        this.sucResult = {};
        this.errResult = [];
    }
    async check(source, expect, config = {}) {
        this.initResult();
        let { mode, errPrompt } = Object.assign({}, this.config, config);
        delete config.regular;
        if (typeof expect === 'function') {
            expect = expect(this.regular);
        }
        try {
            forEach(expect, (uses, key) => {
                const value = source[key];
                const isUndefined = typeof value === 'undefined';
                if (!uses || !uses.length) {
                    return !isUndefined && (this.sucResult[key] = value);
                }
                forEach(uses, (use) => {
                    if (typeof use === 'string' && !this.regular[use](value)) {
                        this.errResult.push(`${errPrompt[use] || errPrompt.common}:${key}`);
                        if (mode === 'one') throw '';
                    }
                });
                !isUndefined && (this.sucResult[key] = value);
            });
            return Promise.resolve(this.sucResult);
        } catch (err) {
            this.errResult = this.errResult.length ? this.errResult : typeof err === 'object' ? JSON.stringify(err) : err;
            return Promise.reject(this.errResult.join(','));
        }
    }
    core(value, use) {
        let { mode, errPrompt } = this.config;
        let err = '';
        if (typeof use === 'string' && !this.regular[use](value)) {
            err = { prompt: errPrompt[use] || errPrompt.rule, key };
            throw err;
        }
        let { nonempty, prompt, rule } = use;
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
