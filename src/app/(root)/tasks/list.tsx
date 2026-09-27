import AppLayout from '@/components/app-layout'
import FilterChips from '@/components/filter-chips'
import Header from '@/components/header'
import IconButton from '@/components/icon-button'
import ResponsibilityCard from '@/components/responsibility-card'
import { Text } from '@/components/ui/text'
import {
    getCategory,
    getStatus,
    sortByUrgency,
    useResponsibilities,
    type Filter,
} from '@/data/responsibilities'
import { router, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, Calendar, Search } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList } from 'react-native'

const FILTERS: { value: Filter; label: string }[] = [
    { value: 'attention', label: 'Attention' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'handled', label: 'Handled' },
    { value: 'all', label: 'All' },
]

const EMPTY_MESSAGES: Record<Filter, string> = {
    attention: 'Nothing needs your attention right now.',
    upcoming: 'Nothing coming up.',
    handled: 'Nothing handled yet.',
    all: 'No responsibilities here yet.',
}

const ResponsibilitiesListScreen = () => {
    const { category } = useLocalSearchParams<{ category?: string }>()
    const [filter, setFilter] = useState<Filter>('all')
    const items = useResponsibilities()

    const visible = sortByUrgency(
        items.filter(
            (item) =>
                (!category || item.categoryId === category) &&
                (filter === 'all' || getStatus(item) === filter),
        ),
    )

    return (
        <AppLayout
            hasSafeAreaBottom={false}
            header={
                <Header
                    size="large"
                    title={getCategory(category ?? '')?.name ?? 'Responsibilities'}
                    leading={
                        <IconButton
                            icon={ArrowLeft}
                            accessibilityLabel="Back"
                            onPress={() => router.back()}
                        />
                    }
                    actions={
                        <>
                            <IconButton icon={Calendar} accessibilityLabel="Calendar" />
                            <IconButton icon={Search} accessibilityLabel="Search" />
                        </>
                    }
                />
            }
        >
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />

            <FlatList
                data={visible}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                className="mt-4"
                contentContainerClassName="gap-3 pb-16"
                renderItem={({ item }) => (
                    <ResponsibilityCard
                        item={item}
                        onPress={() =>
                            router.push({
                                pathname: '/responsibility/[id]',
                                params: { id: item.id },
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <Text className="text-muted-foreground text-center mt-12">
                        {EMPTY_MESSAGES[filter]}
                    </Text>
                }
            />
        </AppLayout>
    )
}

export default ResponsibilitiesListScreen
