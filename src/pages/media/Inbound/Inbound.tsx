import { Button } from '@mui/material'
import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ChannelCategoryListing from '../channelCategory/list/ChannelCategoryListing'
import MediaLayout from '../MediaLayout'

const Inbound = () => {
    return (
        <MediaLayout>
            <div className="relative h-[100vh-10px]  grid grid-rows-12 border-black p-2">
                <div className=" h-[60vh-20px] row-start-1 row-end-[9.5]  grid grid-rows-12 ">
                    <div className="row-sapn-1 h-[10vh-50px] grid grid-cols-4 gap-x-1 p-2 ">
                        <ATMTextField
                            label="Did Number"
                            value={''}
                            onChange={() => {}}
                            size="xs"
                            className="h-[2.5vh]"
                            name=""
                            placeholder="Did Number"
                            extraClassField="-mt-1"
                        />
                        <ATMTextField
                            label="In /OutBound"
                            value={''}
                            onChange={() => {}}
                            size="xs"
                            className="h-[2.5vh]"
                            extraClassField="-mt-1"
                            placeholder="In /outbound"
                            name=""
                        />
                        <ATMTextField
                            label="In commind Caller Number"
                            value={''}
                            onChange={() => {}}
                            size="xs"
                            className="h-[2.5vh]"
                            name=""
                            extraClassField="-mt-1"
                        />
                        <ATMTextField
                            label="Mobile No"
                            value={''}
                            onChange={() => {}}
                            size="xs"
                            className="h-[2.5vh]"
                            name=""
                            extraClassField="-mt-1"
                        />
                    </div>
                    <div className="row-span-11 h-[50vh-50px] grid grid-cols-3 gap-4 border border-purple-200 p-1">
                        <div className="col-span-2 border border-pink-300 p-2 grid grid-rows-12 h-[50vh-5px]">
                            <div className="  h-[18vh]  row-sapn-5 row-start-1 row-end-6 grid grid-rows-3 ">
                                <div className=" h-[6vh] -mt-2 row-sapn-1 grid grid-cols-5 gap-x-1 mt-1">
                                    <div className=" test-blue-200 col-span-1 mt-4">
                                        search
                                    </div>
                                    <ATMTextField
                                        size="xs"
                                        label="5"
                                        value={''}
                                        onChange={() => {}}
                                        name=""
                                        extraClassField="-mt-3 col-span-2"
                                    />
                                    <ATMTextField
                                        label="5"
                                        value={''}
                                        onChange={() => {}}
                                        size="xs"
                                        name=""
                                        extraClassField="-mt-3 col-span-2"

                                    />
                                </div>
                                <div className=" h-[11vh] row-saan-2 mt-1 border border-purple-400 ">
                                    Table search
                                </div>
                            </div>

                            <div className="h-[32vh] row-sapn-7 row-start-7 row-end-12 grid grid-cols-3 gap-x-1  ">
                                <ATMTextField
                                    extraClassField="h-[2.5vh]"
                                    label="Deliver Charge"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="Discount"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="Charge"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="Country"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="state"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="city"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="Tehs"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="pincode"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <ATMTextField
                                    extraClassField=" h-[3vh]"
                                    label="Area"
                                    value={''}
                                    onChange={() => {}}
                                    size="xs"
                                    className="h-[2.5vh]"
                                    name=""
                                />
                                <div className="mt-2">
                                    Expected Delivery time :
                                </div>
                                <div className="mt-2">
                                    Profile Delivery By :
                                </div>
                                <div className="mt-2">Complaint Deatail :</div>
                                <div className="mt-2">Complain NO :</div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-2 gap-1  col-span-1 h-[50vh-5px]">
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Agent Name"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="name"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Address"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Age"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Relation"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="City"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Landmark"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Alternative No"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="WhatsApp No"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />{' '}
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Gender"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Prepaid"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Email Id"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Channel"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                            <ATMTextField
                                extraClassField="h-[2.5vh]"
                                label="Remark"
                                value={''}
                                onChange={() => {}}
                                size="xs"
                                className="h-[2.5vh]"
                                name=""
                            />
                        </div>
                    </div>
                </div>
                <div className=" h-[10vh] row-span-[9.9] row-end-10 gap-x-1  flex justify-around  border border-purple-200 p-1">
                    <ATMTextField
                        label="Disposition One"
                        value={''}
                        onChange={() => {}}
                        size="xs"
                        className="h-[2.5vh]"
                        name=""
                        extraClassField="-mt-1 h-[3vh]"
                    />
                    <ATMTextField
                        label="Disposition Two"
                        value={''}
                        onChange={() => {}}
                        size="xs"
                        className="h-[2.5vh]"
                        name=""
                        extraClassField="-mt-1 h-[3vh]"
                    />
                    {/* <ATMTextField
                        label="3"
                        value={''}
                        onChange={() => {}}
                         size='xs'
                        name=""
                        extraClassField="-mt-1"
                    /> */}
                    <div className="flex justify-center text-blue items-center">
                        <a
                            href="https://google.com"
                            className="text-blue underline"
                        >
                            {' '}
                            Free prediction
                        </a>
                    </div>
                    <div className="p-5 w-1/5 flex justify-center items-center">
                        <Button
                            fullWidth
                            className="p-2"
                            size="medium"
                            onChange={() => {}}
                            type="submit"
                            variant="outlined"
                        >
                            save
                        </Button>
                    </div>
                </div>
                <div className=" h-[26vh]  row-start-10 row-end-12  ">
                    <ChannelCategoryListing columns={[]} rows={[]} />
                </div>
            </div>
        </MediaLayout>
    )
}

export default Inbound
