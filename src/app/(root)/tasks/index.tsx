import AppLayout from '@/components/app-layout'
import ResponsabilityItem from '@/components/responsability-item'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { ThermometerSun } from 'lucide-react-native'

const TasksScreen = () => {
    return (
        <AppLayout
            header={
                <Text className="text-foreground text-2xl font-bold">
                    Responsabilities
                </Text>
            }
        >
            <VStack space="md" className="mt-4">
                <ResponsabilityItem
                    icon={<ThermometerSun size={20} />}
                    title="Task 1"
                    subtitle="Description for Task 1"
                />
            </VStack>
        </AppLayout>
    )
}

export default TasksScreen
