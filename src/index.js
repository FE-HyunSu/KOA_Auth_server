const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');
// api 라우트를 /api 경로 하위 라우트로 설정.
router.use('/api', api.routes());

// 라우터 설정 : 첫번째 파라미터는 라우트 경로, 두 번째 파라미터는 라우트에 적용할 미들웨어 함수.
router.get('/', (ctx) => {
  ctx.body = '홈';
});

router.get('/about', (ctx) => {
  ctx.body = '소개';
});

router.get('/detail', (ctx) => {
  const { page } = ctx.query; // 파싱된 URL 쿼리 문자열 확인 (객체 형태)
  ctx.body = page ? `detail ${page}` : `detail none.`; // id 존재 유무에 따라 결과 분기처리.
});

// app 인스턴스에 라우터 적용.
app.use(router.routes()).use(router.allowedMethods());
app.listen(4000, () => {
  console.log('Listening to port 4000');
});
