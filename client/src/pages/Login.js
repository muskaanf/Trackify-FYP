import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

const Login = () => {
  const [eye, setEye] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const { username, password } = values;
      try {
        console.log("Sending request to login...");
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          { username, password }
        );
        console.log('response', response);
        if (response.status === 200) {
          dispatch(login({ user: response.data.user, token: response.data.token }));
          // localStorage.setItem('token', response.data.token);
          // localStorage.setItem('userId', response.data.user._id);
          // localStorage.setItem('role', response.data.user.role);
          navigate("/home");
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.status === 401) {
          setFieldError("username", "Invalid username or password");
          setFieldError("password", "Invalid username or password");
        } else {
          setFieldError("username", "Server error");
          setFieldError("password", "Server error");
        }
      }
    },
  });

  const handleEye = () => {
    setEye(!eye);
  };

  const backgroundImageUrl = "./Background.png";

  const boxStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "24px",
  };

  return (
    <Box sx={boxStyle}>
      <Card
        sx={{
          width: "700px",
          height: "500px",
          borderRadius: "20px",
          background: "#f2f2f2",
        }}
      >
        <CardContent style={{ padding: 0 }}>
          <Grid container spacing={0} sx={{ paddingTop: "20" }}>
            <Grid item xs={6} alignItems="center" style={{ height: "100vh" }}>
              <div
                style={{
                  textAlign: "center",
                  background: "#fff",
                  padding: "20px",
                  paddingTop: "100px",
                  borderRadius: "10px",
                  height: "100vh",
                }}
              >
                <img
                  className="navLogo"
                  src="Logo.png"
                  alt="Logo"
                  width="140px"
                  height="160px"
                />
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Kelly Slab, sans-serif",
                    marginTop: "10px",
                  }}
                >
                  Trackify
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: "Kavivanar, sans-serif",
                    marginTop: "5px",
                  }}
                >
                  Smart Surveillance Redefined
                </Typography>
              </div>
            </Grid>

            {/* Second Part */}
            <Grid item xs={6}>
              {/* content for the second part */}
              <div
                style={{
                  paddingTop: "40px",
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    paddingBottom: "5px",
                    fontFamily: "Lato, sans-serif",
                    fontWeight: "bold",
                  }}
                  sx={{ textAlign: "left" }}
                >
                  LOG IN
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    paddingBottom: "10px",
                    borderBottom: 2,
                    borderColor: "#fff",
                    color: "#9A9A9A",
                    textAlign: "left",
                  }}
                >
                  Log in with your ID and Password
                </Typography>
                <div style={{ padding: 30 }}></div>
                <Box
                  component="form"
                  className="login"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <Stack spacing={2} direction="column" m={2}>
                    <TextField
                      id="username"
                      name="username"
                      label="Username"
                      variant="outlined"
                      size="small"
                      sx={{ width: "280px", color: "#009193" }}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div style={{ fontSize: "10px", color: "red" }}>
                        {formik.errors.username}
                      </div>
                    )}
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type={eye ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      sx={{ width: "280px", color: "#009193" }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleEye}>
                              {eye ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div style={{ fontSize: "10px", color: "red" }}>
                        {formik.errors.password}
                      </div>
                    )}

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ background: "#009193" }}
                    >
                      Login
                    </Button>
                    <Typography
                  variant="body2"
                  sx={{  
                    color: "#9A9A9A",
                    textAlign: "left",
                  }}
                >
                  Don't have an account? Sign up <a href="./signup">here</a>
                </Typography>
                  </Stack>
                </Box>
                <div style={{ padding: 10 }}></div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
