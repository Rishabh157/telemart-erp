import * as React from 'react';
import Pagination from '@mui/material/Pagination';

interface ATMPaginationPropTypes {
    page: number;
    onPageChange: (newPage: number) => void
    rowsPerPage: number;
    onRowsPerPageChange?: (newRowsPerPage: number) => void;
    rowCount: number
    rowsPerPageOptions?: number[];
    rows: any[];
    hideRowsPerPage?: boolean;
}

const ATMPagination = (
    {
        rows,
        rowCount,
        page,
        onPageChange,
        rowsPerPage,
        onRowsPerPageChange = () => { },
        rowsPerPageOptions = [5, 10, 20, 50, 100],
        hideRowsPerPage = false
    }: ATMPaginationPropTypes
) => {

    return (
        <>
            {
                rows.length ?

                    <div className='flex justify-between items-center' >

                        {/* Rows Per Page */}
                        {!hideRowsPerPage ?
                            <div className='flex gap-3 items-center'>
                                <div className='text-sm'> Rows per page : </div>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
                                    className={`border border-slate-400 outline-0 bg-slate-100 text-sm rounded`}
                                >
                                    {
                                        rowsPerPageOptions.map(option => {
                                            return (
                                                <option key={option} value={option} > {option} </option>
                                            )
                                        })
                                    }
                                </select>

                                <div className='text-sm bg-slate-100 py-1 px-2 rounded text-slate-600' >
                                    Showing &nbsp; {(rowsPerPage * (page - 1)) + 1} - {(rowsPerPage * (page - 1)) + rows.length} of {rowCount}
                                </div>
                            </div> : null
                        }

                        {/* Out of */}
                        <div>
                            <Pagination
                                count={Math.ceil(rowCount / rowsPerPage)}
                                page={page}
                                onChange={(e, page) => onPageChange(page)}
                                showFirstButton={true}
                                showLastButton={true}
                                color='primary'
                            />
                        </div>
                    </div>
                    :
                    null

            }

        </>
    );
}

export default ATMPagination
