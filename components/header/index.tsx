import { Text } from '@/components/ui/text'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

type Props = {
    leading?: React.ReactNode
    actions?: React.ReactNode
    title?: string
    subtitle?: string
    hasDate?: boolean
    size?: 'default' | 'large'
}

const Header = ({
    leading,
    actions,
    title,
    subtitle,
    hasDate = false,
    size = 'default',
}: Props) => {
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
            {leading}
            <Box className="flex-1">
                {hasDate && (
                    <Text className="text-muted-foreground text-base font-normal">
                        {dateFormatter()}
                    </Text>
                )}
                {title &&
                    (size === 'large' ? (
                        <Text variant="h1" numberOfLines={1}>
                            {title}
                        </Text>
                    ) : (
                        <Text className="text-foreground text-[19px] font-semibold">
                            {title}
                        </Text>
                    ))}
                {subtitle &&
                    (size === 'large' ? (
                        <Text className="text-muted-foreground">{subtitle}</Text>
                    ) : (
                        <Text className="text-muted-foreground text-sm font-normal">
                            {subtitle}
                        </Text>
                    ))}
            </Box>
            {actions && <HStack space="md">{actions}</HStack>}
        </HStack>
    )
}

export default Header
