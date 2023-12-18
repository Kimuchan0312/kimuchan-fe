import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  email: "",
  password: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError
  } = methods;

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
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
          name="email"
          label="Your username or email"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "15px" }}
        />
        <FTextField
          name="password"
          label="Your password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "15px" }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility color="info" />
                  ) : (
                    <VisibilityOff color="info" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#D1E3D3",
            "&:hover": { backgroundColor: "#B8D1BE" },
            color: "#000",
          }}
          type="submit"
        >
          Login
        </Button>
        <Button
          component={RouterLink}
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
