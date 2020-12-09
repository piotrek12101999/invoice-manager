import * as yup from 'yup';

export default yup.object().shape({
  NIP: yup.string().length(10).required(),
  REGON: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .length(9),
  name: yup.string().max(50).required(),
  street: yup.string().max(100).required(),
  city: yup.string().max(50).required(),
  postalCode: yup.string().length(6).required(),
  mail: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .email('must be a valid email')
});
