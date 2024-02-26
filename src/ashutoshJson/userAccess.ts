export enum AttributeUserAccessType {
  NAV_ATTRIBUTE = "NAV_ATTRIBUTE",
  ACTION_ATTRIBUTE_LIST = "ACTION_ATTRIBUTE_LIST",
  ACTION_ATTRIBUTE_ADD = "ACTION_ATTRIBUTE_ADD",
  ACTION_ATTRIBUTE_EDIT = "ACTION_ATTRIBUTE_EDIT",
  ACTION_ATTRIBUTE_DELETE = "ACTION_ATTRIBUTE_DELETE",
}


export enum AttributeGroupUserAccessType {
  NAV_ATTRIBUTE_GROUP = "NAV_ATTRIBUTE_GROUP",
  ACTION_ATTRIBUTE_GROUP_LIST = "ACTION_ATTRIBUTE_GROUP_LIST",
  ACTION_ATTRIBUTE_GROUP_ADD = "ACTION_ATTRIBUTE_GROUP_ADD",
  ACTION_ATTRIBUTE_GROUP_EDIT = "ACTION_ATTRIBUTE_GROUP_EDIT",
  ACTION_ATTRIBUTE_GROUP_DELETE = "ACTION_ATTRIBUTE_GROUP_DELETE",
  ATTRIBUTE_GROUP_LIST_ATTRIBUTE_GROUP_NAME = "ATTRIBUTE_GROUP_LIST_ATTRIBUTE_GROUP_NAME",
  ATTRIBUTE_GROUP_LIST_ATTRIBUTES = "ATTRIBUTE_GROUP_LIST_ATTRIBUTES"
}
export enum ItemsUserAccessType {
  NAV_ITEMS = "NAV_ITEMS",
  ACTION_ITEMS_LIST = "ACTION_ITEMS_LIST",
  ACTION_ITEMS_ADD = "ACTION_ITEMS_ADD",
  ACTION_ITEMS_EDIT = "ACTION_ITEMS_EDIT",
  ACTION_ITEMS_DELETE = "ACTION_ITEMS_DELETE",
  ITEMS_LIST_ITEMS_CODE = "ITEMS_LIST_ITEMS_CODE",
  ITEMS_LIST_ITEMS_NAME = "ITEMS_LIST_ITEMS_NAME",
  ITEMS_LIST_WEIGHT = "ITEMS_LIST_WEIGHT",

}

export enum ProductCategoryUserAccessType {
  NAV_PRODUCT_CATEGORY = "NAV_PRODUCT_CATEGORY",
  ACTION_PRODUCT_CATEGORY_LIST = "ACTION_PRODUCT_CATEGORY_LIST",
  ACTION_PRODUCT_CATEGORY_ADD = "ACTION_PRODUCT_CATEGORY_ADD",
  ACTION_PRODUCT_CATEGORY_EDIT = "ACTION_PRODUCT_CATEGORY_EDIT",
  ACTION_PRODUCT_CATEGORY_DELETE = "ACTION_PRODUCT_CATEGORY_DELETE",
  PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_CODE = "PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_CODE",
  PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_NAME = "PRODUCT_CATEGORY_LIST_PRODUCT_CATEGORY_NAME",

}
export enum ProductGroupsUserAccessType {
  NAV_PRODUCT_GROUP = "NAV_PRODUCT_GROUP",
  ACTION_PRODUCT_GROUP_LIST = "ACTION_PRODUCT_GROUP_LIST",
  ACTION_PRODUCT_GROUP_ADD = "ACTION_PRODUCT_GROUP_ADD",
  ACTION_PRODUCT_GROUP_EDIT = "ACTION_PRODUCT_GROUP_EDIT",
  ACTION_PRODUCT_GROUP_DELETE = "ACTION_PRODUCT_GROUP_DELETE",
  PRODUCT_GROUP_LIST_PRODUCT_GROUP_NAME = "PRODUCT_GROUP_LIST_PRODUCT_GROUP_NAME",
  PRODUCT_GROUP_LIST_DEALER_SALE_PRICE = "PRODUCT_GROUP_LIST_DEALER_SALE_PRICE",
  PRODUCT_GROUP_LIST_SATE_GST = "PRODUCT_GROUP_LIST_SATE_GST",
  PRODUCT_GROUP_LIST_CENTER_GST = "PRODUCT_GROUP_LIST_CENTER_GST",
  PRODUCT_GROUP_LIST_INTEGRATED_GST = "PRODUCT_GROUP_LIST_INTEGRATED_GST",
  PRODUCT_GROUP_LIST_UNION_TERRITORY = "PRODUCT_GROUP_LIST_UNION_TERRITORY",

}
export enum ProductSubCategoryUserAccessType {
  NAV_PRODUCT_SUB_CATEGORY = "NAV_PRODUCT_SUB_CATEGORY",
  ACTION_PRODUCT_SUB_CATEGORY_LIST = "ACTION_PRODUCT_SUB_CATEGORY_LIST",
  ACTION_PRODUCT_SUB_CATEGORY_ADD = "ACTION_PRODUCT_SUB_CATEGORY_ADD",
  ACTION_PRODUCT_SUB_CATEGORY_EDIT = "ACTION_PRODUCT_SUB_CATEGORY_EDIT",
  ACTION_PRODUCT_SUB_CATEGORY_DELETE = "ACTION_PRODUCT_SUB_CATEGORY_DELETE",
  PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_CODE = "PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_CODE",
  PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_NAME = "PRODUCT_SUB_CATEGORY_LIST_PRODUCT_SUB_CATEGORY_NAME",
  PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY = "PRODUCT_SUB_CATEGORY_LIST_PARENT_CATEGORY",
  PRODUCT_SUB_CATEGORY_LIST_HSN_CODE = "PRODUCT_SUB_CATEGORY_LIST_HSN_CODE",

}

export enum SchemeUserAccessType {
  NAV_SCHEME = "NAV_SCHEME",
  ACTION_SCHEME_LIST = "ACTION_SCHEME_LIST",
  ACTION_SCHEME_ADD = "ACTION_SCHEME_ADD",
  ACTION_SCHEME_EDIT = "ACTION_SCHEME_EDIT",
  ACTION_SCHEME_DELETE = "ACTION_SCHEME_DELETE",
  SCHEME_LIST_SCHEME_CODE = "SCHEME_LIST_SCHEME_CODE",
  SCHEME_LIST_SCHEME_NAME = "SCHEME_LIST_SCHEME_NAME",
  SCHEME_LIST_CATEGORY = "SCHEME_LIST_CATEGORY",
  SCHEME_LIST_SUB_CATEGORY = "SCHEME_LIST_SUB_CATEGORY",
  SCHEME_LIST_PRICE = "SCHEME_LIST_PRICE",

}


export enum AssetsCategoryUesrAccessTypes {
  NAV_ASSETS_CATEGORY = "NAV_ASSETS_CATEGORY",
  ACTION_ASSETS_CATEGORY_LIST = "ACTION_ASSETS_CATEGORY_LIST",
  ASSETS_CATEGORY_LIST_ASSETS_CATEGORY_NAME = "ASSETS_CATEGORY_LIST_ASSETS_CATEGORY_NAME",
  ACTION_ASSETS_CATEGORY_ADD = "ACTION_ASSETS_CATEGORY_ADD",
  ACTION_ASSETS_CATEGORY_ONE_EDIT = "ACTION_ASSETS_CATEGORY_ONE_EDIT",
  ACTION_ASSETS_CATEGORY_ONE_DELETE = "ACTION_ASSETS_CATEGORY_ONE_DELETE"
}
export enum AssetsAllocationUesrAccessTypes {
  NAV_ASSETS_ALLOCATION = "NAV_ASSETS_ALLOCATION",
  ACTION_ASSETS_ALLOCATION_LIST_ASSETS_ALLOCATION_NAME = "ACTION_ASSETS_ALLOCATION_LIST_ASSETS_ALLOCATION_NAME",
  ACTION_ASSETS_ALLOCATION_ADD = "ACTION_ASSETS_ALLOCATION_ADD",
  ACTION_ASSETS_ALLOCATION_ONE_EDIT = "ACTION_ASSETS_ALLOCATION_ONE_EDIT",
  ACTION_ASSETS_ALLOCATION_ONE_DELETE = "ACTION_ASSETS_ALLOCATION_ONE_DELETE"
}
export enum AssetsLocationUserAccessTypes {
  NAV_ASSETS_LOCATION = "NAV_ASSETS_LOCATION",
  ACTION_ASSETS_LOCATION_LIST = "ACTION_ASSETS_LOCATION_LIST",
  ASSETS_LOCATION_LIST_ASSETS_LOCATION_NAME = "ASSETS_LOCATION_LIST_ASSETS_LOCATION_NAME",
  ACTION_ASSETS_LOCATION_ADD = "ACTION_ASSETS_LOCATION_ADD",
  ACTION_ASSETS_LOCATION_ONE_EDIT = "ACTION_ASSETS_LOCATION_ONE_EDIT",
  ACTION_ASSETS_LOCATION_ONE_DELETE = "ACTION_ASSETS_LOCATION_ONE_DELETE"
}
export enum AssetsReLocationUserAccessTypes {
  NAV_ASSETS_RELOCATION = "NAV_ASSETS_RELOCATION",
  ACTION_ASSETS_RELOCATION_LIST = "ACTION_ASSETS_RELOCATION_LIST",
  ASSETS_LOCATION_LIST_ASSETS_RELOCATION_NAME = "ASSETS_RELOCATION_LIST_ASSETS_RELOCATION_NAME",
  ACTION_ASSETS_RELOCATION_ADD = "ACTION_ASSETS_RELOCATION_ADD",
  ACTION_ASSETS_RELOCATION_ONE_EDIT = "ACTION_ASSETS_RELOCATION_ONE_EDIT",
  ACTION_ASSETS_RELOCATION_ONE_DELETE = "ACTION_ASSETS_RELOCATION_ONE_DELETE"
}
export enum AssetsRequestUserAccessTypes {
  NAV_ASSETS_REQUEST = "NAV_ASSETS_REQUEST",
  ACTION_ASSETS_REQUEST_LIST = "ACTION_ASSETS_REQUEST_LIST",
  ASSETS_LOCATION_LIST_ASSETS_REQUEST_NAME = "ASSETS_REQUEST_LIST_ASSETS_REQUEST_NAME",
  ACTION_ASSETS_REQUEST_ADD = "ACTION_ASSETS_REQUEST_ADD",
  ACTION_ASSETS_REQUEST_ONE_EDIT = "ACTION_ASSETS_REQUEST_ONE_EDIT",
  ACTION_ASSETS_REQUEST_ONE_DELETE = "ACTION_ASSETS_REQUEST_ONE_DELETE"
}
export enum WebsitesUserAccessTypes {
  NAV_WEBSITES = "NAV_WEBSITES",
  ACTION_WEBSITES_LIST = "ACTION_WEBSITES_LIST",
  WEBSITES_LIST_WEBSITES_NAME = "WEBSITES_LIST_WEBSITES_NAME",
  WEBSITES_LIST_GA_TAG = "WEBSITES_LIST_GA_TAG",
  ACTION_WEBSITES_ADD = "ACTION_WEBSITES_ADD",
  ACTION_WEBSITES_ONE_EDIT = "ACTION_WEBSITES_ONE_EDIT",
  ACTION_WEBSITES_ONE_DELETE = "ACTION_WEBSITES_ONE_DELETE"
}
export enum WebsitesBlogUserAccessTypes {
  NAV_WEBSITES_BLOG = "NAV_WEBSITES_BLOG",
  ACTION_WEBSITES_BLOG_LIST = "ACTION_WEBSITES_BLOG_LIST",
  WEBSITES_BLOG_LIST_WEBSITES_BLOG_NAME = "WEBSITES_BLOG_LIST_WEBSITES_BLOG_NAME",
  WEBSITES_BLOG_LIST_BLOG_TITLE = "WEBSITES_BLOG_LIST_BLOG_TITLE",
  WEBSITES_BLOG_LIST_BLOG_SUBTITLE = "WEBSITES_BLOG_LIST_BLOG_SUBTITLE",
  ACTION_WEBSITES_BLOG_ADD = "ACTION_WEBSITES_BLOG_ADD",
  ACTION_WEBSITES_BLOG_ONE_EDIT = "ACTION_WEBSITES_BLOG_ONE_EDIT",
  ACTION_WEBSITES_BLOG_ONE_DELETE = "ACTION_WEBSITES_BLOG_ONE_DELETE"
}
export enum WebsitesPageUserAccessTypes {
  NAV_WEBSITES_PAGES = "NAV_WEBSITES_PAGES",
  ACTION_WEBSITES_PAGES_LIST = "ACTION_WEBSITES_PAGES_LIST",
  WEBSITES_PAGES_LIST_WEBSITES_PAGES_NAME = "WEBSITES_PAGES_LIST_WEBSITES_PAGES_NAME",
  WEBSITES_PAGES_LIST_PAGE_URL = "WEBSITES_PAGES_LIST_PAGE_URL",
  ACTION_WEBSITES_PAGES_ADD = "ACTION_WEBSITES_PAGES_ADD",
  ACTION_WEBSITES_PAGES_ONE_EDIT = "ACTION_WEBSITES_PAGES_ONE_EDIT",
  ACTION_WEBSITES_PAGES_ONE_DELETE = "ACTION_WEBSITES_BLOG_ONE_DELETE"
}
export enum WebsitesTagesUserAccessTypes {
  NAV_WEBSITES_TAGS = "NAV_WEBSITES_TAGS",
  ACTION_WEBSITES_TAGS_LIST = "ACTION_WEBSITES_TAGS_LIST",
  WEBSITES_TAGS_LIST_WEBSITES_META_KEYWORD = "WEBSITES_TAGS_LIST_WEBSITES_META_KEYWORD",
  WEBSITES_TAGS_LIST_META_OG_TYPE = "WEBSITES_TAGS_LIST_META_OG_TYPE",
  WEBSITES_TAGS_LIST_META_TWITTER_TITLE = "WEBSITES_TAGS_LIST_META_TWITTER_TITLE",
  WEBSITES_TAGS_LIST_META_TWITTER_CARD = "WEBSITES_TAGS_LIST_META_TWITTER_CARD",
  ACTION_WEBSITES_TAGS_ADD = "ACTION_WEBSITES_TAGS_ADD",
  ACTION_WEBSITES_TAGS_ONE_EDIT = "ACTION_WEBSITES_TAGS_ONE_EDIT",
  ACTION_WEBSITES_TAGS_ONE_DELETE = "ACTION_WEBSITES_BLOG_ONE_DELETE"
}

export enum ASRUserAccessTypes {
  NAV_ASR = "NAV_ASR",
  ACTION_ASR_LIST = 'ACTION_ASR_LIST',
  ACTION_ASR_ADD = 'ACTION_ASR_ADD',
  ACTION_ASR_EDIT = 'ACTION_ASR_EDIT',
  ACTION_ASR_DELETE = 'ACTION_ASR_DELETE',
  ASR_LIST_NAME = 'ASR_LIST_NAME',
  ASR_LIST_QUANTITY = 'ASR_LIST_QUANTITY',
  ASR_LIST_STATUS = 'ASR_LIST_STATUS',
}

export enum VendorUserAccessTypes {
  NAV_VENDOR = "NAV_VENDOR",
  ACTION_VENDOR_LIST = 'ACTION_VENDOR_LIST',
  ACTION_VENDOR_VIEW = 'ACTION_VENDOR_VIEW',
  ACTION_VENDOR_VIEW_GENERAL_INFORMATION = 'ACTION_VENDOR_VIEW_GENERAL_INFORMATION',
  ACTION_VENDOR_VIEW_PURCHASE_ORDER = 'ACTION_VENDOR_VIEW_PURCHASE_ORDER',
  ACTION_VENDOR_VIEW_PURCHASE_ORDER_ADD = 'ACTION_VENDOR_VIEW_PURCHASE_ORDER_ADD',
  ACTION_VENDOR_VIEW_RETURN_TO_VENDOR = 'ACTION_VENDOR_VIEW_RETURN_TO_VENDOR',
  ACTION_VENDOR_VIEW_VENDOR_LEDGER = 'ACTION_VENDOR_VIEW_VENDOR_LEDGER',
  ACTION_VENDOR_VIEW_VENDOR_LEDGER_ADD = 'ACTION_VENDOR_VIEW_VENDOR_LEDGER_ADD',
  ACTION_VENDOR_VIEW_VENDOR_DEBIT_ADD = 'ACTION_VENDOR_VIEW_VENDOR_DEBIT_ADD',
  ACTION_VENDOR_VIEW_ACTIVITY = 'ACTION_VENDOR_VIEW_ACTIVITY',
  ACTION_VENDOR_ADD = 'ACTION_VENDOR_ADD',
  ACTION_VENDOR_EDIT = 'ACTION_VENDOR_EDIT',
  ACTION_VENDOR_DELETE = 'ACTION_VENDOR_DELETE',
  VENDOR_LIST_VENDOR_CODE = 'VENDOR_LIST_VENDOR_CODE',
  VENDOR_LIST_COMPANY_NAME = 'VENDOR_LIST_COMPANY_NAME',
  VENDOR_LIST_COMPANY_TYPE = 'VENDOR_LIST_COMPANY_TYPE',
  VENDOR_LIST_DISTRICT = 'VENDOR_LIST_DISTRICT',
  VENDOR_LIST_STATE = 'VENDOR_LIST_STATE',
}
export enum DealerUserAccessTypes {
  NAV_DEALER = 'NAV_DEALER',
  ACTION_DEALER_LIST = 'ACTION_DEALER_LIST',
  ACTION_DEALER_VIEW = 'ACTION_DEALER_VIEW',
  ACTION_DEALER_GENERAL_INFORMATION = 'ACTION_DEALER_GENERAL_INFORMATION',
  ACTION_DEALER_DEALER_WAREHOUSE = 'ACTION_DEALER_DEALER_WAREHOUSE',
  ACTION_DEALER_DEALER_WAREHOUSE_ADD = 'ACTION_DEALER_DEALER_WAREHOUSE_ADD',
  ACTION_DEALER_DEALER_SALE_ORDER = 'ACTION_DEALER_DEALER_SALE_ORDER',
  ACTION_DEALER_DEALER_SALE_ORDER_ADD = 'ACTION_DEALER_DEALER_SALE_ORDER_ADD',
  ACTION_DEALER_DEALER_LEDGER = 'ACTION_DEALER_DEALER_LEDGER',
  ACTION_DEALER_DEALER_LEDGER_CREDIT_AMOUNT_ADD = 'ACTION_DEALER_DEALER_LEDGER_CREDIT_AMOUNT_ADD',
  ACTION_DEALER_DEALER_LEDGER_CREDIT_NOTE_ADD = 'ACTION_DEALER_DEALER_LEDGER_CREDIT_NOTE_ADD',
  ACTION_DEALER_DEALER_LEDGER_DEBIT_NOTE_ADD = 'ACTION_DEALER_DEALER_LEDGER_DEBIT_NOTE_ADD',
  ACTION_DEALER_DEALER_ORDER_LEDGER = 'ACTION_DEALER_DEALER_ORDER_LEDGER',
  ACTION_DEALER_DEALER_ACTIVITY = 'ACTION_DEALER_DEALER_ACTIVITY',
  ACTION_DEALER_DEALER_PINCODE = 'ACTION_DEALER_DEALER_PINCODE',
  ACTION_DEALER_DEALER_PINCODE_ADD = 'ACTION_DEALER_DEALER_PINCODE_ADD',
  ACTION_DEALER_DEALER_SCHEME = 'ACTION_DEALER_DEALER_SCHEME',
  ACTION_DEALER_DEALER_SCHEME_ADD = 'ACTION_DEALER_DEALER_SCHEME_ADD',
  ACTION_DEALER_ADD = 'ACTION_DEALER_ADD',
  ACTION_DEALER_EDIT = 'ACTION_DEALER_EDIT',
  ACTION_DEALER_DELETE = 'ACTION_DEALER_DELETE',
  DEALER_LIST_VENDOR_CODE = 'DEALER_LIST_VENDOR_CODE',
  DEALER_LIST_FIRM_NAME = 'DEALER_LIST_FIRM_NAME',
  DEALER_LIST_FIRST_NAME = 'DEALER_LIST_FIRST_NAME',
  DEALER_LIST_LAST_NAME = 'DEALER_LIST_LAST_NAME',
  DEALER_LIST_PHONE = 'DEALER_LIST_PHONE',
  DEALER_LIST_DISTRICT = 'DEALER_LIST_DISTRICT',
  DEALER_LIST_STATE = 'DEALER_LIST_STATE',
  DEALER_LIST_APPROVAL = 'DEALER_LIST_APPROVAL',
  DEALER_LIST_STATUS = 'DEALER_LIST_STATUS',
}

export enum UsersUserAccessTypes {
  NAV_USER = 'NAV_USER',
  ACTION_USER_LIST = 'ACTION_USER_LIST',
  ACTION_USER_ADD = 'ACTION_USER_ADD',
  ACTION_USER_EDIT = 'ACTION_USER_EDIT',
  USER_LIST_USER_NAME = 'USER_LIST_USER_NAME',
  USER_LIST_EMAIL = 'USER_LIST_EMAIL',
  USER_LIST_MOBILE_NUMBER = 'USER_LIST_MOBILE_NUMBER',
  USER_LIST_BRANCH_NAME = 'USER_LIST_BRANCH_NAME',
  USER_LIST_USER_DEPARTMENT = 'USER_LIST_USER_DEPARTMENT',
  USER_LIST_USER_ROLE = 'USER_LIST_USER_ROLE',
  USER_LIST_STATUS = 'USER_LIST_STATUS',
}
export enum WarehouseUserAccessTypes {
  NAV_WAREHOUSE = 'NAV_WAREHOUSE',
  ACTION_WAREHOUSE_LIST = 'ACTION_WAREHOUSE_LIST',
  ACTION_WAREHOUSE_VIEW = 'ACTION_WAREHOUSE_VIEW',
  ACTION_WAREHOUSE_WAREHOUSE_DETAILS = 'ACTION_WAREHOUSE_WAREHOUSE_DETAILS',
  ACTION_WAREHOUSE_WAREHOUSE_INVENTORIES = 'ACTION_WAREHOUSE_WAREHOUSE_INVENTORIES',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_ADD = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_ADD',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_DEALER = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_DEALER',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_RTV = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_RTV',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_WAREHOUSE = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_WAREHOUSE',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SAMPLE = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_SAMPLE',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE',
  ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_COMPANY = 'ACTION_WAREHOUSE_WAREHOUSE_OUTWARD_INVENTORIES_COMPANY',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_DEALER = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_DEALER',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_SAMPLE = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_SAMPLE',
  ACTION_WAREHOUSE_INWARD_INVENTORIES_E_COMMERCE = 'ACTION_WAREHOUSE_INWARD_INVENTORIES_E_COMMERCE',
  ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COMPANY = 'ACTION_WAREHOUSE_WAREHOUSE_INWARD_INVENTORIES_COMPANY',
  ACTION_WAREHOUSE_ADD = 'ACTION_WAREHOUSE_ADD',
  ACTION_WAREHOUSE_EDIT = 'ACTION_WAREHOUSE_EDIT',
  ACTION_WAREHOUSE_DELETE = 'ACTION_WAREHOUSE_DELETE',
  WAREHOUSE_LIST_WAREHOUSE_CODE = 'WAREHOUSE_LIST_WAREHOUSE_CODE',
  WAREHOUSE_LIST_WAREHOUSE_NAME = 'WAREHOUSE_LIST_WAREHOUSE_NAME',
  WAREHOUSE_LIST_COUNTRY = 'WAREHOUSE_LIST_COUNTRY',
  WAREHOUSE_LIST_STATE = 'WAREHOUSE_LIST_STATE',
  WAREHOUSE_LIST_DISTRICT = 'WAREHOUSE_LIST_DISTRICT',
  WAREHOUSE_LIST_PINCODE = 'WAREHOUSE_LIST_PINCODE',
}






export const MergedEnum = {
  ...AttributeUserAccessType,
  ...AttributeGroupUserAccessType,
  ...ItemsUserAccessType,
  ...ProductCategoryUserAccessType,
  ...ProductGroupsUserAccessType,
  ...ProductSubCategoryUserAccessType,
  ...SchemeUserAccessType,
  ...AssetsCategoryUesrAccessTypes,
  ...AssetsAllocationUesrAccessTypes,
  ...AssetsLocationUserAccessTypes,
  ...AssetsReLocationUserAccessTypes,
  ...AssetsRequestUserAccessTypes,
  ...WebsitesUserAccessTypes,
  ...WebsitesBlogUserAccessTypes,
  ...WebsitesPageUserAccessTypes,
  ...WebsitesTagesUserAccessTypes,
  ...ASRUserAccessTypes,
} as const;

