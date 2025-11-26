<script setup lang="ts">
import { ref } from 'vue';
const types = [
  {name: 'Buracos', key: 'buracos'},
  {name: 'Iluminação', key: 'iluminacao'},
  {name: 'Limpeza', key: 'limpeza'},
  {name: 'Fiscalização', key: 'fiscalizacao'}

]
const newform = ref({
  name: '',
  desc: '',
  type: [],
  adress: '',
});


</script>

<template>
  <section class="overlay-with-filter">
    <div class="main">
      <span class="text-h6">Faça sua solicitação:</span>
      <form action="">
        <div>
          <q-input style="width: 740px" outlined dense label="Nome" v-model="newform.name"
          :rules="
          [(val) => val && (val.length > 0) || 'Preencha este campo',
           (val) => val && (val.length > 8) || 'Insira um nome válido']"
            ><template v-slot:append>
              <q-icon name="close" @click="newform.name = ''" class="cursor-pointer" /> </template
          ></q-input>
        </div>
        <div>
          <q-input style="width: 740px" outlined dense label="Endereço" v-model="newform.adress"
          :rules="
          [(val) => val && (val.length > 0) || 'Preencha este campo',
           (val) => val && (val.length > 14) || 'Insira um endereço válido']">
            <template v-slot:append>
              <q-icon name="close" @click="newform.adress = ''" class="cursor-pointer" /> </template
          ></q-input>
        </div>
        <div>
          <q-select
           v-model="newform.type"
           style="width: 740px;"
           outlined
           dense
           label="Serviço"
           :options="types"
           emit-value
           map-options
           option-label="name"
           option-value="key"
           :rules="[
            (val) => val && (val.length > 0) || 'Preencha este campo'
           ]"

           >

          </q-select>
        </div>
        <div>
          <q-input
            outlined
            class="large-textarea"
            v-model="newform.desc"
            label="Descrição"
            type="textarea"
            :rows="6"
            clearable
            ><template v-slot:append>
              <q-icon name="close" @click="newform.desc = ''" class="cursor-pointer" /> </template
          ></q-input>
        </div>
        <q-btn color="indigo-12" style="width: 150px"> ENVIAR </q-btn>
      </form>
    </div>
  </section>
</template>

<style scoped>
.large-textarea {
  max-width: 800px;
  min-width: 400px;
  width: 740px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/background-blur.png);
  height: 100vh;
  width: 100%;
  z-index: 0;
}
textarea {
  resize: none; /* this will disable resize for all textarea elements.  */
}

.large-textarea {
  min-height: 110px; /* Altura mínima decente */
}

.large-textarea :deep(textarea) {
  resize: none !important; /* Garante que não pode redimensionar */
  min-height: 110px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid rgb(216, 216, 216);
}
</style>
