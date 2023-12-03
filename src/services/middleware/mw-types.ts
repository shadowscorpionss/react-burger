import { TApplicationActions } from "../actions"

export interface IWSActions {
    wsStart: string
    wsStop: string
    onOpen: (event: Event) => TApplicationActions
    onMessage: (event: MessageEvent) => TApplicationActions
    onError: (event: Event) => TApplicationActions
    onClose: (event: Event) => TApplicationActions
}