import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios'; 

// const API_URL = 'http://localhost:4000'; 
const API_URL = 'https://fundraisingdb.onrender.com'; 


interface FundraisingData {
    amountIn: number;
    amountOut: number;
}

interface UseSocketReturn {
    data: FundraisingData;
    isConnected: boolean;
    lastUpdate: Date | null;
}

const initialData: FundraisingData = { amountIn: 0, amountOut: 0 };

export function useSocket(): UseSocketReturn {
    const [data, setData] = useState<FundraisingData>(initialData);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const fetchInitialData = useCallback(async () => {
        try {
            console.log(`Fetching initial data from: ${API_URL}/latest-data`);
            const response = await axios.get<FundraisingData>(`${API_URL}/latest-data`);
            
            setData(response.data);
            setLastUpdate(new Date());
            console.log('Initial data loaded via GET:', response.data);
            
        } catch (error) {
            console.error('Error fetching initial data (GET request failed). Is backend running?', error);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
        
        const socket: Socket = io(API_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
            console.log('Connected to fundraising server');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from fundraising server');
            setIsConnected(false);
        });

        const onDataUpdate = (newData: FundraisingData) => {
             console.log('Real-time data received:', newData);
             setData(newData);
             setLastUpdate(new Date());
        }

        socket.on('realtimeDataUpdate', onDataUpdate); 

        socket.on('connect_error', (error) => {
             console.log('Connection error:', error.message);
             setIsConnected(false);
        });

        return () => {
             socket.off('connect');
             socket.off('disconnect');
             socket.off('realtimeDataUpdate', onDataUpdate); 
             socket.off('connect_error');
             socket.disconnect(); 
        };
    }, [fetchInitialData]); 

    return { data, isConnected, lastUpdate };
}
