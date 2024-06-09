import React, { useState, useEffect } from 'react';
import AddFace from './AddFace';
import LazyLoad from 'react-lazyload';
import { Stack, TextField, InputAdornment, IconButton, Card, Divider, CardHeader, Avatar, Box, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserFaces, deleteFace } from '../../services/face'; 
import { panelStyles } from './styles';
import { useSelector } from 'react-redux';

const FacialRecognition = () => {
  const [faces, setFaces] = useState([]);
  const [selectedFace, setSelectedFace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    
    const fetchFaces = async () => {
      try {
        const { data } = await getUserFaces(userId);
        setFaces(data);
      } catch (error) {
        console.error('Error fetching faces:', error);
      }
      setLoading(false);
    };
    fetchFaces();
  }, [refresh]);

  const handleEditClick = (face) => {
    setSelectedFace(face);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteFace(id);
      setFaces((prevFaces) => prevFaces.filter((face) => face._id !== id));
    } catch (error) {
      console.error('Error deleting face:', error);
    }
  };

  const handleAddFace = (face) => {
    if (selectedFace) {
      // Update
      setFaces((prevFaces) => prevFaces.map((f) => (f._id === selectedFace._id ? { ...f, ...face } : f)));
      setSelectedFace(null);
      setRefresh(!refresh);
    } else {
      // Add
      setFaces((prevFaces) => [...prevFaces, face]);
      setRefresh(!refresh);
    }
  };

  const filteredFaces = faces.filter((face) =>
    face.title ? face.title.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <AddFace selectedFace={selectedFace} onAdd={handleAddFace} />
      <Divider />
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          sx={panelStyles.textfield}
          variant="outlined"
          size="small"
          type="text"
          placeholder="Search faces"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          Array.from(new Array(5)).map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
              <Skeleton variant="circular" width={50} height={50} />
              <Box sx={{ ml: 2, mb: 2, mt: 1 }}>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="text" width={140} />
              </Box>
            </Box>
          ))
        ) : (        
        filteredFaces.map((face) => (
          
          <Card key={face._id} style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
            <CardHeader
              avatar={
                face.images && face.images.length > 0 ? (
                  <LazyLoad height={40} offset={100}>
                    <Avatar
                      alt="Face Image"
                      src={`data:image/jpeg;base64,${face.images[0]}`}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                      }}
                    />
                  </LazyLoad>
                ) : null
              }
              titleTypographyProps={{ variant: 'subtitle1' }}
              title={face.title}
              // subheader={`ID: ${face.id}`}
              action={
                <div>
                  {console.log(face)}
                  <IconButton onClick={() => handleEditClick(face)}>
                    <EditIcon sx={{ color: '#009193' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(face._id)}>
                    <DeleteIcon sx={{ color: '#009193' }} />
                  </IconButton>
                </div>
              }
            />
          </Card>
        )))}
      </Stack>
    </div>
  );
};

export default FacialRecognition;


