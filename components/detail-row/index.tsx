import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

type Props = {
    label: string
    value: string
    trailing?: React.ReactNode
    isLast?: boolean
}

const DetailRow = ({ label, value, trailing, isLast = false }: Props) => {
    return (
        <HStack
            className={`items-center justify-between py-4 ${isLast ? '' : 'border-b border-border'}`}
        >
            <VStack space="xs" className="flex-1">
                <Text variant="caption" className="text-muted-foreground">
                    {label}
                </Text>
                <Text variant="body-medium" className="text-[17px]">
                    {value}
                </Text>
            </VStack>
            {trailing}
        </HStack>
    )
}

export default DetailRow
