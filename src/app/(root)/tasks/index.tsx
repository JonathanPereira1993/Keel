import { Text } from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'

const TasksScreen = () => {
    return (
        <SafeAreaView className="px-4">
            <Text className="text-foreground text-[19px] font-semibold">Tasks</Text>
        </SafeAreaView>
    )
}

export default TasksScreen
