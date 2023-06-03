import React from 'react'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

type Props = {
    items: any
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
	{
		label: 'Website Tags',
		path: '/all-websites/website-tags',
},
{
		label: 'View Website Tags',
},
]

const WebsiteTagsView = ({ items }: Props) => {
    return (
        <div className="mt-3 h-full  ">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1 ">
                    <ATMPageHeading> Website Tags</ATMPageHeading>
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
                                    Tag Details
                                </div>

                                <div className="grid grid-cols-1 gap-3 pl-6 py-6 border border-l-2">
                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Website{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600  col-span-1">
                                            {items?.websiteMasterLabel === ''
                                                ? 'NA'
                                                : items?.websiteMasterLabel}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
                                            Website Page{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1 ">
                                            {items?.websitePageLabel === ''
                                                ? 'NA'
                                                : items?.websitePageLabel}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Keyword{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600">
                                            {items?.metaKeyword === ''
                                                ? 'NA'
                                                : items?.metaKeyword}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta OG Title{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaOgTitle === ''
                                                ? 'NA'
                                                : items?.metaOgTitle}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta OG URL{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaOgUrl === ''
                                                ? 'NA'
                                                : items?.metaOgUrl}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta OG Image{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaOgImage === ''
                                                ? 'NA'
                                                : items?.metaOgImage}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta OG Type{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaOgType === ''
                                                ? 'NA'
                                                : items?.metaOgType}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Twitter Title{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaTwitterTitle === ''
                                                ? 'NA'
                                                : items?.metaTwitterTitle}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Twitter Card{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaTwitterCard === ''
                                                ? 'NA'
                                                : items?.metaTwitterCard}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Twitter Image{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaTwitterImage === ''
                                                ? 'NA'
                                                : items?.metaTwitterImage}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Twitter Image{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaTwitterImage === ''
                                                ? 'NA'
                                                : items?.metaTwitterImage}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Twitter Image{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaTwitterImage === ''
                                                ? 'NA'
                                                : items?.metaTwitterImage}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta OG Description{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaOgDescription === ''
                                                ? 'NA'
                                                : items?.metaOgDescription}
                                        </p>
                                    </div>

																		<div className="grid grid-cols-3">
                                        <h1 className="text-gray-800 col-span-1">
																				Meta Description{' '}
                                        </h1>
                                        <p>
                                            {' '}
                                            -{' '}
                                        </p>
                                        <p className="text-slate-600 col-span-1">
                                            {items?.metaDescription === ''
                                                ? 'NA'
                                                : items?.metaDescription}
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

export default WebsiteTagsView
