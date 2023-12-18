import React, { useCallback, useEffect } from "react";

import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserByAdmin, updateSingleUserByAdmin } from "./userSlice";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

import {
  FormProvider,
  FSelect,
  FTextField,
  FUploadAvatar,
} from "../../components/form";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { fData } from "../../utils/numberFormat";

function UpdateUserByAdmin() {
  const navigate = useNavigate();
  const params = useParams();
  const targetUserId = params.userId;

  const dispatch = useDispatch();

  let { user } = useAuth();

  useEffect(() => {
    dispatch(getSingleUserByAdmin(targetUserId));
  }, [dispatch, targetUserId]);

  const isLoading = useSelector((state) => state.user?.isLoading);
  const selectedUser = useSelector((state) => state.user?.selectedUser);

  const defaultValues = {
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    phoneNumber: selectedUser?.phoneNumber || "",
    avatarUrl: selectedUser?.avatarUrl || "",
    role: selectedUser?.role || "",
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    try {
      const updatedData = { ...defaultValues, ...data };
      dispatch(
        updateSingleUserByAdmin({ id: selectedUser._id, ...updatedData })
      );
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  const handleDropAvatar = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatar",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  if (isLoading || !selectedUser) return <LoadingScreen />;
  if (!isLoading && selectedUser && user.role === "admin")
    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                <FUploadAvatar
                  name="avatar"
                  accept=".jpeg, .jpg, .png"
                  maxSize={3145728}
                  onDrop={handleDropAvatar}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <Typography
                  sx={{ p: 2, fontWeight: "bold", textTransform: "uppercase" }}
                >
                  {selectedUser.name}
                </Typography>
                <Grid item justifyItems="left">
                  <Typography>{selectedUser.email}</Typography>
                  <Typography>{selectedUser.phoneNumber}</Typography>
                  <Typography>{selectedUser.role}</Typography>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography
                  sx={{
                    p: 3,
                    fontWeight: "bold",
                    color: "main.primary",
                  }}
                >
                  UPDATE PROFILE
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    rowGap: 3,
                    columnGap: 3,
                  }}
                >
                  {" "}
                  <FTextField
                    name="name"
                    label="Username *"
                    value={selectedUser.name}
                  />
                  <FTextField
                    name="phoneNumber *"
                    label="Phone Number"
                    value={selectedUser.phoneNumber}
                  />
                  <FTextField
                    name="Email"
                    label="Email *"
                    value={selectedUser.email}
                  />
                  <FSelect name="role">
                    {[
                      { code: "client", label: "Khách" },
                      { code: "admin", label: "Quản trị viên" },
                    ].map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                </Box>
                <Stack spacing={{ p: 3 }} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting || isLoading}
                  >
                    Save changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </FormProvider>
    );
}

export default UpdateUserByAdmin;