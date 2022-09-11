import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";
import personalReducer from "./slice/personal"
import categoryReducer from "./category";
import permissionReducer from "./slice/permission"
import roleReducer from "./slice/role";
import userReducer from "./slice/users"

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer,
        category: categoryReducer,
        personal: personalReducer,
        permissions: permissionReducer,
        roles: roleReducer,
        users: userReducer
    }
})