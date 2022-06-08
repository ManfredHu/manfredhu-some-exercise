// eslint-disable-next-line @typescript-eslint/no-require-imports
const Koa = require('koa');
const app = new Koa();

app.listen(3000, () => {
  console.log('start finished')
})