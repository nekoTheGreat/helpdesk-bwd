<script setup>
import { reactive, onMounted } from 'vue';
import Joi from 'joi';
import { useFormValidate } from 'src/composables/formValidate';

const props = defineProps({
    user: { type: Object },
    title: { type: String, default: 'User' },
    additionalRequiredFields: { type: Array, default: () => [] },
});
const emit = defineEmits(['on-submit', 'on-cancel', 'on-error']);
const form = reactive({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    street_address: '',
    purok: '',
    barangay: '',
    city: '',
    municipality: '',
    province: '',
    contact_number: '',
});
let rules = {
    email: Joi.string().empty(false).email({ tlds: { allow: false } }).required(),
    first_name: Joi.string().empty(false).required(),
    last_name: Joi.string().empty(false).required(),
    contact_number: Joi.string().required().length(10).messages({ 'string.length': 'Should be 10 digits' }),
    street_address: Joi.string().empty(false).required(),
    barangay: Joi.string().empty(false).required(),
    city: Joi.string(),
    municipality: Joi.string(),
    province: Joi.string().empty(false).required(),
};
if (props.additionalRequiredFields) {
    if (props.additionalRequiredFields.includes('password')) {
        rules.password = Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,}$'));
        rules.confirm_password = Joi.ref('password');
    }
}
let validationSchema = Joi.object(rules).messages({
    'any.required': 'Field is required',
    'string.empty': 'Field is required',
    'string.pattern.base': 'Should be at least 8 alphanumeric characters',
    'any.only': 'Should be the same value of Password',
});
const formValidate = useFormValidate(validationSchema);
const onSubmit = () => {
    const errors = formValidate.validate(Object.assign({}, form));
    if (errors.value.length > 0) {
        emit('on-error', { errors: errors });
    } else {
        emit('on-submit', { form: Object.assign({}, form) });
    }
};
const onCancel = () => {
    emit('on-cancel');
};

onMounted(() => {
    if (props.user) {
        const fields = Object.keys(Object.assign({}, form));
        fields.forEach(field => {
            if (props.user.hasOwnProperty(field) && field != 'password') {
                form[field] = props.user[field];
            }
        });
    }
});
</script>
<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-5">
                <div class="q-px-lg q-mt-sm q-pt-sm q-pb-lg shadow-10">
                    <form method="POST" @submit.prevent="onSubmit" validate>
                        <div class="q-mt-md q-mb-lg">
                            <label class="text-h6 text-weight-bold text-primary">{{ props.title }}</label>
                        </div>
                        <div class="q-mb-sm">
                            <label class="text-primary">Credentials</label>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input type="email" outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.email"
                                    label="Email" :error="formValidate.isFieldInvalid('email') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('email') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input type="password" outlined class="col-4 q-mb-sm bg-grey-1"
                                    v-model="form.password" label="Password" autocomplete="new-password"
                                    :error="formValidate.isFieldInvalid('password') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('password') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input type="password" outlined class="col-4 q-mb-sm bg-grey-1"
                                    v-model="form.confirm_password" label="Confirm Password" autocomplete="off"
                                    :error="formValidate.isFieldInvalid('confirm_password') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('confirm_password') }}</div>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="q-mb-sm">
                            <label class="text-primary">User Details</label>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.first_name"
                                    label="First Name" :error="formValidate.isFieldInvalid('first_name') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('first_name') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.middle_name"
                                    label="Middle Name" />
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.last_name"
                                    label="Last Name" :error="formValidate.isFieldInvalid('last_name') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('last_name') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.contact_number"
                                    label="Contact Number" type="text" minlength="10" maxlength="10"
                                    :error="formValidate.isFieldInvalid('contact_number') != false">
                                    <template v-slot:prepend><small>+63</small></template>
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('contact_number') }}</div>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="q-mb-sm">
                            <label class="text-primary">Address</label>
                        </div>
                        <div class="row q-col-gutter-md q-mb-md">
                            <div class="col-12 col-sm-8">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.street_address"
                                    label="Street Address"
                                    :error="formValidate.isFieldInvalid('street_address') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('street_address') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.purok" label="Purok"
                                    :error="formValidate.isFieldInvalid('purok') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('purok') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.barangay"
                                    label="Barangay" :error="formValidate.isFieldInvalid('barangay') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('barangay') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.municipality"
                                    label="Munipacility" :error="formValidate.isFieldInvalid('municipality') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('municipality') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.city" label="City"
                                    :error="formValidate.isFieldInvalid('city') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('city') }}</div>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-4">
                                <q-input outlined class="col-4 q-mb-sm bg-grey-1" v-model="form.province"
                                    label="Province" :error="formValidate.isFieldInvalid('province') != false">
                                    <template v-slot:error>
                                        <div>{{ formValidate.getFieldError('province') }}</div>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="row q-col-gutter-md">
                            <div class="col-12 text-right">
                                <q-btn type="submit" color="primary" text-color="secondary" class="q-mr-md" label="Save"
                                    style="max-width: 70px;" />
                                <q-btn color="white" text-color="primary" label="Cancel" @click="onCancel"
                                    style="max-width: 70px;" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </q-page>
</template>