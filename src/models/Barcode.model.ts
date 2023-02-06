export type BarcodeListResponse = {
  product_name: string;
  quantity: string;
  is_used: boolean;
  barcode_number: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddBarcode = {
  product_name: string;
  quantity: string;
};

export type UpdateBarcode = {
  body: {
    product_name: string;
    quantity: string;
  };
  id: string;
};
