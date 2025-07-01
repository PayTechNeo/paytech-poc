export const PAGE_STATE = {
    PRE_LOADING: 'preloading',
    LOADING: 'loading',
    PAGE_READY: 'ready',
} as const

export type PageState = typeof PAGE_STATE[keyof typeof PAGE_STATE] 