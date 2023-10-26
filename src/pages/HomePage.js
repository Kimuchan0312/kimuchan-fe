import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import ReadingFilter from "../components/ReadingFilter";
import ReadingSearch from "../components/ReadingSearch";
import ReadingSort from "../components/ReadingSort";
import ReadingList from "../components/ReadingList";
import Banner from "../components/Banner";


function HomePage() {
  const [readingLessons, setReadingLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReadingLesson = async () => {

      try {
        const response = await apiService.get('/api/v1/reading-lessons'); 
        if (response.data) {
          setReadingLessons(response.data);
          setLoading(false);
        } else {
          setError('No reading lessons found.');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to fetch reading lessons.');
        setLoading(false);
      }
    };

    fetchReadingLesson();
  }, []);

  const defaultValues = {
    level: [],
    category: "All",
    sortBy: "featured",
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterReadingLessons = applyFilter(readingLessons, filters);

  return (
    <div>
    <Banner></Banner>
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
                <ReadingList readingLessons={filterReadingLessons} id={readingLessons._id}/>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
    </div>
  );
}

function applyFilter(readingLessons, filters) {
  const { sortBy } = filters;
  let filteredReadingLessons = [...readingLessons]; // Copy the readingLessons array.

  // SORT BY
  if (sortBy === "newest") {
    filteredReadingLessons = orderBy(filteredReadingLessons, ["createdAt"], ["desc"]);
  }

  // FILTER readingLessons
  if (filters.level?.length > 0) {
    filteredReadingLessons = filteredReadingLessons.filter((story) =>
      filters.level.includes(story.level)
    );
  }
  
  if (filters.category !== "All") {
    filteredReadingLessons = filteredReadingLessons.filter(
      (story) => story.category === filters.category
    );
  }
  if (filters.searchQuery) {
    filteredReadingLessons = filteredReadingLessons.filter((story) =>
      story.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredReadingLessons;
}

export default HomePage;