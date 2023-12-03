import thunk from "redux-thunk";
import { WebSocketMiddleware } from "./websocket-mw";
import { feedConfig } from "./feed-ws";

export const defaultMiddleware = [thunk, 
    WebSocketMiddleware(feedConfig)];