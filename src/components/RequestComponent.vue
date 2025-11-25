<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { RequestRow } from './models';
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
  await getRequests();
}, 450);

watch([search], () => {
  debouncedFetch();
});

const columns = [
  { name: 'id', align: 'center' as const, label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'left' as const, label: 'Nome', field: 'name', sortable: true },
  {
    name: 'description',
    align: 'left' as const,
    label: 'Descrição',
    field: 'description',
    sortable: true,
  },
  { name: 'adress', align: 'left' as const, label: 'Endereço', field: 'adress', sortable: true },
  {
    name: 'status',
    align: 'left' as const,
    label: 'STATUS',
    field: (row: RequestRow) => row.status?.name,
    sortable: true,
  },
  {
    name: 'type',
    align: 'left' as const,
    label: 'Serviço',
    field: (row: RequestRow) => row.type?.name,
    sortable: true,
  },
  {
    name: 'createdAt',
    align: 'left' as const,
    label: 'Data',
    field: (row: RequestRow) => formatTime(row.createdAt),
    sortable: true,
  },
];

onMounted(async () => {
  await getRequests();
});

const requests = ref<RequestRow[]>([]);

async function getRequests() {
  try {
    const { data } = await api.get('http://localhost:3000/requests/all', {
      params: {
        filter: search.value,
      },
    });

    requests.value = data.data;
  } catch (error) {
    console.log(error);
    requests.value = [];
  }
}
</script>

<template>
  <q-page padding>
    <div class="q-pa-md" id="main">
      <div class="content">
        <div style="display: flex; justify-content: space-between; padding-bottom: 10px">
          <span style="font-size: 20px; font-weight: 700;">Solicitações</span>
          <div class="tbl-features">
            <q-input filled v-model="search" dense placeholder="Filtro..." bg-color="white"
              ><template v-slot:prepend> <q-icon name="search" /></template>
            </q-input>
            <q-btn
              @click="
                () => {
                  search = '';
                  getRequests();
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
          style="height: 400px; width: 1400px; border-radius: 20px"
          flat
          bordered
          :rows="requests"
          :columns="columns"
          row-key="id"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

#main {
  display: flex;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  align-items: center;
  align-content: center;
  margin-top: 180px;
}
#content {
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
