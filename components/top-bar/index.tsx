import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'

type Props = {
    title?: string
    leading?: React.ReactNode
    trailing?: React.ReactNode
}

// Fixed-width sides keep the title centred whether or not buttons are present
const TopBar = ({ title, leading, trailing }: Props) => {
    return (
        <HStack space="md" className="items-center">
            <Box className="w-11">{leading}</Box>
            <Text variant="meta" numberOfLines={1} className="flex-1 text-center text-muted-foreground">
                {title}
            </Text>
            <Box className="w-11">{trailing}</Box>
        </HStack>
    )
}

export default TopBar
