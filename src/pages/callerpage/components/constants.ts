import { SelectOption } from 'src/models/FormField/FormField.model'

// Static Option For Gander Radio Box , Payment Mode Option & Medical issue
export const genderOption: SelectOption[] = [
    {
        label: 'Male',
        value: 'MALE',
    },
    {
        label: 'Female',
        value: 'FEMALE',
    },
]

export const paymentModeOptions: SelectOption[] = [
    {
        label: 'Online (UPI only)',
        value: 'ONLINE',
    },
    {
        label: 'COD',
        value: 'COD',
    },
]

export const medicalOptions: SelectOption[] = [
    {
        label: 'Obesity',
        value: 'OBESITY',
    },
    {
        label: 'Hair Loss',
        value: 'HAIR_LOSS',
    },
    {
        label: 'Joint Pain',
        value: 'JOINT_PAIN',
    },
    {
        label: 'Diabeties',
        value: 'DIABETIES',
    },
    {
        label: 'Height',
        value: 'HEIGHT',
    },
    {
        label: 'Gain',
        value: 'GAIN',
    },
    {
        label: 'Piles',
        value: 'PILES',
    },
    {
        label: 'Blood Pressure',
        value: 'BLOOD_PRESSURE',
    },
    {
        label: 'Heart Issues',
        value: 'HEART_ISSUES',
    },
    {
        label: 'Skin Problem',
        value: 'SKIN_PROBLEM',
    },
    {
        label: 'Eye Problem',
        value: 'EYE_PROBLEM',
    },
]

export const startTimesOptions: SelectOption[] = [
    {
        label: '9 AM',
        value: '9_AM',
    },
    {
        label: '12 PM',
        value: '12_PM',
    },
    {
        label: '3 PM',
        value: '3_PM',
    },
    {
        label: '6 PM',
        value: '6_PM',
    },
]

export const endTimesOptions: SelectOption[] = [
    {
        label: '12 PM',
        value: '12_PM',
    },
    {
        label: '3 PM',
        value: '3_PM',
    },
    {
        label: '6 PM',
        value: '6_PM',
    },
    {
        label: '9 PM',
        value: '9_PM',
    },
]
