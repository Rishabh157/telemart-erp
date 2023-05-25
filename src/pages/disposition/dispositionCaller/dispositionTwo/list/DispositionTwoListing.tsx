import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import AddDispositionTwoWrappper from '../add/AddDispositionTwoWrapper'
import { setSearchValue, setSelectedDispostion } from 'src/redux/slices/configuration/dispositionTwoSlice'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { setFilterValue } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { showToast } from 'src/utils'
import DispositionListView from '../../sharedComponents/DispositionListView'


type Props = {
    dispositionTwo: any[]

}

const DispositionTwoListing = ({dispositionTwo}:Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const{selectedDispositionOne}:any=useSelector((state:RootState)=>state.dispositionOne)
 
    const {selectedDispostion ,searchValue}:any=useSelector((state:RootState)=>state.dispositionTwo)


    function handleDispositionOneClick(newValue: any)
    {
        if(selectedDispostion?.value===newValue.value)
        {
            dispatch(setSelectedDispostion(null))
            dispatch(setSelectedDispostionThree(null))
            dispatch(setFilterValue(""))
        }
        else{
            dispatch(setSelectedDispostion(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

  return (
    <>
    <DispositionListView
      searchValue={searchValue}
      OnSearchChange={(newValue) =>
      
          dispatch(setSearchValue(newValue))
      }
        listHeading="Disposition Two"
        listData={dispositionTwo}
        onAddClick={() => {
            if (selectedDispositionOne === null) {
                showToast('error', 'Please select Disposition One')
            } else {
                setisOpenAddForm(true)
            }
        }}
        onListItemClick={(newValue) => {
            if (selectedDispositionOne !== null) {
                handleDispositionOneClick(newValue)
            }
        }}
        disabled={false}
    />
    {isOpenAddForm && (
        <AddDispositionTwoWrappper onClose={() => setisOpenAddForm(false)} />
    )}
</>
  )
}

export default DispositionTwoListing
