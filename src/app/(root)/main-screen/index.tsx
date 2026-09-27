import AppLayout from '@/components/app-layout'
import Header from '@/components/header'
import { Text } from '@/components/ui/text'

const MainScreen = () => {
    return (
        <AppLayout header={<Header />}>
            <Text>Hello</Text>
        </AppLayout>
    )
}

export default MainScreen
