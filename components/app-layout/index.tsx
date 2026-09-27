import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
    header?: React.ReactNode
    children: React.ReactNode
    hasSafeAreaTop?: boolean
    hasSafeAreaBottom?: boolean
}

const AppLayout = ({
    header,
    children,
    hasSafeAreaTop = true,
    hasSafeAreaBottom = true,
}: Props) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            style={{
                paddingTop: hasSafeAreaTop ? insets.top : 0,
                paddingBottom: hasSafeAreaBottom ? insets.bottom : 0,
            }}
            className="flex-1 bg-background px-6"
        >
            {header && <View>{header}</View>}
            <View className="flex-1 pt-4">{children}</View>
        </View>
    )
}

export default AppLayout
