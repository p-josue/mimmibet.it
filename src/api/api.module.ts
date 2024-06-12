import { Elysia } from "elysia";
import BettingModule from "./betting/betting.module";
import ToaModule from "./toa/toa.module";
import AuthModule from "./auth/auth.module";

import { AuthGuard } from "./auth/auth.middleware";

const router = new Elysia({ prefix: '/api/v1' });

// @ts-ignore
router.guard(AuthGuard({}));


router.use(BettingModule);
router.use(ToaModule);
router.use(AuthModule);

export default router;