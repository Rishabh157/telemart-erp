import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { array, object, string } from 'yup'
import AddDealerScheme from './AddDealerScheme'
import { useAddDealerSchemeMutation } from 'src/services/DealerSchemeService'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useGetDealerSchemeQuery } from 'src/services/DealerSchemeService'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { setAllItems } from 'src/redux/slices/dealerSchemeSlice'
import { setAllItems as setAllDealerSchemes } from 'src/redux/slices/schemeSlice'

type Props = {}

export type FormInitialValues = {
    companyId: string
    dealerId: string
    schemes: []
}

const DealerPinCodeTabWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const dealerId: any = params.dealerId
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId

    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [addDealerScheme] = useAddDealerSchemeMutation()

    // const { allItems}: any = useSelector(
    //     (state: RootState) => state?.dealerScheme
    // )

    const {
        data: allData,
        isLoading: allIsLoading,
        isFetching: AllIsFetching,
    } = useGetDealerSchemeQuery({
        limit: 10,
        searchValue: '',
        params: ['schemeId', 'schemeName'],
        page: 1,
        filterBy: [
            {
                fieldName: 'dealerId',
                value: dealerId,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })

    useEffect(() => {
        if (!allIsLoading && AllIsFetching) {
            dispatch(setAllItems(allData?.data || []))
        }
    }, [dispatch, allData, allIsLoading, AllIsFetching])

    const {
        data: schemeData,
        isLoading: schemeIsLoading,
        isFetching: schemeIsFetching,
    } = useGetSchemeQuery('')

    useEffect(() => {
        dispatch(setAllDealerSchemes(schemeData?.data))
    }, [schemeData, schemeIsLoading, schemeIsFetching, dispatch])

    const { allItems: schemeItems }: any = useSelector(
        (state: RootState) => state?.scheme
    )

    const schemeOptions = schemeItems?.map((ele: any) => {
        return {
            label: ele.schemeName,
            value: ele._id,
        }
    })

    //console.log(schemeOptions)

    // const removeItems = allItems?.map((ele: any) => {
    //     return {
    //         label: ele.schemeName,
    //         value: ele._id,
    //     }
    // })

    const initialValues: FormInitialValues = {
        companyId: companyId,
        dealerId: dealerId,
        schemes: [],
    }

    // const output = schemeOptions?.filter(function (obj: any) { return !removeItems?.includes(obj.value) });
    // const out = output?.map((el: any) => {
    //     return el.schemeName;

    // })
    // console.log(out)

    // for (let key in schemeItems) {
    //     delete schemeItems[key]._id;
    //   }

    const validationSchema = object({
        schemes: array()
            .of(
                object().shape({
                    label: string().required(),
                    value: string().required(),
                })
            )
            .min(1, 'Please select atleast 1 Scheme'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        const scheme: any = values.schemes.map((ele: any) => {
            return ele.value
        })

        setTimeout(() => {
            addDealerScheme({
                dealerId: values.dealerId || '',
                schemeId: scheme,
                companyId: values.companyId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Scheme added successfully!')
                        navigate('/dealers/' + dealerId + '/scheme')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <AddDealerScheme
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            schemeOptions={schemeOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default DealerPinCodeTabWrapper
