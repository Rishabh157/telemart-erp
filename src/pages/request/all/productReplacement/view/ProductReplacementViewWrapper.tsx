// |-- External Dependencies --|
import { useParams } from 'react-router-dom'
import { useGetProductReplacementByIdQuery } from 'src/services/ProductReplacementServices'

// |-- Internal Dependencies --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import ProductReplacementView from './ProductReplacementView'

const ProductReplacementViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const { items } = useGetDataByIdCustomQuery({
        useEndPointHook: useGetProductReplacementByIdQuery(id, {
            skip: !id,
        }),
    })

    return <ProductReplacementView items={items} />
}

export default ProductReplacementViewWrapper
