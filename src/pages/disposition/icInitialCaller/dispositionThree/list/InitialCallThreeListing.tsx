import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import AddInitialCallThreeWrappper from '../add/AddInitialCallThreeWrapper'
import { setSelectedInitialCallerThree } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import { showToast } from 'src/utils'
import DispositionListViews from '../../sharedComponentss/DispositionListView'

type Props = {
    initialCallerThree: any[]
}

const InitialCallThreeListing = ({ initialCallerThree }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const { selectedInitialCallThree }: any = useSelector(
        (state: RootState) => state.initialCallerThree
    )
    const { selectedInitialCallerTwo }: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )

    function handleDispositionOneClick(newValue: any) {
        if (selectedInitialCallThree?.value === newValue.value) {
            dispatch(setSelectedInitialCallerThree(null))
        } else {
            dispatch(setSelectedInitialCallerThree(newValue))
        }
    }

    return (
        <>
            <DispositionListViews
                listHeading="InitialCaller Three"
                listData={initialCallerThree}
                onAddClick={() => {
                    if (selectedInitialCallerTwo === null) {
                        showToast('error', 'Please select InitialCall Two')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedInitialCallerTwo !== null) {
                        handleDispositionOneClick(newValue)
                    }
                }}
                disabled={false}
            />
            {isOpenAddForm && (
                <AddInitialCallThreeWrappper
                   
                />
            )}
        </>
    )
}

export default InitialCallThreeListing
