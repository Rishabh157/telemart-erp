// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useParams } from 'react-router-dom'

// |-- Internal Dependencies --|
import { useGetDealerByIdQuery } from 'src/services/DealerServices'
import DealerGeneralInformationTab from './DealerGeneralInformationTab'

// |-- Redux --|
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { DealersListResponse } from 'src/models'

// |-- Types --|
type Props = {}

export type AccordianType = {
    summary: React.ReactNode
    component: any
}

const DealerGeneralInformationTabWrapper = (props: Props) => {
    const params = useParams()
    const Id = params.dealerId
    const { items, isLoading } = useGetDataByIdCustomQuery<DealersListResponse>({
        useEndPointHook: useGetDealerByIdQuery(Id),
    })

    return <DealerGeneralInformationTab items={items || null} isLoading={isLoading} />
}

export default DealerGeneralInformationTabWrapper
