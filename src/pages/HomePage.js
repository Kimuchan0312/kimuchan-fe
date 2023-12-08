import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Pagination, Stack } from "@mui/material";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); 


  const defaultValues = {
    jlptLevel: [],
    sortBy: "featured",
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  console.log("Current filters:", filters);
  const filterReadingLessons = applyFilter(readingLessons, filters, currentPage, itemsPerPage);

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

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  const totalPages = Math.ceil(readingLessons.length / itemsPerPage);


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
                <ReadingList readingLessons={filterReadingLessons}/>
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
    </div>
  );
}

function applyFilter(readingLessons, filters, currentPage, itemsPerPage) {
  const { sortBy, searchQuery } = filters;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let filteredReadingLessons = readingLessons;

  // SORT BY
  if (sortBy === "newest") {
    filteredReadingLessons = orderBy(filteredReadingLessons, ["createdAt"], ["desc"]);
  }

  // FILTER BY JLPT LEVEL
  if (filters.jlptLevel?.length > 0) {
    filteredReadingLessons = readingLessons.filter((readingLesson) =>
      filters.jlptLevel.includes(readingLesson.jlptLevel)
    );
  }

  // FILTER BY SEARCH QUERY
  if (searchQuery) {
    filteredReadingLessons = filteredReadingLessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  console.log("Filtered lessons:", filteredReadingLessons);
  return filteredReadingLessons.slice(startIndex, endIndex);
  
}

export default HomePage;