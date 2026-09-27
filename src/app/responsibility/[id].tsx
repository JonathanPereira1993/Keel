import AppLayout from '@/components/app-layout'
import DetailRow from '@/components/detail-row'
import IconButton from '@/components/icon-button'
import IconTile from '@/components/icon-tile'
import StatusLabel from '@/components/status-label'
import TopBar from '@/components/top-bar'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import {
    formatAmount,
    formatDate,
    formatRecurrence,
    getCategory,
    getDueLabel,
    getIcon,
    getStatus,
    toggleHandled,
    useResponsibilities,
} from '@/data/responsibilities'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { router, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, ChevronRight, ExternalLink, FileText, Pencil } from 'lucide-react-native'
import { Linking, Pressable, ScrollView } from 'react-native'

const ResponsibilityDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const colors = useThemeColors()
    const item = useResponsibilities().find((entry) => entry.id === id)

    const topBar = (
        <TopBar
            title={item ? getCategory(item.categoryId)?.name : undefined}
            leading={
                <IconButton icon={ArrowLeft} accessibilityLabel="Back" onPress={() => router.back()} />
            }
            trailing={<IconButton icon={Pencil} accessibilityLabel="Edit" />}
        />
    )

    if (!item) {
        return (
            <AppLayout header={topBar}>
                <Text className="text-muted-foreground text-center mt-12">
                    This responsibility no longer exists.
                </Text>
            </AppLayout>
        )
    }

    const status = getStatus(item)
    const rows = [
        {
            label: 'Due',
            value: formatDate(item.dueDate),
        },
        item.provider && { label: 'Provider', value: item.provider },
        item.reference && { label: item.reference.label, value: item.reference.value },
        { label: 'Recurrence', value: formatRecurrence(item.recurrence) },
        item.reminders?.length && {
            label: 'Reminders',
            value: item.reminders.map((days) => `${days} ${days === 1 ? 'day' : 'days'}`).join(' · '),
        },
    ].filter((row) => !!row)

    return (
        <AppLayout header={topBar}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pt-4 pb-6">
                <HStack space="lg" className="items-center">
                    <IconTile icon={getIcon(item)} size="lg" />
                    <VStack className="flex-1">
                        <Text variant="h1">{item.title}</Text>
                        {item.provider && (
                            <Text className="text-muted-foreground">{item.provider}</Text>
                        )}
                    </VStack>
                </HStack>

                <HStack className="items-end justify-between mt-6 mb-6">
                    {item.amount !== undefined ? (
                        <Text variant="display">{formatAmount(item.amount)}</Text>
                    ) : (
                        <Box />
                    )}
                    <Box className="pb-2">
                        <StatusLabel status={status} label={getDueLabel(item)} />
                    </Box>
                </HStack>

                <Box className="rounded-2xl border border-border bg-card px-5">
                    {rows.map((row, index) => (
                        <DetailRow
                            key={row.label}
                            label={row.label}
                            value={row.value}
                            isLast={index === rows.length - 1 && !item.paymentUrl}
                        />
                    ))}
                    {item.paymentUrl && (
                        <Pressable
                            onPress={() => Linking.openURL(`https://${item.paymentUrl}`)}
                            accessibilityRole="link"
                        >
                            <DetailRow
                                label="Payment link"
                                value={item.paymentUrl}
                                isLast
                                trailing={<ExternalLink color={colors.mutedForeground} size={18} />}
                            />
                        </Pressable>
                    )}
                </Box>

                {!!item.documents?.length && (
                    <>
                        <Text variant="caption" className="text-muted-foreground mt-8 mb-3">
                            Documents
                        </Text>
                        <VStack space="md">
                            {item.documents.map((doc) => (
                                <HStack
                                    key={doc.id}
                                    space="md"
                                    className="items-center rounded-2xl border border-border bg-card p-4"
                                >
                                    <IconTile icon={FileText} />
                                    <VStack className="flex-1">
                                        <Text variant="body-medium" numberOfLines={1}>
                                            {doc.name}
                                        </Text>
                                        <Text variant="meta" className="text-muted-foreground">
                                            {doc.size}
                                        </Text>
                                    </VStack>
                                    <ChevronRight color={colors.mutedForeground} size={20} />
                                </HStack>
                            ))}
                        </VStack>
                    </>
                )}
            </ScrollView>

            <Button
                variant={item.handled ? 'outline' : 'default'}
                className="h-14 rounded-2xl mt-2 mb-2"
                onPress={() => toggleHandled(item.id)}
            >
                <ButtonText className="text-[16px] font-inter-semibold">
                    {item.handled ? 'Mark as not handled' : 'Mark as handled'}
                </ButtonText>
            </Button>
        </AppLayout>
    )
}

export default ResponsibilityDetailScreen
