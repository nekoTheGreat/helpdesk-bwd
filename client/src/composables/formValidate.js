import Joi from 'joi';
import { ref } from 'vue';

export function useFormValidate(validationSchema){
    let schema = validationSchema;
    if(!Joi.isSchema(validationSchema)) schema = Joi.object(validationSchema);

    const errors = ref([]);

    const validate = (data, config) => {
        errors.value = [];
        const _config = Object.assign({abortEarly: false, allowUnknown: true}, config ?? {});
        const { error } = schema.validate(data, _config);
        if(error && error.details) error.details.forEach(it => {
            errors.value.push({field: it.context.key, message: it.message});
        });
        return errors;
    }

    const getFieldErrors = () => errors;

    const getFieldError = (field) => {
        const index = errors.value.findIndex(it => it.field == field);
        if(index > -1) return errors.value[index].message;
        return null;
    }

    const isFieldInvalid = (field) => {
        return getFieldError(field) != null;
    }

    return { validate, isFieldInvalid, getFieldError, getFieldErrors };
} 