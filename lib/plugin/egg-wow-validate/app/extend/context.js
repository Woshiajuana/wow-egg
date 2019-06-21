'use strict';

module.exports = {
    async validateBody(expect) {
        return await this.app.validate.check(this.request.body, expect);
    },
    async validateQuery(expect) {
        return await this.app.validate.check(this.request.query, expect);
    },
};
