import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
    accessToken: null as string | null,
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setAccessToken(token: string) {
      this.accessToken = token
    },
    clearUser() {
      this.user = null
      this.accessToken = null
    },
  },
  persist: {
    enabled: true,           // Enable persistence
    strategies: [
      {
        storage: localStorage,  // You can also use sessionStorage
      }
    ]
  }
})
