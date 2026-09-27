import AppLayout from '@/components/app-layout'
import DateField from '@/components/date-field'
import FormField from '@/components/form-field'
import IconButton from '@/components/icon-button'
import TopBar from '@/components/top-bar'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { parseAmount, useDraft } from '@/data/responsibility-draft'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const DetailsScreen = () => {
    const { draft, update } = useDraft()

    const amount = parseAmount(draft.amount)
    const amountError = amount !== undefined && (Number.isNaN(amount) || amount < 0)
    const canContinue = draft.title.trim() !== '' && !amountError

    return (
        <AppLayout
            header={
                <TopBar
                    title={`New · ${draft.type.label}`}
                    leading={
                        <IconButton icon={ArrowLeft} accessibilityLabel="Back" onPress={() => router.back()} />
                    }
                />
            }
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerClassName="pt-4 pb-6"
                >
                    <Text variant="h1" className="mb-6">
                        Tell us about it
                    </Text>

                    <Box className="rounded-2xl border border-border bg-card px-5">
                        <FormField
                            label="Name"
                            value={draft.title}
                            onChangeText={(title) => update({ title })}
                            placeholder={`e.g. ${draft.type.placeholder}`}
                            autoFocus
                            returnKeyType="next"
                        />
                        <FormField
                            label="Provider"
                            value={draft.provider}
                            onChangeText={(provider) => update({ provider })}
                            placeholder="Optional"
                        />
                        <FormField
                            label="Amount (€)"
                            error={amountError ? 'Enter a valid amount' : undefined}
                            value={draft.amount}
                            onChangeText={(value) => update({ amount: value })}
                            placeholder="Optional"
                            keyboardType="decimal-pad"
                        />
                        <DateField
                            label="Due date"
                            value={draft.dueDate}
                            onChange={(dueDate) => update({ dueDate })}
                        />
                        <FormField
                            label={draft.type.referenceLabel}
                            value={draft.reference}
                            onChangeText={(reference) => update({ reference })}
                            placeholder="Optional"
                            autoCapitalize="characters"
                        />
                        <FormField
                            label="Payment link"
                            value={draft.paymentUrl}
                            onChangeText={(paymentUrl) => update({ paymentUrl })}
                            placeholder="Optional"
                            keyboardType="url"
                            autoCapitalize="none"
                            autoCorrect={false}
                            isLast
                        />
                    </Box>
                </ScrollView>

                <Button
                    className="h-14 rounded-2xl mt-2 mb-2"
                    isDisabled={!canContinue}
                    onPress={() => router.push('/new/recurrence')}
                >
                    <ButtonText className="text-[16px] font-inter-semibold">Continue</ButtonText>
                </Button>
            </KeyboardAvoidingView>
        </AppLayout>
    )
}

export default DetailsScreen
