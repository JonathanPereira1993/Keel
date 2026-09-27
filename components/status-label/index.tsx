import type { Status } from '@/data/responsibilities'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'

const TONES: Record<Status, { dot: string; text: string }> = {
    attention: { dot: 'bg-warning', text: 'text-warning' },
    upcoming: { dot: 'bg-muted-foreground', text: 'text-muted-foreground' },
    handled: { dot: 'bg-success', text: 'text-success' },
}

type Props = {
    status: Status
    label: string
}

const StatusLabel = ({ status, label }: Props) => {
    return (
        <HStack space="sm" className="items-center">
            <Box className={`w-1.5 h-1.5 rounded-full ${TONES[status].dot}`} />
            <Text variant="meta" className={`shrink ${TONES[status].text}`}>
                {label}
            </Text>
        </HStack>
    )
}

export default StatusLabel
