import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ATMExportButton from 'src/components/UI/atoms/ATMExportButton/ATMExportButton'
import ATMInputAdormant from 'src/components/UI/atoms/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import { setPage, setRowsPerPage } from 'src/redux/slices/companySlice'
import { Headers } from 'react-csv/components/CommonPropTypes'

type Props = {
    columns: columnTypes[];
    rows: any[];
    onRowClick?: (row: any) => void;
    rowExtraClasses?: (row: any) => void;
    isTableLoading?: boolean;
    rowsPerPage: number;
    page: number;
    onExportClick: (done: () => void) => void;
    isExporting: boolean;
    exportData: any[]
    exportHeaders: Headers
}

const CompaniesListing = ({
    columns,
    rows,
    onRowClick,
    rowExtraClasses,
    isTableLoading = false,
    rowsPerPage,
    page,
    onExportClick,
    isExporting,
    exportData,
    exportHeaders,

}: Props
) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    return (
        <ConfigurationLayout>
            <div className='w-full h-full py-2 ' >

                <div className='h-[100px] ' >

                    <div className='mb-5 text-2xl text-slate-700 font-bold ' >
                        Companies
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

                        </div>

                        <div className='flex gap-2' >

                            <ATMExportButton
                                data={exportData}
                                headers={exportHeaders}
                                fileName="company.csv"
                                isLoading={isExporting}
                                onClick={(done) => onExportClick(done)}

                            />


                            <button
                                type='button'
                                className='flex items-center gap-2 bg-primary-main text-white text-sm h-[33px] px-4 rounded font-bold'
                                onClick={() => { navigate('add-company') }}
                            >
                                <span className='text-xl' > + </span>   Add Company
                            </button>
                        </div>
                    </div>
                </div>


                <ATMTable
                    columns={columns}
                    rows={rows}
                    // isCheckbox={true}
                    isLoading={isTableLoading}

                    extraClasses='max-h-[calc(100%-150px)] overflow-auto'
                />

                <div className=' border-t  h-[50px] flex items-center ' >
                    <div className='w-full' >
                        <ATMPagination
                            page={page}
                            onPageChange={(newPage) => dispatch(setPage(newPage))}
                            rowsPerPage={rowsPerPage}
                            rowCount={6}
                            rows={rows}
                            onRowsPerPageChange={(newValue) => dispatch(setRowsPerPage(newValue))}

                        />
                    </div>
                </div>
            </div>
        </ConfigurationLayout>
    )
}

export default CompaniesListing
