// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- Types --|
type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website Page',
        path: '/all-websites/website-page',
    },
    {
        label: 'View Website Page',
    },
]

const ViewWebsitePage = ({ items }: Props) => {
    return (
        <div className="px-4 h-[calc(100vh-45px)]  ">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div >
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> Website Page</ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium pl-2">
                            {' '}
                            All Details{' '}
                        </div>
                        {/* BUTTON - Add SO */}
                        <div></div>
                    </div>

                    {/* General Infromation */}

                    <div className="grow px-3 ">
                        <div className="grid grid-cols-1">
                            <div className="grow py-8 px-3">
                                <div className=" flex col-span-2 text-lg pb-2 font-medium text-primary-main pl-2">
                                    Details
                                </div>

                                <div className="grid grid-cols-1 gap-3 pl-6 py-6 border border-l-2">
                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Page Url{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600  col-span-1">
                                            {items?.pageUrl === ''
                                                ? 'NA'
                                                : items?.pageUrl}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Page Name{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600 col-span-1 ">
                                            {items?.pageName === ''
                                                ? 'NA'
                                                : items?.pageName}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Subtitle Name{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600">
                                            {items?.headerSpace === ''
                                                ? 'NA'
                                                : items?.headerSpace}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            footer Space{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.footerSpace === ''
                                                ? 'NA'
                                                : items?.footerSpace}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // {items?.contactInformation  }
    )
}

export default ViewWebsitePage
