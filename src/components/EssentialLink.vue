<template>
  <RouterLink :to="link" class="router">
    <q-item-section v-if="icon" avatar id="icon">
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>

    </q-item-section>
    
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>

<style scoped>

.router{
  text-decoration: none;
  display: flex;
  justify-content: center;
  height: 45px;
  color: black;
  padding: 4px;
  transition: 0.3s ease;
  font-weight: 500;
}
.router:hover{
  background-color: rgb(243, 243, 243);
  color: rgb(0, 0, 0);
}
.router.router-link-exact-active{
  color: rgb(255, 255, 255);
  background-color: rgb(48, 11, 211);
  font-weight: 600;
}
.router.router-link-exact-active q-item-section{
  color: rgb(255, 255, 255);
  background-color: black;
}

#icon{
  display: flex;
  justify-content: center;
  margin: 0;
  padding-left: 14px;
}
</style>
