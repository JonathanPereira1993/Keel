import { ChevronRight } from 'lucide-react-native'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'

type Props = {
    icon?: React.ReactNode
    title?: string
    subtitle?: string
    onPress?: () => void
}

const ResponsabilityItem = ({ icon, title, subtitle, onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <Box className="flex-row items-center min-h-20.5 justify-between rounded-2xl border border-[#E6E4DF] bg-card p-4">
                <HStack space="md" className="items-center">
                    {icon && (
                        <Box className="w-11 h-11 items-center justify-center rounded-xl bg-secondary">
                            {icon}
                        </Box>
                    )}
                    <VStack>
                        <Text className="text-sm text-[#9D9B93] uppercase font-semibold">
                            {subtitle}
                        </Text>
                        <Text className="font-medium text-base">{title}</Text>
                    </VStack>
                </HStack>
                <ChevronRight color="#9D9B93" size={24} />
            </Box>
        </Pressable>
    )
}

export default ResponsabilityItem

const styles = StyleSheet.create({})
