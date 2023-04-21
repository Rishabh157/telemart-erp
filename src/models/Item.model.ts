export type ItemListResponse = {
  itemImage: string;
  itemCode: string;
  itemName: string;
  itemWeight: string;
  companyId: string;
  iActive: boolean;
  iDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddItem = {
  itemImage: string;
  itemCode: string;
  itemName: string;
  itemWeight: string;
  companyId: string;
};

export type UpdateItem = {
  body: {
    itemImage: string;
    itemCode: string;
    itemName: string;
    itemWeight: string;
    companyId: string;
  };
  id: string;
};
