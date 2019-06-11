'use strict';

const Controller = require('egg').Controller;

/**
 *
 *
 */
class ViewController extends Controller {
    async register() {
        await this.ctx.render('register/index.tpl');
    }
}

module.exports = ViewController;
