import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import collectionsReducer from "../features/collections/collectionsSlice";
import itemsReducer from "../features/items/itemsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    comments: commentsReducer,
  },
});
