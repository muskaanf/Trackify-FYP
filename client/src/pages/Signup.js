import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography, Stack } from '@mui/material';
import { TextField, Button } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useSelector } from "react-redux";


const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',  
      firstName: '',
      lastName: '',
      contactNumber: '',
      position: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      contactNumber: Yup.string()
        .required('Contact Number is required')
        .matches(/^[0-9]+$/, 'Contact Number must be only digits')
        .min(10, 'Contact Number must be at least 10 digits')
        .max(15, 'Contact Number must be 15 digits or less'),
      position: Yup.string().required('position is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
        try {
          console.log("Sending request to signup...");
          const response = await axios.post("http://localhost:5000/api/user/signup", values);
          console.log('response', response);
  
          if (response.status === 201) {
            alert('Signup successful!');
            resetForm();
            navigate('/'); // Redirect to login page after successful signup
          }
        } catch (error) {
          console.error('Signup error', error);
          alert('Signup failed: ' + error.response.data.message);
        }
      },
    });

  const backgroundImageUrl = './Background.png';

  const boxStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    width: '100vw', 
    height: '100vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', 
    fontSize: '24px', 
  };

  return (
    <Box sx={boxStyle} >
      <Card sx={{ width: '700px', borderRadius: '20px', background: '#f2f2f2' }}>
       <CardContent style={{ padding: 0 }}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <div style={{ textAlign: 'center',justifyContent: 'center', background: '#fff', paddingTop: '120px',  height: '100%' }}>
                <img className="navLogo" src="Logo.png" alt="Logo" width='140px' height='160px' />
                <Typography variant='h3' style={{ fontFamily: 'Kelly Slab, sans-serif', marginTop: '10px' }}>Trackify</Typography>
                <Typography variant='body1' style={{ fontFamily: 'Kavivanar, sans-serif', marginTop: '5px' }}>Smart Surveillance Redefined</Typography>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div style={{ padding: '20px', height: '100%' }}>
                <Typography variant='h5' style={{ paddingBottom: '5px', fontFamily: 'Lato, sans-serif', fontWeight: 'bold' }} sx={{ textAlign: 'left' }}>SIGN UP</Typography>
                <Typography variant='body2' sx={{ paddingBottom: '10px', borderBottom: 2, borderColor: '#fff', color: '#9A9A9A', textAlign: 'left' }}>Sign up with your ID and Password</Typography>
                <div style={{ padding: 5 }}></div>
                <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
      <TextField
          variant='outlined'
          size='small'
          label="UserName"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '15px', 
      }}
    >
        <TextField
          variant='outlined'
          size='small'
          label="First Name"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          variant='outlined'
          size='small'
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        </Box>
        <TextField
          variant='outlined'
          size='small'
          label="Position"
          id="position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        />
        <TextField
          variant='outlined'
          size='small'
          label="Contact Number"
          id="contactNumber"
          name="contactNumber"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
          helperText={formik.touched.contactNumber && formik.errors.contactNumber}
        />
        <TextField
          variant='outlined'
          size='small'
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
            Sign up
        </Button>
      </Stack>
    </form>
                <div style={{ padding: 10 }}></div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signup;