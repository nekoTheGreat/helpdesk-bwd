<script setup lang="ts">


interface Props {
    modelValue: number,
    total?: number,
    totalPerPage?: number,
    disablePrev?: boolean,
    disableNext?: boolean,
}
const props = defineProps<Props>();
const emit = defineEmits(['update:model-value']);

const DisablePrev = computed(() => {
    return props.modelValue < 2;
});
const DisableNext = computed(() => {
    if (props.disablePrev) return true;
    if (props.total && props.totalPerPage) {
        const currentTotal = props.totalPerPage * props.modelValue;
        return currentTotal >= props.total;
    }
    return false;
});

const onPrev = () => {
    if (DisablePrev.value) return;
    emitPageChange(props.modelValue - 1);
};
const onNext = () => {
    if (DisableNext.value) return;
    emitPageChange(props.modelValue + 1);
};
const emitPageChange = (page: any) => {
    emit('update:model-value', page * 1);
}
</script>
<template>
    <div class="d-flex justify-content-center align-items-center">
        <ul class="pagination mb-1">
            <li class="page-item" :class="{ disabled: DisablePrev }">
                <a @click.prevent="onPrev" class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item">
                <input :value="props.modelValue" @change="emitPageChange($event.target.value)" type="number"
                    class="form-control page-input" />
            </li>
            <li class="page-item" :class="{ disabled: DisableNext }">
                <a @click.prevent="onNext" class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.page-input {
    border-radius: 0;
    width: 50px;
    text-align: center;
    -moz-appearance: textfield;
}

/* Chrome, Safari, Edge, Opera */
.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>