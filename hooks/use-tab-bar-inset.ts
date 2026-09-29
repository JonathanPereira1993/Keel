import { BottomTabBarHeightContext } from 'expo-router/js-tabs'
import { use } from 'react'

// Space taken by the floating tab bar; 0 on screens outside the tabs
export const useTabBarInset = () => use(BottomTabBarHeightContext) ?? 0
