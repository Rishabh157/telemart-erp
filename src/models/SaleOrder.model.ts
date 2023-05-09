export type SaleOrderListResponse = {
  soNumber: string;
  dealer: string;
  wareHouse: string;
  dealerLabel: string;
  warehouseLabel: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type productSalesOrder = {
    productGroup: string;
    rate: number;
    quantity: number;
  }

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
  };
  id: string;
};
