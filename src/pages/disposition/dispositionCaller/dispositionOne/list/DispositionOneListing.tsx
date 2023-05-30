import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import DispositionListView from '../../sharedComponents/DispositionListView'
import { setSelectedDispositionOne } from 'src/redux/slices/configuration/dispositionOneSlice'
import AddDispositionOneWrappper from '../add/AddDispositionOneWrapper'
import {
    setFilterValue,
    setSelectedDispostion,
} from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { setFilterValue as setThreeFilterValueValue } from 'src/redux/slices/configuration/dispositionThreeSlice'

type Props = {
    dispositionOne: any[]
}

const DispositionOneListing = ({ dispositionOne }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { selectedDispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )
    // const {selectedDispostionThree}:any=useSelector((state:RootState)=>state.dispositionThree)

    function handleDispositionOneClick(newValue: any) {
        if (selectedDispositionOne?.value === newValue.value) {
            dispatch(setSelectedDispositionOne(null))
            dispatch(setSelectedDispostion(null))
            dispatch(setSelectedDispostionThree(null))
            dispatch(setFilterValue(''))
            dispatch(setThreeFilterValueValue(''))
        } else {
            dispatch(setSelectedDispositionOne(newValue))
            dispatch(setFilterValue(newValue.value))
            dispatch(setSelectedDispostion(null))
            dispatch(setSelectedDispostionThree(null))
        }
    }

    return (
        <>
            <DispositionListView
                listHeading="Disposition One"
                listData={dispositionOne}
                onAddClick={() => {
                    setisOpenAddForm(true)
                }}
                onListItemClick={(newValue) => {
                    handleDispositionOneClick(newValue)
                }}
                disabled={false}
            />
            {isOpenAddForm && (
                <AddDispositionOneWrappper
                    onClose={() => setisOpenAddForm(false)}
                />
            )}
        </>
    )
}

export default DispositionOneListing
