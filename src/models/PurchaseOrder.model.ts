export type PurchaseOrderListResponse = {
  poCode: string;
  vendorId: string;
  vendorLabel: string;
  warehouseLabel: string;
  wareHouseId: string;
  isEditable:boolean;
  purchaseOrder: 
    {
      itemName: string;
      itemId: string;
      rate: number;
      quantity: number;
      estReceivingDate: string;
    };
 
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

;

export type addPurchaseOrder = {
  poCode: string;
  vendorId: string;
  wareHouseId: string;
  isEditable: boolean;
  purchaseOrder: 
    {
      itemId: string;
      rate: number;
      quantity: number;
      estReceivingDate: string;
    }[]
  companyId: string;
};

export type UpdatePurchaseOrder = {
  body: {
    poCode: string;
    vendorId: string;
    wareHouseId: string;
    isEditable:boolean;
    purchaseOrder: 
        {
          itemId: string;
          rate: number;
          quantity: number;
          estReceivingDate: string;
        }[]
    companyId: string;
  };
  id: string;
};
