import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    authName: '',
    updateAuthName: (name) => set({authName: name})
 }))
 