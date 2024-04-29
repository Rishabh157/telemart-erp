import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import Dashboard from './Dashboard'

type Props = {}

const DashboardWrappper = (props: Props) => {
    const columns: columnTypes[] = [
        {
            field: 'pincode',
            headerName: 'Pincode',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.pincode} </span>,
        },
        {
            field: 'bussinessOpportunities',
            headerName: 'Bussiness Opportunities',
            flex: 'flex-[1.0_1.0_0%]',
            renderCell: (row: any) => {
                return <span> {row.bussinessOpportunities} </span>
            },
        },
        {
            field: 'qty',
            headerName: 'QTY',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.qty} </span>
            },
        },
        {
            field: 'yetToShipped',
            headerName: 'Yet To Shipped',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.yetToShipped} </span>
            },
        },
        {
            field: 'shipped',
            headerName: 'Shipped',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.shipped} </span>
            },
        },
        {
            field: 'delivered',
            headerName: 'Delivered',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.delivered} </span>
            },
        },
        {
            field: 'returned',
            headerName: 'Returned',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.returned} </span>
            },
        },
        {
            field: 'cancelled',
            headerName: 'Cancelled',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => {
                return <span> {row.cancelled} </span>
            },
        },
    ]
    const rows = [
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
        {
            pincode: '452001',
            bussinessOpportunities: '12',
            qty: '4',
            yetToShipped: '0',
            shipped: '0',
            delivered: '1',
            returned: '0',
            cancelled: '0',
        },
    ]
    const columns2: columnTypes[] = [
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 'flex-[2_2_0%]',
            renderCell: (row: any) => <span> {row.productName} </span>,
        },
        {
            field: 'productCode',
            headerName: 'Product Code',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.productCode} </span>,
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.price} </span>,
        },
        {
            field: 'stockReceivePending',
            headerName: 'Stock Receive Pending',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.stockReceivePending} </span>,
        },
        {
            field: 'shippingPending',
            headerName: 'Shipping Pending',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.shippingPending} </span>,
        },
        {
            field: 'physicalGoodStock',
            headerName: 'Physical Good Stock',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.physicalGoodStock} </span>,
        },
        {
            field: 'defectiveStock',
            headerName: 'Defective Stock',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.defectiveStock} </span>,
        },
        {
            field: 'totalStock',
            headerName: 'Total Stock',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: any) => <span> {row.totalStock} </span>,
        },
    ]
    const rows2 = [
        {
            productName: 'DAMDAR OIL DEFAULT',
            productCode: 'DD-OIL -00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'NONI D-CARE -DEFAULT',
            productCode: 'NONI-02-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'DRINK STOP -DEFAULT',
            productCode: 'DRINKSTOP-01',
            price: '3200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'TRIBAL SLIMMING OIL PLUS -DEFAULT',
            productCode: 'TSOPLUS',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'JAI SHREE MAHANKAL YANTRA SET -DEFAULT',
            productCode: 'SHY-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'ALCHOBAN PLUS -DEFAULT',
            productCode: 'TLALB-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'RAJ VILAS -DEFAULT',
            productCode: 'RJV-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'SLIM 24 PRO PROTIEIN POWDER -DEFAULT',
            productCode: 'SLIM-24-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'DHUAN DHAR -DEFAULT',
            productCode: 'TLDD-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'UDAR SANJIVANI -DEFAULT',
            productCode: 'TPLUS-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'TRIBAL BLACK OIL -DEFAULT',
            productCode: 'TBHO-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'HANUMAN CHALISA YANTRA -DEFAULT',
            productCode: 'HCY-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'TRIBAL HERBAL HAIR HEENA (TH3) BROWN - 1750 -DEFAULT',
            productCode: 'TH3-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'TRIBAL SLIMMING OIL -DEFAULT',
            productCode: 'TSO-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
        {
            productName: 'TRIBAL BAMBO CAPSULE -DEFAULT',
            productCode: 'TBC-00',
            price: '5200',
            stockReceivePending: '32',
            shippingPending: '30',
            physicalGoodStock: '0',
            defectiveStock: '17',
            totalStock: '0',
        },
    ]

    return (
        <>
            <SideNavLayout>
                <Dashboard
                    // dataPoints={agentOrdersData} // for orders of agent
                    columns={columns}
                    rows={rows}
                    columns2={columns2}
                    rows2={rows2}
                />
            </SideNavLayout>
        </>
    )
}

export default DashboardWrappper
