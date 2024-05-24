/// ==============================================
// Filename:userAccesSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import {
//     UserModuleActionTypes,
//     UserModuleNameTypes,
// } from 'src/models/userAccess/UserAccess.model'

// |-- Internal Dependencies --|

export interface fieldTypes {
    fieldId: string
    fieldName: string
    fieldValue: string
}
export interface moduleActionTypes {
    actionId: string
    actionUrl: string
    actionName: string
    parentGroup: string[]
    fields: fieldTypes[]
    compulsoryFields: string[]
}

export interface ModulesTypes {
    moduleId: string
    moduleName: string
    parentGroup: string[]
    moduleAction: moduleActionTypes[]
}

export interface userAccesTypes {
    userId: string | null
    departmentId: string
    departmentName: string
    userRole: string
    userName: string
    modules: ModulesTypes[]
}
export type InitialStateType = {
    userAccessItems: userAccesTypes
    checkUserAccess: userAccesTypes
    searchValue: string
    accordionNumber: number | null
}

const initialState: InitialStateType = {
    checkUserAccess: {
        userId: null,
        departmentId: '',
        departmentName: '',
        userRole: '',
        userName: '',
        modules: [],
    },
    userAccessItems: {
        userId: null,
        departmentId: '',
        departmentName: '',
        userRole: '',
        userName: '',
        modules: [],
    },
    searchValue: '',
    accordionNumber: null,
}

const userAccesSlice: Slice<InitialStateType> = createSlice({
    name: 'userAcces',
    initialState,
    reducers: {
        setUserModule: (state, action: PayloadAction<ModulesTypes[] | []>) => {
            state.userAccessItems = {
                ...state.userAccessItems,
                modules: [...action.payload],
            }
        },
        setUserAccess: (state, action: PayloadAction<ModulesTypes[]>) => {
            state.userAccessItems.modules = action.payload
        },
        setCheckUserAccess: (state, action: PayloadAction<ModulesTypes[]>) => {
            state.checkUserAccess.modules = action.payload
        },
        setUserAccessModuleSearchValue: (
            state,
            action: PayloadAction<string>
        ) => {
            state.searchValue = action.payload
        },
        setAccordionNumberValue: (
            state,
            action: PayloadAction<number | null>
        ) => {
            state.accordionNumber = action.payload
        },
    },
})

export const {
    setUserModule,
    setUserAccess,
    setCheckUserAccess,
    setUserAccessModuleSearchValue,
    setAccordionNumberValue,
} = userAccesSlice.actions

export default userAccesSlice.reducer
