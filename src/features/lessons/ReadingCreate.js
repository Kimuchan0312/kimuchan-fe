import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FSelect, FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";

import { createNewReadingLesson } from "./readingSlice";
import { useNavigate } from "react-router-dom";

const createReadingLessonSchema = Yup.object().shape({
  title: Yup.string().required("Input Title"),
  content: Yup.string().required("Input Content"),
  jlptLevel: Yup.string().required("Choose JLPT Level"),
  questions: Yup.string().required("Input Questions"),
});

function ReadingCreate() {
  const defaultValues = {
    title: "",
    content: "",
    jlptLevel: "",
    vocabulary: [],
    questions: [],
  };

  const jlptLevel = [
    { code: "N1", label: "N1" },
    { code: "N2", label: "N2" },
    { code: "N3", label: "N3" },
    { code: "N4", label: "N4" },
    { code: "N5", label: "N5" },
  ];

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(createReadingLessonSchema),
  });

  const handleContentChange = (event) => {
    const updatedContent = event.target.value.replace(/\n/g, "<br>");
    methods.setValue("content", updatedContent);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(createNewReadingLesson(data));
    reset();
    navigate("/");
  };

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
          Create New Reading Lesson
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField name="title" label="Title *" />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="jlptLevel" label="JLPT Level">
                {jlptLevel.map((level) => (
                  <option key={level.code} value={level.code}>
                    {level.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <FTextField
              name="content"
              multiline
              rows={5}
              label="Content"
              onChange={handleContentChange}
              value={methods.watch("content")}
            />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid sx={{ flexDirection: "column", pb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 1, pt: 1 }}
                >
                  Question:
                </Typography>
                <FTextField sx={{ p: 1 }} name="question" label="Question" />
                <FTextField sx={{ p: 1 }} name="correct-answer" label="Correct Answer" />
                <FTextField sx={{ p: 1 }} name="possible-answer" label="Possible Answer" />
                <FTextField sx={{ p: 1 }} name="possible-answer" label="Possible Answer" />
                <FTextField sx={{ p: 1 }} name="possible-answer" label="Possible Answer" />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              loading={isSubmitting}
              style={{ color: "black", backgroundColor: "#D1E3D3", margin: "1rem" }}

            >
              Create Reading Lesson
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}

export default ReadingCreate;
