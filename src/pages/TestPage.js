import React, { useState, useEffect } from "react";
import { Container, Stack, Pagination, Alert, Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";
import TestFilter from "../components/TestFilter";
import TestList from "../components/TestList";
import apiService from "../app/apiService";

function TestPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const defaultValues = {
    jlptLevel: [],
  };
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  const filters = watch();
  console.log("Current filters:", filters);
  const filterTests = applyFilter(tests, filters, currentPage, itemsPerPage);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        console.log("Before API request");
        const response = await apiService.get("/api/v1/tests");
        console.log("After API request");
        if (response.data) {
          setTests(response.data);
          setLoading(false);
        } else {
          setError("No reading lessons found.");
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch reading lessons.");
        setLoading(false);
      }
    };
    fetchTest();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(tests.length / itemsPerPage);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3, ml: 1 }}>
      <Stack>
        <FormProvider {...methods}>
          <TestFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TestList tests={filterTests} />
          )}
        </Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Container>
  );
}

function applyFilter(tests, filters, currentPage, itemsPerPage) {
  const { jlptLevel } = filters;
  console.log("All tests:", tests);
  console.log("JLPT Level filter:", jlptLevel);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let filteredTests = tests;

  // Filter by JLPT level
  if (jlptLevel?.length > 0) {
    filteredTests = filteredTests.filter((lesson) =>
      jlptLevel.includes(lesson.jlptLevel)
    );
  }
  console.log("Filtered lessons:", filteredTests);
  return filteredTests.slice(startIndex, endIndex);
}

export default TestPage;
