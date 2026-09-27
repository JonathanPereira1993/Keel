import AppLayout from '@/components/app-layout'
import IconButton from '@/components/icon-button'
import IconTile from '@/components/icon-tile'
import OptionCard from '@/components/option-card'
import TopBar from '@/components/top-bar'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { ITEM_TYPES, useDraft, type ItemType } from '@/data/responsibility-draft'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { router } from 'expo-router'
import { Camera, ChevronRight, TextAlignStart, X, type LucideIcon } from 'lucide-react-native'
import { Alert, Pressable, ScrollView } from 'react-native'

const ShortcutRow = ({
    icon,
    title,
    subtitle,
}: {
    icon: LucideIcon
    title: string
    subtitle: string
}) => {
    const colors = useThemeColors()

    return (
        <Pressable
            onPress={() => Alert.alert('Coming soon', `${title} isn't available yet.`)}
            accessibilityRole="button"
            className="py-3 active:opacity-70"
        >
            <HStack space="md" className="items-center">
                <IconTile icon={icon} />
                <VStack className="flex-1">
                    <Text variant="body-medium" className="text-[17px]">
                        {title}
                    </Text>
                    <Text variant="meta" className="text-muted-foreground">
                        {subtitle}
                    </Text>
                </VStack>
                <ChevronRight color={colors.mutedForeground} size={20} />
            </HStack>
        </Pressable>
    )
}

const PickTypeScreen = () => {
    const { start } = useDraft()

    const rows: ItemType[][] = []
    for (let i = 0; i < ITEM_TYPES.length; i += 2) {
        rows.push(ITEM_TYPES.slice(i, i + 2))
    }

    const pick = (type: ItemType) => {
        start(type)
        router.push('/new/details')
    }

    return (
        <AppLayout
            header={
                <TopBar
                    trailing={
                        <IconButton icon={X} accessibilityLabel="Close" onPress={() => router.back()} />
                    }
                />
            }
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
                <Text variant="h1" className="mb-6">
                    {'What do you need\nto keep track of?'}
                </Text>

                <VStack space="md">
                    {rows.map((row) => (
                        <HStack key={row[0].id} space="md">
                            {row.map((type) => (
                                <OptionCard
                                    key={type.id}
                                    icon={type.icon}
                                    label={type.label}
                                    onPress={() => pick(type)}
                                />
                            ))}
                        </HStack>
                    ))}
                </VStack>

                <HStack space="md" className="items-center my-8">
                    <Box className="flex-1 h-px bg-border" />
                    <Text variant="meta" className="text-muted-foreground">
                        OR
                    </Text>
                    <Box className="flex-1 h-px bg-border" />
                </HStack>

                <ShortcutRow icon={Camera} title="Scan a document" subtitle="Keel fills in the details" />
                <ShortcutRow icon={TextAlignStart} title="Describe it" subtitle="Type it in your own words" />
            </ScrollView>
        </AppLayout>
    )
}

export default PickTypeScreen
