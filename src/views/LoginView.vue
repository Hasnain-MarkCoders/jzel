<script setup>
  import { ref } from 'vue'
  import { useLogin } from './../composables/useLogin'
  import { useField, useForm } from 'vee-validate'
  import { useMutation } from '@tanstack/vue-query'
  import { useUserStore } from './../stores/user'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import apiUrl from '../constants/constants.ts'
  import loginImg from '../assets/loginimg.png'



  const userStore = useUserStore()
  const router = useRouter()

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      password(value) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/.test(value)) return true
        return 'Your password must be 6–50 characters long, include at least one letter and one digit, and only use the allowed symbols.'
      },
      email(value) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) return true
        return 'Must be a valid e-mail.'
      }
    }
  })
  console.log(apiUrl)
  const password = useField('password')
  const email = useField('email')

  const loginFn = async (credentials) => {
    console.log(credentials)
    try {
      const response = await axios.post(`${apiUrl}/login`,credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = response.data
      if (response.status !== 200) {
        throw new Error(data.message || 'Failed to authenticate. Check your credentials.')
      }
      return data
    } catch (error) {
      throw new Error(error.response?.data.message || 'Failed to authenticate')
    }
  }

  const mutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      userStore.setUser(data.user)
      userStore.setAccessToken(data.accessToken) // Save accessToken
      // router.push('/')
    },
    onError: (error) => {
      console.error(error)
      // router.replace('/')
    }
  })

  const submit = handleSubmit((values) => {
    mutation.mutate(values)
  })
</script>

<template>
  <main class="form-wrapper">
    <div class="login-container" >
      
      <img :src="loginImg" class="login-img" alt="">

      <h1 class="heading" >Welcome Back</h1>
      <p style="text-align: center;" >Sign in to access your dashboard, settings & projects.</p>
    <form class="login-form" @submit.prevent="submit">
      <v-text-field
      class="input-login"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>
      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
      ></v-text-field>

      <v-btn class="login-form-btn" type="submit">
        submit
      </v-btn>
    </form>
  </div>

  </main>
</template>

<style scoped>
 .form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    min-width: 100vw;
 }
 .login-form {
    flex-basis: 400px;
 }
 .login-form-btn {
    margin: auto;
    display: block;
    width: 100%;
    height: 55px;
    box-shadow: none;
    background-color: black;
    color: #FFE777;
    
 }
 .input-login{

  background-color: none;
  outline: none;
  border: none;
 }
 .login-container{
max-width: 500px;
width: 90%;
display: flex;
flex-direction: column;
gap: 30px;


 }
 .login-img{
  width: 80px;
  object-fit: contain;
  margin: auto;
 }
 .heading{
  text-align: center;
  font-weight: 500;

 }
</style>
