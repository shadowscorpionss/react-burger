import { Middleware, MiddlewareAPI } from 'redux';
import { TApplicationActions } from '../actions';
import { ACCESS_TOKEN_PATH, getCookie } from '../../utils/cookies';
import { refreshTokenRequest } from '../../utils/api';
import { IWSActions } from './mw-types';
import { AppDispatch, RootState } from '../../types/app-redux-thunk';

export const webSocketMiddleware = (WSActions: IWSActions<TApplicationActions>): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let wsUrl: string | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;

            if (action.type === WSActions.wsStart) {
                wsUrl = (action as { payload: string }).payload
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch(WSActions.onOpen(event));
                };

                socket.onerror = event => {
                    dispatch(WSActions.onError(event));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.message === 'Invalid or missing token') {
                        socket?.close();
                        refreshTokenRequest()
                            .then(() => {
                                const newToken = getCookie(ACCESS_TOKEN_PATH);
                                const soketUrl = wsUrl?.split('?')[0];
                                const newWsUrl = `${soketUrl}?token=${newToken}`;
                                dispatch({
                                    type: WSActions.wsStart,
                                    payload: newWsUrl,
                                } as TApplicationActions);
                            })
                    } else {
                        dispatch(WSActions.onMessage(event));
                    }
                }

                socket.onclose = event => {
                    socket?.close();
                    dispatch(WSActions.onClose(event));

                }

                if (action.type === WSActions.wsStop) {
                    socket.close();
                }
            }
            next(action);
        }
    }
}