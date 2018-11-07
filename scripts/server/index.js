/* eslint-disable */
process.env.NODE_ENV = 'development';

require('../config/env');
const Koa = require('koa');
const Router = require('koa-router');
const request = require('request');
const chalk = require('chalk');

const mock = require('./mock');

const app = new Koa();
app.proxy = true;

const router = new Router({
  prefix: '/api/v1'
});

app.use(async (ctx, next) => {
  await next();
  console.log(`${chalk.green(chalk.bold(ctx.method.padEnd(4)))} ${ctx.url}`);
});

const proxy = {
  content: [
    "/api/v1/",
    "/accounts/login/"
  ],
  protocol: 'https',
  host: 'survey.bytedance.net',
};


// mock();

//代理到线上的地址，因为线上是https:协议，webpack devserver proxy功能不支持。
app.use(async (ctx, next) => {
  if (!proxy.content.some(prefix => ctx.url.startsWith(prefix))) {
    return next();
  }
  const url = `${proxy.protocol}://${proxy.host}${ctx.path}${ctx.search}`;
  ctx.host = proxy.host;
  ctx.body = ctx.req.pipe(request({
    url,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Cookie': '_ga=GA1.2.812276347.1537183193; sessionid=0388f218e4f3ed23a94df05abe29ccd1; sessionid=0fadqg6fh94gc4mj2qb0o6mb23c9z2ae; _gid=GA1.2.1550504208.1537844565',
      'Host': 'survey.bytedance.net',
      'Pragma': 'no-cache',
      'Referer': 'https://survey.bytedance.net/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
    }
  }));
});

app.use(router.routes()).use(router.allowedMethods());


module.exports = app;