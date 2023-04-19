export type AttributesListResponse = {
  attributeName: string;
  companyId: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddAttributes = {
  attributeName: string;
  companyId: string;
};

export type UpdateAttributes = {
  body: {
    attributeName: string;
    companyId: string;
  };
  id: string;
};
