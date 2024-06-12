import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'
import ApiV1 from "./api/api.module";

const app =
    new Elysia()
        .use(staticPlugin({
            prefix: '',
        }))
        .listen(3000);

app.use(ApiV1);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
