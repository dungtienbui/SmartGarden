import { useState, useEffect } from 'react';

function Notification() {
    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const eventSource = new EventSource(baseUrl + '/setting/notification');

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            // console.log(eventData.DT);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);
    return <div></div>;
}

export default Notification;
