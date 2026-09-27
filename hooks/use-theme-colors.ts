import { useColorScheme } from 'react-native'

// Mirrors the tokens in global.css. Icons need a color prop, not a class.
const THEME_COLORS = {
    light: {
        foreground: 'rgb(10 10 10)',
        mutedForeground: 'rgb(115 115 115)',
        primaryForeground: 'rgb(250 250 250)',
        warning: 'rgb(160 101 14)',
    },
    dark: {
        foreground: 'rgb(250 250 250)',
        mutedForeground: 'rgb(161 161 161)',
        primaryForeground: 'rgb(23 23 23)',
        warning: 'rgb(220 168 74)',
    },
}

export const useThemeColors = () =>
    THEME_COLORS[useColorScheme() === 'dark' ? 'dark' : 'light']
