import React from 'react'
import { Breadcrumbs, Link } from '@mui/material'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { setFieldCustomized } from 'src/redux/slices/authSlice'
import { RootState } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'

export type BreadcrumbType = {
    label: string
    onClick?: () => void
    path?: string
}

type Props = {
    breadcrumbs: BreadcrumbType[]
}

const ATMBreadCrumbs = ({ breadcrumbs }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { customized } = useSelector((state: RootState) => state?.auth)
    const AlertText =
        'Your changes have not been saved. To stay on the page so that you can save your changes, click Cancel.'

    return (
        <Breadcrumbs
            separator={<FiChevronRight className="text-xl text-black" />}
            aria-label="breadcrumb"
        >
            {breadcrumbs.map((breadcrumb, breadcrumbIndex) => (
                <Link
                    underline={breadcrumb.path ? 'hover' : 'none'}
                    key={breadcrumbIndex}
                    color="inherit"
                    onClick={() => {
                        breadcrumb.onClick && breadcrumb.onClick()
                        if (customized) {
                            const confirmValue: boolean =
                                window.confirm(AlertText)
                            if (confirmValue) {
                                dispatch(setFieldCustomized(false))
                                navigate(breadcrumb.path || '')
                            }
                        } else {
                            navigate(breadcrumb.path || '')
                        }
                    }}
                    className={`${
                        breadcrumb.path && 'cursor-pointer'
                    }  text-black`}
                >
                    {breadcrumb.label}
                </Link>
            ))}
        </Breadcrumbs>
    )
}

export default ATMBreadCrumbs
