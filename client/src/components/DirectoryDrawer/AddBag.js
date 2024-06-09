import { TextField, Stack, Button, Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBaggage, updateBaggage } from '../../services/baggage'; 

const AddBag = ({ selectedBag, onAdd }) => {
  const [imagesBase64, setImagesBase64] = React.useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      color: '',
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('Brand is required'),
      category: Yup.string().required('Category is required'),
      color: Yup.string().required('Colour is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: imagesBase64 };
        if (selectedBag) {
          await updateBaggage(selectedBag._id, formData); 
        } else {
          await createBaggage(formData);
        }
        onAdd(formData);
        resetForm();
        setImagesBase64([]); 
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; 
        }
      } catch (error) {
        console.error('Error adding/updating bag:', error);
      }
    },
  });

  useEffect(() => {
    if (selectedBag) {
      formik.setValues({
        brand: selectedBag.brand,
        category: selectedBag.category,
        color: selectedBag.color,
      });
      setImagesBase64(selectedBag.images || []);
    } else {
      formik.resetForm();
      setImagesBase64([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  }, [selectedBag]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; 
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        if (file.size > maxFileSize) {
          reject(new Error(`Image size exceeds the maximum (${maxFileSize / 1024 / 1024} MB) allowed limit.`));
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(base64Images => setImagesBase64(base64Images))
    .catch(error => console.error("Error reading files", error));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          variant="outlined"
          size="small"
          label="Brand"
          name="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <TextField
          variant="outlined"
          size="small"
          label="Colour"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.color && Boolean(formik.errors.color)}
          helperText={formik.touched.color && formik.errors.color}
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          style={{ marginBottom: '10px' }}
          ref={fileInputRef} // Attach the ref to the file input
        />
        <div>
          {imagesBase64.map((image, index) => (
            <Avatar key={index} alt={`Bag Image ${index}`} src={`data:image/jpeg;base64,${image}`} sx={{ width: 100, height: 100, margin: '5px' }} />
          ))}
        </div>
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
          {selectedBag ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddBag;




