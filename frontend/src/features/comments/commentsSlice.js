import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  comments: [],
  commentsForItemID: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const createComment = createAsyncThunk(
  "comments/create",
  async (d, thunkAPI) => {
    // d = { text, itemID, userID, actionToDo }
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await commentsService.createComment(d, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllComments = createAsyncThunk(
  "comments/getAll",
  async (collectionID, thunkAPI) => {
    try {
      return await commentsService.getAllComments(collectionID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCommentsForID = createAsyncThunk(
  "comments/getAll",
  async (itemID, thunkAPI) => {
    try {
      return await commentsService.getCommentsForID(itemID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const likesComment = createAsyncThunk(
  "comments/likesComment",
  async (d, thunkAPI) => {
    console.log(d);
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await commentsService.likesComment(d, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsForID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsForID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.comments = action.payload;
      })
      .addCase(getCommentsForID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentsSlice.actions;
export default commentsSlice.reducer;
