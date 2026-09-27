import { DraftProvider } from '@/data/responsibility-draft'
import { Stack } from 'expo-router'

export default function NewResponsibilityLayout() {
    return (
        <DraftProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </DraftProvider>
    )
}
