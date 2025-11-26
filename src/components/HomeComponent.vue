<script setup lang="ts">
// import EssentialLink from './EssentialLink.vue';

const menuItems = [
  {
    name: 'Faça uma solicitação',
    desc: 'Solicite algum serviço',
    icon: 'addchart',
    route: '/solicite'
  },
  {
    name: 'Solicitações',
    desc: 'Solicite algum serviço',
    icon: 'assignment',
    route: '/solicitacoes'
  },
  {
    name: 'Status',
    desc: 'Acompanhe a sua solicitação',
    icon: 'checklist',
    route: '/solicitacoes'
  },

  {
    name: 'Ouvidoria',
    desc: 'Fale com um suporte',
    icon: 'headset',
    route: '/solicite'
  },
  {
    name: 'Sugestões',
    desc: 'Deixe alguma sugestão',
    icon: 'addchart',
    route: '/solicite'
  },
  {
    name: 'Perfil',
    desc: 'Visualize ou edite seu perfil',
    icon: 'person',
    route: '/perfil'
  },
  {
    name: 'Site Oficial',
    desc: 'Clique para acessar  <br/>nsite oficial PMVC',
    icon: 'mouse',
    route: '/solicite'
  },
  {
    name: 'Dashboard',
    desc: 'Acompanhar progresso <br/> das solicitações',
    icon: 'dashboard',
    route: '/solicite'
  },
  {
    name: 'Funcionários',
    desc: 'Solicite algum serviço',
    icon: 'addchart',
    route: '/funcionarios'
  },
];
</script>

<template>
  <div class="home-container">
    <img src="../assets/logo-portal.png" class="logo" alt="" />
    <div class="content-wrapper">
      <img src="../assets/dice3.png" alt="" class="logo-png" />
      <div class="hello-current">
        <span>Seja bem vindo(a), <span class="current-hello">Guilherme</span></span>
      </div>
    </div>
    <div class="home-box">
      <q-card v-for="item in menuItems" :key="item.name" clickable id="card">
        <RouterLink style="text-decoration: none; color: black;" :to="item.route!">
        <q-card-section class="flex items-center q-gutter-md">
          <div class="icons-link"><q-icon :name="item.icon" size="30px" id="icon" /></div>
          <div class="column">
            <span class="text-h6" id="card-title" v-html="item.name"></span>
            <span class="text-body2 text-grey-6" v-html="item.desc"></span>
          </div>
        </q-card-section>
        </RouterLink>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: flex-start;

  height: 100vh;
  width: 100%;
}
.home-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  height: 500px;
  width: 1160px;
  padding: 20px;
}

#card-title{
   font-family: 'Inter', sans-serif;
}

#card {
  border-radius: 16px;
  transition: 0.4s ease;
  width: 360px;
  box-shadow: none;
  border: 1px solid rgb(240, 240, 240);

}
#card:hover {
  box-shadow: 2px 2px 14px 0px rgb(216, 216, 216);
  cursor: pointer;
}

#icon{
  scale: 1;
  transition: 0.4s ease-in-out;
}
#card:hover #icon{
  scale: 1.2;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
}

section {
  display: flex;
  font-family: 'Inter', sans-serif;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-top: 50px;
}
.logo {
  width: 30%;
}

.hello-current {
  opacity: 0%;
  padding-bottom: 20px;
  position: relative;
  animation-name: TextDown;
  animation-duration: 0.9s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 200;
  color: #003eaa;
}
.logo-png {
  width: 10%;
  position: relative;
  animation-name: DiceDown;
  animation-duration: 5s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.21, 0.345, 0.145);
}

@keyframes DiceDown {
  0% {
    opacity: 0%;
    right: 180px;
    top: -1000px;
    transform: rotate(0deg);
  }
  25% {
    opacity: 100%;
    right: 180px;
    top: 0px;
    transform: rotate(0deg);
  }
  100% {
    opacity: 0%;
    right: -180px;
    top: 0px;
    transform: rotate(720deg);
  }
}

@keyframes TextDown {
  from {
    opacity: 0%;
    top: -20px;
  }
  to {
    opacity: 100%;
    top: 0px;
  }
}

.current-hello {
  opacity: 0%;
  padding-bottom: 40px;
  position: relative;
  animation-name: TextDown;
  animation-duration: 0.4s;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #488aff;
}

.home-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1200px;
  gap: 24px;
}
.card-router {
  display: flex;
  align-items: self-end;
  gap: 18px;
  width: 300px;
  border-radius: 10px;
  padding: 8px;
  transition: ease 0.4s;
}
.card-router:hover {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.144);
  background-color: white;
}
.home-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 1100px;
  height: 500px;
  background-color: #fcfcfc;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.158);
}
.home-card-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 1100px;
  height: 370px;
  background-color: #fcfcfc;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.158);
}
.icons-link:hover {
  color: white;
  transition: background 0.2s ease;
}
.icons-link {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: linear-gradient(rgb(0, 162, 255), blue);
  width: 100px;
  height: 100px;
  border-radius: 10px;
  color: white;
}
.link-title {
  font-weight: 600;
}
.link-desc {
  font-weight: 200;
}
.card-link {
  display: flex;
  flex-direction: row;
  gap: 18px;
  align-items: self-end;
  border: 1px solid rgba(215, 215, 215, 0.527);
  border-radius: 10px;
}
.lucide-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease-in-out;
}
.link-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card-router:hover .lucide-icon {
  transform: scale(1.25);
}
</style>
