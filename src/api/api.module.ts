import { Elysia } from "elysia";
import BettingModule from "./betting/betting.module";
import ToaModule from "./toa/toa.module";

const router = new Elysia({ prefix: '/api/v1' });

router.use(BettingModule);
router.use(ToaModule);

export default router;