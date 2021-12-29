import Koa from "koa";
import Router from "koa-router";
import send from "koa-send";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

console.log(`import.meta.url`, import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`__filename`, __filename);
console.log(`__dirname`, __dirname);

const app = new Koa();
const router = new Router();

let timestamp = +new Date();
router.get("/timestamp", (ctx) => {
  ctx.body = timestamp;
});

router.get(`/static/(.*)`, async (ctx) => {
  // console.log(`请求 ctx.path`, ctx.path);
  const staticPath = path.resolve(__dirname);
  // console.log(`staticPath`, staticPath);
  await send(ctx, ctx.path, {
    root: staticPath,
    maxAge: 30 * 24 * 60 * 60,
  });
});
router.post("/tiy/(.*)", async (ctx) => {
  let data = await parseData(ctx);
  // console.error("fuck", ctx.path, ctx.query, ctx.body);
  console.log(`data`, data)
  ctx.set("Content-Type", "text/html; Charset=utf-8"); // 返回html 
  ctx.body = decodeURIComponent(data.code);
});
app.use(router.routes());

app.listen(3000, () => {
  console.log("[demo] route-use-middleware is starting at port 3000");
});

function parseData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let str = "";
      ctx.req.on("data", (data) => {
        console.log(`请求时间 ${+new Date}, 数据 ${data}`)
        str += data;
      });
      ctx.req.addListener("end", () => {
        resolve(parseUrl(str));
      });
    } catch (err) {
      reject(err);
    }
  });
}

function parseUrl(url) {
  let obj = {};
  let arr = url.split("&");
  arr.forEach((e, i) => {
    let temparr = e.split("=");
    obj[temparr[0]] = temparr[1];
  });
  return obj;
}
// ————————————————
// 版权声明：本文为CSDN博主「lert707」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/lert707/article/details/82839755
