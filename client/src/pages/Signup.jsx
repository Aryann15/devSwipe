import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';


const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const signupUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:5002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await signupUser(formData);
      const userId = response.user.id;
      navigate(`/onboarding?userId=${userId}`);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div>
       <Container component="main" maxWidth="xs">
      <Box
          sx={{
            backgroundColor:"white",
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius:10
          }}
        >
      <Typography component="h1" variant="h" padding={5}>
            Sign up
          </Typography>
      <Grid container spacing={2}
      borderRadius={10}>
              <Grid item xs={13} sm={14}></Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  // fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  // fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
               
              </Grid>
            </Grid>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" padding={3}>
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
      </Box>
      </Container>
    </div>
  );
};

export default SignupPage;
