import { create } from 'zustand'

export interface Person {
  id: number
  name: string
  ageInHours: string
}

interface AppState {
  people: Person[]
  minimumAgeInMonths: string
  updatePersonAge: (id: number, ageInHours: string) => void
  setMinimumAgeInMonths: (months: string) => void
}

export const useStore = create<AppState>((set) => ({
  people: [
    { id: 1, name: 'Alice', ageInHours: '262800' },
    { id: 2, name: 'Bob', ageInHours: '350400' },
    { id: 3, name: 'Charlie', ageInHours: '219000' },
  ],
  minimumAgeInMonths: '0',
  updatePersonAge: (id, ageInHours) =>
    set((state) => ({
      people: state.people.map((p) => (p.id === id ? { ...p, ageInHours } : p)),
    })),
  setMinimumAgeInMonths: (months) => set({ minimumAgeInMonths: months }),
}))
