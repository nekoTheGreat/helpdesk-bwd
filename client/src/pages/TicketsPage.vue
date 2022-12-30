<script setup>
import { ref, reactive, onMounted } from 'vue';
import TicketsFilterForm from 'src/components/TicketsFilterForm.vue';
import TicketService from 'src/services/TicketService';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const quasar = useQuasar();
const router = useRouter();
const ticketService = new TicketService();
const rows = ref([]);
const columns = ref([]);
const form = reactive({
    term: ''
});
const showFilterForm = ref(false);

const onClickView = (data) => {
    router.replace({ name: 'ticket-view', params: { id: data.row.id } });
};
const onSubmitSearch = () => 1;
const onClickAdvanceSearch = () => showFilterForm.value = true;
const onSubmitAdvanceSearch = (payload) => {
    console.log(payload);
    showFilterForm.value = false;
}
const onCancelAdvanceSearch = () => {
    showFilterForm.value = false;
}

onMounted(async () => {
    try {
        quasar.loading.show();
        const res = await ticketService.getList();
        rows.value = res.rows;
        columns.value = res.columns;
    } finally {
        quasar.loading.hide();
    }
});
</script>
<template>
    <q-dialog v-model="showFilterForm" :persistent="true">
        <q-card>
            <q-card-section>
                <div class="text-h6">Filters</div>
            </q-card-section>
            <q-card-section class="q-pt-none" style="max-height: 80vh; width: 500px; max-width: 80vw;">
                <TicketsFilterForm @on-submit="onSubmitAdvanceSearch" @on-cancel="onCancelAdvanceSearch">
                </TicketsFilterForm>
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-page class=" q-pa-sm">
        <div class="row">
            <q-input type="text" outlined class="col-12 col-sm-8 col-md-6 col-lg-5 q-mb-sm q-pr-sm bg-grey-1" dense
                label="Search" v-model="form.term" />
            <q-btn type="button" color="primary" text-color="secondary" class="q-mb-sm q-mr-sm" label="Search"
                @click="onSubmitSearch" />
            <q-btn type="button" color="white" text-color="dark" class="q-mb-sm" label="Filters"
                @click="onClickAdvanceSearch" />
        </div>
        <div class="row">
            <div class="col-12">
                <q-table :rows="rows" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 50 }"
                    :rows-per-page-options="[10, 20, 30, 40, 50]">
                    <template v-slot:body-cell-id="props">
                        <td :props="props">
                            <router-link :to="{ name: 'ticket-view', params: { id: props.row.id } }">
                                {{ props.value }}
                            </router-link>
                        </td>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <td :props="props">
                            <q-btn-dropdown size="md" label="Actions" padding="5px" flat>
                                <q-list>
                                    <q-item clickable v-close-popup @click="onClickView(props)">
                                        <q-item-section>
                                            <q-item-label>View</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </td>
                    </template>
                </q-table>
            </div>
        </div>
    </q-page>
</template>
<style>
.q-table__bottom--nodata {
    justify-content: center;
}
</style>