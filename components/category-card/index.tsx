import { pluralize, type Category } from '@/data/responsibilities'
import { Pressable } from 'react-native'
import { Box } from '../ui/box'
import IconTile from '../icon-tile'
import StatusLabel from '../status-label'
import { Text } from '../ui/text'

type Props = {
    category: Category
    total: number
    attention: number
    onPress?: () => void
}

const CategoryCard = ({ category, total, attention, onPress }: Props) => {
    const summary = pluralize(total, 'item')

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="flex-1 min-h-44 justify-between rounded-2xl border border-border bg-card p-4 active:opacity-80"
        >
            <IconTile icon={category.icon} />
            <Box>
                <Text variant="h3" className="mb-1">
                    {category.name}
                </Text>
                {attention > 0 ? (
                    <StatusLabel status="attention" label={`${summary} · ${attention} attention`} />
                ) : (
                    <Text variant="meta" className="text-muted-foreground">
                        {summary}
                    </Text>
                )}
            </Box>
        </Pressable>
    )
}

export default CategoryCard
