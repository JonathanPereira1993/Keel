import { Text } from '@/components/ui/text'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect'
import {
    BottomTabBarHeightCallbackContext,
    type BottomTabBarProps,
} from 'expo-router/js-tabs'
import { Plus } from 'lucide-react-native'
import { use, useEffect, useRef } from 'react'
import { Pressable, View, type LayoutRectangle } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useReducedMotion,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

const FAB_SIZE = 60
// How far the button's centre sits below the bar's top edge
const FAB_DROP = 4

// iOS 26+ only; older iOS and Android get the solid pill
const HAS_GLASS = isLiquidGlassAvailable()

// Snappy with a touch of overshoot, close to the native iOS tab bar
const PILL_SPRING = { damping: 50, stiffness: 280, mass: 0.9 }
// Press "lift" and release, like the iOS 26 tab bar lens
const PRESS_SPRING = { damping: 15, stiffness: 320 }
const PILL_PRESSED_SCALE = 1.08
// How much the pill stretches while travelling between tabs
const PILL_STRETCH = 1.18

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
    const colors = useThemeColors()
    // Screens read this through BottomTabBarHeightContext to pad their content
    const onHeightChange = use(BottomTabBarHeightCallbackContext)
    const reduceMotion = useReducedMotion()

    // One pill for the whole bar, slid under whichever tab is active
    const tabLayouts = useRef<Record<string, LayoutRectangle>>({})
    const pillX = useSharedValue(0)
    const pillWidth = useSharedValue(0)
    const pillY = useSharedValue(0)
    const pillHeight = useSharedValue(0)
    const pillVisible = useSharedValue(0)
    const pillScale = useSharedValue(1)
    const pillStretch = useSharedValue(1)
    const fabScale = useSharedValue(1)

    const movePill = (key: string, animate: boolean) => {
        const layout = tabLayouts.current[key]
        if (!layout) return

        const shouldAnimate =
            animate && !reduceMotion && pillVisible.value === 1
        pillX.value = shouldAnimate
            ? withSpring(layout.x, PILL_SPRING)
            : layout.x
        pillWidth.value = shouldAnimate
            ? withSpring(layout.width, PILL_SPRING)
            : layout.width
        pillY.value = layout.y
        pillHeight.value = layout.height
        pillVisible.value = 1

        // Stretch wide mid-flight, then wobble back into shape
        if (shouldAnimate) {
            pillStretch.value = withSequence(
                withTiming(PILL_STRETCH, { duration: 140 }),
                withSpring(1, PRESS_SPRING)
            )
        }
    }

    const press = (value: typeof pillScale, to: number) => {
        if (!reduceMotion) value.value = withSpring(to, PRESS_SPRING)
    }

    const activeKey = state.routes[state.index].key
    useEffect(() => {
        movePill(activeKey, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeKey])

    const pillStyle = useAnimatedStyle(() => ({
        opacity: pillVisible.value,
        top: pillY.value,
        height: pillHeight.value,
        width: pillWidth.value,
        transform: [
            { translateX: pillX.value },
            { scaleX: pillScale.value * pillStretch.value },
            // Squash a little while stretched so it reads as liquid, not a zoom
            { scaleY: pillScale.value * (1 - (pillStretch.value - 1) * 0.4) },
        ],
    }))

    const fabStyle = useAnimatedStyle(() => ({
        transform: [{ scale: fabScale.value }],
    }))

    const renderTab = (route: (typeof state.routes)[number], index: number) => {
        const { options } = descriptors[route.key]
        const focused = state.index === index
        const label = options.title ?? route.name
        const color = focused ? colors.brand : colors.mutedForeground

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
                onPressIn={() => press(pillScale, PILL_PRESSED_SCALE)}
                onPressOut={() => press(pillScale, 1)}
                onLayout={(event) => {
                    tabLayouts.current[route.key] = event.nativeEvent.layout
                    // Tabs re-measure on rotation/resizing: snap, don't animate
                    if (focused) movePill(route.key, false)
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                className="flex-1 items-center justify-center py-1.5"
            >
                {options.tabBarIcon?.({ focused, color, size: 22 })}
                <Text
                    variant="meta"
                    className={
                        focused
                            ? 'text-xs text-brand'
                            : 'text-xs text-muted-foreground'
                    }
                >
                    {label}
                </Text>
            </Pressable>
        )
    }

    const middle = Math.ceil(state.routes.length / 2)

    const tabs = (
        <HStack className="items-center p-2">
            {/* Native/animated views here: styled with `style`, className isn't applied to them */}
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        position: 'absolute',
                        left: 0,
                        borderRadius: 999,
                        overflow: 'hidden',
                    },
                    !HAS_GLASS && { backgroundColor: colors.brand },
                    pillStyle,
                ]}
            >
                {HAS_GLASS && (
                    <GlassView
                        glassEffectStyle="clear"
                        tintColor={colors.brandLight}
                        style={{ flex: 1, borderRadius: 999 }}
                    />
                )}
            </Animated.View>
            {state.routes
                .slice(0, middle)
                .map((route, i) => renderTab(route, i))}
            {/* Keeps space for the floating button */}
            <View style={{ width: FAB_SIZE + 4 }} />
            {state.routes
                .slice(middle)
                .map((route, i) => renderTab(route, i + middle))}
        </HStack>
    )

    const plusIcon = <Plus color={colors.brandForeground} size={28} />

    return (
        <View
            pointerEvents="box-none"
            onLayout={(event) =>
                onHeightChange?.(event.nativeEvent.layout.height)
            }
            className="absolute inset-x-0 bottom-0 px-6"
            style={{ paddingBottom: Math.max(insets.bottom - 8, 16) }}
        >
            {HAS_GLASS ? (
                <GlassView
                    glassEffectStyle="regular"
                    style={{ borderRadius: 999 }}
                >
                    {tabs}
                </GlassView>
            ) : (
                <Box
                    className="rounded-full bg-card border border-border"
                    style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}
                >
                    {tabs}
                </Box>
            )}

            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        alignSelf: 'center',
                        top: -FAB_SIZE / 2 + FAB_DROP,
                        width: FAB_SIZE,
                        height: FAB_SIZE,
                        borderRadius: FAB_SIZE / 2,
                        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.10)',
                    },
                    fabStyle,
                ]}
            >
                <Pressable
                    onPress={onAddPress}
                    // Glass reacts to touch natively (isInteractive); elsewhere we scale
                    onPressIn={() => !HAS_GLASS && press(fabScale, 0.92)}
                    onPressOut={() => !HAS_GLASS && press(fabScale, 1)}
                    accessibilityRole="button"
                    accessibilityLabel="Adicionar"
                    style={{ flex: 1 }}
                >
                    {HAS_GLASS ? (
                        <GlassView
                            glassEffectStyle="regular"
                            tintColor={colors.brand}
                            isInteractive
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: FAB_SIZE / 2,
                            }}
                        >
                            {plusIcon}
                        </GlassView>
                    ) : (
                        <Box className="flex-1 items-center justify-center rounded-full bg-brand">
                            {plusIcon}
                        </Box>
                    )}
                </Pressable>
            </Animated.View>
        </View>
    )
}

export default TabBar
