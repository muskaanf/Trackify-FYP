/*import { TextField, Stack, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { panelStyles } from './styles';

const AddUser = ({ selectedUser, onAdd }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('First Name is required'),
      lastname: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      number: Yup.string()
        .required('Contact Number is required')
        .matches(/^[0-9]+$/, 'Contact Number must be only digits')
        .min(10, 'Contact Number must be at least 10 digits')
        .max(15, 'Contact Number must be 15 digits or less'),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Sending request to login...");
      console.log('formik', formik.values);  
        const response = await axios.post(
          "http://localhost:5000/api/user/signup",
          formik.values
        );
        console.log('response', response);
        
      onAdd(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (selectedUser) {
      formik.setValues(selectedUser);
    }
  }, [selectedUser, formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          sx={panelStyles.textfield}
          variant='outlined'
          size='small'
          label="First Name"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          sx={panelStyles.textfield}
          variant='outlined'
          size='small'
          label="Last Name"
          id="lastname"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        <TextField
          sx={panelStyles.textfield}
          variant='outlined'
          size='small'
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={panelStyles.textfield}
          variant='outlined'
          size='small'
          label="Contact Number"
          id="number"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
          {selectedUser ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddUser;
*/
