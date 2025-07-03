import General from '../../utils/General';
import * as Yup from 'yup';

interface FieldConfig {
  fieldName: string;
  isRequired?: boolean;
  isMinLength?: boolean;
  isMaxLength?: number;
  regexPattern?: RegExp;
  isEmail?: boolean;
  isPassword?: boolean;
  isDropdown?: boolean;
  isMultiSelect?: boolean;
}

export const getValidationSchema = (fields: FieldConfig[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaFields: Record<string, any> = {};

  fields.forEach(({ 
    fieldName, 
    isRequired = false, 
    isMinLength, 
    isMaxLength, 
    regexPattern, 
    isEmail, 
    isPassword, 
    isDropdown = false, 
    isMultiSelect = false 
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fieldSchema: any = Yup.string();

    if (isDropdown) {
      fieldSchema = Yup.object().shape({
        label: Yup.string().required(`${General.camelToPascalWithSpaces(fieldName)} is required`),
        value: Yup.string().required(`${General.camelToPascalWithSpaces(fieldName)} value is required`),
      });
    } else if (isMultiSelect) {
      fieldSchema = Yup.array().of(Yup.string()).required(`${General.camelToPascalWithSpaces(fieldName)} is required`)
    } else if (isRequired) {
      fieldSchema = (fieldSchema as Yup.StringSchema).required(`${General.camelToPascalWithSpaces(fieldName)} is required`);
    }

    if (isMinLength) {
      fieldSchema = (fieldSchema as Yup.StringSchema).min(3, `${General.camelToPascalWithSpaces(fieldName)} must be at least 3 characters`);
    }

    if (isMaxLength) {
      fieldSchema = (fieldSchema as Yup.StringSchema).max(isMaxLength, `${General.camelToPascalWithSpaces(fieldName)} must be at most ${isMaxLength} characters`);
    }

    if (isPassword && regexPattern) {
      fieldSchema = (fieldSchema as Yup.StringSchema).matches(regexPattern, `${General.camelToPascalWithSpaces(fieldName)} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`);
    }

    if (regexPattern && !isPassword) {
      fieldSchema = (fieldSchema as Yup.StringSchema).matches(regexPattern, `${General.camelToPascalWithSpaces(fieldName)} is invalid`);
    }

    if (isEmail) {
      fieldSchema = (fieldSchema as Yup.StringSchema)
        .email(`${General.camelToPascalWithSpaces(fieldName)} must be a valid email`)
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          `${General.camelToPascalWithSpaces(fieldName)} must be a valid email`
        );
    }

    schemaFields[fieldName] = fieldSchema;
  });

  return Yup.object().shape(schemaFields);
}; 