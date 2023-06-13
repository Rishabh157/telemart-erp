import React, { ReactNode } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Popover } from '@mui/material'
import { HiDotsHorizontal } from 'react-icons/hi'

interface ActionPopupProps {
    handleOnAction: () => void
    children: ReactNode
}

const ActionPopup: React.FC<ActionPopupProps> = ({
    handleOnAction,
    children,
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
                            {children}
                        </Popover>
                    </div>
                )}
            </PopupState>
        </>
    )
}

export default ActionPopup
