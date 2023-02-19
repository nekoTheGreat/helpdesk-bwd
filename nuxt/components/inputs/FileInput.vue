<script setup lang="ts">
import { Attachment } from '~~/types/api';

interface Props {
    attachments?: Attachment[],
}
const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const uploaded_files = ref([]);
const files = computed(() => {
    let items = props.attachments ?? [];
    uploaded_files.value.forEach((it) => {
        it.file_name = it.name;
        items.push(it);
    });
    return items;
});
const onInput = (evt) => {
    uploaded_files.value = [];
    if (evt.target.files.length == 0) return;
    for (const file of evt.target.files) {
        file.file_name = file.name;
        uploaded_files.value.push(file);
    }

    emit('update:modelValue', files);
};
</script>
<template>
    <div>
        <div v-if="files.length">
            <span v-for="file in files" class="badge bg-info me-1 mb-2 text-dark">{{ file.file_name }}</span>
        </div>
        <input v-bind="attrs" class="form-control" type="file" @input="onInput">
    </div>
</template>