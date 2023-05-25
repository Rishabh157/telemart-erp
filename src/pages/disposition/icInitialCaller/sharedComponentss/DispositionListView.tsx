import React from 'react'
import { useSelector } from 'react-redux'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { RootState } from 'src/redux/store'
type Props = {
    listHeading: string
    onAddClick: () => void
    listData: any[]
    searchValue?: string
    OnSearchChange?: (newValue: string) => void
    onListItemClick?: (item: any) => void
    disabled: boolean
}

const DispositionListViews = ({
    listHeading,
    onAddClick,
    listData,
    searchValue = '',
    OnSearchChange = (newValue: string) => {},
    onListItemClick = (item: any) => {},
    disabled = false,
}: Props) => {
    // const { selectedDispositionOne }: any = useSelector(
    //     (state: RootState) => state.dispositionOne
    // )
    // const { selectedDispostion }: any = useSelector(
    //     (state: RootState) => state.dispositionTwo
    // )
    const { selectedInitialOne }: any = useSelector(
        (state: RootState) => state.initialCallerOne
    )
    const { selectedInitialCallerTwo }: any = useSelector(
        (state: RootState) => state.initialCallerTwo
    )

    return (
        <div className="border h-full w-full flex flex-col gap-1 rounded bg-white shadow-lg ">
            <div className="border-b  text-slate-600 px-2 text-lg h-[50px] flex items-center justify-between ">
                {listHeading}
                <button
                    type="button"
                    disabled={disabled}
                    className="flex items-center gap-2 text-primary-main  text-sm h-[33px] px-4 rounded hover:bg-slate-100"
                    onClick={() => {
                        onAddClick()
                    }}
                >
                    {' '}
                    + Add{' '}
                </button>
            </div>

            <div className="px-2 border-b">
                <ATMTextField
                    name=""
                    value={searchValue}
                    onChange={(e) => {
                        OnSearchChange(e.target.value)
                    }}
                    placeholder="Search"
                    className="h-[30px] border-none"
                />
            </div>

            <div className="max-h-[calc(100%-100px)]  overflow-hidden hover:overflow-auto">
                {listData?.map((listItem, listItemIndex) => {
                    return (
                        <div
                            key={listItemIndex}
                            onClick={() => {
                                onListItemClick(listItem)
                            }}
                            className={`border-b border-slate-100 py-1 px-2 text-black-500 cursor-pointer text-sm ${
                                listItem.value !== undefined &&
                                (selectedInitialOne?.value ===
                                        listItem.value ||
                                    selectedInitialCallerTwo?.value === listItem.value)
                                    ? 'bg-gray-300'
                                    : ''
                            }`}
                        >
                            {listItem.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DispositionListViews
