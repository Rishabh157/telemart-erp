export type ProductGroupListResponse = {
  groupName: string;
  companyId: string;
  tax: {
    taxName: string;
    taxPercent: number;
  }[];
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddProductGroup = {
  groupName: string;
  companyId:string;
  tax: {
    taxName: string;
    taxPercent: number;
  }[];

};

export type UpdateProductGroup = {
  body: {
    groupName: string;
    tax: {
      taxName: string;
      taxPercent: number;
    }[];
    companyId:string;

  };
  id: string;
};
