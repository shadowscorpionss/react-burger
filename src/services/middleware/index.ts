import thunk from "redux-thunk";
import { webSocketMiddleware } from "./websocket-mw";
import { feedConfig } from "./feed-ws";
import { userOrdersConfig } from "./user-orders-ws";

export const defaultMiddleware = [thunk, 
    webSocketMiddleware(feedConfig),
    webSocketMiddleware(userOrdersConfig)
];