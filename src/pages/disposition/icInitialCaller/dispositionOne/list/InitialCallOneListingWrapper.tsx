import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { setItems } from 'src/redux/slices/configuration/initialCallerOneSlice'
import InitialCallOneListing from './InitialCallOneListing'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'

const InitialCallOneListingWrapper = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data} = useGetAllinitialCallerOneQuery('')
    const { items }: any = useSelector((state: RootState) => state.initialCallerOne)

    const initialCallerOne=items?.map((ele:any)=>{
        return {
            label:ele.initailCallName,
            value:ele._id
        }
    })
    useEffect(()=>{
        dispatch(setItems(data?.data || []))
    },[dispatch,data])

  return (
   <>
   <InitialCallOneListing initialCallerOne={initialCallerOne}/>
   </>
  )
}

export default InitialCallOneListingWrapper
