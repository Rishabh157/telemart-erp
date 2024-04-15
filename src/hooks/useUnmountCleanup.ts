import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux/store'
import {
    setIsTableLoading,
    setSearchValue,
    setTotalItems,
    setPage,
    setRowsPerPage,
    setFilterBy,
} from '../redux/slices/ListingPaginationSlice'

const useUnmountCleanup = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        return () => {
            // Cleanup logic for unmounting component
            dispatch(setIsTableLoading(false))
            dispatch(setTotalItems(0))
            dispatch(setSearchValue(''))
            dispatch(setPage(1))
            dispatch(setRowsPerPage(10))
            dispatch(setFilterBy({}))
        }
    }, [dispatch]) // Ensure dispatch is included as dependency

    // No need to return anything from this hook
}

export default useUnmountCleanup
