<script setup>
defineProps({
  drawer: Boolean
})

const emit = defineEmits(['update:drawer'])

const toggleDrawer = () => {
  emit('update:drawer', !drawer)
}
</script>

<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend>
      <!-- Toggle Button to open/close sidebar -->
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>
