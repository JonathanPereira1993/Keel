import Header from '@/components/header'
import { Box } from '@/components/ui/box'
import { SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = () => {
    return (
        <SafeAreaView>
            <Box className="px-4">
                <Header />
            </Box>
        </SafeAreaView>
    )
}

export default MainScreen
