import {
    Banknote,
    Building,
    CarFront,
    CreditCard,
    Droplet,
    Ellipsis,
    FileText,
    House,
    Shield,
    Receipt,
    Stethoscope,
    User,
    Wifi,
    Zap,
    type LucideIcon,
} from 'lucide-react-native'
import { useSyncExternalStore } from 'react'

export type Status = 'attention' | 'upcoming' | 'handled'
export type Filter = Status | 'all'

export type Recurrence = {
    every: number
    unit: 'month' | 'year'
}

export type Category = {
    id: string
    name: string
    icon: LucideIcon
}

export type Responsibility = {
    id: string
    title: string
    categoryId: string
    icon?: LucideIcon
    amount?: number
    dueDate: Date
    provider?: string
    reference?: { label: string; value: string }
    recurrence?: Recurrence
    reminders?: number[]
    paymentUrl?: string
    documents?: { id: string; name: string; size: string }[]
    handled: boolean
}

// Anything due within this many days (and not handled) needs attention
const ATTENTION_WINDOW_DAYS = 7

export const CATEGORIES: Category[] = [
    { id: 'car', name: 'Car', icon: CarFront },
    { id: 'home', name: 'Home', icon: House },
    { id: 'money', name: 'Money', icon: Banknote },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'personal', name: 'Personal', icon: User },
    { id: 'bills', name: 'Bills', icon: Receipt },
    { id: 'other', name: 'Other', icon: Ellipsis },
]

const inDays = (days: number) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + days)
    return date
}

const MONTHLY: Recurrence = { every: 1, unit: 'month' }
const YEARLY: Recurrence = { every: 1, unit: 'year' }

// Mock data, dated relative to today so the statuses stay meaningful
let responsibilities: Responsibility[] = [
    {
        id: 'car-insurance',
        title: 'Car Insurance',
        categoryId: 'car',
        amount: 387.42,
        dueDate: inDays(6),
        provider: 'Fidelidade',
        reference: { label: 'Policy', value: '123456789' },
        recurrence: YEARLY,
        reminders: [30, 7, 1],
        paymentUrl: 'fidelidade.pt',
        documents: [{ id: 'policy', name: 'Insurance Policy.pdf', size: '1.2 MB' }],
        handled: false,
    },
    {
        id: 'car-inspection',
        title: 'Car Inspection',
        categoryId: 'car',
        dueDate: inDays(25),
        provider: 'Controlauto',
        recurrence: YEARLY,
        reminders: [30, 7],
        handled: false,
    },
    {
        id: 'home-insurance',
        title: 'Home Insurance',
        categoryId: 'home',
        icon: Shield,
        amount: 214,
        dueDate: inDays(2),
        provider: 'Tranquilidade',
        reference: { label: 'Policy', value: '987654321' },
        recurrence: YEARLY,
        reminders: [30, 7, 1],
        paymentUrl: 'tranquilidade.pt',
        handled: false,
    },
    {
        id: 'electricity',
        title: 'Electricity',
        categoryId: 'home',
        icon: Zap,
        amount: 74,
        dueDate: inDays(10),
        provider: 'EDP',
        reference: { label: 'Customer no.', value: '5012 3344' },
        recurrence: MONTHLY,
        reminders: [3],
        handled: false,
    },
    {
        id: 'internet',
        title: 'Internet',
        categoryId: 'home',
        icon: Wifi,
        amount: 39.99,
        dueDate: inDays(12),
        provider: 'MEO',
        recurrence: MONTHLY,
        reminders: [3],
        handled: false,
    },
    {
        id: 'water',
        title: 'Water',
        categoryId: 'home',
        icon: Droplet,
        amount: 18.5,
        dueDate: inDays(-3),
        provider: 'EPAL',
        recurrence: MONTHLY,
        handled: true,
    },
    {
        id: 'condo-fee',
        title: 'Condo Fee',
        categoryId: 'home',
        icon: Building,
        amount: 45,
        dueDate: inDays(20),
        recurrence: MONTHLY,
        handled: false,
    },
    {
        id: 'tax-payment',
        title: 'Tax Payment',
        categoryId: 'money',
        amount: 120,
        dueDate: inDays(14),
        provider: 'Portal das Finanças',
        recurrence: YEARLY,
        reminders: [14, 3],
        handled: false,
    },
    {
        id: 'passport-renewal',
        title: 'Passport Renewal',
        categoryId: 'documents',
        dueDate: inDays(4),
        provider: 'IRN',
        reference: { label: 'Passport no.', value: 'CA123456' },
        reminders: [60, 30, 7],
        handled: false,
    },
    {
        id: 'domain-renewal',
        title: 'Domain Renewal',
        categoryId: 'subscriptions',
        amount: 14,
        dueDate: inDays(30),
        provider: 'Namecheap',
        recurrence: YEARLY,
        reminders: [7],
        handled: false,
    },
    {
        id: 'music-streaming',
        title: 'Music Streaming',
        categoryId: 'subscriptions',
        amount: 11.99,
        dueDate: inDays(-5),
        provider: 'Spotify',
        recurrence: MONTHLY,
        handled: true,
    },
    {
        id: 'dentist',
        title: 'Dentist Check-up',
        categoryId: 'personal',
        icon: Stethoscope,
        amount: 60,
        dueDate: inDays(40),
        recurrence: { every: 6, unit: 'month' },
        reminders: [7, 1],
        handled: false,
    },
]

// Minimal in-memory store so every screen sees the same state
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export const useResponsibilities = () =>
    useSyncExternalStore(subscribe, () => responsibilities)

const emit = () => listeners.forEach((listener) => listener())

const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export type NewResponsibility = Omit<Responsibility, 'id' | 'handled'>

// TODO(supabase): replace the body with an insert and return the stored row
export const createResponsibility = async (input: NewResponsibility) => {
    const item: Responsibility = { ...input, id: createId(), handled: false }
    responsibilities = [...responsibilities, item]
    emit()
    return item
}

// Handling a recurring item also prepares its next occurrence (once)
export const toggleHandled = (id: string) => {
    const item = responsibilities.find((entry) => entry.id === id)
    if (!item) return

    responsibilities = responsibilities.map((entry) =>
        entry.id === id ? { ...entry, handled: !entry.handled } : entry,
    )

    if (!item.handled && item.recurrence) {
        const nextDue = addRecurrence(item.dueDate, item.recurrence)
        const alreadyExists = responsibilities.some(
            (entry) =>
                entry.title === item.title &&
                entry.categoryId === item.categoryId &&
                entry.dueDate.getTime() === nextDue.getTime(),
        )
        if (!alreadyExists) {
            responsibilities = [
                ...responsibilities,
                { ...item, id: createId(), dueDate: nextDue, handled: false },
            ]
        }
    }

    emit()
}

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id)

export const getIcon = (item: Responsibility) =>
    item.icon ?? getCategory(item.categoryId)?.icon ?? FileText

export const daysUntil = (date: Date) => {
    const today = inDays(0)
    return Math.round((date.getTime() - today.getTime()) / 86_400_000)
}

export const getStatus = (item: Responsibility): Status => {
    if (item.handled) return 'handled'
    return daysUntil(item.dueDate) <= ATTENTION_WINDOW_DAYS ? 'attention' : 'upcoming'
}

export const getDueLabel = (item: Responsibility) => {
    const status = getStatus(item)
    if (status === 'handled') return 'Handled'
    if (status === 'upcoming') {
        return item.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const days = daysUntil(item.dueDate)
    if (days < 0) return `Overdue by ${-days} ${days === -1 ? 'day' : 'days'}`
    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    return `Due in ${days} days`
}

export const formatAmount = (amount: number) => `€${amount.toFixed(2)}`

const STATUS_ORDER: Record<Status, number> = { attention: 0, upcoming: 1, handled: 2 }

export const sortByUrgency = (items: Responsibility[]) =>
    [...items].sort(
        (a, b) =>
            STATUS_ORDER[getStatus(a)] - STATUS_ORDER[getStatus(b)] ||
            a.dueDate.getTime() - b.dueDate.getTime(),
    )

export const summarize = (items: Responsibility[]) => ({
    total: items.length,
    attention: items.filter((item) => getStatus(item) === 'attention').length,
})

export const pluralize = (count: number, word: string) =>
    `${count} ${count === 1 ? word : `${word}s`}`

// Adds `times` intervals, clamping to the month's last day (Jan 31 + 1 month = Feb 28)
export const addRecurrence = (date: Date, recurrence: Recurrence, times = 1) => {
    const months = recurrence.every * times * (recurrence.unit === 'year' ? 12 : 1)
    const target = new Date(date.getFullYear(), date.getMonth() + months, 1)
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
    target.setDate(Math.min(date.getDate(), lastDay))
    return target
}

export const formatRecurrence = (recurrence?: Recurrence) => {
    if (!recurrence) return 'One-time'
    if (recurrence.every === 1) return recurrence.unit === 'year' ? 'Yearly' : 'Monthly'
    return `Every ${pluralize(recurrence.every, recurrence.unit)}`
}

export const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
