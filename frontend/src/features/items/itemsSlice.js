import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemsService from "./itemsService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  items: [],
  item: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  tags: [],
  itemsSearched: [],
};
export const createItem = createAsyncThunk(
  "items/create",
  async (d, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await itemsService.createItem(d, token);
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
export const getItems = createAsyncThunk(
  "items/getAll",
  async (collectionID, thunkAPI) => {
    try {
      return await itemsService.getItems(collectionID);
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
export const deleteItem = createAsyncThunk(
  "items/getAll",
  async (d, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemsService.deleteItem(token, d);
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
export const deleteItemFromCollection = createAsyncThunk(
  "items/getAll",
  async (d, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemsService.deleteItemFromCollection(token, d);
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
export const getAllTags = createAsyncThunk(
  "items/getAllTags",
  async (_, thunkAPI) => {
    try {
      return await itemsService.getAllTags();
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
export const findUsingTags = createAsyncThunk(
  "items/findUsingTags",
  async (tag, thunkAPI) => {
    try {
      return await itemsService.findUsingTags(tag);
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
export const findForString = createAsyncThunk(
  "items/findForString",
  async (name, thunkAPI) => {
    try {
      console.log("findForString");
      return await itemsService.findForString(name);
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
export const getItem = createAsyncThunk(
  "items/getONE",
  async (itemID, thunkAPI) => {
    try {
      return await itemsService.getItem(itemID);
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
export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tags = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findUsingTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findUsingTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(findUsingTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findForString.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findForString.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.itemsSearched = action.payload;
      })
      .addCase(findForString.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemsSlice.actions;
export default itemsSlice.reducer;
