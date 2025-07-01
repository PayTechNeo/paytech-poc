import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toaster: React.FC = () => {
    const dispatch = useDispatch()
    const toasterState = useSelector((state: any) => state.toaster)
    const notifications = toasterState?.notifications || []

    useEffect(() => {
        if (notifications.length > 0) {
            const notification = notifications[0]
            const toastMethod = toast[notification.variant as 'success' | 'error' | 'info' | 'warning']
            if (toastMethod && typeof toastMethod === 'function') {
                toastMethod(notification.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => dispatch({ type: 'toaster/removeNotification', payload: notification.id })
                })
            }
        }
    }, [notifications, dispatch])

    return <ToastContainer />
}

export default Toaster 