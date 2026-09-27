import AppLayout from '@/components/app-layout'
import Chip from '@/components/chip'
import IconButton from '@/components/icon-button'
import RadioGroup from '@/components/radio-group'
import TopBar from '@/components/top-bar'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import {
    REMINDER_OPTIONS,
    getRecurrence,
    toNewResponsibility,
    useDraft,
    type Repeat,
} from '@/data/responsibility-draft'
import {
    addRecurrence,
    createResponsibility,
    formatDate,
    pluralize,
} from '@/data/responsibilities'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { router } from 'expo-router'
import { ArrowLeft, CalendarDays, Minus, Plus, RotateCcw } from 'lucide-react-native'
import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'

const REPEAT_OPTIONS: { value: Repeat; label: string }[] = [
    { value: 'once', label: 'One-time' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'custom', label: 'Custom' },
]

const OCCURRENCES_SHOWN = 3

const RecurrenceScreen = () => {
    const colors = useThemeColors()
    const { draft, update } = useDraft()
    const [saving, setSaving] = useState(false)

    const recurrence = getRecurrence(draft)
    const occurrences = recurrence
        ? Array.from({ length: OCCURRENCES_SHOWN }, (_, i) => addRecurrence(draft.dueDate, recurrence, i))
        : [draft.dueDate]

    const toggleReminder = (days: number) =>
        update({
            reminders: draft.reminders.includes(days)
                ? draft.reminders.filter((d) => d !== days)
                : [...draft.reminders, days],
        })

    const save = async () => {
        setSaving(true)
        try {
            const item = await createResponsibility(toNewResponsibility(draft))
            // Swaps the whole "new" modal for the created item's detail screen
            router.replace({ pathname: '/responsibility/[id]', params: { id: item.id } })
        } catch {
            setSaving(false)
            Alert.alert("Couldn't save", 'Please try again.')
        }
    }

    const customSettings = (
        <VStack space="md" className="pb-4 pl-9">
            <HStack space="md" className="items-center">
                <Text className="text-muted-foreground">Every</Text>
                <IconButton
                    icon={Minus}
                    accessibilityLabel="Fewer"
                    onPress={() =>
                        update({ custom: { ...draft.custom, every: Math.max(1, draft.custom.every - 1) } })
                    }
                />
                <Text variant="body-medium" className="text-[17px] min-w-6 text-center">
                    {draft.custom.every}
                </Text>
                <IconButton
                    icon={Plus}
                    accessibilityLabel="More"
                    onPress={() =>
                        update({ custom: { ...draft.custom, every: Math.min(99, draft.custom.every + 1) } })
                    }
                />
            </HStack>
            <HStack space="sm">
                <Chip
                    label="Months"
                    selected={draft.custom.unit === 'month'}
                    onPress={() => update({ custom: { ...draft.custom, unit: 'month' } })}
                />
                <Chip
                    label="Years"
                    selected={draft.custom.unit === 'year'}
                    onPress={() => update({ custom: { ...draft.custom, unit: 'year' } })}
                />
            </HStack>
        </VStack>
    )

    return (
        <AppLayout
            header={
                <TopBar
                    title={`Recurrence · ${draft.title.trim()}`}
                    leading={
                        <IconButton icon={ArrowLeft} accessibilityLabel="Back" onPress={() => router.back()} />
                    }
                />
            }
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pt-4 pb-6">
                <Text variant="h1" className="mb-6">
                    {'How often does\nthis repeat?'}
                </Text>

                <RadioGroup
                    options={REPEAT_OPTIONS}
                    value={draft.repeat}
                    onChange={(repeat) => update({ repeat })}
                    renderSelected={(value) => (value === 'custom' ? customSettings : null)}
                />

                <Text variant="caption" className="text-muted-foreground mt-8 mb-3">
                    Remind me before
                </Text>
                <HStack space="sm" className="flex-wrap">
                    {REMINDER_OPTIONS.map((days) => (
                        <Chip
                            key={days}
                            label={pluralize(days, 'day')}
                            selected={draft.reminders.includes(days)}
                            onPress={() => toggleReminder(days)}
                            accessibilityRole="checkbox"
                        />
                    ))}
                </HStack>

                {recurrence && (
                    <>
                        <Text variant="caption" className="text-muted-foreground mt-8 mb-3">
                            What happens automatically
                        </Text>
                        <VStack space="lg" className="rounded-2xl border border-border bg-card p-5">
                            <HStack space="md">
                                <RotateCcw color={colors.mutedForeground} size={18} style={{ marginTop: 2 }} />
                                <Text className="flex-1 text-muted-foreground">
                                    When you mark this handled, Keel prepares the next occurrence for you.
                                </Text>
                            </HStack>
                            <HStack space="md">
                                <CalendarDays color={colors.mutedForeground} size={18} style={{ marginTop: 2 }} />
                                <Text className="flex-1 text-muted-foreground">
                                    It reappears under Upcoming, right on schedule — nothing to re-enter.
                                </Text>
                            </HStack>
                        </VStack>
                    </>
                )}

                <Text variant="caption" className="text-muted-foreground mt-8 mb-3">
                    {recurrence ? 'Next occurrences' : 'Occurrence'}
                </Text>
                <Box className="rounded-2xl border border-border bg-card px-5">
                    {occurrences.map((date, index) => (
                        <HStack
                            key={date.toISOString()}
                            className={`items-center justify-between py-4 ${
                                index === occurrences.length - 1 ? '' : 'border-b border-border'
                            }`}
                        >
                            <Text variant="body-medium" className="text-[17px]">
                                {formatDate(date)}
                            </Text>
                            {index === 0 && (
                                <Text variant="meta" className="text-muted-foreground">
                                    First due
                                </Text>
                            )}
                        </HStack>
                    ))}
                </Box>
            </ScrollView>

            <Button className="h-14 rounded-2xl mt-2 mb-2" isDisabled={saving} onPress={save}>
                <ButtonText className="text-[16px] font-inter-semibold">
                    {saving ? 'Saving…' : 'Save responsibility'}
                </ButtonText>
            </Button>
        </AppLayout>
    )
}

export default RecurrenceScreen
