import { Text } from '@/components/ui/text'
import { Search } from 'lucide-react-native'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { HStack } from '../ui/hstack'

const Header = () => {
    const dateFormatter = () => {
        const weekDay = new Date().toLocaleDateString('pt-PT', {
            weekday: 'long',
        })
        const date = new Date().toLocaleDateString('pt-PT', { day: 'numeric' })
        const month = new Date().toLocaleDateString('pt-PT', { month: 'long' })

        return `${weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}, ${date} ${month.charAt(0).toUpperCase() + month.slice(1)}`
    }

    return (
        <HStack space="md" className="justify-between items-center">
            <Box>
                <Text className="text-muted-foreground text-base font-normal">
                    {dateFormatter()}
                </Text>
                <Text className="text-foreground text-[19px] font-semibold">
                    Olá, Jonathan
                </Text>
            </Box>
            <Box>
                <Button className="w-9 h-9 rounded-lg" variant="secondary">
                    <Search className="h-3 w-3" />
                </Button>
            </Box>
        </HStack>
    )
}

export default Header
