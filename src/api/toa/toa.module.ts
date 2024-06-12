import { Elysia } from "elysia";
// @ts-ignore
import sports from "../../../data/sports.json";
import fs from "fs";
import path from "path";
import TOA from "./the-odds-api";
import { MarketRegion, MarketType } from "./the-odds-api.type";

const router = new Elysia({ prefix: '/toa' });

router.get('/sports', () => {
    // todo: get sports from database
    return sports;
});

router.get('/sports/:key', async (
    { params: { key } }: { params: { key: string; }; }
) => {
    const sport = sports.find((sport: {
        key: string;
    }) => sport.key === key);
    if (!sport) {
        throw new Error('Sport not found');
    }

    const filename = `${key}_eu_h2h.json`;
    if (fs.existsSync(path.join(__dirname, '../../../data', filename))) {
        return require(`../../../data/${filename}`);
    }
    const toa = new TOA();
    const odds = await toa.getOdds(key, MarketRegion.eu, { marketType: MarketType.h2h });

    fs.writeFileSync(path.join(__dirname, '../../../data', filename), JSON.stringify(odds));
    return odds;
});

export default router;