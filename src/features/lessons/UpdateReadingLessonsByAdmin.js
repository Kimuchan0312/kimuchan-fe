import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FTextField,
  FormProvider,
} from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleReadingLesson,
  updateSingleReadingLesson,
} from "./readingSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

function UpdateReadingLessonsByAdmin() {
  const isLoading = useSelector((state) => state.post?.isLoading);
  const singleReadingLesson = useSelector((state) => state.lesson?.singleReadingLesson);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const readingId = params.readingId;
  const defaultValues = {
    title: singleReadingLesson?.title || "",
    status: singleReadingLesson?.status || "",
  };
  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (readingId) {
      dispatch(getSingleReadingLesson({ readingId }));
    }
  }, [dispatch, readingId]);

  useEffect(() => {
    if (singleReadingLesson) {
      reset({
        title: singleReadingLesson?.title || "",
        content: singleReadingLesson?.content || "",
        vocabulary: singleReadingLesson?.vocabulary || "",
        questions: singleReadingLesson?.questions || "",
      });
    }
  }, [singleReadingLesson, reset]);

  const onSubmit = (data) => {
    dispatch(updateSingleReadingLesson({ data, postId: singleReadingLesson._id })).then(reset());
    navigate("/admin/controlPanel");
  };

  const renderTextField = (name, label, placeholder, multiline) => {
    return (
      <FTextField
        name={name}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
      />
    );
  };

  const renderGridRow = (items) => {
    return (
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        {items.map((item, index) => (
          <FTextField
            key={index}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
          />
        ))}
      </Grid>
    );
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          sx={{
            m: 3,
            p: 3,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Edit Reading Lessons
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {renderTextField(
              "title",
              "Title *",
              singleReadingLesson.title,
            )}
            {renderGridRow([
              {
                name: "jlptLevel",
                label: "Choose JLPT Level*",
                placeholder: singleReadingLesson.jlptLevel,
              }
            ])}
            {renderGridRow([
              {
                name: "vocabulary",
                label: "Vocabulary*",
                placeholder: singleReadingLesson.vocabulary,
              },
              {
                name: "questions",
                label: "Input Question*",
                placeholder: singleReadingLesson.questions,
              },
            ])}
            {renderTextField(
              "content",
              "Content",
              singleReadingLesson.content,
              true,
              4
            )}
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              Confirm Update
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}

export default UpdateReadingLessonsByAdmin;
