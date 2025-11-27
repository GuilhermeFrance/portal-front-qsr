<script setup lang="ts">
const menuItems = [
  {
    name: 'Status',
    desc: 'Acompanhe a sua solicitação',
    icon: 'checklist',
    route: '/solicitacoes',
  },

  {
    name: 'Ouvidoria',
    desc: 'Fale com um suporte',
    icon: 'headset',
    route: '/solicite',
  },
  {
    name: 'Sugestões',
    desc: 'Deixe alguma sugestão',
    icon: 'addchart',
    route: '/solicite',
  },
];
</script>

<template>
  <section>
    <div class="card-register">
      <div class="header">
        <div class="headerInfos">
          <div class="imgLayout"></div>
          <div class="currentInfos">
            <span class="currentInfo">Name</span>
            <span class="currentInfo">Email</span>
            <span class="currentInfo">25/12/22</span>
          </div>
        </div>
        <q-btn
          icon-right="create"
          color="indigo-14"
          class="q-pa-sm"
          style="width: 120px; border: 1px solid; border-radius: 6px"
          flat
          bordered
        >
          Editar</q-btn
        >
      </div>
      <div class="infoBox">
        <div class="left-side">
          <div class="info">
            <label for="span">Name:</label>
            <div class="DivName">
              <span class="infoText"> Guilherme France de Oliveira Santos</span>
            </div>
          </div>
          <div class="info">
            <label for="span">Email:</label>
            <div class="DivName">
              <span class="infoText">guilherme.france9@gmail.com</span>
            </div>
          </div>
          <div class="info">
            <label for="span">CPF:</label>
            <div class="DivName">
              <span class="infoText"> 074.051.995-69</span>
            </div>
          </div>
          <div class="info">
            <label for="span">Cargo:</label>
            <div class="DivName">
              <span class="infoText"> Estagiário</span>
            </div>
          </div>
        </div>

        <div class="right-side">
          <div>
            <q-card v-for="item in menuItems" :key="item.name" clickable id="card">
              <RouterLink style="text-decoration: none; color: black" :to="item.route!">
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
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/background-blur.png);
  height: 100vh;
  width: 100%;
}
#card-title {
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

#icon {
  scale: 1;
  transition: 0.4s ease-in-out;
}
#card:hover #icon {
  scale: 1.2;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
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
.card-register {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 1200px;

  border-radius: 20px;
}

.header {
  display: flex;
  width: 1200px;
  height: 250px;
  padding: 50px;
  background-color: white;
  justify-content: space-between;
  border-radius: 20px;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.infoBox {
  display: flex;
  gap: 10px;
  height: 400px;
  width: 100%;
  border-radius: 20px;
}

.left-side {
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  height: 400px;
  width: 60%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
}

.right-side {
  display: flex;
  height: 400px;
  width: 40%;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
}

.imgLayout {
  display: flex;
  height: 150px;
  width: 150px;
  background-color: aqua;
  border-radius: 50%;
}

.headerInfos {
  display: flex;
  align-items: center;
  gap: 30px;
}

.currentInfos {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.currentInfo {
  font-size: 16px;
  font-weight: 300;
}

.DivName {
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  padding-left: 10px;
  height: 40px;
  width: 650px;
  display: flex;
  align-items: center;
  color: rgb(78, 78, 78);
}

.infoText {
  font-weight: 300;
}
</style>
