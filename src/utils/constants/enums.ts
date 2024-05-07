/*** Order Status ****/
export enum orderStatusEnum {
    fresh = 'FRESH',
    all = 'ALL',
    prepaid = 'PREPAID',
    delivered = 'DELIVERED',
    doorCancelled = 'DOORCANCELLED',
    hold = 'HOLD',
    psc = 'PSC',
    una = 'UNA',
    pnd = 'PND',
    urgent = 'URGENT',
    nonAction = 'NON_ACTION',
    rto = 'RTO',
    inquiry = 'INQUIRY',
    reattempt = 'REATTEMPT',
    deliveryOutOfNetwork = 'DELIVERYOUTOFNETWORK',
    intransit = 'INTRANSIT',
    ndr = 'NDR',
    closed = 'CLOSED',
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
}
