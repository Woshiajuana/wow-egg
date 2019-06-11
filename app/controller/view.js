'use strict';

const Controller = require('egg').Controller;

/**
 *
 *
 */
class ViewController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg2';
    }
}

module.exports = ViewController;
