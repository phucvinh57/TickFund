import { createSlice } from "@reduxjs/toolkit";

const TableSlice = createSlice({
    name: 'TickTable',
    initialState: {
        header: null,
        filter: null,
        sort: null,
        query: null,
    },
    reducers: {
        addHeader : (action,payload) => {

        },
        
        handleFilter : (action, payload) => {

        },
        handleSort : (action, payload) => {

        },
        handleSearch : (action, payload) => {

        }
    }
})