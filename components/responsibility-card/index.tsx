import {
    formatAmount,
    getDueLabel,
    getIcon,
    getStatus,
    type Responsibility,
} from '@/data/responsibilities'
import { Pressable } from 'react-native'
import IconTile from '../icon-tile'
import StatusLabel from '../status-label'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'
import { VStack } from '../ui/vstack'

type Props = {
    item: Responsibility
    onPress?: () => void
}

const ResponsibilityCard = ({ item, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="rounded-2xl border border-border bg-card p-4 active:opacity-80"
        >
            <HStack space="md" className="items-center">
                <IconTile icon={getIcon(item)} />
                <VStack space="xs" className="flex-1">
                    <Text variant="body-medium" numberOfLines={1}>
                        {item.title}
                    </Text>
                    <StatusLabel status={getStatus(item)} label={getDueLabel(item)} />
                </VStack>
                {item.amount !== undefined && (
                    <Text variant="body-medium">{formatAmount(item.amount)}</Text>
                )}
            </HStack>
        </Pressable>
    )
}

export default ResponsibilityCard
