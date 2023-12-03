import { IAction, actionCreator } from '../../types/action-types';
import { IEventAction, IFeedAction, IStringAction } from '../../types/feed-types';

export const FEED_START: 'FEED_START' = 'FEED_START';
export const FEED_STOP: 'FEED_STOP' = 'FEED_STOP';
//
export const FEED_OPEN: 'FEED_OPEN' = 'FEED_OPEN';
export const FEED_ERROR: 'FEED_ERROR' = 'FEED_ERROR';
export const FEED_CLOSE: 'FEED_CLOSE' = 'FEED_CLOSE';
export const FEED_MESSAGE: 'FEED_MESSAGE' = 'FEED_MESSAGE';


//connection actions
export interface IFeedStartAction extends IAction<typeof FEED_START>, IStringAction { }
export interface IFeedStopAction extends IAction<typeof FEED_STOP> { }

//get orders
export interface IFeedOpenAction extends IAction<typeof FEED_OPEN>, IEventAction { }
export interface IFeedErrorAction extends IAction<typeof FEED_ERROR>, IEventAction { }
export interface IFeedCloseAction extends IAction<typeof FEED_CLOSE>, IEventAction { }
export interface IFeedMessageAction extends IAction<typeof FEED_MESSAGE>, IFeedAction { }

export type TFeedActions =
    | IFeedStartAction
    | IFeedStopAction
    | IFeedOpenAction
    | IFeedErrorAction
    | IFeedCloseAction
    | IFeedMessageAction

export const feedStartAction = (url: string): IFeedStartAction => ({ ...actionCreator(FEED_START), payload: url });
export const feedStopAction = (): IFeedStopAction => actionCreator(FEED_STOP);

export const feedOpenAction = (event: Event): IFeedOpenAction => ({ ...actionCreator(FEED_OPEN), payload: event });
export const feedErrorAction = (event: Event): IFeedErrorAction => ({ ...actionCreator(FEED_ERROR), payload: event });
export const feedCloseAction = (event: Event): IFeedCloseAction => ({ ...actionCreator(FEED_CLOSE), payload: event });


export const feedMessageAction = (event: MessageEvent): IFeedMessageAction => {
    const data = JSON.parse(event.data);
    return {
        ...actionCreator(FEED_MESSAGE),
        payload: {
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday,
        }
    }
}