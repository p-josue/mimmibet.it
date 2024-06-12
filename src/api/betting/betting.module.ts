import {Elysia} from "elysia";

const router = new Elysia({prefix: '/betting'});

let Bets: {
    id: string;
    bets: string;
    sport: string;
    name: string;
    phone: string;
    amount: number;
    claimed: boolean;
}[] = [] = require('../../../data/betting.json');

const generateBetId = () => {
    let id: string;
    let bet;
    do {
        id = Math.random().toString(36).substring(2, 6);
        bet = Bets.find(({id: idToCheck}) => idToCheck === id);
    } while (!!bet);
    return id;
}

const saveBets = () => {
    require('fs').writeFileSync(require('path').join(__dirname, '../../../data/betting.json'), JSON.stringify(Bets));
}
router.get('/bet', () => {
    return Bets;
});
router.get('/:id', ({params: {id}}) => {
    const bet = Bets.find((bet: { id: string; }) => bet.id === id);
    if (!bet) {
        throw new Error('Bet not found');
    }
    return bet;
});
router.post('/:id', ({params: {id}, body: {name, phone, amount, bets, sport, password, claimed}}: {
    params: { id: string; };
    body: {
        bets: string;
        sport: string;
        name: string;
        phone: string;
        amount: number;
        password: string;
        claimed: boolean;
    };
}) => {
    console.log(password, process.env.BETTING_PASSWORD)
    if (password !== process.env.BETTING_PASSWORD) {
        throw new Error('Invalid password');
    }
    let bet;
    if (id && id !== 'new') {
        bet = Bets.find((bet: { id: string; }) => bet.id === id);
        if (!bet) {
            throw new Error('Bet not found');
        }
        bet.bets = bets;
        bet.sport = sport;
        bet.name = name;
        bet.phone = phone;
        bet.amount = amount;
        bet.claimed = claimed;

    } else {
        bet = {
            id: generateBetId(),
            bets,
            sport,
            name,
            phone,
            amount,
            claimed: false
        }
        Bets.push(bet);
    }
    saveBets();

    return {
        id: bet.id
    };
});

router.post('/:id/claim', ({params: {id}}: {
    params: { id: string; };
}) => {
    const bet = Bets.find((bet: { id: string; }) => bet.id === id);
    if (!bet) {
        throw new Error('Bet not found');
    }
    bet.claimed = true;
    saveBets();
    return {
        id: bet.id
    };
});

router.post('/checkLogin', ({body: {username, password}}: {
    body: { username: string; password: string; };
}) => {
    if (username === process.env.BETTING_USERNAME) {
        if (password === process.env.BETTING_PASSWORD) {
            return true;
        }
    } else {
        return false;
    }
});

export default router;