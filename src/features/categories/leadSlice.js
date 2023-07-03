import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {baseUrl} from "../../constants"


export const getLeadsContent = createAsyncThunk('/categories/content', async () => {
	const response = await axios.get('/api/users?page=2', {})
	return response.data;
})

export const categoriesSlice = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        categories : []
    },
    reducers: {


        addNewLead: (state, action) => {
            let {newLeadObj} = action.payload
            state.categories = [...state.categories, newLeadObj]
        },

        deleteLead: (state, action) => {
            let {index} = action.payload
            state.categories.splice(index, 1)
        }
    },

    extraReducers: {
		[getLeadsContent.pending]: state => {
			state.isLoading = true
		},
		[getLeadsContent.fulfilled]: (state, action) => {
			state.categories = action.payload.data
			state.isLoading = false
		},
		[getLeadsContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewLead, deleteLead } = categoriesSlice.actions

export default categoriesSlice.reducer