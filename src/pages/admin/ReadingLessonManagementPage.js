import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Pagination, Stack, Button } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import ReadingFilter from "../components/ReadingFilter";
import ReadingSearch from "../components/ReadingSearch";
import ReadingSort from "../components/ReadingSort";
import ReadingList from "../components/ReadingList";
import ReadingForm from "../components/ReadingForm"; // Create a form component for adding/updating reading lessons
import Banner from "../components/Banner";

function ReadingLessonManagementPage() {
  const [readingLessons, setReadingLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showReadingForm, setShowReadingForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedReadingLesson, setSelectedReadingLesson] = useState(null);

  const defaultValues = {
    jlptLevel: [],
    sortBy: "featured",
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  const filters = watch();

  const filterReadingLessons = applyFilter(
    readingLessons,
    filters,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    const fetchReadingLesson = async () => {
      try {
        const response = await apiService.get("/api/v1/reading-lessons");
        if (response.data) {
          setReadingLessons(response.data);
        } else {
          setError("No reading lessons found.");
        }
      } catch (error) {
        setError("Failed to fetch reading lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadingLesson();
  }, []);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  const totalPages = Math.ceil(readingLessons.length / itemsPerPage);

  const handleAddReadingLesson = () => {
    setFormMode("add");
    setSelectedReadingLesson(null);
    setShowReadingForm(true);
  };

  const handleEditReadingLesson = (lesson) => {
    setFormMode("edit");
    setSelectedReadingLesson(lesson);
    setShowReadingForm(true);
  };

  const handleDeleteReadingLesson = async (lessonId) => {
    try {
      // Call your API service to delete the reading lesson
      await apiService.delete(`/api/v1/reading-lessons/${lessonId}`);
      // Update the reading lessons after successful deletion
      setReadingLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== lessonId)
      );
    } catch (error) {
      setError("Failed to delete the reading lesson.");
    }
  };

  const handleFormClose = () => {
    setShowReadingForm(false);
    setSelectedReadingLesson(null);
    setFormMode("add");
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        // Call your API service to add a new reading lesson
        const response = await apiService.post("/api/v1/reading-lessons", formData);
        setReadingLessons((prevLessons) => [response.data, ...prevLessons]);
      } else if (formMode === "edit" && selectedReadingLesson) {
        // Call your API service to update the existing reading lesson
        const response = await apiService.put(
          `/api/v1/reading-lessons/${selectedReadingLesson.id}`,
          formData
        );
        setReadingLessons((prevLessons) =>
          prevLessons.map((lesson) =>
            lesson.id === response.data.id ? response.data : lesson
          )
        );
      }
      handleFormClose();
    } catch (error) {
      setError("Failed to save the reading lesson.");
    }
  };

  return (
    <div>
      <Banner />
      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3, ml: 1 }}>
        <Stack>
          <FormProvider methods={methods}>
            <ReadingFilter resetFilter={reset} />
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <ReadingSearch />
              <ReadingSort />
            </Stack>
          </FormProvider>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <ReadingList
                      readingLessons={filterReadingLessons}
                      onEdit={handleEditReadingLesson}
                      onDelete={handleDeleteReadingLesson}
                    />
                    <Button variant="contained" onClick={handleAddReadingLesson}>
                      Add Reading Lesson
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
          />
        </Stack>
      </Container>
      {showReadingForm && (
        <ReadingForm
          open={showReadingForm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          defaultValues={selectedReadingLesson}
        />
      )}
    </div>
  );
}

function applyFilter(readingLessons, filters, currentPage, itemsPerPage) {
  const { sortBy, searchQuery } = filters;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let filteredReadingLessons = readingLessons;

  if (sortBy === "newest") {
    filteredReadingLessons = orderBy(
      filteredReadingLessons,
      ["createdAt"],
      ["desc"]
    );
  }

  if (filters.jlptLevel?.length > 0) {
    filteredReadingLessons = filteredReadingLessons.filter((readingLesson) =>
      filters.jlptLevel.includes(readingLesson.jlptLevel)
    );
  }

  if (searchQuery) {
    filteredReadingLessons = filteredReadingLessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredReadingLessons.slice(startIndex, endIndex);
}

export default ReadingLessonManagementPage;
