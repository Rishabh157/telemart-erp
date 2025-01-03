// |-- Built-in Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import { useSelector } from 'react-redux'

// |-- Internal Dependencies --|
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { CiEdit } from 'react-icons/ci'

// |-- Redux --|
import { RootState } from 'src/redux/store'

// |-- Types --|
type Props = {
    listHeading: string
    onAddClick: () => void
    listData: any[]
    searchValue?: string
    OnSearchChange?: (newValue: string) => void
    onListItemClick?: (item: any) => void
    disabled: boolean
    isAddButton: boolean
    isEditButton?: boolean
    onEditListItemClick?: (item: any) => void
}

const LocationListView = ({
    listHeading,
    onAddClick,
    listData,
    searchValue = '',
    OnSearchChange = (newValue: string) => { },
    onListItemClick = (item: any) => { },
    disabled = false,
    isAddButton = true,
    isEditButton = false,
    onEditListItemClick = (item: any) => { },
}: Props) => {
    const { selectedLocationCountries }: any = useSelector(
        (state: RootState) => state.country
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state.district
    )
    const { selectedLocationTehsil }: any = useSelector(
        (state: RootState) => state.tehsils
    )
    const { selectedLocationPincode }: any = useSelector(
        (state: RootState) => state.pincode
    )
    const { selectedLocationArea }: any = useSelector(
        (state: RootState) => state.areas
    )

    return (
        <div className="flex flex-col w-full h-full gap-1 bg-white border rounded shadow-lg ">
            <div className="border-b  text-slate-600 px-2 text-lg h-[50px] flex items-center justify-between ">
                {listHeading}

                {isAddButton && (
                    <button
                        type="button"
                        disabled={disabled}
                        className="flex items-center gap-2 text-primary-main  text-sm h-[33px] px-4 rounded hover:bg-slate-100"
                        onClick={() => {
                            onAddClick()
                        }}
                    >
                        + Add
                    </button>
                )}
            </div>

            <div className="px-2 border-b">
                <ATMTextField
                    name=""
                    value={searchValue}
                    onChange={(e) => {
                        OnSearchChange(e.target.value)
                    }}
                    placeholder="Search..."
                    className="h-[30px] border-none"
                />
            </div>

            <div className="max-h-[calc(100%-100px)] overflow-hidden hover:overflow-auto">
                {listData?.map((listItem, listItemIndex) => {
                    return (
                        <div
                            key={listItemIndex}
                            onClick={() => {
                                onListItemClick(listItem)
                            }}
                            className={`flex justify-between items-center border-b border-slate-100 py-1 px-2 text-black-500 cursor-pointer text-sm group ${listItem.value !== undefined &&
                                (selectedLocationCountries === listItem.value ||
                                    selectedLocationState === listItem.value ||
                                    selectedLocationDistrict ===
                                    listItem.value ||
                                    selectedLocationTehsil === listItem.value ||
                                    selectedLocationPincode ===
                                    listItem.value ||
                                    selectedLocationArea === listItem.value)
                                ? 'bg-gray-300'
                                : ''
                                }`}
                        >
                            {listItem.label}

                            {isEditButton && (
                                <span
                                    onClick={(event) => {
                                        event.stopPropagation() // Prevent click event from bubbling to the parent
                                        onEditListItemClick(listItem)
                                    }}
                                    className="transition-all opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded flex-shrink-0 overflow-hidden cursor-pointer p-1"
                                >
                                    <CiEdit size={18} />
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LocationListView
