import * as yup from 'yup';

export default yup.object().shape({
  NIP: yup.string().length(10).required(),
  REGON: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .length(9),
  account: yup.string().max(50).required(),
  companyName: yup.string().max(100).required(),
  name: yup.string().max(50).required(),
  postalCode: yup.string().length(6).required(),
  street: yup.string().max(50).required()
});
