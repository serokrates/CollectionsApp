import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  language:"EN"
};

export const chooseLanguage = createAsyncThunk("auth/chooseLanguage", async (language) => {
    console.log(language)
    const languageOut = localStorage.setItem("language", JSON.stringify(language));
    console.log(languageOut)
    return languageOut
  });

export const getLanguage = createAsyncThunk("auth/getLanguage", async () => {
    const language = JSON.parse(localStorage.getItem("language"));
    if(!language){
        return initialState.language
    }else{
        return language
    }
});

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(chooseLanguage.fulfilled, (state, action) => {
        state.language = action.payload;
      })
      .addCase(getLanguage.fulfilled, (state, action) => {
        state.language = action.payload;
      })
  },
});

export const { resetLanguage } = languageSlice.actions;
export default languageSlice.reducer;
