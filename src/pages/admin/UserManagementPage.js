import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Pagination, Stack, Button } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import UserSearch from "../components/UserSearch";
import UserProfile from "../components/UserProfile";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Banner from "../components/Banner";

function ManageUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [formMode, setFormMode] = useState("add");

  const defaultValues = {
  };

  const methods = useForm({
    defaultValues,
  });

  
  const fetchUsers = async () => {
    try {
      const response = await apiService.get("/api/v1/users");
      if (response.data) {
        setUsers(response.data);
      } else {
        setError("No users found.");
      }
    } catch (error) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  const handleViewUserProfile = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
  };

  const handleAddUser = () => {
    setFormMode("add");
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setFormMode("edit");
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiService.delete(`/api/v1/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Failed to delete the user.");
    }
  };

  const handleFormClose = () => {
    setShowUserForm(false);
    setSelectedUser(null);
    setFormMode("add");
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        const response = await apiService.post("/api/v1/users", formData);
        setUsers((prevUsers) => [response.data, ...prevUsers]);
      } else if (formMode === "edit" && selectedUser) {
        const response = await apiService.put(
          `/api/v1/users/${selectedUser.id}`,
          formData
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === response.data.id ? response.data : user))
        );
      }
      handleFormClose();
    } catch (error) {
      setError("Failed to save the user.");
    }
  };

  const handleSearch = (searchText) => {
    const searchResults = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsers(searchResults);
  };

  const handleResetSearch = () => {
    fetchUsers();
  };

  return (
    <div>
      <Banner />
      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3, ml: 1 }}>
        <Stack>
          <FormProvider methods={methods}>
          <UserSearch
            onSearch={handleSearch}
            onReset={handleResetSearch}
          />
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <UserList
                      users={users}
                      onViewProfile={handleViewUserProfile}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                    />
                    <Button variant="contained" onClick={handleAddUser}>
                      Add User
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
          <Pagination
            count={Math.ceil(users.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
          />
        </Stack>
      </Container>
      {selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {showUserForm && (
        <UserForm
          open={showUserForm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          defaultValues={selectedUser}
        />
      )}
    </div>
  );
}
  

export default ManageUserPage;
