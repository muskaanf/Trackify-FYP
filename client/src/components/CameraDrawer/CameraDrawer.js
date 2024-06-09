import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Checkbox, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CameraDrawer = ({ details, setDetails }) => {
  const [cameras, setCameras] = useState([]);

  const formik = useFormik({
    initialValues: {
      ipAddress: '',
      zoneName: '',
    },
    validationSchema: Yup.object({
      ipAddress: Yup.string()
        .required('IP Address is required')
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          'Invalid IP Address'
        ),
      zoneName: Yup.string().required('Zone Name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      setCameras([...cameras, { ...values, status: 'Active' }]);
      resetForm();
    },
  });

  const handleDeleteCamera = (index) => {
    const updatedCameras = [...cameras];
    updatedCameras.splice(index, 1);
    setCameras(updatedCameras);
  };

  return (
    <Box p={2} width='470px' textAlign='Left' role='presentation' paddingLeft='120px'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h4' component='div'>
          Manage Camera
        </Typography>
        <Typography variant='body2' component='div' gutterBottom>
          Surveillance camera settings here
        </Typography>
      </Box>

      <div style={{ padding: '20px' }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} direction="column" m={1}>
            <TextField
              id="ipAddress"
              name="ipAddress"
              label="IP Address"
              value={formik.values.ipAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginBottom: '10px' }}
              error={formik.touched.ipAddress && Boolean(formik.errors.ipAddress)}
              helperText={formik.touched.ipAddress && formik.errors.ipAddress}
            />
            <TextField
              id="zoneName"
              name="zoneName"
              label="Zone"
              value={formik.values.zoneName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginBottom: '10px' }}
              error={formik.touched.zoneName && Boolean(formik.errors.zoneName)}
              helperText={formik.touched.zoneName && formik.errors.zoneName}
            />
            <Button type="submit" variant="contained" sx={{ background: '#009193' }} style={{ marginBottom: '10px' }}>
              Add Camera
            </Button>
          </Stack>
        </form>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#009193' }}>
                <TableCell>Zone Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Calculate Crowd</TableCell>
                <TableCell>Unattended Baggage</TableCell>
                <TableCell>Identify Intruder</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cameras.map((camera, index) => (
                <TableRow key={index}>
                  <TableCell>{camera.zoneName}</TableCell>
                  <TableCell>{camera.status}</TableCell>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteCamera(index)}>
                      <DeleteIcon sx={{ color: "#009193" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default CameraDrawer;
