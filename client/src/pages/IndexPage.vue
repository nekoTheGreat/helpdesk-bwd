<script setup lang="ts">
import { reactive } from 'vue';
import { SimpleTicketForm } from 'src/types/ticket';

const form = reactive<SimpleTicketForm>({
	subject: '', description: '', address: '',
	contact: '', images: [],
})
</script>
<template>
	<q-page class="q-pa-sm">
		<div class="row reverse">
			<q-btn color="primary" text-color="secondary" label="Signup" class="q-ml-sm" />
			<q-btn color="primary" text-color="secondary" label="Login" class="q-ml-sm" />
		</div>
		<div class="row">
			<div class="col-12 col-sm-7">
				<div class="q-pa-sm">
					<h4 class="text-center q-mt-none text-weight-bold text-primary">Welcome to Bansalan Water District's
						Helpdesk
					</h4>
					<div style="max-width:250px;" class="q-ma-auto">
						<q-img src="~assets/headphones.png"></q-img>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-5">
				<div class="row q-pt-lg">
					<div class="col-12 col-sm-9">
						<div class="q-px-xl q-pt-xl q-pb-lg bg-primary rounded">
							<form method="POST" @submit.prevent="">
								<q-input outlined class="q-mb-sm bg-grey-1" v-model="form.subject" label="Title" />
								<q-input type="textarea" outlined class="q-mb-sm bg-grey-1" v-model="form.description"
									label="Description" />
								<q-input type="textarea" outlined class="q-mb-sm bg-grey-1" v-model="form.address"
									label="Address" />
								<q-btn color="secondary" text-color="primary" label="Submit Ticket" class="q-mr-auto" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>