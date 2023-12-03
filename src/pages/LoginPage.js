import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});
const defaultValues = {
  username: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: "350px",
          maxWidth: "400px",
          backgroundColor: "#FAF3E9",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <FTextField
          name="username"
          label="Your username or email"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "15px" }}
        />
        <FTextField
          name="password"
          label="Your password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "15px" }}
        />

        <FormControlLabel
          control={<Checkbox name="remember" color="primary" />}
          label="Remember me"
          sx={{ marginBottom: "15px" }}
        />

        <Link
          href="#"
          variant="body2"
          sx={{ float: "right", marginBottom: "15px" }}
        >
          Forgot your password?
        </Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#D1E3D3",
            "&:hover": { backgroundColor: "#B8D1BE" },
            color: "#000",
          }}
        >
          Login
        </Button>
        <Button
          component={Link} 
          to="/register" 
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ECD3D3", // Customize the color
            "&:hover": { backgroundColor: "#ECD3E1" },
            color: "#000", // Text color
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
