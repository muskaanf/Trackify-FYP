import React, { useState, useEffect } from 'react';
import { Stack, IconButton, Card, Divider, CardHeader, CircularProgress, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { fetchUsers, approveUser, deleteUser, updateUser  } from '../../services/user'; 

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [deletingUserId, setDeletingUserId] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false); 
    };

    fetchUserData();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = async (id) => {
    setDeletingUserId(id); 
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setDeletingUserId(null); 
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? { ...user, isApproved: true } : user))
      );
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error declining user:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Stack spacing={2} direction="column" m={1}>
        <h2>Requested Users</h2>
        {users
          .filter((user) => !user.isApproved)
          .map((user) => (
            <div key={user._id}>
              <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
                <CardHeader
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={`Contact Number: ${user.contactNumber}`}
                  action={
                    <div>
                      <IconButton onClick={() => handleApprove(user._id)}>
                        <DoneIcon sx={{ color: '#009193' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDecline(user._id)}>
                        <CloseIcon sx={{ color: '#009193' }} />
                      </IconButton>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
      </Stack>

      <Stack spacing={2} direction="column" m={1}>
        <h2>Approved Users</h2>
        {users
          .filter((user) => user.isApproved)
          .map((user) => (
            <div key={user._id}>
              <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid' }}>
                <CardHeader
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={`Contact Number: ${user.contactNumber}`}
                  action={
                    <div>
                      <IconButton onClick={() => handleEditClick(user._id)}>
                        <EditIcon sx={{ color: '#009193' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(user._id)}>
                        {deletingUserId === user._id ? (
                          <CircularProgress size={24} sx={{ color: '#009193' }} />
                        ) : (
                          <DeleteIcon sx={{ color: '#009193' }} />
                        )}
                      </IconButton>
                    </div>
                  }
                />
              </Card>
              {selectedUser === user._id && (
                <UpdateUserForm user={user} setUsers={setUsers} setSelectedUser={setSelectedUser} />
              )}
            </div>
          ))}
      </Stack>
    </div>
  );
};

const UpdateUserForm = ({ user, setUsers, setSelectedUser }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    contactNumber: user.contactNumber,
    position: user.position,
  });
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updatedUser = await updateUser(user._id, formData);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? { ...u, ...formData } : u))
      );
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setUpdating(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px', paddingTop: '10px' }}>
      <Stack spacing={2} direction="column" m={1}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" sx={{ background: '#009193' }} disabled={updating}>
            {updating ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
          <Button variant="outlined" sx={{ color: '#009193' }} onClick={() => setSelectedUser(null)}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};  

export default UserProfile;
