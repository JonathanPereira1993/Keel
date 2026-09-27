import { ScrollView } from 'react-native'
import Chip from '../chip'

type Props<T extends string> = {
    options: { value: T; label: string }[]
    value: T
    onChange: (value: T) => void
}

const FilterChips = <T extends string>({ options, value, onChange }: Props<T>) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="grow-0 -mx-6"
            contentContainerClassName="gap-2 px-6"
        >
            {options.map((option) => (
                <Chip
                    key={option.value}
                    label={option.label}
                    selected={option.value === value}
                    onPress={() => onChange(option.value)}
                />
            ))}
        </ScrollView>
    )
}

export default FilterChips
