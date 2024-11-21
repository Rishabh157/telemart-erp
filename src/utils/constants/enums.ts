/** Order Status **/
export enum OrderStatusEnum {
    FRESH = 'FRESH',
    ALL = 'ALL',
    PREPAID = 'PREPAID',
    DELIVERED = 'DELIVERED',
    DOOR_CANCELLED = 'DOORCANCELLED',
    HOLD = 'HOLD',
    PSC = 'PSC',
    UNA = 'UNA',
    PND = 'PND',
    URGENT = 'URGENT',
    NON_ACTION = 'NON_ACTION',
    RTO = 'RTO',
    INQUIRY = 'INQUIRY',
    REATTEMPT = 'REATTEMPT',
    DELIVERY_OUT_OF_NETWORK = 'DELIVERYOUTOFNETWORK',
    IN_TRANSIT = 'INTRANSIT',
    NDR = 'NDR',
    CLOSED = 'CLOSED',
    CANCEL = 'CANCEL',
}

/*** Barcode Status ****/
export enum barcodeStatusEnum {
    atWarehouse = 'AT_WAREHOUSE',
    atDealerWarehouse = 'AT_DEALER_WAREHOUSE',
    inTransit = 'IN_TRANSIT',
    rtv = 'RTV',
    wtc = 'WTC',
    wts = 'WTS',
    wtw = 'WTW',
    dtw = 'DTW',
    dtd = 'DTD',
    delivered = 'DELIVERED',
    damage = 'DAMAGE',
    missing = 'MISSING',
    destroyed = 'DESTROYED',
}

/*** Courier Company Enum ****/
export enum courierCompanyEnum {
    shipyaari = 'SHIPYAARI',
    gpo = 'GPO',
    maersk = 'MAERSK',
}

/*** E-COM TYPE ****/
export enum EcomTypesEnum {
    amazon = 'AMAZON',
    flipkart = 'FLIPKART',
}
