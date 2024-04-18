

// |-- Built-in Dependencies --|
import { useEffect, useState } from 'react'

// |-- External Dependencies --|
import { Formik, FormikProps } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { array, number, object, string } from 'yup'

// |-- Internal Dependencies --|
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { useGetWareHousesQuery } from 'src/services/WareHouseService'
import {
    useGetWarehouseToComapnyByIdQuery,
    useUpdateWarehouseToComapnyMutation,
} from 'src/services/WarehouseToComapnyService'
import { showToast } from 'src/utils'
import EditWarehouseToComapny from './EditWarehouseToComapny'

// |-- Redux --|
import { useCustomOptions } from 'src/hooks/useCustomOptions'
import useGetDataByIdCustomQuery from 'src/hooks/useGetDataByIdCustomQuery'
import { RootState } from 'src/redux/store'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'

// |-- Types --|
type Props = {}

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
    wtNo: string
}

export type FormInitialValues = {
    id: string
    wtcNumber: string
    toCompanyId: string
    fromWarehouseId: string
    toWarehouseId: string
    firstApproved: boolean | null
    firstApprovedActionBy: string
    firstApprovedAt: string
    secondApproved: boolean | null
    secondApprovedActionBy: string
    secondApprovedAt: string
    firstApprovedById: string | null
    secondApprovedById: string | null
    productSalesOrder: ProductSalesOrder[]
    remark: string
    status: string
    companyId: string
}

const EditWarehouseToComapnyWrapper = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [editWarehouseToComapny, setEditWarehouseToComapny] =
        useState<FormInitialValues>({
            wtcNumber: '',
            toCompanyId: '',
            fromWarehouseId: '',
            toWarehouseId: '',
            firstApproved: null,
            firstApprovedActionBy: '',
            firstApprovedAt: '',
            secondApproved: null,
            secondApprovedActionBy: '',
            secondApprovedAt: '',
            firstApprovedById: '',
            secondApprovedById: '',
            productSalesOrder: [],
            remark: '',
            status: '',
            id: '',
            companyId: '',
        })
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateWarehouseToComapny] = useUpdateWarehouseToComapnyMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)

    const { items: selectedItem } = useGetDataByIdCustomQuery<any>({
        useEndPointHook: useGetWarehouseToComapnyByIdQuery(Id),
    })

    const { options: warehouseOptions } = useCustomOptions({
        useEndPointHook: useGetWareHousesQuery(''),
        keyName: 'wareHouseName',
        value: '_id',
    })

    const { options: productGroupOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'groupName',
        value: '_id',
    })

    const { options: productPriceOptions } = useCustomOptions({
        useEndPointHook: useGetAllProductGroupQuery(''),
        keyName: 'dealerSalePrice',
        value: '_id',
    })

    const { options } = useCustomOptions({
        useEndPointHook: useGetAllCompaniesQuery('', {
            skip: !userData?.companyId,
        }),
        keyName: 'companyName',
        value: '_id',
    })

    const companyOption = options?.filter(
        (ele: any) => ele.value !== userData?.companyId
    )

    const dropdownOptions = {
        companyOption: companyOption,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }

    useEffect(() => {
        if (selectedItem?.length) {
            let product: FormInitialValues = {
                wtcNumber: '',
                toCompanyId: '',
                fromWarehouseId: '',
                toWarehouseId: '',
                firstApproved: null,
                firstApprovedActionBy: '',
                firstApprovedAt: '',
                secondApproved: null,
                secondApprovedActionBy: '',
                secondApprovedAt: '',
                firstApprovedById: '',
                secondApprovedById: '',
                productSalesOrder: [],
                remark: '',
                status: '',
                companyId: '',
                id: '',
            }

            selectedItem?.map((ele: any) => {
                return (product = {
                    ...product,
                    toCompanyId: ele?.toCompanyId,
                    wtcNumber: ele?.wtcNumber,
                    fromWarehouseId: ele?.fromWarehouseId,
                    toWarehouseId: ele?.toWarehouseId,
                    firstApproved: ele?.firstApproved,
                    firstApprovedActionBy: ele?.firstApprovedActionBy,
                    firstApprovedAt: ele?.firstApprovedAt,
                    secondApproved: ele?.secondApproved,
                    secondApprovedActionBy: ele?.secondApprovedActionBy,
                    secondApprovedAt: ele?.secondApprovedAt,
                    firstApprovedById: ele?.firstApprovedById,
                    secondApprovedById: ele?.secondApprovedById,
                    remark: ele?.remark,
                    status: ele?.status,
                    companyId: ele?.companyId,
                    id: '',
                    productSalesOrder: [
                        ...product.productSalesOrder,
                        {
                            wtNo: ele?._id,
                            productGroupId:
                                ele?.productSalesOrder?.productGroupId,
                            rate: ele?.productSalesOrder?.rate,
                            quantity: ele?.productSalesOrder?.quantity,
                        },
                    ],
                })
            })
            setEditWarehouseToComapny(product)
        }
    }, [selectedItem])

    // Form Initial Values
    const initialValues: FormInitialValues = {
        toCompanyId: editWarehouseToComapny.toCompanyId,
        wtcNumber: editWarehouseToComapny.wtcNumber,
        fromWarehouseId: editWarehouseToComapny.fromWarehouseId,
        toWarehouseId: editWarehouseToComapny.toWarehouseId,
        firstApproved: editWarehouseToComapny.firstApproved,
        firstApprovedActionBy: editWarehouseToComapny.firstApprovedActionBy,
        firstApprovedAt: editWarehouseToComapny.firstApprovedAt,
        secondApproved: editWarehouseToComapny.secondApproved,
        secondApprovedActionBy: editWarehouseToComapny.secondApprovedActionBy,
        secondApprovedAt: editWarehouseToComapny.secondApprovedAt,
        firstApprovedById: editWarehouseToComapny.firstApprovedById,
        secondApprovedById: editWarehouseToComapny.secondApprovedById,
        productSalesOrder: editWarehouseToComapny.productSalesOrder,
        remark: editWarehouseToComapny.remark,
        status: editWarehouseToComapny.status,
        companyId: editWarehouseToComapny.companyId,
        id: editWarehouseToComapny.id,
    }

    // Form Validation Schema
    const validationSchema = object({
        wtcNumber: string()
            .required('WTC order number is required')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z]+[^\/\\]*$/,
                'Only alphabetical characters are allowed, except / and \\'
            ),
        fromWarehouseId: string().required('Please select warehouse'),
        toCompanyId: string().required('Please select company'),
        toWarehouseId: string().required('Please select warehouse'),
        remark: string(),
        productSalesOrder: array().of(
            object().shape({
                productGroupId: string().required(
                    'Please select a product name'
                ),
                rate: number()
                    .min(1, 'Rate must be greater than 0')
                    .required('Please enter rate'),
                quantity: number()
                    .min(1, 'Quantity must be greater than 0')
                    .required('Please enter quantity'),
            })
        ),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        let newValues = {
            wtcNumber: values.wtcNumber,
            toCompanyId: values.toCompanyId,
            fromWarehouseId: values.fromWarehouseId,
            toWarehouseId: values.toWarehouseId,
            firstApproved: values.firstApproved,
            firstApprovedActionBy: values.firstApprovedActionBy,
            firstApprovedAt: values.firstApprovedAt,
            secondApproved: values.secondApproved,
            secondApprovedActionBy: values.secondApprovedActionBy,
            secondApprovedAt: values.secondApprovedAt,
            firstApprovedById: values.firstApprovedById,
            secondApprovedById: values.secondApprovedById,
            remark: values.remark,
            // status: values.status,
            companyId: values.companyId,
            id: '',
        }

        const finalValues: any = []
        values?.productSalesOrder?.map((ele) => {
            return finalValues.push({
                ...newValues,
                id: ele.wtNo ? ele.wtNo : '',
                productSalesOrder: {
                    productGroupId: ele.productGroupId,
                    rate: ele.rate,
                    quantity: ele.quantity,
                },
            })
        })

        setApiStatus(true)
        setTimeout(() => {
            updateWarehouseToComapny({
                body: finalValues,
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', ' Updated successfully!')
                        navigate('/warehouse-to-company')
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
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditWarehouseToComapny
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            productPriceOptions={productPriceOptions}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditWarehouseToComapnyWrapper
