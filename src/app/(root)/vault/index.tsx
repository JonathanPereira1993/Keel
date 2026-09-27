import AppLayout from '@/components/app-layout'
import { Text } from '@/components/ui/text'

const VaultScreen = () => {
    return (
        <AppLayout
            header={
                <Text className="text-foreground text-2xl font-bold">
                    Vault
                </Text>
            }
        >
            <Text>Content</Text>
        </AppLayout>
    )
}

export default VaultScreen
