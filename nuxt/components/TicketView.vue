<script setup lang="ts">
import { Ticket } from '~~/types/api';
import { fullAddressFromTicket } from '~~/utils/misc';

interface Props {
    ticket: Ticket,
}
const props = defineProps<Props>();
const { ticket } = toRefs(props);
</script>
<template>
    <div class="row d-flex justify-content-center" v-if="ticket">
        <div class="col-12 col-sm-9 col-md-9 col-lg-7">
            <div class="card p-3 shadow">
                <div class="d-flex justify-content-end me-2">
                    <a href="#" @click.prevent="onDelete" class="me-2" alt="Delete Ticket">
                        <i class="bi bi-trash3"></i>
                    </a>
                    <NuxtLink :to="'/tickets/' + ticket.id + '/edit'" alt="Edit Ticket">
                        <i class="bi bi-pencil-square"></i>
                    </NuxtLink>
                </div>
                <div class="card-body">
                    <h5 class="card-title">#{{ ticket.id }} {{ ticket.subject }}</h5>
                    <div class="card-text">
                        <p>{{ ticket.description }}</p>
                    </div>
                    <div class="card-text">
                        Located at {{ fullAddressFromTicket(ticket) }}
                    </div>
                    <template v-if="ticket.photos.length > 0">
                        <hr />
                        <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <template v-for="(photo, index) in ticket.photos" :key="photo.url">
                                    <div class="carousel-item" :class="{ 'active': index == 0 }">
                                        <img :src="photo.url" class="d-block w-100">
                                    </div>
                                </template>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>