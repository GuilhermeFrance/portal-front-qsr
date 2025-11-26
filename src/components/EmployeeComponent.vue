<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { User } from './models';
import { api } from 'boot/axios';
import { debounce } from 'quasar';

const search = ref('');

function formatTime(dateTimeString: string | Date | undefined): string {
  if (!dateTimeString) {
    return 'N/A';
  }

  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return 'data inválida';
    }

    const datepart = date.toLocaleDateString('pt-br');
    return datepart;
  } catch {
    return 'Erro de formatação';
  }
}

const debouncedFetch = debounce(async () => {
  await getusers();
}, 100);

watch([search], () => {
  debouncedFetch();
});

const columns = [
  {
    name: 'id',
    align: 'center' as const,
    label: 'ID',
    field: 'id',
    sortable: true,
    headerStyle: 'font-weight: bold; font-size: 15px',
  },
  {
    name: 'name',
    align: 'left' as const,
    label: 'Nome',
    field: 'name',
    sortable: true,
    headerStyle: 'font-weight: bold; font-size: 15px',
  },
  {
    name: 'cpf',
    align: 'left' as const,
    label: 'CPF',
    field: 'cpf',
    sortable: true,
    headerStyle: 'font-weight: bold; font-size: 15px  ',
  },
  {
    name: 'cargo',
    align: 'left' as const,
    label: 'Cargo',
    field: (row:User) => row.role?.name,
    sortable: true,
    headerStyle: 'font-weight: bold; font-size: 15px  ',
  },
  {
    name: 'createdAt',
    align: 'left' as const,
    label: 'Data',
    field: (row: User) => formatTime(row.createdAt),
    sortable: true,
    headerStyle: 'font-weight: bold; font-size: 15px  ',
  },
];

onMounted(async () => {
  await getusers();
});

const users = ref<User[]>([]);

async function getusers() {
  try {
    const response = await api.get(   'users' ,{
      params: {
        filter: search.value,
      },
    });

    users.value = response.data.data;
  } catch (error) {
    console.log(error);
    users.value = [];
  }
}
</script>

<template>

    <div class="q-pa-md" id="main">
      <div class="content">
        <div style="display: flex; justify-content: space-between; padding-bottom: 10px">
          <span style="font-size: 20px; font-weight: 700">Solicitações</span>
          <div class="tbl-features">
            <q-input filled v-model="search" dense placeholder="Filtro..." bg-color="white"
              ><template v-slot:prepend> <q-icon name="search" /></template>
            </q-input>
            <q-btn
              @click="
                () => {
                  search = '';
                  getusers();
                }
              "
              color="blue-14"
              style="width: 34px; height: 30px"
            >
              <q-icon name="clear" />
            </q-btn>
          </div>
        </div>

        <q-table
          style="height: 400px; width: 940px; border-radius: 10px"
          flat
          bordered
          :rows="users"
          :columns="columns"
          row-key="id"
          table-class="custom-table"
        />
      </div>
    </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

:deep(.custom-table tbody tr) {
  font-size: 10px;
  color: rgb(70, 70, 70);
  height: 30px;
}



#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  align-items: center;
  align-content: center;
  margin-top: 0px;
  min-height: 100vh;


}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tbl-features {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
