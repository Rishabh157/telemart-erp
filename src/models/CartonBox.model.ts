export type CartonBoxListResponse = {
  boxName: string;
  innerItemCount: number;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
  boxWeight: number;
  companyId: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddCartonBox = {
  boxName: string;
  innerItemCount: number;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
  boxWeight: number;
  companyId: string;
};

export type UpdateCartonBox = {
  body: {
    boxName: string;
    innerItemCount: number;
    dimension: {
      height: number;
      width: number;
      depth: number;
    };
    boxWeight: number;
    companyId: string;
  };
  id: string;
};
