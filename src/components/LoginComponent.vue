<script setup lang="ts">
const login = {
  email: '',
  password: '',
};
</script>

<template>
  <div class="main">
    <div class="left-side"><span>ok</span></div>
    <div class="right-side">
      <q-card>
        <div class="input-box">
          <div class="input-area">
            <q-input v-model="login.email" />
             <q-input v-model="login.email" />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  width: 100%;
}
.right-side {
  width: 50%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left-side {
  width: 50%;
  height: 100vh;
  background-color: blue;
}

.input-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  background-color: rgb(243, 243, 243);
  height: 300px;
}
.input-area{
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
