import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi';
import ATMInputAdormant from 'src/components/UI/atoms/ATMInputAdormant/ATMInputAdormant';

type Props = {
    listHeading: string,
    onAddClick: () => void;
    listData: any[];
    searchValue?: string;
    OnSearchChange?: (newValue: string) => void;
    onListItemClick?: (item: any) => void
}

const LocationListView = ({
    listHeading,
    onAddClick,
    listData,
    searchValue = "",
    OnSearchChange = (newValue: string) => { },
    onListItemClick = (item: any) => {  }
}: Props
) => {
    return (
        <div className='border h-full w-full flex flex-col gap-1 rounded bg-white shadow-lg ' >
            <div className='border-b  text-slate-600 px-2 text-lg h-[50px] flex items-center justify-between ' >
                {listHeading}
                <button
                    type='button'
                    className='flex items-center gap-2 text-primary-main  text-sm h-[33px] px-4 rounded hover:bg-slate-100'
                    onClick={() => { onAddClick() }}
                > + Add </button>
            </div>

            <div className='px-2 border-b' >
                <ATMInputAdormant
                    name=''
                    value={searchValue}
                    onChange={(e) => { OnSearchChange(e.target.value) }}
                    placeholder="Search"
                    adormant={<BiSearchAlt2 className='text-slate-400' />}
                    adormantProps={{
                        position: 'end',
                        extraClasses: 'bg-white border-none'

                    }}
                    className="h-[30px] border-none"

                />
            </div>

            <div className='max-h-[calc(100%-100px)]  overflow-hidden hover:overflow-auto' >
                {
                    listData?.map((listItem, listItemIndex) => {
                        return (
                            <div
                                key={listItemIndex}
                                onClick={() => onListItemClick(listItem)}
                                className='border-b border-slate-100 py-1 px-2 text-slate-500 cursor-pointer hover:text-primary-main text-sm'
                            >
                                {listItem}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LocationListView
