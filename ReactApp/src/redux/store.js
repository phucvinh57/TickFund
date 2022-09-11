import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";
import personalReducer from "./slice/personal"
import categoryReducer from "./slice/categories";
import permissionReducer from "./slice/permission"
import roleReducer from "./slice/role";
import usersReducer from "./slice/users"

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer,
        categories: categoryReducer,
        personal: personalReducer,
        permissions: permissionReducer,
        roles: roleReducer,
        users: usersReducer
    }
})