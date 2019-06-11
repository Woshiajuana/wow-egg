'use strict';

const Controller = require('egg').Controller;

module.exports = class ViewController extends Controller {
    async register() {
        await this.ctx.render('register/index.tpl');
    }
};
