import { Pressable } from 'react-native'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'
import { Text } from '../ui/text'

type Props<T extends string> = {
    options: { value: T; label: string }[]
    value: T
    onChange: (value: T) => void
    // Extra content shown under the selected option (e.g. custom settings)
    renderSelected?: (value: T) => React.ReactNode
}

const RadioGroup = <T extends string>({ options, value, onChange, renderSelected }: Props<T>) => {
    return (
        <Box accessibilityRole="radiogroup" className="rounded-2xl border border-border bg-card px-5">
            {options.map((option, index) => {
                const selected = option.value === value

                return (
                    <Box
                        key={option.value}
                        className={index === options.length - 1 ? '' : 'border-b border-border'}
                    >
                        <Pressable
                            onPress={() => onChange(option.value)}
                            accessibilityRole="radio"
                            accessibilityState={{ checked: selected }}
                            className="py-4"
                        >
                            <HStack space="md" className="items-center">
                                <Box
                                    className={`w-6 h-6 rounded-full items-center justify-center border-2 ${
                                        selected ? 'border-foreground' : 'border-border'
                                    }`}
                                >
                                    {selected && <Box className="w-3 h-3 rounded-full bg-foreground" />}
                                </Box>
                                <Text variant="body-medium" className="text-[17px]">
                                    {option.label}
                                </Text>
                            </HStack>
                        </Pressable>
                        {selected && renderSelected?.(option.value)}
                    </Box>
                )
            })}
        </Box>
    )
}

export default RadioGroup
