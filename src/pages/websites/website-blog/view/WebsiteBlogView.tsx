/// ==============================================
// Filename:WebsiteBlogView.tsx
// Type: View Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

// |-- types --|
type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'Website Blog',
        path: '/all-websites/website-blog',
    },
    {
        label: 'View Website Blogs',
    },
]

const WebsiteBlogView = ({ items }: Props) => {
    return (
        <div className="mt-3 h-full  ">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> Website Blog</ATMPageHeading>
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
                                            Blog Name{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600  col-span-1">
                                            {items?.blogName === ''
                                                ? 'NA'
                                                : items?.blogName}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Blog Title{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600 col-span-1 ">
                                            {items?.blogTitle === ''
                                                ? 'NA'
                                                : items?.blogTitle}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Blog SubTitle{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600">
                                            {items?.blogSubtitle === ''
                                                ? 'NA'
                                                : items?.blogSubtitle}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Image{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.image === ''
                                                ? 'NA'
                                                : items?.image}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Blog Description{' '}
                                        </h1>
                                        <p> - </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.blogDescription === ''
                                                ? 'NA'
                                                : items?.blogDescription}
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

export default WebsiteBlogView
