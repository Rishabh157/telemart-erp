import { default as ASRJson } from '../../utils/mediaJson/asr.json'
import { default as NDRDispositionJson } from '../../utils/mediaJson/NDRDisposition.json'
import { default as WebsiteBlogJson } from '../../utils/mediaJson/websiteBlogcopy.json'
import { default as artistJson } from '../../utils/mediaJson/artist.json'
import { default as assetsRequestJson } from '../../utils/mediaJson/assetsRequest.json'
import { default as attributeJson } from '../../utils/mediaJson/attribute.json'
import { default as transportJson } from '../../utils/mediaJson/transport.json'
import { default as attributeGroupJson } from '../../utils/mediaJson/attributeGroup.json'
import { default as barcodeJson } from '../../utils/mediaJson/barcode.json'
import { default as callJson } from '../../utils/mediaJson/call.json'
import { default as callCenterJson } from '../../utils/mediaJson/callCenter.json'
import { default as cartonBoxJson } from '../../utils/mediaJson/cartonBox.json'
import { default as channelCategoryJson } from '../../utils/mediaJson/channelCategory.json'
import { default as channelGroupJson } from '../../utils/mediaJson/channelGroup.json'
import { default as channelManagementJson } from '../../utils/mediaJson/channelManagement.json'
import { default as companyJson } from '../../utils/mediaJson/company.json'
import { default as companyBranchJson } from '../../utils/mediaJson/companyBranch.json'
import { default as companyTransferJson } from '../../utils/mediaJson/companyTransfer.json'
import { default as competitorJson } from '../../utils/mediaJson/competitor.json'
import { default as customerComplainJson } from '../../utils/mediaJson/customerComplain.json'
import { default as customerPageJson } from '../../utils/mediaJson/customerPage.json'
import { default as dealerJson } from '../../utils/mediaJson/dealer.json'
import { default as dealerCategoriesJson } from '../../utils/mediaJson/dealerCategories.json'
import { default as didManagementJson } from '../../utils/mediaJson/didManagement.json'
import { default as dispositionComplaintJson } from '../../utils/mediaJson/dispositionComplaint.json'
import { default as dispositionOneJson } from '../../utils/mediaJson/dispositionOne.json'
import { default as dispositionThreeJson } from '../../utils/mediaJson/dispositionThree.json'
import { default as dispositionTwoJson } from '../../utils/mediaJson/dispositionTwo.json'
import { default as grnJson } from '../../utils/mediaJson/grn.json'
import { default as icOneJson } from '../../utils/mediaJson/icOne.json'
import { default as icTwoJson } from '../../utils/mediaJson/icTwo.json'
import { default as icThreeJson } from '../../utils/mediaJson/icThree.json'
import { default as inboundJson } from '../../utils/mediaJson/inbound.json'
// import { default as inquiryJson } from "../../utils/mediaJson/inquiry.json";
import { default as inventoryFlowJson } from '../../utils/mediaJson/inventoryFlow.json'
import { default as itemsJson } from '../../utils/mediaJson/items.json'
import { default as languageJson } from '../../utils/mediaJson/language.json'
import { default as locationJson } from '../../utils/mediaJson/location.json'
import { default as ordersJson } from '../../utils/mediaJson/orders.json'
import { default as allOrdersJson } from '../../utils/mediaJson/allOrdersTab.json'
import { default as productJson } from '../../utils/mediaJson/product.json'
import { default as productCategoryJson } from '../../utils/mediaJson/productCategory.json'
import { default as productGroupJson } from '../../utils/mediaJson/productGroup.json'
import { default as productSubCategoryJson } from '../../utils/mediaJson/productSubCategory.json'
import { default as purchaseOrderJson } from '../../utils/mediaJson/purchaseOrder.json'
import { default as returnToVendorJson } from '../../utils/mediaJson/returnToVendor.json'
import { default as saleOrderJson } from '../../utils/mediaJson/saleOrder.json'
import { default as sampleTransferJson } from '../../utils/mediaJson/sampleTransfer.json'
import { default as schemeJson } from '../../utils/mediaJson/scheme.json'
import { default as slotManagementJson } from '../../utils/mediaJson/slotManagement.json'
import { default as tapeManagementJson } from '../../utils/mediaJson/tapeManagement.json'
import { default as userJson } from '../../utils/mediaJson/user.json'
import { default as vendorJson } from '../../utils/mediaJson/vendor.json'
import { default as warehouseJson } from '../../utils/mediaJson/warehouse.json'
import { default as warehouseTransferJson } from '../../utils/mediaJson/warehouseTransfer.json'
import { default as assetsRelocationJson } from '../../utils/mediaJson/assetsRelocationcopy.json'
import { default as assetsLocationJson } from '../../utils/mediaJson/assetsLocationcopy.json'
import { default as assetsCategoryJson } from '../../utils/mediaJson/assetsCategorycopy.json'
import { default as assetsAllocationJson } from '../../utils/mediaJson/assetsAllocationcopy.json'
import { default as dashboardJson } from '../../utils/mediaJson/dashboard.json'
import { default as websiteJson } from '../../utils/mediaJson/websitecopy.json'
import { default as websitesPageJson } from '../../utils/mediaJson/websitesPagecopy.json'
import { default as websitesTagsJson } from '../../utils/mediaJson/websitesTagscopy.json'
import { default as complainJson } from '../../utils/mediaJson/complain.json'
import { default as multiMappingJson } from '../../utils/mediaJson/multiMapping.json'
import { default as requestJson } from '../../utils/mediaJson/request.json'
import { default as batchOrdersJson } from '../../utils/mediaJson/batchOrders.json'
import { default as warehouseFirstCallOrdersjson } from '../../utils/mediaJson/warehouseFirstCallOrders.json'
import { default as offerAppliedNdrJson } from '../../utils/mediaJson/offerAppliedNdr.json'
import { default as dealersInventoryJson } from '../../utils/mediaJson/dealersInventory.json'
import { default as multiOrderSearchJson } from '../../utils/mediaJson/multiOrderSearch.json'
import { default as dealerToDealerRequestJson } from '../../utils/mediaJson/dealerToDealerJson.json'
import { default as courierPreferenceJson } from '../../utils/mediaJson/CourierPreference.json'
import { default as gpoAwbNumber } from '../../utils/mediaJson/gpoAwbNumber.json'
import { default as orderCancelRequest } from '../../utils/mediaJson/orderCancelRequest.json'

export const mergeUserModules = [
    { ...dashboardJson },
    { ...vendorJson },
    { ...dealerJson },
    { ...dealersInventoryJson },
    // dealer ratio
    { ...userJson },
    { ...warehouseJson },
    { ...ASRJson },
    { ...purchaseOrderJson },
    { ...grnJson },
    { ...inventoryFlowJson },
    { ...saleOrderJson },
    { ...dealerToDealerRequestJson },
    { ...returnToVendorJson },
    { ...warehouseTransferJson },
    { ...sampleTransferJson },
    { ...companyTransferJson },
    { ...multiOrderSearchJson },
    { ...warehouseFirstCallOrdersjson },
    // { ...inquiryJson },
    { ...ordersJson },
    { ...allOrdersJson },
    { ...orderCancelRequest },
    { ...batchOrdersJson },
    { ...offerAppliedNdrJson },
    { ...complainJson },
    { ...callJson },
    { ...customerComplainJson },
    { ...attributeJson },
    { ...attributeGroupJson },
    { ...productCategoryJson },
    { ...productSubCategoryJson },
    { ...productGroupJson },
    { ...schemeJson },
    { ...itemsJson },
    { ...productJson },
    { ...cartonBoxJson },
    { ...companyJson },
    { ...companyBranchJson },
    { ...barcodeJson },
    { ...courierPreferenceJson },
    { ...locationJson },
    { ...languageJson },
    { ...dealerCategoriesJson },
    { ...callCenterJson },
    { ...channelGroupJson },
    { ...channelCategoryJson },
    { ...channelManagementJson },
    { ...didManagementJson },
    { ...artistJson },
    { ...transportJson },
    { ...gpoAwbNumber },
    { ...tapeManagementJson },
    { ...competitorJson },
    { ...slotManagementJson },
    { ...inboundJson },
    { ...requestJson },
    { ...customerPageJson },
    { ...assetsRequestJson },
    { ...assetsRelocationJson },
    { ...assetsLocationJson },
    { ...assetsCategoryJson },
    { ...assetsAllocationJson },
    { ...dispositionOneJson },
    { ...dispositionTwoJson },
    { ...dispositionThreeJson },
    { ...icOneJson },
    { ...icTwoJson },
    { ...icThreeJson },
    { ...dispositionComplaintJson },
    { ...NDRDispositionJson },
    { ...websiteJson },
    { ...WebsiteBlogJson },
    { ...websitesPageJson },
    { ...websitesTagsJson },
    { ...multiMappingJson },
]
