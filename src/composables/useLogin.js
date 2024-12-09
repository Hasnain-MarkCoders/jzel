import { useMutation } from '@tanstack/vue-query'
import { useUserStore } from './../stores/user'
import { useRouter } from 'vue-router'

export function useLogin() {
  const userStore = useUserStore()
  const router = useRouter()
  const loginFn = async (credentials) => {
    const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXX', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to authenticate. Check your credentials.')
    }
    return data
  } 

  const mutation = useMutation(
    mutationFn => loginFn,
    {
      onSuccess: (data) => {
        userStore.setUser(data.user)
        router.push('/')
      },
      onError: () => {
        router.replace('/')
      }
    }
  )

  return { login: mutation.mutate, isLoading: mutation.isLoading, error: mutation.error }
}

