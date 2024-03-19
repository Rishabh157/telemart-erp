import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetProductReplacementByIdQuery } from 'src/services/ProductReplacementServices'
import { setSelectedItem } from 'src/redux/slices/ProductReplacementSlice'

// |-- Internal Dependencies --|
import ProductReplacementView from './ProductReplacementView'
import { AppDispatch, RootState } from 'src/redux/store'

const ProductReplacementViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.productReplacement
    )

    const { data, isLoading, isFetching } = useGetProductReplacementByIdQuery(
        id,
        {
            skip: !id,
        }
    )

    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setSelectedItem(data?.data))
        }
    }, [data, isLoading, isFetching, dispatch])

    return <ProductReplacementView items={selectedItem} />
}

export default ProductReplacementViewWrapper
