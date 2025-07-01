export const HEADING = {
    H1: 'H1',
    H2: 'H2',
    H3: 'H3'
} as const;

export type HeadingType = typeof HEADING[keyof typeof HEADING]; 