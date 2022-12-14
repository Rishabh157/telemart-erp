import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import ATMInputAdormant from 'src/components/UI/atoms/ATMInputAdormant/ATMInputAdormant'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable, { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'

type Props = {
    columns: columnTypes[];
    rows: any[];
    onRowClick?: (row: any) => void;
    rowExtraClasses?: (row: any) => void;
    isTableLoading?: boolean
}



const CompaniesListing = ({
    columns,
    rows,
    onRowClick,
    rowExtraClasses,
    isTableLoading = false,
}: Props
) => {

    const navigate = useNavigate()

    return (
        <ConfigurationLayout>
            <div className='w-full h-full ' >

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

                        <div>
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

                    extraClasses='max-h-[calc(100%-150px)] overflow-auto'
                />

                <div className=' border-t  h-[50px] flex items-center ' >
                    <div className='w-full' >
                        <ATMPagination
                            page={1}
                            onPageChange={(newPage) => alert(newPage)}
                            rowsPerPage={10}
                            rowCount={1}
                            rows={rows}
                            onRowsPerPageChange={(newValue) => alert(newValue)}

                        />
                    </div>
                </div>
            </div>
        </ConfigurationLayout>
    )
}

export default CompaniesListing
