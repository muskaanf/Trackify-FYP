import React, { useState, useEffect } from 'react';
import AddBag from './AddBag';
import LazyLoad from 'react-lazyload';
import { Stack, TextField, InputAdornment, IconButton, Card, Divider, CardHeader, Avatar, Box, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserBaggages, deleteBaggage } from '../../services/baggage'; 
import { panelStyles } from './styles';
import { useSelector } from 'react-redux';

const UnattendedBag = () => {
  const [bags, setBags] = useState([]);
  const [selectedBag, setSelectedBag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true); 
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    
    const fetchBaggages = async () => {
      try {
        const { data } = await getUserBaggages(userId);
        setBags(data);
      } catch (error) {
        console.error('Error fetching baggages:', error);
      }
      setLoading(false); 
    };
    fetchBaggages();
  }, [refresh]);

  const handleEditClick = (bag) => {
    console.log('Editing bag:', bag); 
    setSelectedBag(bag);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteBaggage(id);
      setBags((prevBags) => prevBags.filter((bag) => bag._id !== id));
    } catch (error) {
      console.error('Error deleting baggage:', error);
    }
  };

  const handleAddBag = (bag) => {
    if (selectedBag) {
      
      setBags((prevBags) => prevBags.map((b) => (b._id === selectedBag._id ? { ...b, ...bag } : b)));
      setSelectedBag(null);
      setRefresh(!refresh);
    } else {
      
      setBags((prevBags) => [...prevBags, bag]);
      setRefresh(!refresh);
    }
  };

  const filteredBags = bags.filter((bag) =>
    bag.brand ? bag.brand.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <AddBag selectedBag={selectedBag} onAdd={handleAddBag} />
      <Divider />
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          sx={panelStyles.textfield}
          variant="outlined"
          size="small"
          type="text"
          placeholder="Search bags"
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
        filteredBags.map((bag) => (
          <Card key={bag._id} style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
            <CardHeader
              avatar={
                bag.images && bag.images.length > 0 ? (
                  <LazyLoad height={40} offset={100}>
                  <Avatar
                    alt="Bag Image"
                    src={`data:image/jpeg;base64,${bag.images[0]}`}
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
              title={bag.brand}
              subheader={`Category: ${bag.category}, Color: ${bag.color}`}
              action={
                <div>
                  <IconButton onClick={() => handleEditClick(bag)}>
                    <EditIcon sx={{ color: '#009193' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(bag._id)}>
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

export default UnattendedBag;



