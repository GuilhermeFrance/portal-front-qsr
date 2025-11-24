<template>
  <RouterLink :to="link" class="router">
    <q-item-section v-if="icon" avatar>
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
  height: 45px;
  color: black;
  padding: 4px;
  transition: 0.3s ease;
}

.router:hover{
  background-color: rgb(240, 240, 240);
  color: darkblue;
}

</style>
