'use strict';

module.exports = app => {
  // const { logger, config } = app;
  app.beforeStart(async () => {
    console.log('进来了');
  });
};
