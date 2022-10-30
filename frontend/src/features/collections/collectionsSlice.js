import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import collectionsService from "./collectionsService";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

const initialState = {
  collections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  topFiveItemNum: [],
};

export const deleteCollection = createAsyncThunk(
  "collections/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await collectionsService.deleteCollection(id, token);
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
export const createCollection = createAsyncThunk(
  "collections/create",
  async (d, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return await collectionsService.createCollection(d, token);
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

export const getTopFiveCollections = createAsyncThunk(
  "collections/getTopFiveCollections",
  async (_, thunkAPI) => {
    try {
      console.log("getTopFiveCollections");
      return await collectionsService.getTopFiveCollections();
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
export const getCollections = createAsyncThunk(
  "collections/getAll",
  async (_, thunkAPI) => {
    try {
      return await collectionsService.getCollections();
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
export const getUserCollections = createAsyncThunk(
  "collections/getCollections",
  async (userID, thunkAPI) => {
    try {
      return await collectionsService.getUserCollections(userID);
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
export const editCollection = createAsyncThunk(
  "collections/editCollection",
  async (dataPut, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await collectionsService.editCollection(dataPut, token);
    } catch (error) {
      console.log(error);
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
export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collections = action.payload;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collections = action.payload;
      })
      .addCase(getUserCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);

        state.collections = state.collections.filter(
          (collection) => collection._id !== action.payload._id
        );
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTopFiveCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopFiveCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collections = action.payload[0];
        state.topFiveItemNum = action.payload[1];
      })
      .addCase(getTopFiveCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = collectionsSlice.actions;
export default collectionsSlice.reducer;
