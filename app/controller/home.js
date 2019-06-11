'use strict';

const Controller = require('egg').Controller;

function sleep() {
    const endTime = new Date().getTime() + 20000;
    while (new Date().getTime() < endTime);
}

/**
 *
 *
 */
class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        sleep();
        ctx.body = 'hi, egg2';
    }
}

module.exports = HomeController;
