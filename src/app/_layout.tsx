import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import { useColorScheme } from 'react-native'

import '@/global.css'

const BACKGROUND = { light: '#FAFAF8', dark: 'rgb(10 10 10)' } // mirrors --background

export default function RootLayout() {
    const scheme = useColorScheme() === 'dark' ? 'dark' : 'light'
    const base = scheme === 'dark' ? DarkTheme : DefaultTheme

    return (
        <GluestackUIProvider>
            <ThemeProvider
                value={{
                    ...base,
                    colors: { ...base.colors, background: BACKGROUND[scheme] },
                }}
            >
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(root)" />
                    <Stack.Screen name="new" options={{ presentation: 'fullScreenModal' }} />
                </Stack>
            </ThemeProvider>
        </GluestackUIProvider>
    )
}
