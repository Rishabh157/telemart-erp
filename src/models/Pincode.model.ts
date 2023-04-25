export type PincodeListResponse = {
  pincode: string;
  tehsilId: string;
  districtId: string;
  stateId: string;
  countryId: string;
  companyId: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddPincode = {
  pincode: string;
  tehsilId: string;
  districtId: string;
  stateId: string;
  companyId: string;
  countryId: string;
};

export type UpdatePincode = {
  body: {
    pincode: string;
    tehsilId: string;
    districtId: string;
    stateId: string;
    companyId: string;
    countryId: string;
  };
  id: string;
};
