export type DealersSchemeListResponse = {
    dealerId: string;
    schemeId: string;
    schemeName: string;
    price: string;
    companyId: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
  };

  export type DealersSchemeAdd = {
    dealerId: string;
    schemeId: string[];
    companyId: string;
  };

  export type UpdateDealersScheme = {
    body: {
      SchemeId: string[];
      dealerId: string;
      companyId: string;
    };
    id: string;
  };