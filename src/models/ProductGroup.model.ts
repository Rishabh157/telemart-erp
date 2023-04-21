export type ProductGroupListResponse = {
  groupName: string;
  companyId: string;
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

};

export type UpdateProductGroup = {
  body: {
    groupName: string;
    companyId:string;

  };
  id: string;
};
