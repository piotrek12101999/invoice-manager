import * as yup from 'yup';

export default yup.object().shape({
  number: yup
    .string()
    .matches(/\d{1,4}\/\d{2}\/\d{4}/g, 'invoice number is incorrect')
    .required(),
  saleDate: yup.date().required(),
  issueDate: yup.date().required()
});
