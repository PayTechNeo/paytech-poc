import type { ToasterVariantType } from './constants';

interface Notification {
    id: number;
    message: string;
    variant: ToasterVariantType;
}

interface ToasterState {
    notifications: Notification[];
}

interface AddNotificationAction {
    type: 'toaster/addNotifications';
    payload: Omit<Notification, 'id'>;
}

interface RemoveNotificationAction {
    type: 'toaster/removeNotification';
    payload: number;
}

type ToasterAction = AddNotificationAction | RemoveNotificationAction;

const initialState: ToasterState = {
    notifications: []
}

const toasterReducer = (state: ToasterState = initialState, action: ToasterAction): ToasterState => {
    switch (action.type) {
        case 'toaster/addNotifications':
            return {
                ...state,
                notifications: [...state.notifications, {
                    id: Date.now(),
                    ...action.payload
                }]
            }
        case 'toaster/removeNotification':
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.id !== action.payload
                )
            }
        default:
            return state
    }
}

export const addNotifications = (payload: Omit<Notification, 'id'>) => ({
    type: 'toaster/addNotifications' as const,
    payload
})

export const removeNotification = (id: number) => ({
    type: 'toaster/removeNotification' as const,
    payload: id
})

export default toasterReducer 