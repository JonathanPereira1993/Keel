import { useColorScheme } from 'react-native'

// Mirrors the tokens in global.css. Icons need a color prop, not a class.
const THEME_COLORS = {
    light: {
        foreground: 'rgb(10 10 10)',
        mutedForeground: 'rgb(115 115 115)',
        primaryForeground: 'rgb(250 250 250)',
        warning: 'rgb(160 101 14)',
        brand: 'rgb(80 95 210)',
        brandLight: 'rgba(76, 95, 217, 0.20)',
        brandForeground: 'rgb(250 250 250)',
    },
    dark: {
        foreground: 'rgb(250 250 250)',
        mutedForeground: 'rgb(161 161 161)',
        primaryForeground: 'rgb(23 23 23)',
        warning: 'rgb(220 168 74)',
        brand: 'rgb(129 140 248)',
        brandLight: 'rgba(76, 95, 217, 0.12)',
        brandForeground: 'rgb(250 250 250)',
    },
}

export const useThemeColors = () =>
    THEME_COLORS[useColorScheme() === 'dark' ? 'dark' : 'light']
