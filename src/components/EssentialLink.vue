<template>
  <RouterLink :to="link" class="router">
    <q-item-section v-if="icon" avatar id="icon">
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
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
}
.router:hover{
  background-color: rgb(240, 240, 240);
  color: darkblue;
}
.router.router-link-exact-active{
  color: rgb(0, 89, 255);
}

#icon{
  display: flex;
  justify-content: center;
  margin: 0;
  padding-left: 14px;
}
</style>
