import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import DispositionListView from '../../sharedComponents/DispositionListView'
import AddDispositionThreeWrappper from '../add/AddDispositionThreeWrapper'
import { setSelectedDispostionThree } from 'src/redux/slices/configuration/dispositionThreeSlice'
import { showToast } from 'src/utils'


type Props = {
    dispositionThree: any[]
    items: any
}

const DispositionThreeListing = ({dispositionThree,items}:Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const {selectedDispostion}:any=useSelector((state:RootState)=>state.dispositionTwo)
    const {selectedDispostionThree}:any=useSelector((state:RootState)=>state.dispositionThree)

    function handleDispositionOneClick(newValue: any)
    {
        if(selectedDispostionThree?.value===newValue.value)
        {
            dispatch(setSelectedDispostionThree(null))
        }
        else{
            dispatch(setSelectedDispostionThree(newValue))
        }
    }

  return (
    <>
    <DispositionListView
        listHeading="Disposition Three"
        listData={dispositionThree}
        onAddClick={() => {
            if (selectedDispostion === null) {
                showToast('error', 'Please select Disposition Two')
            } else {
                setisOpenAddForm(true)
            }
        }}
        onListItemClick={(newValue) => {
            if (selectedDispostion !== null) {
                handleDispositionOneClick(newValue)
            }
        }}
        disabled={false}
    />
    {isOpenAddForm && (
        <AddDispositionThreeWrappper onClose={() => setisOpenAddForm(false)} />
    )}
</>
  )
}

export default DispositionThreeListing
