import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";
import personalReducer from "./slice/personal"
import categoryReducer from "./category";
import rolesReducer from "./slice/roles"

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer,
        category: categoryReducer,
        personal: personalReducer,
        roles: rolesReducer
    }
})