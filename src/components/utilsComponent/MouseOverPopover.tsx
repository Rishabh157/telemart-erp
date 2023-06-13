import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { BsInfoCircle } from 'react-icons/bs'

interface MouseOverPopoverProps {
    title: string
    children: React.ReactNode
}

const MouseOverPopover: React.FC<MouseOverPopoverProps> = ({
    title,
    children,
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
                <BsInfoCircle color="blue" />
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                // className='w-60'
            >
                <span style={{ padding: '1px' }} className="text-xs font-normal ">
                   Ex. {title}
                </span>
                {children}
            </Popover>
        </div>
    )
}

export default MouseOverPopover
