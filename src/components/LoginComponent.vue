<script setup lang="ts">
import { RouterLink } from 'vue-router';

const login = {
  email: '',
  password: '',
};
</script>

<template>
  <div class="main">
    <div class="left-side">
      <img src="../assets/codes.png" style="opacity: 10%; height: 99vh" alt="" />
    </div>
    <div class="right-side">
      <q-card flat bordered style="border-radius: 20px">
        <div class="input-box">
          <img src="../assets/logo-portal.png" style="width: 250px" alt="" />
          <div class="input-area">
            <div class="input">
              <label for="input">Email:</label>
              <q-input
                standard
                type="text"
                v-model="login.email"
                dense
                :input-style="{ fontSize: '16px' }"
                placeholder="Insira seu email"
                :rules="[(val) => (val && val.length > 0) || 'Este campo é obrigatório']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="blue-14" class="q-ml-sm q-pr-sm" />
                </template>
              </q-input>
            </div>

            <div class="input">
              <label for="input">Senha:</label>
              <q-input
                standard
                type="password"
                v-model="login.password"
                dense
                :input-style="{ fontSize: '16px' }"
                placeholder="Digite sua senha"
                :rules="[(val) => (val && val.length > 0) || 'Este campo é obrigatório']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="blue-14" class="q-ml-sm q-pr-sm" />
                </template>
              </q-input>
            </div>
            <q-btn color="blue-14" align="center" class="btn-fixed-width">ENTRAR</q-btn>
          </div>
          <div class="footer">
            <span>Não tem conta?</span>
            <RouterLink class="registerBtn" to="/register">Cadastre-se</RouterLink>
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
  height: 100vh;
  margin: 0;
  padding: 0;
}
.right-side {
  width: 60%;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left-side {
  width: 40%;
  height: 100vh;
  background: #103ec7;
  background: linear-gradient(180deg, rgba(16, 62, 199, 1) 0%, rgba(167, 99, 255, 1) 100%);
}

.footer{
  display: flex;
  align-items: center;
  gap: 4px;
}

.registerBtn {
  text-decoration: none;
  color: #000a9b;
  font-size: 15px;
  transition: 0.3s ease;
}
.registerBtn:hover {
  text-decoration: none;
  color: #0659d4;
  font-size: 15px;
}

.input-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 500px;
  gap: 30px;
  background-color: rgb(255, 255, 255);
  height: 500px;
}
.input-area {
  width: 200px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 6px;
}
.btn-fixed-width {
  width: 400px;
}
</style>
