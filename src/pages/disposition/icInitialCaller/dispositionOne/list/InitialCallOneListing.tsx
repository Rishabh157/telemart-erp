import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSelectedInitialOne } from 'src/redux/slices/configuration/initialCallerOneSlice'
import AddInitialCallOneWrapper from '../add/AddInitialCallOneWrapper'
import {
    setFilterValue,
    setSelectedInitialCallerTwo,
} from 'src/redux/slices/configuration/initialCallerTwoSlice'
import { setSelectedInitialCallerThree } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import DispositionListViews from '../../sharedComponentss/DispositionListView'

type Props = {
    initialCallerOne: any[]
}

const InitialCallOneListing = ({ initialCallerOne }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { selectedInitialOne }: any = useSelector(
        (state: RootState) => state.initialCallerOne
    )

    // const {selectedInitialCallerTwo}:any=useSelector((state:RootState)=>state.initialCallerTwo)
    // const {selectedInitialCallerThree}:any=useSelector((state:RootState)=>state.initialCallerTwo)

    function handleDispositionOneClick(newValue: any) {
        if (selectedInitialOne?.value === newValue.value) {
            dispatch(setSelectedInitialOne(null))
            dispatch(setSelectedInitialCallerTwo(null))
            dispatch(setSelectedInitialCallerThree(null))
            dispatch(setFilterValue(''))
        } else {
            dispatch(setSelectedInitialOne(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

    return (
        <>
            <DispositionListViews
                listHeading="InitialCaller One"
                listData={initialCallerOne}
                onAddClick={() => {
                    setisOpenAddForm(true)
                }}
                onListItemClick={(newValue) => {
                    handleDispositionOneClick(newValue)
                }}
                disabled={false}
            />
            {isOpenAddForm && (
                <AddInitialCallOneWrapper
                    onClose={() => setisOpenAddForm(false)}
                />
            )}
        </>
    )
}

export default InitialCallOneListing
