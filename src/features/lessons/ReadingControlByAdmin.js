import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { deleteSingleReadingLesson, getAllReadingLessons } from "./readingSlice"; 

function ReadingControlByAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const state = useSelector((state) => state);
  console.log('Redux State:', state);

  const { readingLessons, totalReadingLessons } = useSelector((state) => state.readingLessons); 

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    dispatch(getAllReadingLessons({ page: page + 1, limit: rowsPerPage })); 
  }, [page, rowsPerPage, dispatch]);

  const formattedTotalReadingLessons = useMemo(() => {
    if (totalReadingLessons > 1) {
      return `${totalReadingLessons} Reading Lessons found`;
    } else if (totalReadingLessons === 1) {
      return `1 Reading Lesson found`;
    } else {
      return "No Reading Lessons found";
    }
  }, [totalReadingLessons]);
  

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
       Reading Lessons Control
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
              {formattedTotalReadingLessons}
            </Typography>
            <TablePagination
              // ... rest of the code remains the same
              component="div"
              count={totalReadingLessons ? totalReadingLessons : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell
                    sx={{
                      width: { xs: "none", sm: "30%" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                   Title
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      JLPT Level
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      View Count
                    </TableCell>
                  )}{" "}
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", sm: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Delete the reading lessons
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(readingLessons) ? (
                  readingLessons?.map((lesson) => (
                    <TableRow key={lesson._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <RouterLink to={`/reading-lessons/${lesson._id}`}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {lesson.title.slice(0, 50)}...
                          </Typography>
                        </RouterLink>
                      </TableCell>
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {lesson.readCount}
                        </TableCell>
                           )}
                       {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {lesson.jlptLevel}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {lesson.readCount}
                        </TableCell>
                      )}{" "}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            sx={{ fontSize: "0.6rem" }}
                            size="small"
                            variant="contained"
                            onClick={() => dispatch(deleteSingleReadingLesson(lesson._id))}
                          >
                            DELETE
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="subtitle">
                        No reading lessons data
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Container>
  );
}

export default ReadingControlByAdmin;
