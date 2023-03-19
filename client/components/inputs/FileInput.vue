<script setup lang="ts">
import { AttachmentForm } from '~~/types/api';

interface Props {
    attachments?: AttachmentForm[],
}
const attrs = useAttrs();
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'update:attachments']);
const uploaded_files = ref([]);
const attachments = ref<AttachmentForm[]>([]);

const onInput = (evt: Event) => {
    uploaded_files.value = [];
    if (evt.target.files.length == 0) return;
    for (const file of evt.target.files) {
        file.file_name = file.name;
        uploaded_files.value.push(file);
    }
    emit('update:modelValue', uploaded_files.value);
};
const onToggleFile = (file: any) => {
    const index = attachments.value.findIndex(it => it == file);
    if (index > -1) {
        attachments.value[index].is_deleted = !attachments.value[index].is_deleted;
        emit('update:attachments', Object.assign([], attachments.value));
    }
};
const fileInRemoved = (file: AttachmentForm) => {
    const index = attachments.value.findIndex(it => it.id == file.id);
    if (index > -1) return attachments.value[index].is_deleted;
    return false;
}
const fileClasses = (file: AttachmentForm) => {
    if (file.id == undefined) return '';
    let classes = [];
    if (fileInRemoved(file)) {
        classes.push('text-decoration-line-through');
    }
    return classes.join(' ');
};

onMounted(() => {
    if (props.attachments) {
        props.attachments.forEach(it => {
            it.is_deleted = false;
            attachments.value.push(it);
        });
    }
});
</script>
<template>
    <div>
        <div>
            <span v-for="file in attachments" class="badge bg-info me-1 mb-2 text-dark fs-6" :class="fileClasses(file)">
                {{ file.file_name }}
                <a v-if="!fileInRemoved(file)" @click.prevent="onToggleFile(file)" href="#" class="ms-1 text-dark"><i
                        class="bi bi-trash3"></i></a>
                <a v-else @click.prevent="onToggleFile(file)" href="#" class="ms-1 text-dark"><i
                        class="bi bi-arrow-counterclockwise"></i></a>
            </span>
            <span v-for="file in uploaded_files" class="badge border border-info me-1 mb-2 text-dark fs-6">{{ file.name
            }}</span>
        </div>
        <input v-bind="attrs" class="form-control" type="file" @input="onInput">
    </div>
</template>