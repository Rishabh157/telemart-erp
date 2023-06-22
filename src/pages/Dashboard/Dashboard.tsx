import React from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'

type Props = {}

const Dashboard = (props: Props) => {
    return (
        <div className="px-4 h-[calc(100vh-55px)] bg-white">
            <ATMPageHeading> Dashboard </ATMPageHeading>
        </div>
    )
}

export default Dashboard
