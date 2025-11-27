<template>
  <section class="main-content" :class="{ 'has-background': showBackground }">
    <q-layout view="lHh Lpr lFf">
      <q-drawer
        v-if="showSideBar"
        v-model="leftDrawerOpen"
        bordered
        :mini="miniState"
        :width="300"
        persistent
        :class="'bg-white'"
      >
        <div class="column fit justify-between" style="height: 100%">
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
          <div class="">
            <q-item clickable to="/perfil">
              <q-item-section avatar>
                <img src="../assets/icon.png" style="width: 40px" alt="" />
              </q-item-section>

              <q-item-section class="q-pl-sm" v-show="!miniState">
                <q-item-label>Guilherme</q-item-label>
                <q-item-label caption>Ver perfil</q-item-label>
              </q-item-section>

              <div v-if="!miniState">
                <LogOut/>
              </div>
              <!-- quando estiver mini, mostra só o avatar -->
              <q-item-section v-show="miniState">
                <!-- nada extra — o avatar já aparece -->
              </q-item-section>
            </q-item>
          </div>
        </div>
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
import { LogOut } from 'lucide-vue-next';

const PagesNoBackground = ['Login', 'Register'];
const PagesNoSideBar = ['Login', 'Register'];
const route = useRoute();

const showSideBar = computed(() => {
  const currentRouteName = (route.name ?? '') as string;
  return !PagesNoSideBar.includes(currentRouteName);
});

const showBackground = computed(() => {
  const currentRouteName = (route.name ?? '') as string;
  return !PagesNoBackground.includes(currentRouteName);
});

const miniState = ref(false);

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
    title: 'Funcionários',
    caption: 'Veja todos os funcionários',
    icon: 'groups',
    link: '/funcionarios',
  },
  {
    title: 'Faça uma solicitação',
    caption: 'Solicite algum serviço',
    icon: 'addchart',
    link: '/solicite',
  },
];

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  miniState.value = !miniState.value;
}
</script>

<style scoped>
main {
  min-height: 100vh;
  width: 100vh;
  margin: 0;
  padding: 0;
}
#menu-icon {
  color: rgb(0, 0, 0);
}
#menu-active {
  color: rgb(89, 0, 255);
}

.has-background {
  background-image: url(../assets/image.png);
}
</style>
