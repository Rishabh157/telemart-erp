/// ==============================================
// Filename:ActionPopup.tsx
// Type: Utils Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { ReactNode } from 'react'

// |-- External Dependencies --|
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Popover } from '@mui/material'
import { HiDotsHorizontal } from 'react-icons/hi'

interface ActionPopupProps {
    handleOnAction: () => void
    children?: ReactNode
    handleViewActionButton?: () => void
    handleEditActionButton?: () => void
    handleDeleteActionButton?: () => void
    isView?: boolean
    isDelete?: boolean
    isEdit?: boolean
    className?: string
}

const ActionPopup: React.FC<ActionPopupProps> = ({
    handleOnAction,
    children,
    handleViewActionButton,
    handleEditActionButton,
    handleDeleteActionButton,
    isView = false,
    isEdit = false,
    isDelete = false,
    className = 'block w-full text-left px-4 py-2 hover:bg-gray-100',
}) => {
    return (
        <>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div onClick={handleOnAction}>
                        <button
                            {...bindTrigger(popupState)}
                            className="text-slate-600 font-bold  transition-all duration-[600ms] hover:bg-slate-100 p-2 rounded-full"
                        >
                            <HiDotsHorizontal className="text-xl text-slate-600 font-bold " />
                        </button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <>
                                {isView && (
                                    <button
                                        onClick={handleViewActionButton}
                                        className={className}
                                    >
                                        View
                                    </button>
                                )}
                                {isEdit && (
                                    <button
                                        onClick={handleEditActionButton}
                                        className={className}
                                    >
                                        Edit
                                    </button>
                                )}
                                {children}
                                {isDelete && (
                                    <button
                                        onClick={popupState.close}
                                        className="block w-full text-left  hover:bg-gray-100"
                                    >
                                        <div
                                            className="block px-4 py-2"
                                            onClick={handleDeleteActionButton}
                                        >
                                            Delete
                                        </div>
                                    </button>
                                )}
                            </>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </>
    )
}

export default ActionPopup
