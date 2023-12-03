export interface IWSActions<T> {
    wsStart: string;
    wsStop: string;
    onOpen: (event: Event) => T;
    onMessage: (event: MessageEvent) => T;
    onError: (event: Event) => T;
    onClose: (event: Event) => T;
}