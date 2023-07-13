/// ==============================================
// Filename:userAccesSlice.ts
// Type: Slice Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- External Dependencies --|
import { createSlice, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// |-- Internal Dependencies --|

export interface fieldTypes {
  fieldid: string
  fieldName: string
  fieldValue: string
}
export interface moduleActionTypes {
  actionId: string
  actionUrl: string
  actionName: string
  fields: fieldTypes[]
}

export interface ModulesTypes {
  moduleId: string
  moduleName: string
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
}

const initialState: InitialStateType = {
  checkUserAccess: {
    userId: null,
    departmentId: "",
    departmentName: "",
    userRole: "",
    userName: "",
    modules: []
  },
  userAccessItems: {
    userId: null,
    departmentId: "",
    departmentName: "",
    userRole: "",
    userName: "",
    modules: []
  }
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
    setCheckUserAccess: (
      state,
      action: PayloadAction<ModulesTypes[]>
    ) => {
      //console.log(action.payload, "action.payload")
      state.checkUserAccess.modules = action.payload
    },
  },
})

export const {
  setUserModule,
  setUserAccess,
  setCheckUserAccess
} = userAccesSlice.actions


export default userAccesSlice.reducer
