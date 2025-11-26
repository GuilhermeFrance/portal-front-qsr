<script setup lang="ts">

import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const register = ref({
  firstName: '',
  surname: '',
  cpf: '',
  email: '',
  password: '',
});
const router = useRouter();
const isModalPickAvatarOpen = ref(false);
const isSectionPickAvatarOPen = ref(false);
const isLoading = ref(false);
const API_CLIENT_URL = 'http://localhost:3000/clients/register';

const formError = ref<string | null>(null);

function handleDisableAutocomplete(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    target.setAttribute('autocomplete', 'off');
  }
}

async function handleSubmit() {
  if (
    !register.value.firstName ||
    !register.value.surname ||
    !register.value.cpf ||
    !register.value.email ||
    !register.value.password
  ) {
    Notify.create({
      message: 'Preencha todos os campos',
      icon: 'error',
      color: 'negative',
    })
  }
  const cleanedCpf = register.value.cpf.replace(/[^\d]/g, '');
  if (cleanedCpf.length !== 11) {
    console.log('erro');
    // formError.value = "CPF deve ter 11 dígitos.";
    return;
  }

  try {
    isLoading.value = true;
    const response = await api.post(API_CLIENT_URL, register.value);
    console.log(response)

    await router.push('/login');
  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false;
  }
}

function handleSectionPick() {
  isSectionPickAvatarOPen.value = !isSectionPickAvatarOPen.value;
}
function openModalPick() {
  isModalPickAvatarOpen.value = true;
}

function handleFormError() {
  formError.value = null;
}
</script>

<template>
  <section>
    <div class="card-register">
      <div class="header">
        <span class="title"> <Dices /> Criar uma nova conta</span>
        <span class="subtitle">é rápido e fácil.</span>
      </div>
      <div class="register-inputs">
        <form @submit.prevent="handleSubmit" @input="handleFormError()">
          <div class="names">
            <div class="register-input-name">
              <label for="input">Nome:</label>
              <q-input
                outlined
                dense
                v-model="register.firstName"
                placeholder="Insira seu nome"
                color="light-blue"
                bg-color="grey-1"
                :rules="[(val) => (val && val.length > 0) || 'Preencha seu nome']"
              ></q-input>
            </div>
            <div class="register-input-name">
              <label for="input">Sobrenome:</label>
              <q-input
                outlined
                dense
                v-model="register.surname"
                placeholder="Insira seu sobrenome"
                color="light-blue"
                bg-color="grey-1"
                :rules="[(val) => (val && val.length > 0) || 'Preencha com seu sobrenome']"
              ></q-input>
            </div>
          </div>

          <div class="register-input">
            <label for="input">CPF:</label>
            <q-input
              outlined
              dense
              v-model="register.cpf"
              placeholder="Insira seu CPF"
              color="light-blue"
              mask="###.###.###-##"
              unmasked-value
              bg-color="grey-1"
              :rules="[
                (val) => (val && val.length > 0) || 'Preencha seu CPF',
                (val) => (val && val.length == 11) || 'Insira um CPF válido',
              ]"
            ></q-input>
          </div>
          <div class="register-input">
            <label for="input">Email:</label>
            <q-input
              outlined
              dense
              v-model="register.email"
              placeholder="Insira seu email"
              color="light-blue"
              bg-color="grey-1"
              name="register-email-field"
              autocomplete="chrome-off"
              @focus="handleDisableAutocomplete"
              :rules="[(val) => (val && val.length > 0) || 'Preencha este campo']"
              :input-style="{ backgroundColor: 'transparent !important' }"
            ></q-input>
          </div>
          <div class="register-input">
            <label for="input">Senha:</label>
            <q-input
              outlined
              dense
              type="password"
              v-model="register.password"
              placeholder="Insira sua senha"
              color="light-blue"
              bg-color="grey-1"
              name="register-password-field"
              autocomplete="new-password"
              :rules="[(val) => (val && val.length > 0) || 'Preencha este campo']"
              @focus="handleDisableAutocomplete"
            ></q-input>
          </div>
          <div style="width: 800px; height: 1px; background-color: gainsboro"></div>
          <div class="header-avatar-pick">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 10px;
              "
            >
              <span>Avatar:</span>
              <ChevronDown
                class="toggle-avatar"
                @click="handleSectionPick"
                v-if="isSectionPickAvatarOPen"
              />
              <ChevronUp class="toggle-avatar" @click="handleSectionPick" v-else />
            </div>
            <Transition name="expand">
              <div class="avatar-section" v-if="isSectionPickAvatarOPen">
                <button @click="openModalPick" class="btn-change-avatar">Escolher avatar</button>
              </div>
            </Transition>
          </div>
          <footer>
            <div>
              <span href="" style="font-weight: 300">Já possui uma conta?</span>
              <RouterLink
                to="/login"
                class="link"
                style="text-decoration: none; color: blue; font-weight: 500"
              >
                Entrar
              </RouterLink>
            </div>

            <q-btn type="submit" color="blue-14" :loading="isLoading">Registrar</q-btn>
          </footer>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

section {
  display: grid;
  place-items: center;

  align-content: center;
  background-image: radial-gradient(
    farthest-corner at 40px 40px,
    #33f1ff 0%,
    #4433ee 100%
  );
  min-height: 100vh;
  padding: 0px;
  width: 100vw;
}

form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label {
  font-family: "Inter", sans-serif;
}
input {
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgb(192, 192, 192);
  background-color: rgb(248, 248, 248);
  padding-left: 8px;
  font-size: 17px;
  font-family: "Inter", sans-serif;
}

input::placeholder {
  font-weight: 300;
  opacity: 60%;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.avatar-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 .avatar{
  width: 18%;
}
.header-avatar-pick {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
}
.btn-change-avatar {
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgb(204, 204, 204);
  font-weight: 600;
  cursor: pointer;
  transition: 0.4s;
}
.toggle-avatar {
  cursor: pointer;
  width: 30px;
  opacity: 50%;
  height: 30px;
  transition: 0.3s;
}
.toggle-avatar:hover {
  opacity: 80%;
}
.error {
  color: red;
  font-weight: 600;
  opacity: 80%;
}
.btn-change-avatar:hover {
  background-color: #3633ff;
  border: 1px solid #3633ff;
  color: #ffffff;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  top: 0px;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 300px;
  opacity: 1;
  top: -30px;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.7s ease-in-out;
}
.card-register {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 900px;
  min-height: 580px;
  max-height: none;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 15px 2px rgba(146, 146, 146, 0.315);
}
.names {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.register-input {
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 6px;
}
.register-input-name {
  display: flex;
  flex-direction: column;
  width: 390px;
  gap: 6px;
}

.register-inputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.input-sub {
  display: flex;
  flex-direction: column;
  width: 800px;
}
.subtitleinp {
  color: rgb(165, 165, 165);
  margin-top: 2px;
  font-weight: 300;
  font-size: 14px;
}
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 800px;
}
.password-wrapper input {
  padding-right: 40px;
  width: 800px;
}
.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #777;
  display: flex;
  height: 100%;
  align-items: center;
  user-select: none;
}

.toggle-password:hover {
  color: #333;
}
.send-btn {
  background-color: #3633ff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: 120px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  transition: 0.3s;
  height: 40px;
}
.send-btn:hover {
  background-color: #1612fd;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 30px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
}

.subtitle {
  font-weight: 200;
}
</style>

