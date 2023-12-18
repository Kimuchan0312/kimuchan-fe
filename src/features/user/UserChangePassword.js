import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { changePassword } from "./userSlice";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const PasswordSchema = Yup.object().shape({
  newPasswordConfirmation: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu")
    .oneOf([Yup.ref("newPassword")], "Xác nhận mật khẩu không đúng"),
});

function UserChangePassword() {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [
    showNewPasswordConfirmation,
    setShowNewPasswordConfirmation,
  ] = useState(false);

  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async ({ oldPassword, newPassword }) => {
    try {
      await dispatch(changePassword({ oldPassword, newPassword }));
      navigate("/HomePage");
      auth.logout();
    } catch (error) {
      setError("responseError", { type: "manual", message: error.message });
    }
  };

  return (
    <Container maxWidth="xs">
      <Helmet>Chợ đất Tây Nguyên | Thay đổi mật khẩu</Helmet>
      <Box
        sx={{ position: "absolute", left: "5%", top: "5%" }}
        name="breadcrumbs"
      >
        <Breadcrumbs
          color="primary"
          m={1}
          separator="›"
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", color: "primary" }}
            href="/HomePage"
          >
            <HomeIcon sx={{ color: "primary", mr: 0.5 }} fontSize="inherit" />
            Home Page
          </Link>
          <Typography color="primary">Thay đổi mật khẩu</Typography>
        </Breadcrumbs>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ color: "#ffffff" }}>
          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="oldPassword"
            label="Nhập mật khẩu cũ"
            className="box-field"
            type={showOldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="newPassword"
            label="Nhập mât khẩu mới"
            className="box-field"
            type={showNewPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="newPasswordConfirmation"
            label="Xác nhận mật khẩu mới"
            className="box-field"
            type={showNewPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowNewPasswordConfirmation(
                        !showNewPasswordConfirmation
                      )
                    }
                    edge="end"
                  >
                    {showNewPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ĐỔI MẬT KHẨU
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default UserChangePassword;