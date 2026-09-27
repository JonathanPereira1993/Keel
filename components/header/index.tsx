import { Text } from '@/components/ui/text'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

type Props = {
    actions?: React.ReactNode
    title?: string
    subtitle?: string
    hasDate?: boolean
}

const Header = ({ actions, title, subtitle, hasDate = false }: Props) => {
    const dateFormatter = () => {
        const weekDay = new Date().toLocaleDateString('pt-PT', {
            weekday: 'long',
        })
        const date = new Date().toLocaleDateString('pt-PT', { day: 'numeric' })
        const month = new Date().toLocaleDateString('pt-PT', { month: 'long' })

        return `${weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}, ${date} ${month.charAt(0).toUpperCase() + month.slice(1)}`
    }

    return (
        <HStack space="md" className="justify-between items-center">
            <Box>
                {hasDate && (
                    <Text className="text-muted-foreground text-base font-normal">
                        {dateFormatter()}
                    </Text>
                )}
                {title && (
                    <Text className="text-foreground text-[19px] font-semibold">
                        {title}
                    </Text>
                )}
                {subtitle && (
                    <Text className="text-muted-foreground text-sm font-normal">
                        {subtitle}
                    </Text>
                )}
            </Box>
            {actions && <HStack space="md">{actions}</HStack>}
        </HStack>
    )
}

export default Header
