import { TextField, Stack, Button, Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';
import { createFace, updateFace } from '../../services/face'; 

const AddFace = ({ selectedFace, onAdd }) => {
  const [imagesBase64, setImagesBase64] = React.useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      // id: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Name is required'),
      // id: Yup.string().required('ID is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: imagesBase64 };
        if (selectedFace) {
          await updateFace(selectedFace._id, formData); 
        } else {
          await createFace(formData); 
        }
        onAdd(formData);
        resetForm();
        setImagesBase64([]); 
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error adding/updating face:', error);
      }
    },
  });

  useEffect(() => {
    if (selectedFace) {
      formik.setValues({
        title: selectedFace.title,
        // id: selectedFace.id,
      });
      setImagesBase64(selectedFace.images || []);
    } else {
      formik.resetForm();
      setImagesBase64([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  }, [selectedFace]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 1 * 1024 * 1024; 

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, 
            maxWidthOrHeight: 800, 
          });
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result.split(',')[1]; 
              resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      setImagesBase64(compressedFiles);
    } catch (error) {
      console.error("Error compressing files", error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          variant="outlined"
          size="small"
          label="Name"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        {/* <TextField
          variant="outlined"
          size="small"
          label="ID"
          name="id"
          value={formik.values.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
        /> */}
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          style={{ marginBottom: '10px' }}
          ref={fileInputRef} 
        />
        <div>
          {imagesBase64.map((image, index) => (
            <Avatar key={index} alt={`Face Image ${index}`} src={`data:image/jpeg;base64,${image}`} sx={{ width: 100, height: 100, margin: '5px' }} />
          ))}
        </div>
        <Button sx={{ background: '#009193' }} variant="contained" type="submit">
          {selectedFace ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddFace;


