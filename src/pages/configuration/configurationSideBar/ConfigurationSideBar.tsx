import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsBuilding } from 'react-icons/bs'
import { TbHierarchy } from 'react-icons/tb'
import { SlLocationPin } from 'react-icons/sl'
import { IconType } from 'react-icons'
import { MdSpaceDashboard } from 'react-icons/md'
import { CgList } from 'react-icons/cg'


type ListType = {
    label: string,
    path: string,
    icon: IconType,
}

const configurationList: ListType[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: MdSpaceDashboard
    },
    {
        label: "Companies",
        path: "/configuration/companies",
        icon: BsBuilding
    },
    {
        label: "Organization Hierarchy",
        path: "/configuration/organizations-hierarchy",
        icon: TbHierarchy
    },
    {
        label: "Locations",
        path: "/configuration/locations",
        icon: SlLocationPin
    },
    {
        label: "Policies",
        path: "/configuration/policies",
        icon: CgList
    }
]

type Props = {
    isShowSideNav: boolean
}

const ConfigurationSideBar = ({
    isShowSideNav
}: Props
) => {

    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = `${location.pathname}`

    return (
        <nav
            className={`w-full h-full border-r border-slate-100 shadow-lg  py-6 `}
        >
            <ul className='w-full h-full overflow-hidden hover:overflow-auto flex flex-col gap-2 px-3 ' >
                {
                    configurationList.map((configuration, configurationIndex) => {
                        return (
                            <li
                                key={configurationIndex}
                                onClick={() => { navigate(configuration.path) }}
                                className={`p-2 transition-all hover:bg-slate-100 rounded cursor-pointer flex items-center gap-2 text-[16px] relative ${currentPath.includes(configuration.path) ? 'bg-slate-100 text-primary-main' : 'text-slate-500'} `}
                            >
                                <span className='text-xl' > <configuration.icon /> </span>
                                {
                                    isShowSideNav &&
                                    <span className='' > {configuration.label} </span>
                                }

                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default ConfigurationSideBar
