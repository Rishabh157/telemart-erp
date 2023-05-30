import React, { useEffect, useState } from 'react'
import DispositionLayout from '../../DispositionLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import { array, object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik, FormikProps } from 'formik'
//import { useGetDspositionOneQuery } from 'src/services/disposition/DispositionOneServices'
//import { useGetDspositionTwoQuery } from 'src/services/disposition/DispositionTwoServices'
// import { setChannelGroups } from 'src/redux/slices/media/channelGroupSlice'
// import { GetAllChannelGroupResponse } from 'src/models/ChannelGroup.model'
// import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'
import AddDispositionThree from './AddDispositionThree'
//import { useAddDispositionThreeMutation } from 'src/services/disposition/DispositionThreeServices'
// import { useGetAllChannelCategoryQuery } from 'src/services/media/ChannelCategoriesServices'
// import { useGetAllChannelQuery } from 'src/services/media/ChannelManagementServices'
// import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
// import { ChannelManagementListResponse } from 'src/models/Channel.model'
// import { useGetAllTapeMangementQuery } from 'src/services/media/TapeManagementServices'
// import { setSelectedTapManagement } from 'src/redux/slices/media/tapeManagementSlice'
// import { TapeManagementListResponse } from 'src/models/tapeManagement.model'

export type FormInitialValues = {
	dispositionName: string
	dispositionOneId: string
	dispositionTwoId: string
	smsType: string
	emailType: string
	priority: string
	applicableCriteria: string[]
  companyId: string
}


const AddDispositionThreeWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { userData } = useSelector((state: RootState) => state?.auth)
    
    const { dispositionOne }: any = useSelector(
        (state: RootState) => state.dispositionOne
    )

    const { dispositionTwo }: any = useSelector(
        (state: RootState) => state?.dispositionTwo
    )

    //const [AddDispositionThree] = useAddDispositionThreeMutation()

    

    const {
        isLoading: isDTLoading,
        isFetching: isDTFetching,
        data: DtData,
    } = useGetAllDispositionTwoQuery('')

    useEffect(() => {
        if (!isDTLoading && !isDTFetching) {
            dispatch(setDispositionOne(DtData?.data || []))
        }
    }, [isDTLoading, isDTFetching, DtData, dispatch])

    const {
			isLoading: isDOLoading,
			isFetching: isDOFetching,
			data: DoData,
	} = useGetAllDispositionOneQuery('')

    useEffect(() => {
        if (!isDOLoading && !isDOFetching) {
            dispatch(setDispositionTwo(DoData?.data || []))
        }
    }, [isDOLoading, isDOFetching, DoData, dispatch])    
    

   
    const initialValues: FormInitialValues = {
			dispositionName: '',
			dispositionOneId: '',
			dispositionTwoId: '',
			smsType: '',
			emailType: '',
			priority: '',
			applicableCriteria: [''],
			companyId: userData?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
			dispositionName: string().required('Required'),
			dispositionOneId: string().required('Required'),
			dispositionTwoId: string().required('Required'),
			applicableCriteria: array().of(
           string().required('Required')),        
			smsType: string().required('Required'),
			emailType: string().required('Required'),
			priority: string().required('Required'),			
    })

    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        AddDispositionThree({
					dispositionName: values.dispositionName,
					dispositionOneId: values.dispositionOneId,
					dispositionTwoId: values.dispositionTwoId,
					applicableCriteria: values.applicableCriteria,
					smsType: values.smsType,
					emailType: values.emailType,
					priority: values.priority,
          companyId: values.companyId || '',
        }).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Disposition 3 Added successfully!')
                    navigate('/dispositions/disposition-three')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast('error', 'Something went wrong')
            }
            setApiStatus(false)
        })
    }

		const priorityOpt = () => {
			let options: SelectOption[] = []
			options = [...options, { label: '00', value: '00' }]
			for (let i = 1; i <= 50; i++) {
					options = [...options, { label: i.toString(), value: i.toString() }]
			}
			return options
	}

	console.log(priorityOpt, "priority")


    const dropdownOptions = {
        DispotionOneOptions: dispositionOne?.map(
            (dispositionOne: GetAllDispositionOneResponse) => {
                return {
                    label: dispositionOne.dispositionName,
                    value: dispositionOne._id,
                }
            }
        ),

        DispositionTwoOptions: dispositionTwo?.map(
            (dispositionTwo: GetAllDispositionTwoResponse) => {
                return {
                    label: dispositionTwo.dispositionName,
                    value: dispositionTwo._id,
                }
            }
        ),
				
			priorityOptions: priorityOpt,

			emailTypeOptions: [
				{label: 'personalEmail', value: 'PERSONAL EMAIL'},
				{label: 'officialEmail', value: 'OFFICIAL EMAIL'},
				{label: 'buisnessEmail', value: 'BUISNESS EMAIL'},
				{label: 'companyEmail', value: 'COMPANY EMAIL'},
			],

			 smsTypeOptions: [
            { label: 'alcobanSms', value: 'ALCOBAN SMS' },
            { label: 'complaintCCA_CNC', value: 'CUSTOMER NOT CONTACTABLE' },
            { label: 'complaintCCA_OWEI', value: 'COMPLAINT CCA-ORDERS WITH EMAIL ID' },
            { label: 'complaintCCA_OWNEI', value: 'COMPLAINT CCA-ORDERS WITHOUT EMAIL ID' },
            { label: 'complaintORC', value: 'CREATE ORDER REFUND-CHEQUE' },
						{ label: 'complaintORN', value: 'CREATE ORDER REFUND-NEFT' },
            { label: 'complaintRPIM', value: 'CREATE RPI-MANUAL' },
            { label: 'complaintRPI', value: 'CREATE RPI-TV-SHOP COURIER ASSIGNED' },
            { label: 'complaintSCD', value: 'COMPLAINT SERVICE DETAILS' },
            { label: 'createComplant', value: 'CREATE COMPLAINT' },
						{ label: 'dealerDelivered', value: 'DEALER DELIVERED' },
						{ label: 'dealerDeliveredBI', value: 'DEALER DELIVERED BOY INTRANSIT' },
						{ label: 'dispositionMsg', value: 'DISPOSITION MESSAGE' },
						{ label: 'hold', value: 'HOLD' },
						{ label: 'inTransitDB', value: 'IN-TRANSIT-DELIVERY-BOY' },
						{ label: 'invoiceSent', value: 'INVOICE SENT' },
        ],


				emailTypeOptions: [
					{ label: 'personalEmail', value: 'PERSONAL EMAIL' },
					{ label: 'officialEmail', value: 'OFFICIAL EMAIL' },
					{ label: 'buisnessEmail', value: 'BUISNESS EMAIL' },
					{label: 'companyEmail:', value:  'COMPANY EMAIL'},					
			],

			applicableCriteriaOptions: [
				{label: 'is_order', value: 'Is Order'},
				{label: 'is_prepaid', value: 'Is Prepaid'},
				{label: 'is_replacement', value: 'Is Replacement'},
				{label: 'is_callback', value: 'Is Callback'},
				{label: 'is_scheme_app', value: 'Is Scheme App'},
				{label: 'out_of_stock', value: 'Out Of Stock'},
				{label: 'is_product_app', value: 'Is Product App'},
				{label: 'adt_applicable', value: 'ADT Applicable'},
				{label: 'is_textbox_req', value: 'Is TextBox REQ'},
				{label: 'is_urgent', value: 'Is Urgent'},
				{label: 'is_remark_date_app', value: 'Is Remark Date App'},
			],
    }


    return (
        <DispositionLayout>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <AddDispositionThree
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                        />
                    )
                }}
            </Formik>
        </DispositionLayout>
    )
}

export default AddDispositionThreeWrapper
