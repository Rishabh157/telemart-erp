import React from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'

const BatchListing = () => {
  return (
    <div className="px-4 h-[calc(100vh-55px)] pt-3">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[55px]">
                <ATMPageHeading> Batch </ATMPageHeading>
              
            </div>

            <div className="border flex flex-col h-[calc(100%-55px)] rounded bg-white">
                {/*Table Header */}

                {/* Table */}
                <div className={`grow overflow-auto `}>
                    <ATMTable
                        columns={[]}
                        rows={[]}
                        isCheckbox={true}
                     
                        onRowSelect={() =>
                            {}
                        }
                    />
                </div>

                {/* Pagination */}
                
            </div>
        </div>
  )
}

export default BatchListing
