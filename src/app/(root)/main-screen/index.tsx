import AppLayout from '@/components/app-layout'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Bell, Search } from 'lucide-react-native'

const MainScreen = () => {
    return (
        <AppLayout
            header={
                <Header
                    hasDate
                    title="Ola, Jonathan"
                    actions={
                        <HStack space="md">
                            <Button
                                className="w-9 h-9"
                                onPress={() => console.log('Button pressed!')}
                                variant="secondary"
                            >
                                <Search size={18} />
                            </Button>

                            <Button
                                className="w-9 h-9"
                                onPress={() => console.log('Button pressed!')}
                                variant="secondary"
                            >
                                <Bell size={18} />
                            </Button>
                        </HStack>
                    }
                />
            }
        >
            <Text>Hello</Text>
        </AppLayout>
    )
}

export default MainScreen
