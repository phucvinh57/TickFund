import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer
    }
})