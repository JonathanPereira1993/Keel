import TabBar from '@/components/tab-bar'
import { Tabs } from 'expo-router/js-tabs'
import { House, ListTodo, Lock, User } from 'lucide-react-native'

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => (
                <TabBar
                    {...props}
                    onAddPress={() => {
                        // TODO: open the "new item" sheet / modal
                    }}
                />
            )}
        >
            <Tabs.Screen
                name="main-screen/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="tasks/index"
                options={{
                    title: 'Tasks',
                    tabBarIcon: ({ color, size }) => <ListTodo color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="vault/index"
                options={{
                    title: 'Vault',
                    tabBarIcon: ({ color, size }) => <Lock color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tabs>
    )
}
