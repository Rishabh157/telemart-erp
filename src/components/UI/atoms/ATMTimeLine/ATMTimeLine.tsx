/// ==============================================
// Filename:ATMTimeLine.tsx
// Type: UI Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import * as React from 'react'

// |-- External Dependencies --|
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { timelineItemClasses } from '@mui/lab'

type Props = {
    timeLineItems: {
        content: React.ReactNode
    }[]
}

const ATMTimeLine = ({ timeLineItems }: Props) => {
    return (
        <Timeline
            sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
        >
            {timeLineItems?.map((item, itemIndex) => (
                <TimelineItem key={itemIndex}>
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{ backgroundColor: 'var(--primary-main)' }}
                        />
                        <TimelineConnector
                            sx={{ backgroundColor: 'var(--primary-main)' }}
                        />
                    </TimelineSeparator>
                    <TimelineContent> {item.content} </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    )
}

export default ATMTimeLine
