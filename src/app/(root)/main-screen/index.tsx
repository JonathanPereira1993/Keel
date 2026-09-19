import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = () => {
    return (
        <SafeAreaView className="px-4">
            <Box>
                <Text>MainScreen</Text>
            </Box>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({})
