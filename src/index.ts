import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'
import ApiV1 from "./api/api.module";

const app =
    new Elysia()
        .use(staticPlugin({
            prefix: '',
            ignorePatterns : [
                /.*\.html/
            ],
        }))
        .listen(process.env.PORT || 3000);

app.get('/play', () => {
    return Bun.file('public/fake-new.html');
});
app.get('/schedina', () => {
    return Bun.file('public/schedina.html');
});
app.get('/admin/new', () => {
    return Bun.file('public/create-new.html');
});
app.get('/admin', () => {
    return Bun.file('public/admin.html');
});

app.use(ApiV1);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
