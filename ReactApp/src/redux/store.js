import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slice/sidebar";
import planningReducer from "./slice/planning";
import transactionReducer from "./slice/transaction"
import userReducer from "./slice/user"
import categoryReducer from "./category";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        planning: planningReducer,
        transaction: transactionReducer,
        category: categoryReducer,
        user: userReducer,
        // table: tableReducer
    },
    devTools: true
})