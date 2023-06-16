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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {isIcon && <BsInfoCircle color="blue" />}
                {isbuttonName && (
                    <div className="text-xs font-bold ">{buttonName}</div>
                )}
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                className="w-full p-2"
            >
                <span
                    style={{ padding: '20px' }}
                    className="text-xs font-bold "
                >
                    {title}
                </span>
                {children}
            </Popover>
        </div>
    )
}

export default MouseOverPopover
