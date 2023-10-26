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


function HomePage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReadingLesson = async () => {

      try {
        const response = await apiService.get('/api/v1/reading-lessons'); 
        if (response.data) {
          setStories(response.data);
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
  const filterStories = applyFilter(stories, filters);

  return (
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
                <ReadingList stories={filterStories} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

function applyFilter(stories, filters) {
  const { sortBy } = filters;
  let filteredStories = [...stories]; // Copy the stories array.

  // SORT BY
  if (sortBy === "newest") {
    filteredStories = orderBy(filteredStories, ["createdAt"], ["desc"]);
  }

  // FILTER STORIES
  if (filters.level?.length > 0) {
    filteredStories = filteredStories.filter((story) =>
      filters.level.includes(story.level)
    );
  }
  
  if (filters.category !== "All") {
    filteredStories = filteredStories.filter(
      (story) => story.category === filters.category
    );
  }
  if (filters.searchQuery) {
    filteredStories = filteredStories.filter((story) =>
      story.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredStories;
}

export default HomePage;