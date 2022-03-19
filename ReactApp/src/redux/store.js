import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer
    }
})