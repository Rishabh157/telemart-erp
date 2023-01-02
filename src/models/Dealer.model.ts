export type DealersListResponse = {
    firstName: string;
    lastName: string;
    dealerCode: string;
    firmName: string;
    registeredAddress: string;
    pincode: string;
    state: string;
    district: string;
    contactNo: string;
    mobile: string;
    email: string;
    gstNo: string;
    pan: string;
    aadharNo: string;
    shippingAddresses: string[];
    is_active: boolean;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}

export type AddDealer = {
    firstName: string;
    lastName: string;
    dealerCode: string;
    firmName: string;
    registeredAddress: string;
    pincode: string;
    state: string;
    district: string;
    contactNo: string;
    mobile: string;
    email: string;
    gstNo: string;
    pan: string;
    aadharNo: string;
    shippingAddresses: string[];

}

export type UpdateDealer = {
    body: {
        firstName: string;
        lastName: string;
        dealerCode: string;
        firmName: string;
        registeredAddress: string;
        pincode: string;
        state: string;
        district: string;
        contactNo: string;
        mobile: string;
        email: string;
        gstNo: string;
        pan: string;
        aadharNo: string;
        shippingAddresses: string[];

    },
    id: string;
}