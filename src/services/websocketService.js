import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";

export const connectWebSocket = (
    onMessageReceived
) => {

    const socket =
        new SockJS(
            "http://localhost:8080/ws"
        );

    const client = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        onConnect: () => {

            console.log(
                "WebSocket Connected"
            );

            client.subscribe(
                "/topic/metrics",
                (message) => {

                    try {

                        const body =
                            JSON.parse(message.body);

                        onMessageReceived(body);

                    } catch (error) {

                        console.error(
                            "Invalid metrics message",
                            error
                        );
                    }
                }
            );
        },

        onStompError: (frame) => {

            console.error(
                "Broker error",
                frame
            );
        }
    });

    client.activate();

    return () => {

        client.deactivate();
    };
};
