
export type SchemeListResponse = {
  schemeCode:string;
  schemeName: string;
  category: string;
  subCategory: string;
  schemePrice: number;
  dimension: dimension;
  weight: number;
  deliveryCharges: number;
  comboPacking: boolean;
  startDate: string;
  endDate: string;
  schemeDescription: string;
  productInformation: productInformation;
  faq: faq;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type productInformation = {
  productGroup: string;
  productQuantity: number;
  mrp: number;
  pop: number;
}[];

export type faq = {
  question: string;
  answer: string;
}[];

export type dimension = {
  height: string;
  weight: string;
  depth: string;
};

export type AddScheme = {
    schemeCode:string;
  schemeName: string;
  category: string;
  subCategory: string;
  schemePrice: number;
  dimension: dimension;
  weight: number;
  deliveryCharges: number;
  comboPacking: boolean;
  startDate: string;
  endDate: string;
  schemeDescription: string;
  productInformation: productInformation;
  faq: faq;
};

export type UpdateScheme = {
  body: {
    schemeCode:string;
    schemeName: string;
    category: string;
    subCategory: string;
    schemePrice: number;
    dimension: dimension;
    weight: number;
    deliveryCharges: number;
    comboPacking: boolean;
    startDate: string;
    endDate: string;
    schemeDescription: string;
    productInformation: productInformation;
    faq: faq;
  };
  id: string;
};
