<script setup>
import { ref } from 'vue';

const props = defineProps({
    id: { type: Number, }
});

const ticket = ref({
    id: props.id,
    title: 'Title of Ticket Lorem ipsum dolor sit amet, consectetur adipiscing',
    description: 'Description of Ticket. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: 'Pending',
    comments: [
        { id: 1, user: 'First Name, Last Name', created_at: 'Dec. 10, 2022', message: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.' },
        { id: 2, user: 'First Name, Last Name', created_at: 'Dec. 11, 2022', message: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.' },
        { id: 3, user: 'First Name, Last Name', created_at: 'Dec. 12, 2022', message: 'Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.' },
    ],
    images: [
        { src: 'https://cdn.quasar.dev/img/mountains.jpg' },
        { src: 'https://cdn.quasar.dev/img/parallax1.jpg' },
        { src: 'https://cdn.quasar.dev/img/parallax2.jpg' },
        { src: 'https://cdn.quasar.dev/img/quasar.jpg' },
    ],
});
const onChangeStatus = (status) => {
    ticket.value.status = status;
};
const imageSlide = ref(1);
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 col-sm-9 col-md-9 col-lg-7 col-xl-6 q-pa-md q-mt-md">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="text-overline q-ml-auto text-orange-9">Dec. 10, 2022</div>
                        <div class="text-h5 q-my-sm q-mb-xs">{{ ticket.title }}</div>
                        <div class="text-caption text-grey">{{ ticket.description }}</div>
                        <div class="text-overline text-orange-9">First Name, Last Name</div>
                    </q-card-section>
                    <q-card-actions>
                        <q-btn-dropdown size="md" :label="ticket.status" color="primary" flat>
                            <q-list>
                                <q-item clickable v-close-popup @click="onChangeStatus('Pending')">
                                    <q-item-section>
                                        <q-item-label>Pending</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="onChangeStatus('Solved')">
                                    <q-item-section>
                                        <q-item-label>Solved</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="onChangeStatus('Closed')">
                                    <q-item-section>
                                        <q-item-label>Closed</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-separator vertical inset />
                        <q-btn flat color="dark" label="Edit" icon="edit" />
                        <q-separator vertical inset />
                        <q-btn flat color="dark" label="Delete" icon="delete" />
                    </q-card-actions>
                </q-card>
                <div class="images q-mt-md" v-if="ticket.images.length">
                    <label class="text-caption">Images: ({{ ticket.images.length }})</label>
                    <q-carousel swipeable animated v-model="imageSlide" thumbnails infinite>
                        <q-carousel-slide v-for="(item, index) in ticket.images" :key="index" :name="index"
                            :img-src="item.src" />
                    </q-carousel>
                </div>
                <div class="comments q-mt-md">
                    <label class="text-caption">Comments: ({{ ticket.comments.length }})</label>
                    <q-list bordered padding v-if="ticket.comments.length">
                        <template v-for="(item, index) in ticket.comments" :key="item.id">
                            <q-item>
                                <q-item-section top avatar>
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ item.user }}</q-item-label>
                                    <q-item-label caption>{{ item.message }}</q-item-label>
                                </q-item-section>

                                <q-item-section side top>
                                    <q-item-label caption>{{ item.created_at }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-separator spaced inset="item" v-if="index != ticket.comments.length - 1" />
                        </template>
                    </q-list>
                </div>
            </div>
        </div>
    </q-page>
</template>