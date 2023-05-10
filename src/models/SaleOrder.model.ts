export type productSalesOrder = {
  productGroupId: string;
  rate: number;
  quantity: number;
};

export type SaleOrderListResponse = {
  soNumber: string;
  dealer: string;
  wareHouse: string;
  dealerLabel: string;
  warehouseLabel: string;
  productSalesOrder: productSalesOrder[];
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddSaleOrder = {
  soNumber: string;
  dealer: string;
  wareHouse: string;
  companyId: string;
  productSalesOrder: productSalesOrder[];
};

export type UpdateSaleOrder = {
  body: {
    soNumber: string;
    dealer: string;
    wareHouse: string;
    companyId: string;
    productSalesOrder: productSalesOrder[];
  };
  id: string;
};
