import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";
import userReducer from "./slice/user"
import categoryReducer from "./category";
import roleReducer from "./slice/role"

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer,
        category: categoryReducer,
        user: userReducer,
        role: roleReducer
    }
})