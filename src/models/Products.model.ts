export type ProductsListResponse = {
  productCode: string;
  productName: string;
  productCategory: string;
  productSubCategory: string;
  productGroup: string;
  productWeight: number;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
  productImage: string;
  description: string;
  item: {
    itemName: string;
    itemId: string;
    itemQuantity: number;
  }[];

  tax: {
    taxName: string;
    taxId: string;
    taxPercent: number;
  }[];

  faq: {
    question: string;
    answer: string;
  }[];
  video: {
    videoName: string;
    videoLink: string;
  }[];

  callScript: {
    language: string;
    script: string;
  }[];

  companyId: string;
  productCategoryLabel: string;
  productSubCategoryLabel: string;
  productGroupLabel: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type AddProducts = {
  productCode: string;
  productName: string;
  productCategory: string;
  productSubCategory: string;
  productGroup: string;
  productWeight: number;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
  productImage: string;
  description: string;
  item: {
    itemId: string;
    itemQuantity: number;
  }[];

  faq: {
    question: string;
    answer: string;
  }[];
  video: {
    videoName: string;
    videoLink: string;
  }[];

  callScript: {
    language: string;
    script: string;
  }[];

  companyId: string;
};

export type UpdateProducts = {
  body: {
    productCode: string;
    productName: string;
    productCategory: string;
    productSubCategory: string;
    productGroup: string;
    productWeight: number;
    dimension: {
      height: number;
      width: number;
      depth: number;
    };
    productImage: string;
    description: string;
    item: {
      itemId: string;
      itemQuantity: number;
    }[];

    faq: {
      question: string;
      answer: string;
    }[];
    video: {
      videoName: string;
      videoLink: string;
    }[];

    callScript: {
      language: string;
      script: string;
    }[];

    companyId: string;
  };
  id: string;
};
