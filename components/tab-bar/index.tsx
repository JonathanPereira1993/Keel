import { Text } from '@/components/ui/text'
import type { BottomTabBarProps } from 'expo-router/js-tabs'
import { Plus } from 'lucide-react-native'
import { Pressable, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

// Mirrors --foreground / --muted-foreground / --primary-foreground in global.css (icons need a color prop, not a class)
const ICON_COLORS = {
    light: {
        active: 'rgb(10 10 10)',
        inactive: 'rgb(115 115 115)',
        onPrimary: 'rgb(250 250 250)',
    },
    dark: {
        active: 'rgb(250 250 250)',
        inactive: 'rgb(161 161 161)',
        onPrimary: 'rgb(23 23 23)',
    },
}

const FAB_SIZE = 64

type TabBarProps = BottomTabBarProps & {
    onAddPress?: () => void
}

const TabBar = ({
    state,
    descriptors,
    navigation,
    onAddPress,
}: TabBarProps) => {
    const insets = useSafeAreaInsets()
    const colors = ICON_COLORS[useColorScheme() === 'dark' ? 'dark' : 'light']

    const renderTab = (route: (typeof state.routes)[number], index: number) => {
        const { options } = descriptors[route.key]
        const focused = state.index === index
        const label = options.title ?? route.name
        const color = focused ? colors.active : colors.inactive

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            })

            if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params)
            }
        }

        return (
            <Pressable
                key={route.key}
                onPress={onPress}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                className="flex-1 items-center gap-1 py-2"
            >
                {options.tabBarIcon?.({ focused, color, size: 24 })}
                <Text
                    className={
                        focused
                            ? 'text-foreground text-[13px] font-semibold'
                            : 'text-muted-foreground text-[13px] font-medium'
                    }
                >
                    {label}
                </Text>
            </Pressable>
        )
    }

    const middle = Math.ceil(state.routes.length / 2)

    return (
        <Box
            className="bg-card border-t border-border"
            style={{ paddingBottom: insets.bottom }}
        >
            <HStack className="items-center pt-3">
                {state.routes
                    .slice(0, middle)
                    .map((route, i) => renderTab(route, i))}
                {/* Keeps space for the floating button */}
                <View style={{ width: FAB_SIZE + 16 }} />
                {state.routes
                    .slice(middle)
                    .map((route, i) => renderTab(route, i + middle))}
            </HStack>

            <Pressable
                onPress={onAddPress}
                accessibilityRole="button"
                accessibilityLabel="Adicionar"
                className="absolute self-center items-center justify-center rounded-full bg-primary active:opacity-80"
                style={{
                    top: -FAB_SIZE / 2,
                    width: FAB_SIZE,
                    height: FAB_SIZE,
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Plus color={colors.onPrimary} size={28} />
            </Pressable>
        </Box>
    )
}

export default TabBar
