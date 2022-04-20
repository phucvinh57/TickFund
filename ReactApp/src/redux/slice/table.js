import { createSlice } from "@reduxjs/toolkit";

const TableSlice = createSlice({
    name: 'TickTable',
    initialState: {
        filter: null,
        sort: null,
        query: null,
    } 
})