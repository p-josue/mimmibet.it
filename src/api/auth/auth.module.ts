import { Context, Elysia } from "elysia";

const router = new Elysia({prefix: '/auth'});

router.get('/login', ({store} : {
    store: {session: {loggedIn: boolean}}
}) => {
    return {
        loggedIn: store.session.loggedIn || false
    }
});

router.post('/login', ({body: {username, password}, store} : {
    body: {username: string, password: string},
    store: {session: {loggedIn: boolean}}
}) => {
    if (process.env.AUTH_USERNAME === username && process.env.AUTH_PASSWORD === password) {
        store.session.loggedIn = true;
        return {
            message: 'Logged in successfully'
        }
    }
    return {
        message: 'Invalid credentials'
    }
});

router.get('/logout', ({cookie, store}) => {
    store.session.loggedIn = false;
    return {
        message: 'Logged out successfully'
    }
});

export default router;