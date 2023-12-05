import thunk from "redux-thunk";
import { WebSocketMiddleware } from "./websocket-mw";
import { feedConfig } from "./feed-ws";
import { userOrdersConfig } from "./user-orders-ws";

export const defaultMiddleware = [thunk, 
    WebSocketMiddleware(feedConfig),
    WebSocketMiddleware(userOrdersConfig)
];