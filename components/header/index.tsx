import { Text } from '@/components/ui/text'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { HStack } from '../ui/hstack'

const Header = () => {
    return (
        <HStack space="md" className="justify-between items-center">
            <Box>
                <Text>Header</Text>
                <Text>Good morning, Jonathan</Text>
            </Box>
            <Box>
                <Button variant="ghost"></Button>
            </Box>
        </HStack>
    )
}

export default Header
