<script setup>
import { ref } from 'vue';

const rows = ref([
    { id: 112312313, subject: 'jey 1 1231 qwdad qe231312', user: 'Kevin Orge', location: 'at manga street, asda ada dasda ass as dasd asdasdsa dsad as' }
]);
const columns = [
    { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'center', headerStyle: 'width:70px' },
    { name: 'subject', field: 'subject', label: 'Subject', align: 'left' },
    { name: 'user', field: 'user', label: 'User', align: 'left', },
    { name: 'location', field: 'location', label: 'Location', align: 'left' },
    { name: 'actions', field: 'actions', label: '', align: 'center', headerStyle: 'width:70px' },
];
const onItemClick = () => 1
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row">
            <div class="col-12">
                <q-table :rows="rows" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 50 }"
                    :rows-per-page-options="[10, 20, 30, 40, 50]">
                    <template v-slot:body-cell-id="props">
                        <td :props="props">
                            <a href="#">{{ props.value }}</a>
                        </td>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <td :props="props">
                            <q-btn-dropdown size="md" label="Actions" padding="5px" flat>
                                <q-list>
                                    <q-item clickable v-close-popup @click="onItemClick">
                                        <q-item-section>
                                            <q-item-label>View</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="onItemClick">
                                        <q-item-section>
                                            <q-item-label>Delete</q-item-label>
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