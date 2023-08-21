import { createSlice } from '@reduxjs/toolkit'

export const offcanvasSlice = createSlice({
    name: 'offcanvas',
    initialState: {
        title: "",  // current  title state management
        isOpen : false,   // modal state management for opening closing
        bodyType : "",   // modal content management
        size : "",   // modal content management
        extraObject : {},   
    },
    reducers: {

        openOffcanvas: (state, action) => {
            const {title, bodyType, extraObject, size} = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.title = title
            state.size = size || 'md'
            state.extraObject = extraObject
        },

        closeOffcanvas: (state, action) => {
            state.isOpen = false
            state.bodyType = ""
            state.title = ""
            state.extraObject = {}
        },

    }
})

export const { openOffcanvas, closeOffcanvas } = offcanvasSlice.actions

export default offcanvasSlice.reducer