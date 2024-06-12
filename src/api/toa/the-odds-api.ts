import { MarketRegion, MarketType } from "./the-odds-api.type";

export default class TheOddsApi {
    apiKey: string;
    baseUrl: string;

    constructor() {
        if (!process.env.THE_ODDS_API_KEY) {
            throw new Error('THE_ODDS_API_KEY is not set in the environment variables');
        }
        this.apiKey = process.env.THE_ODDS_API_KEY;
        this.baseUrl = 'https://api.the-odds-api.com/v4';
    }

    async getSports() {
        const query = new URLSearchParams({
            apiKey: this.apiKey
        });
        const url = `${this.baseUrl}/sports?` + query.toString();
        const response = await fetch(url);
        return response.json();
    }

    async getOdds(
        sportKey: string,
        region: MarketRegion,
        { marketType }: {
            marketType?: MarketType,
        }) {
        const queryOptions: {
            apiKey: string,
            regions: MarketRegion,
            markets?: MarketType,
        } = {
            apiKey: this.apiKey,
            regions: region,
        }
        if (marketType) {
            queryOptions['markets'] = marketType;
        }
        const query = new URLSearchParams(queryOptions);
        const url = `${this.baseUrl}/sports/${sportKey}/odds?` + query.toString();
        const response = await fetch(url);
        const headers = response.headers;
        console.log(headers.get('x-requests-remaining'));
        console.log(headers.get('x-requests-used'));
        return response.json();
    }
}