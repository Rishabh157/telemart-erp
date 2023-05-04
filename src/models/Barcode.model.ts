export type BarcodeListResponse = {
  productGroup: string;
  productGroupLabel: string;
  barcodeNumber: string;
  // is_used: boolean;
  companyId: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddBarcode = {
  productGroup: string;
  barcodeNumber: string;
  companyId: string;
};

export type UpdateBarcode = {
  body: {
    productGroup: string;
    barcodeNumber: string;
    companyId: string;
  };
  id: string;
};
