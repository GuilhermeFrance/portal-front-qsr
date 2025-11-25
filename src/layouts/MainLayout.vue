<template>
  <section class="main-content" :class="{'has-background' : showBackground}">
    <q-layout view="lHh Lpr lFf">
      <!-- <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        :mini="miniState"
        :width="300"
        persistent
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-list>
          <q-item
            clickable
            @click="toggleLeftDrawer()"
            :id="miniState ? 'menu-item ' : 'menu-active'"
          >
            <q-item-section avatar>
              <q-icon name="menu" size="30px" />
            </q-item-section>
          </q-item>
          <div v-if="!miniState">
            <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
          </div>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRoute } from 'vue-router';


const PagesNoBackground = ['Login']
const route = useRoute();

const showBackground = computed(() => {
  const currentRouteName = (route.name ?? '') as string;
  return !PagesNoBackground.includes(currentRouteName)
});

const miniState = ref(true);

const linksList: EssentialLinkProps[] = [
  {
    title: 'Início',
    caption: '',
    icon: 'home',
    link: '/inicio',
  },
  {
    title: 'Solicitações',
    caption: 'Acompanhe as solicitações',
    icon: 'book',
    link: '/solicitacoes',
  },
  {
    title: 'Faça uma solicitação',
    caption: 'Solicite algum serviço',
    icon: 'addchart',
    link: '/formulario-solicitacao',
  },
];

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  miniState.value = !miniState.value;
}
</script>

<style scoped>
main{
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
#menu-icon {
  color: rgb(0, 0, 0);
}
#menu-active {
  color: rgb(0, 89, 255);
}

.has-background {
  background-image: url(../assets/image.png);
}
</style>
