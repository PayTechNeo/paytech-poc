import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ToasterVariantType } from './constants';

interface Notification {
    id: number;
    message: string;
    variant: ToasterVariantType;
}

interface ToasterState {
    notifications: Notification[];
}

const initialState: ToasterState = {
    notifications: []
}

const toasterSlice = createSlice({
    name: 'toaster',
    initialState,
    reducers: {
        addNotifications: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            state.notifications.push({
                id: Date.now(),
                ...action.payload
            });
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        }
    }
});

export const { addNotifications, removeNotification } = toasterSlice.actions;
export default toasterSlice.reducer; 