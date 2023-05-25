import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setSearchValue } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { showToast } from 'src/utils'
import { setFilterValue } from 'src/redux/slices/configuration/initialCallerThreeSlice'
import { setSelectedInitialCallerTwo } from 'src/redux/slices/configuration/initialCallerTwoSlice'
import AddInitialCallTwoWrapper from '../add/AddInitialCallTwoWrapper'
import DispositionListViews from '../../sharedComponentss/DispositionListView'


type Props = {
    initialCallerTwo: any[]

}

const InitialCallTwoListing = ({initialCallerTwo}:Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const {selectedInitialOne}:any=useSelector((state:RootState)=>state.initialCallerOne)
    const {selectedInitialCallerTwo,searchValue}:any=useSelector((state:RootState)=>state.initialCallerTwo)
    //const {selectedInitialCallerThree}:any=useSelector((state:RootState)=>state.initialCallerTwo)
   

    function handleDispositionOneClick(newValue: any)
    {
        if(selectedInitialCallerTwo?.value===newValue.value)
        {
            dispatch(setSelectedInitialCallerTwo(null))
            dispatch(setSelectedDispostionThree(null))
            dispatch(setFilterValue(""))
        }
        else{
            dispatch(setSelectedDispostionThree(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

  return (
    <>
    <DispositionListViews
      searchValue={searchValue}
      OnSearchChange={(newValue) =>
      
          dispatch(setSearchValue(newValue))
      }
        listHeading="InitialCaller  Two"
        listData={initialCallerTwo}
        onAddClick={() => {
            if (selectedInitialOne === null) {

                showToast('error', 'Please select InitialCall One')
            } else {
                setisOpenAddForm(true)
            }
        }}
        onListItemClick={(newValue) => {
            if (selectedInitialOne !== null) {
                handleDispositionOneClick(newValue)
            }
        }}
        disabled={false}
    />
    {isOpenAddForm && (
        <AddInitialCallTwoWrapper onClose={() => setisOpenAddForm(false)} />
    )}
</>
  )
}

export default InitialCallTwoListing
