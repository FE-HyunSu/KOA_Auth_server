const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = '홈';
});

app.use((ctx, next) => {
  console.log(ctx);
  next();
});

app.use((ctx, next) => {
  console.log(1);
  const started = new Date();
  next().then(() => {
    console.log(new Date() - started + 'ms');
  });
});

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(4000, () => {
  console.log('heurm server is listening to port 4000');
});
