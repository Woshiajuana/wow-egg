'use strict';

const path = require('path');

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
};

exports.email = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/wow-egg-validate'),
};

exports.validate = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/wow-egg-validate'),
};
