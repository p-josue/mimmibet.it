import { Context } from 'elysia';

const sessions = new Map<string, any>();

const createSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 12);
    sessions.set(sessionId, {});
    return sessionId;
}


export const AuthGuard = ({sessionKey = "auth"}: {
    sessionKey: string;
}) => {
    return {
        beforeHandle({cookie, store, set}: Context) {
            if (cookie[sessionKey]) {
                const session = sessions.get(cookie[sessionKey]?.value);
                if (session) {
                    store.session = session;
                    return;
                }
            }
            const sessionId = createSession();
            store.session = sessions.get(sessionId);

            set.cookie = {
                [sessionKey]: {
                    value: sessionId,
                    httpOnly: true,
                    // secure: true,
                    // sameSite: 'strict',
                }
            }

        }
    };
};