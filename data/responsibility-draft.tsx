import {
    Banknote,
    CarFront,
    CreditCard,
    Ellipsis,
    FileText,
    House,
    Shield,
    type LucideIcon,
} from 'lucide-react-native'
import { createContext, useContext, useState } from 'react'
import type { NewResponsibility, Recurrence } from './responsibilities'

export type Repeat = 'once' | 'monthly' | 'yearly' | 'custom'

export type ItemType = {
    id: string
    label: string
    icon: LucideIcon
    categoryId: string
    placeholder: string
    referenceLabel: string
    repeat: Repeat
}

export const ITEM_TYPES: ItemType[] = [
    { id: 'car', label: 'Car', icon: CarFront, categoryId: 'car', placeholder: 'Car Insurance', referenceLabel: 'Policy', repeat: 'yearly' },
    { id: 'home', label: 'Home', icon: House, categoryId: 'home', placeholder: 'Home Insurance', referenceLabel: 'Policy', repeat: 'yearly' },
    { id: 'bill', label: 'Bill', icon: Banknote, categoryId: 'bills', placeholder: 'Electricity', referenceLabel: 'Customer no.', repeat: 'monthly' },
    { id: 'document', label: 'Document', icon: FileText, categoryId: 'documents', placeholder: 'Passport Renewal', referenceLabel: 'Document no.', repeat: 'once' },
    { id: 'subscription', label: 'Subscription', icon: CreditCard, categoryId: 'subscriptions', placeholder: 'Streaming', referenceLabel: 'Account', repeat: 'monthly' },
    { id: 'money', label: 'Money', icon: Shield, categoryId: 'money', placeholder: 'Tax Payment', referenceLabel: 'Reference', repeat: 'yearly' },
    { id: 'other', label: 'Other', icon: Ellipsis, categoryId: 'other', placeholder: 'Something to remember', referenceLabel: 'Reference', repeat: 'once' },
]

export const REMINDER_OPTIONS = [30, 7, 1]

export type Draft = {
    type: ItemType
    title: string
    provider: string
    amount: string
    dueDate: Date
    reference: string
    paymentUrl: string
    repeat: Repeat
    custom: Recurrence
    reminders: number[]
}

const oneMonthFromToday = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setMonth(date.getMonth() + 1)
    return date
}

const createDraft = (type: ItemType): Draft => ({
    type,
    title: '',
    provider: '',
    amount: '',
    dueDate: oneMonthFromToday(),
    reference: '',
    paymentUrl: '',
    repeat: type.repeat,
    custom: { every: 3, unit: 'month' },
    reminders: [30, 7],
})

// Accepts "12,50" or "12.50"; empty means no amount, NaN means invalid
export const parseAmount = (value: string) =>
    value.trim() === '' ? undefined : Number(value.trim().replace(',', '.'))

export const getRecurrence = (draft: Draft): Recurrence | undefined => {
    switch (draft.repeat) {
        case 'monthly':
            return { every: 1, unit: 'month' }
        case 'yearly':
            return { every: 1, unit: 'year' }
        case 'custom':
            return draft.custom
        default:
            return undefined
    }
}

export const toNewResponsibility = (draft: Draft): NewResponsibility => ({
    title: draft.title.trim(),
    categoryId: draft.type.categoryId,
    amount: parseAmount(draft.amount),
    dueDate: draft.dueDate,
    provider: draft.provider.trim() || undefined,
    reference: draft.reference.trim()
        ? { label: draft.type.referenceLabel, value: draft.reference.trim() }
        : undefined,
    recurrence: getRecurrence(draft),
    reminders: [...draft.reminders].sort((a, b) => b - a),
    paymentUrl: draft.paymentUrl.trim().replace(/^https?:\/\//, '') || undefined,
})

type DraftContextValue = {
    draft: Draft
    start: (type: ItemType) => void
    update: (changes: Partial<Draft>) => void
}

const DraftContext = createContext<DraftContextValue | null>(null)

export const DraftProvider = ({ children }: { children: React.ReactNode }) => {
    const [draft, setDraft] = useState(() => createDraft(ITEM_TYPES[0]))

    const value: DraftContextValue = {
        draft,
        start: (type) => setDraft(createDraft(type)),
        update: (changes) => setDraft((current) => ({ ...current, ...changes })),
    }

    return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
}

export const useDraft = () => {
    const context = useContext(DraftContext)
    if (!context) throw new Error('useDraft must be used inside <DraftProvider>')
    return context
}
