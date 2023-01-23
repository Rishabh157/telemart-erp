import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header';
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar';
import { NavItemType } from 'src/navigation';
import { AiOutlineSetting } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

const configurationNavigation : NavItemType[]= [
{
    label : "Attributes",
    icon : AiOutlineSetting,
    path : "/configurations/attributes"
},
{
    label : "Attributes Group",
    icon : AiOutlineSetting,
    path : "/configurations/attributes-group"
},
{
    label : "Product Category",
    icon : AiOutlineSetting,
    path : '/configurations/product-category'
},
{
    label : "Product Sub Category",
    icon : AiOutlineSetting,
    path : "/configurations/product-sub-category"
},
{
    label : "Item",
    icon : AiOutlineSetting,
    path : "/configurations/item"
},
{
    label : "Products",
    icon : AiOutlineSetting,
    path : "/configurations/products"
},
{
    label : "Carton Box",
    icon : AiOutlineSetting,
    path : "/configurations/carton-box"
},
{
    label : "Scheme",
    icon : AiOutlineSetting,
    path : "/configurations/scheme"
},
{
    label : "Taxes",
    icon : AiOutlineSetting,
    path : "/configurations/taxes"
},
{
    label : "PO",
    icon : AiOutlineSetting,
    path : "/configurations/purchase-order"
},
{
    label : "GRN",
    icon : AiOutlineSetting,
    path : "/configurations/grn"
},
{
    label : "Company",
    icon : AiOutlineSetting,
    path : "/configurations/company"
},
{
    label : "ASR",
    icon : AiOutlineSetting,
    path : "/configurations/asr"
},
{
    label : "Barcode",
    icon : AiOutlineSetting,
    path : "/configurations/barcode"
},
{
    label : "Location",
    icon : AiOutlineSetting,
    path : "/configurations/location"
},
{
    label : "Language",
    icon : AiOutlineSetting,
    path : "/configurations/language"
},
{
    label : "Dealers Category",
    icon : AiOutlineSetting,
    path : "/configurations/dealers-category"
},
]

type Props = {
    children?: React.ReactNode | string;
}

const ConfigurationLayout = ({
    children,
}: Props
) => {

    const [isCollapsed , setIsCollapsed] = useState(false)
    const toggleCollapse = ()=> {
        setIsCollapsed(prev=> !prev)
    }

    const location= useLocation()

    const currentPath = `/configurations/${location.pathname?.split("/")[2]}`

    return (
        <div className='flex h-screen w-screen' >

        {/* Side Navigation Bar */}
    <div className={`border-r border-slate-300 h-full transition-all duration-500   ${isCollapsed ? "w-[50px]" : "w-[250px]"}`} >
        <VerticalNavBar toggleCollapse = {toggleCollapse} isCollapsed= {isCollapsed} navigation={configurationNavigation} isPathEqualtoNavItem={(navItem:any)=> navItem.path === currentPath } />
    </div>

    <div className='h-full grow ' >

        {/* Header */}
        <div className='h-[55px] border-b border-slate-300  ' >
            <Header/>
         </div>

         <div className='h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 ' >
               {children}
         </div>
    </div>
  </div>
    )
}

export default ConfigurationLayout
