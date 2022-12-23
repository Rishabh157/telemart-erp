import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import ATMInputAdormant from 'src/components/UI/atoms/formFields/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import { AppDispatch, RootState } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setRowsPerPage } from 'src/redux/slices/warehouseSlice'
import { WarehousesListResponse } from 'src/models'

export type Props = {
    columns: columnTypes[];
    rows: WarehousesListResponse[] | [];
    onRowClick: (row: WarehousesListResponse) => void;
    rowExtraClasses?: (row: WarehousesListResponse) => void;
    isTableLoading: boolean
}

const WarehousesListing = ({
    columns,
    rows,
    onRowClick,
    rowExtraClasses,
    isTableLoading,
}: Props
) => {

    const warehouseState: any = useSelector((state: RootState) => state.warehouse)

    const {
        page,
        rowsPerPage,
        totalItems,
    } = warehouseState

    const dispatch = useDispatch<AppDispatch>()

    // Hooks
    const navigate = useNavigate()

    // States 
    const [selectedRows, setSelectedRows] = useState([]);

    return (
        <SideNavLayout>
            <div className='w-full h-full py-2 ' >
                <div className='h-[100px] ' >
                    <div className='mb-5 text-2xl text-slate-700 font-bold ' >
                        Warehouses
                    </div>
                    <div className='flex justify-between' >

                        <div className='flex gap-2' >
                            <ATMInputAdormant
                                name=''
                                value=''
                                onChange={() => { }}
                                placeholder="Search"
                                adormant={<BiSearchAlt2 className='text-slate-400' />}
                                adormantProps={{
                                    position: 'end',
                                    extraClasses: 'bg-white border-none'

                                }}
                                className="h-[33px]"
                            />

                            {
                                selectedRows.length ?
                                    <div  >
                                        <button className='bg-primary-main text-white p-2 rounded animate-[fade_0.3s_ease-in-out]' > Actions </button>
                                    </div>
                                    :
                                    null
                            }
                        </div>

                        <div>
                            <button
                                type='button'
                                className='flex items-center gap-2 bg-primary-main text-white text-sm h-[33px] px-4 rounded font-bold'
                                onClick={() => { navigate('add-warehouse') }}
                            >
                                <span className='text-xl' > + </span>   Add Warehouse
                            </button>
                        </div>
                    </div>
                </div>

                <ATMTable
                    columns={columns}
                    rows={rows}
                    selectedRows={selectedRows}
                    onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
                    extraClasses='max-h-[calc(100%-150px)] overflow-auto'
                    onRowClick={(row) => onRowClick(row)}
                    rowExtraClasses={rowExtraClasses}
                    isLoading={isTableLoading}

                />

                <div className=' border-t  h-[50px] flex items-center ' >
                    {rows.length ?
                        <div className='w-full' >
                            <ATMPagination
                                page={page}
                                onPageChange={(newPage) => dispatch(setPage(newPage))}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}
                                rowCount={totalItems || 4}
                                rows={rows}
                            />
                        </div>
                        : null
                    }
                </div>
            </div>

        </SideNavLayout>
    )
}

export default WarehousesListing
