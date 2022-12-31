import Joi from 'joi';
import { ref } from 'vue';

export function useFormValidate(validationSchema){
    let schema;
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

    const updateValidations = (rules) => {
        if(Joi.isSchema(rules)){
            schema = rules;
        }else{
            if(schema){
                schema = schema.keys(rules);
            }else{
                schema = Joi.object(rules);
            }  
        } 
        return schema;
    }

    updateValidations(validationSchema);

    return { validate, isFieldInvalid, getFieldError, getFieldErrors, updateValidations };
} 