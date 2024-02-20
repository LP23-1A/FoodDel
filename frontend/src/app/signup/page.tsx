"use client";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SignUpPage = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:8000/auth/signup";

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(BASE_URL, {
        ...input,
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(
          "Username already in use. Please choose a different username."
        );
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Бүртгүүлэх
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                color="success"
                id="firstName"
                label="Нэр"
                placeholder="Нэрээ бичнэ үү"
                type="text"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, username: e.target.value }))
                }
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                id="email"
                label="И-мэйл"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                id="address"
                label="Хаяг"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                name="password"
                label="Нууц үг"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="success"
                name="confirmPassword"
                label="Нууц үг давтах"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="success" />}
                label="Үйлчилгээний нөхцөл хүлээн зөвшөөрөх"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Бүртгүүлэх
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
