export const TOASTER_VARIANT = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
} as const;

export type ToasterVariantType = 'success' | 'error' | 'info' | 'warning'; 