export const MET_COLORS = {
    PRIMARY: "#1B5984",
    SECONDARY: "#ccecff80",
    DARK_GRAY: "#4c4c4c99",
    GRAY: "#E7E7E7"
} as const

export const SCREEN_SIZES = {
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
} as const

export type ScreenSize = typeof SCREEN_SIZES[keyof typeof SCREEN_SIZES] 