import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header';
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar';
import { NavItemType } from 'src/navigation';
import { AiOutlineSetting } from "react-icons/ai";

const configurationNavigation : NavItemType[]= [
{
    label : "Attributes",
    icon : AiOutlineSetting,
    path : "/configuratons/attributes"
},
{
    label : "Attributes Group",
    icon : AiOutlineSetting,
    path : "/configuratons/attributes-group"
},
{
    label : "Product Category",
    icon : AiOutlineSetting,
    path : "/configuratons/product-category"
},
{
    label : "Product Sub Category",
    icon : AiOutlineSetting,
    path : "/configuratons/product-sub-category"
},
{
    label : "Item",
    icon : AiOutlineSetting,
    path : "/configuratons/item"
},
{
    label : "Products",
    icon : AiOutlineSetting,
    path : "/configuratons/products"
},
{
    label : "Carton Box",
    icon : AiOutlineSetting,
    path : "/configuratons/carton-box"
},
{
    label : "Scheme",
    icon : AiOutlineSetting,
    path : "/configuratons/scheme"
},
{
    label : "Taxes",
    icon : AiOutlineSetting,
    path : "/configuratons/taxes"
},
{
    label : "PO",
    icon : AiOutlineSetting,
    path : "/configuratons/po"
},
{
    label : "GRN",
    icon : AiOutlineSetting,
    path : "/configuratons/grn"
},
{
    label : "Company",
    icon : AiOutlineSetting,
    path : "/configuratons/company"
},
{
    label : "ASR",
    icon : AiOutlineSetting,
    path : "/configuratons/asr"
},
{
    label : "Barcode",
    icon : AiOutlineSetting,
    path : "/configuratons/barcode"
},
{
    label : "Location",
    icon : AiOutlineSetting,
    path : "/configuratons/location"
},
{
    label : "Language",
    icon : AiOutlineSetting,
    path : "/configuratons/language"
},
{
    label : "Dealers Category",
    icon : AiOutlineSetting,
    path : "/configuratons/dealers-category"
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

    return (
        <div className='flex h-screen w-screen' >

        {/* Side Navigation Bar */}
    <div className={`border-r border-slate-300 h-full transition-all duration-500   ${isCollapsed ? "w-[50px]" : "w-[250px]"}`} >
        <VerticalNavBar toggleCollapse = {toggleCollapse} isCollapsed= {isCollapsed} navigation={configurationNavigation} />
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
