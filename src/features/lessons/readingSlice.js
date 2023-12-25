import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  totalReadingLessons: 0,
  readingLessons: [],
  filteredReadingLessons: [],
  singleReadingLessonById: {},
  singleReadingLesson: {},
};

const slice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createNewReadingLessonSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
      },
    getAllReadingLessonsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, readingLessons } = action.payload.data;
      state.totalReadingLessons = count;
      state.readingLessons = readingLessons;
    },
    getSingleReadingLessonSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleBlog = action.payload.data;
    },
    updateSingleReadingLessonSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { _id, title, jlptLevel, content, vocabulary, questions } =
        action.payload.data;
      state.readingLessonsById[_id].title = title;
      state.readingLessonsById[_id].jlptLevel = jlptLevel;
      state.readingLessonsById[_id].content = content;
      state.readingLessonsById[_id].vocabulary = vocabulary;
      state.readingLessonsById[_id].questions = questions;
    },

    deleteSingleReadingLessonSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getFilteredReadingLessonsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, filteredReadingLessons } = action.payload.data;
      state.totalReadingLessons = count;
      state.filteredReadingLessons = filteredReadingLessons;
    },
  },
});

export const {
  startLoading,
  hasError,
  createNewReadingLessonSuccess,
  getAllReadingLessonsSuccess,
  getSingleReadingLessonSuccess,
  updateSingleReadingLessonSuccess,
  deleteSingleReadingLessonsuccess,
  getFilteredReadingLessonsSuccess,
} = slice.actions;

export const createNewReadingLesson =
  ({ title, content, jlptLevel, vocabulary, questions }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/api/v1/reading-lessons/", {
        title,
        content,
        jlptLevel,
        vocabulary,
        questions,
      });

      dispatch(slice.actions.createNewReadingLessonSuccess(response.data));

      toast.success("Create a new reading lesson success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateSingleReadingLesson =
  ({ lessonId, data }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await apiService.put(
        `/api/v1/reading-lessons/${lessonId}`,
        data
      );
      dispatch(slice.actions.updateSingleReadingLessonSuccess(response.data));

      toast.success("Update reading lesson success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getAllReadingLessons =
  ({ page, limit = '10' }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.get(
        `/api/v1/reading-lessons?page=${page}&limit=${limit}`
      );
      dispatch(getAllReadingLessonsSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleReadingLesson =
  ({ readingId }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.get(`/api/v1/reading-lessons/${readingId}`);
      dispatch(getSingleReadingLessonSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleReadingLesson = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await apiService.delete(`/api/v1/reading-lessons/${id}`);
    dispatch(deleteSingleReadingLessonsuccess());
    toast.success("Deleted Reading Lessons successfully");
    dispatch(getAllReadingLessons());
  } catch (error) {
    dispatch(hasError(error.message));
    toast.error(error.message);
  }
};

export const getFilterReadingLessons =
  ({ page, limit = 10, jlptLevel }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.get(
        `/api/v1/reading-lessons/${jlptLevel}?page=${page}&limit=${limit}`
      );
      dispatch(getFilteredReadingLessonsSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
