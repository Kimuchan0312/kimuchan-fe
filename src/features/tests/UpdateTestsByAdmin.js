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
import { deleteSingleTest, getAllTests } from "./testSlice"; // Adjust these imports based on your Redux setup

function TestControlPanel() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const { tests, totalTests } = useSelector((state) => state.tests); // Update the state selector

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    dispatch(getAllTests({ page: page + 1, limit: rowsPerPage })); // Adjust action call
  }, [page, rowsPerPage, dispatch]);

  const formattedTotalTests = useMemo(() => {
    if (totalTests > 1) {
      return `${totalTests} Tests found`;
    } else if (totalTests === 1) {
      return `1 Test found`;
    } else {
      return "No Tests found";
    }
  }, [totalTests]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Test Control Panel
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
              {formattedTotalTests}
            </Typography>
            <TablePagination
              component="div"
              count={totalTests ? totalTests : 0}
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
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Title
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      Description
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      Number of Lessons
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      Delete Test
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(tests) ? (
                  tests.map((test) => (
                    <TableRow key={test._id} hover>
                      <TableCell>
                        <RouterLink to={`/tests/${test._id}`}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {test.title}
                          </Typography>
                        </RouterLink>
                      </TableCell>
                      {!isMobile && (
                        <TableCell>
                          {test.description}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell>
                          {test.lessons.length}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => dispatch(deleteSingleTest(test._id))}
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
                        No test data
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

export default TestControlPanel;
