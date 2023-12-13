import {
    FEED_START, FEED_STOP,
    feedMessageAction, feedCloseAction, feedErrorAction, feedOpenAction 
} from "../actions/feed"

export const feedConfig = {
    wsStart: FEED_START,
    wsStop: FEED_STOP,

    onOpen: feedOpenAction,
    onMessage: feedMessageAction,
    onError: feedErrorAction,
    onClose: feedCloseAction,

}