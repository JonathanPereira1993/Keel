import AppLayout from '@/components/app-layout'
import CategoryCard from '@/components/category-card'
import Header from '@/components/header'
import IconButton from '@/components/icon-button'
import IconTile from '@/components/icon-tile'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import {
    CATEGORIES,
    summarize,
    useResponsibilities,
} from '@/data/responsibilities'
import { useTabBarInset } from '@/hooks/use-tab-bar-inset'
import { useThemeColors } from '@/hooks/use-theme-colors'
import { router } from 'expo-router'
import { Calendar, ChevronRight, ListTodo, Search } from 'lucide-react-native'
import { Pressable, ScrollView } from 'react-native'

const TasksScreen = () => {
    const colors = useThemeColors()
    const tabBarInset = useTabBarInset()
    const items = useResponsibilities()
    const overall = summarize(items)

    const categories = CATEGORIES.map((category) => ({
        category,
        ...summarize(items.filter((item) => item.categoryId === category.id)),
    })).filter(({ total }) => total > 0)

    // Two cards per row
    const rows = []
    for (let i = 0; i < categories.length; i += 2) {
        rows.push(categories.slice(i, i + 2))
    }

    const openList = (category?: string) =>
        router.push({ pathname: '/tasks/list', params: category ? { category } : {} })

    return (
        <AppLayout
            hasSafeAreaBottom={false}
            header={
                <Header
                    size="large"
                    title="Responsibilities"
                    subtitle="Browse by category"
                    actions={
                        <>
                            <IconButton icon={Calendar} accessibilityLabel="Calendar" />
                            <IconButton icon={Search} accessibilityLabel="Search" />
                        </>
                    }
                />
            }
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pt-2"
                contentContainerStyle={{ paddingBottom: tabBarInset + 24 }}
            >
                <Pressable
                    onPress={() => openList()}
                    accessibilityRole="button"
                    className="rounded-2xl border border-border bg-card p-4 active:opacity-80"
                >
                    <HStack space="md" className="items-center">
                        <IconTile icon={ListTodo} />
                        <VStack className="flex-1">
                            <Text variant="body-medium">All responsibilities</Text>
                            <Text variant="meta" className="text-muted-foreground">
                                {overall.total} total · {overall.attention} need attention
                            </Text>
                        </VStack>
                        <ChevronRight color={colors.mutedForeground} size={20} />
                    </HStack>
                </Pressable>

                <Text variant="caption" className="text-muted-foreground mt-8 mb-3">
                    Categories
                </Text>

                <VStack space="md">
                    {rows.map((row) => (
                        <HStack key={row[0].category.id} space="md">
                            {row.map(({ category, total, attention }) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    total={total}
                                    attention={attention}
                                    onPress={() => openList(category.id)}
                                />
                            ))}
                        </HStack>
                    ))}
                </VStack>
            </ScrollView>
        </AppLayout>
    )
}

export default TasksScreen
