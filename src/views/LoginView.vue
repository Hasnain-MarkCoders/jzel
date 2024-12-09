<script setup>
  import { ref } from 'vue'
  import { useLogin } from "./../composables/useLogin"
  import { useField, useForm } from 'vee-validate'
//   const { login, isLoading, error } = useLogin()
import { useMutation } from '@tanstack/vue-query'
import { useUserStore } from './../stores/user'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      password (value) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/.test(value)) return true

        return 'Your password must be 6–50 characters long, include at least one letter and one digit, and only use the allowed symbols.'
      },
      email (value) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) return true
        return 'Must be a valid e-mail.'
      }
    }
  })
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

  const password = useField('password')
  const email = useField('email')

  const mutation = useMutation(
    
    {
        mutationFn: loginFn,
      onSuccess: (data) => {
        userStore.setUser(data.user)
        router.push('/')
      },
      onError: () => {
        router.replace('/')
      }
    }
  )
  const submit = handleSubmit(values => {
    // login(values)
    mutation.mutate(values)
    // alert(JSON.stringify(values, null, 2))
  })
</script>
<template>
    <main class="form-wrapper" >

    <form class="login-form" @submit.prevent="submit">
       
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>
      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
      ></v-text-field>
  
      <v-btn
        class="login-form-btn"
        type="submit"
      >
        submit
      </v-btn>
  
    </form>
</main>

  </template>
  <style scoped>
 .form-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    min-width: 100vw;
 }
.login-form{
    flex-basis: 400px;
}
.login-form-btn{
    margin: auto;
    display: block;
}
</style>