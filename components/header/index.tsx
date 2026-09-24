import { Text } from '@/components/ui/text'
import { Search } from 'lucide-react-native'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { HStack } from '../ui/hstack'

const Header = () => {
    return (
        <HStack space="md" className="justify-between items-center">
            <Box>
                <Text className="text-muted-foreground text-base font-normal">
                    Header
                </Text>
                <Text className="text-foreground text-[19px] font-semibold">
                    Good morning, Jonathan
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
