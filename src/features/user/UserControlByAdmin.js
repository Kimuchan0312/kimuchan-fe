import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleUserByAdmin, getAllUsersByAdmin } from "./userSlice";
import {
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  Link,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";

function UserControlByAdmin() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  const { user } = useSelector((state) => state?.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllUsersByAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        User Management
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {user.count > 1
                ? `Have ${user.count} Users Found`
                : user.count === 1
                ? `Have 1 user found`
                : "User Not Found"}
            </Typography>
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                  display: { xs: "none", md: "block" },
                },
              }}
              component="div"
              count={user.count ? user.count : 0}
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
                      width: { xs: "none", sm: "20%", fontWeight: "bold" },
                    }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", sm: "7%" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Role
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "table-cell" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Phone Number
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "table-cell" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Email
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "table-cell" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Delete User
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.users?.map((user) => {
                  return (
                    <TableRow key={user._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          alt={user.name}
                          src={user.avatarUrl}
                          sx={{ mr: 2 }}
                        />
                        <Link
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                          component={RouterLink}
                          to={`/admin/updateUser/${user._id}`}
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {user.role}
                      </TableCell>
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {user.phoneNumber}
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          sx={{ fontSize: "0.6rem" }}
                          size="small"
                          variant="contained"
                          onClick={() =>
                            dispatch(deleteSingleUserByAdmin(user._id))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Container>
  );
}

export default UserControlByAdmin;