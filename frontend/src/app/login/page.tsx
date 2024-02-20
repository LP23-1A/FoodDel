"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const Page = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:8000/auth/login";

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(BASE_URL, {
        ...input,
      });

      localStorage.setItem("token", JSON.stringify(data.token));

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data?.msg || "An error occurred during login.");
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
          Нэвтрэх
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            color="success"
            id="email"
            label="Имэйл"
            placeholder="Имэйл хаягаа оруулна уу"
            name="username"
            autoComplete="email"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            color="success"
            name="password"
            label="Нууц үг"
            type="password"
            id="password"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, password: e.target.value }))
            }
            autoComplete="current-password"
          />
          <Grid container>
            <Grid
              item
              xs
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <Link href="#" variant="body2">
                Нууц үг сэргээх?
              </Link>
            </Grid>
          </Grid>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Сануулах"
          /> */}
          <Stack>
            <Button
              type="submit"
              fullWidth
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Нэвтрэх
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              эсвэл
            </Box>

            <Button
              variant="outlined"
              type="button"
              fullWidth
              color="success"
              sx={{ mt: 3, mb: 3 }}
            >
              Бүртгүүлэх
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
