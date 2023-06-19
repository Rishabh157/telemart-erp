import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { BsInfoCircle } from 'react-icons/bs'

interface MouseOverPopoverProps {
    title: string
    children: React.ReactNode
    isIcon?: false
    buttonName?: string
    isbuttonName?: boolean
}

const MouseOverPopover: React.FC<MouseOverPopoverProps> = ({
    title,
    children,
    isIcon = false,
    buttonName = 'name',
    isbuttonName = false,
}) => {
    // const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )

    // const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handlePopoverClose = () => {
    //     setAnchorEl(null)
    // }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <div>
            <Typography
                aria-owns={open ? 'simple-popover' : undefined}
                aria-haspopup="true"
                // onMouseEnter={handlePopoverOpen}
                // onMouseLeave={handlePopoverClose}
                onClick={handleClick}
                // className="text-xs font-bold  font-sans p-1 "
            >
                {isIcon && <BsInfoCircle color="blue" />}
                {isbuttonName && (
                    <label className="text-xs font-bold  font-sans  ">
                        {buttonName}
                    </label>
                )}
            </Typography>
            <Popover
                id="simple-popover"
                // sx={{
                //     pointerEvents: 'none',
                // }}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                // onClose={handlePopoverClose}
                // disableRestoreFocus
                className="w-full p-2"
            >
                <div style={{ padding: '10px' }} className="font-bold text-center  text-sm ">
                    {title}
                </div>
                <div>{children}</div>
            </Popover>
        </div>
    )
}

export default MouseOverPopover
