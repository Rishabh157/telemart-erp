import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import MediaLayout from '../MediaLayout'

const Inbound = () => {
    return (
        <MediaLayout>
            <div className=" grid grid-rows-12 h-[calc(100%-20px)] p-2">
                <div className="row-span-1 grid grid-cols-4 gap-2 border border-blue-300 py-1 px-4">
                    <ATMTextField
                        label="1"
                        value={''}
                        onChange={() => {}}
                        name=""
                    />
                    <ATMTextField
                        label="2"
                        value={''}
                        onChange={() => {}}
                        name=""
                    />
                    <ATMTextField
                        label="3"
                        value={''}
                        onChange={() => {}}
                        name=""
                    />
                    <ATMTextField
                        label="4"
                        value={''}
                        onChange={() => {}}
                        name=""
                    />
                </div>
                <div className="row-span-2 border border-blue-300 p-1 mt-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="test-blue-200 col-span-1 mt-8">
                            search
                        </div>
                        <ATMTextField
                            className="col-span-2"
                            label="5"
                            value={''}
                            onChange={() => {}}
                            name=""
                        />
                    </div>
                    <div className="h-40">table</div>
                </div>
                <div className="row-span-3  border border-blue-300 mt-1">
                    <div className="grid grid-cols-2 gap-4  ">
                        <div className="col-span-1 grid grid-cols-4 gap-1 border border-blue-300 ">
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                        </div>
                        <div className="test-blue-200 grid grid-cols-3 gap-2 border border-blue-300 p-2">
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />{' '}
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                            <ATMTextField
                                className=""
                                label="5"
                                value={''}
                                onChange={() => {}}
                                name=""
                            />
                        </div>
                    </div>
                </div>
                <div className="row-span-2  border border-blue-300 mt-1"></div>
                <div className="row-span-4  border border-blue-300 mt-1 h-full"></div>
            </div>
        </MediaLayout>
    )
}

export default Inbound
