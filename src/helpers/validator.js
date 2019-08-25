class ValidatorClass {
  required = (values, keys = []) => {
    const errors = {};
    for (const key of keys) {
      if (!values[key]) {
        errors[key] = 'Required';
      }
    }
    return errors;
  };
}

export const Validator = new ValidatorClass();
