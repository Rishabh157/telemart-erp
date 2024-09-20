import React from 'react'
import { twMerge } from 'tailwind-merge'

const AtmExcelDownload = ({ downloadUrl, fileName }: any) => {
    return (
        <button
            type="button"
            className={twMerge(
                `border border-primary-main h-[34px] px-3 items-center rounded bg-white  text-primary-main flex gap-2 mt-1 `
            )}
        >
            <a href={downloadUrl} download={fileName}>
                Download CSV
            </a>
        </button>
    )
}

export default AtmExcelDownload
