export type WarehousesListResponse = {
  wareHouseCode: string;
  wareHouseName: string;
  country: string;
  email: string;
  registrationAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  billingAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  contactInformation: {
    name: string;
    department: string;
    designation: string;
    email: string;
    mobileNumber: string;
    landLine: string;
  }[];
  companyId: string;
  wareHouseCountryName: string;
  registrationCountryName: string;
  registrationStateName: string;
  registrationDistrictName: string;
  registrationPincodeName: string;
  billingAddressCountryName: string;
  billingAddressStateName: string;
  billingAddressDistrictName: string;
  billingAddressPincodeName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddWarehouse = {
  wareHouseCode: string;
  wareHouseName: string;
  country: string;
  email: string;
  registrationAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  billingAddress: {
    phone: string;
    address: string;
    country: string;
    state: string;
    district: string;
    pincode: string;
  };
  contactInformation: {
    name: string;
    department: string;
    designation: string;
    email: string;
    mobileNumber: string;
    landLine: string;
  }[];
  companyId: string;
};

export type UpdateWarehouse = {
  body: {
    wareHouseCode: string;
    wareHouseName: string;
    country: string;
    email: string;
    registrationAddress: {
      phone: string;
      address: string;
      country: string;
      state: string;
      district: string;
      pincode: string;
    };
    billingAddress: {
      phone: string;
      address: string;
      country: string;
      state: string;
      district: string;
      pincode: string;
    };
    contactInformation: {
      name: string;
      department: string;
      designation: string;
      email: string;
      mobileNumber: string;
      landLine: string;
    }[];
    companyId: string;
  };
  id: string;
};
