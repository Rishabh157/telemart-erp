export type CartonBoxBarcodeListResponse = {
  cartonBoxId: string;
  cartonboxLabel: string;
  barcodeNumber: string;
  barcodeGroupNumber: string;
  isUsed: boolean;
  companyId: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddCartonBoxBarcode = {
  cartonBoxId: string;
  barcodeGroupNumber: string;
  barcodeNumber: string;
  companyId: string;
};

export type UpdateCartonBoxBarcode = {
  body: {
    cartonBoxId: string;
    barcodeGroupNumber: string;
    barcodeNumber: string;
    companyId: string;
  };
  id: string;
};
