import React from 'react';
import { format as formatDate, parseISO, isValid } from 'date-fns';
import { OrderStatusEnum } from 'src/utils/constants/enums';

/** Order Status **/
interface ATMOrderStatusProps {
  status: OrderStatusEnum;
}

export const ATMOrderStatus: React.FC<ATMOrderStatusProps> = ({ status }) => {
  // Mapping status to styles and labels
  const getStatusStyles = () => {
    switch (status) {
      case OrderStatusEnum.FRESH:
        return { label: "Fresh", style: "text-green-700 bg-green-100" };
      case OrderStatusEnum.PREPAID:
        return { label: "Prepaid", style: "text-blue-700 bg-blue-100" };
      case OrderStatusEnum.DELIVERED:
        return { label: "Delivered", style: "text-green-900 bg-green-200" };
      case OrderStatusEnum.DOOR_CANCELLED:
        return { label: "Door Cancelled", style: "text-red-700 bg-red-100" };
      case OrderStatusEnum.HOLD:
        return { label: "Hold", style: "text-yellow-700 bg-yellow-100" };
      case OrderStatusEnum.PSC:
        return { label: "PSC", style: "text-indigo-700 bg-indigo-100" };
      case OrderStatusEnum.UNA:
        return { label: "UNA", style: "text-pink-700 bg-pink-100" };
      case OrderStatusEnum.PND:
        return { label: "PND", style: "text-orange-700 bg-orange-100" };
      case OrderStatusEnum.URGENT:
        return { label: "Urgent", style: "text-red-900 bg-red-200" };
      case OrderStatusEnum.NON_ACTION:
        return { label: "Non Action", style: "text-gray-900 bg-gray-300" };
      case OrderStatusEnum.RTO:
        return { label: "RTO", style: "text-purple-700 bg-purple-100" };
      case OrderStatusEnum.INQUIRY:
        return { label: "Inquiry", style: "text-teal-700 bg-teal-100" };
      case OrderStatusEnum.REATTEMPT:
        return { label: "Reattempt", style: "text-yellow-900 bg-yellow-200" };
      case OrderStatusEnum.DELIVERY_OUT_OF_NETWORK:
        return { label: "Out of Network", style: "text-gray-900 bg-gray-200" };
      case OrderStatusEnum.IN_TRANSIT:
        return { label: "In Transit", style: "text-blue-900 bg-blue-200" };
      case OrderStatusEnum.NDR:
        return { label: "NDR", style: "text-purple-900 bg-purple-200" };
      case OrderStatusEnum.CLOSED:
        return { label: "Closed", style: "text-green-800 bg-green-300" };
      case OrderStatusEnum.CANCEL:
        return { label: "Cancel", style: "text-red-800 bg-red-300" };
      default:
        return { label: "Unknown", style: "text-gray-700 bg-gray-100" };
    }
  };

  const { label, style } = getStatusStyles();

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-md ${style}`}>
      {label}
    </span>
  );
};

/** Date With Time **/

// Date formats mapped to date-fns compatible formats
const dateFormats: Record<string, string> = {
  DEFAULT: 'dd MMM yyyy',
  'DD-MM-YYYY': 'dd-MM-yyyy',
  'MM/DD/YYYY': 'MM/dd/yyyy',
  'YYYY.MM.DD': 'yyyy.MM.dd',
  LONG: 'EEEE, MMMM do yyyy',
};

interface ATMDateDisplayProps {
  createdAt: string | Date;
  disableTime?: boolean;
  format?: 'DEFAULT' | 'DD-MM-YYYY' | 'MM/DD/YYYY' | 'YYYY.MM.DD' | 'LONG'; // Add more formats as needed
}

export const ATMDateTimeDisplay: React.FC<ATMDateDisplayProps> = ({ createdAt, disableTime, format = 'DEFAULT' }) => {

  const parseDate = (date: string | Date): Date | null => {
    if (typeof date === 'string') {
      const parsed = parseISO(date);
      return isValid(parsed) ? parsed : null;
    }
    return isValid(date) ? date : null;
  };

  const getFormattedDate = (date: string | Date, formatKey: string): string => {
    const dateObj = parseDate(date);
    if (!dateObj) {
      return 'N/A';
    }

    const formatPattern = dateFormats[formatKey] || dateFormats.DEFAULT;
    return formatDate(dateObj, formatPattern);
  };

  const getFormattedTime = (date: string | Date): string => {
    const dateObj = parseDate(date);
    if (!dateObj) {
      return 'N/A';
    }
    return formatDate(dateObj, 'hh:mm a');
  };

  const orderDate = getFormattedDate(createdAt, format);
  const orderTime = getFormattedTime(createdAt);

  return (
    <div className="flex flex-col items-start space-y-0.5">
      <span className="text-xs text-slate-700 font-semibold">{orderDate}</span>
      <span hidden={disableTime} className="text-[10px] text-gray-500">
        {orderTime}
      </span>
    </div>
  );
};


/** Pincode **/
interface ATMPincodeDisplayProps {
  pincode: string | null | undefined; // Accepts string or null/undefined
}

export const ATMPincodeDisplay: React.FC<ATMPincodeDisplayProps> = ({ pincode }) => {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md shadow-sm">
      {pincode || 'N/A'}
    </span>
  );
};

/** Dealer & Dealer Code **/
interface ATMDealerDisplayProps {
  dealerLabel?: string;
  dealerCode?: string;
  disableName?: boolean
  disableCode?: boolean
}

export const ATMDealerDisplay: React.FC<ATMDealerDisplayProps> = ({ dealerLabel, dealerCode, disableName, disableCode }) => {
  if (!dealerCode) return null;

  return (
    <div>
      <div className="text-xs text-slate-700 font-medium capitalize" hidden={disableName}>{dealerLabel || 'N/A'}</div>
      <div className="text-[12px] text-primary-main font-medium" hidden={disableCode}>({dealerCode || 'N/A'})</div>
    </div>
  );
};


/** Price & Currency Display **/
interface ATMAmountDisplayProps {
  priceLabel?: string;
  amount?: number;
  currencySymbol?: string;
  disableLabel?: boolean;
  disableAmount?: boolean;
}

export const ATMAmountDisplay: React.FC<ATMAmountDisplayProps> = ({
  priceLabel,
  amount,
  currencySymbol = "₹",
  disableLabel,
  disableAmount
}) => {
  if (amount === undefined || amount === null) return null;

  return (
    <div>
      <div className="text-xs text-slate-700 font-medium capitalize" hidden={disableLabel}>
        {priceLabel || 'Price'}
      </div>
      <div className="text-[12px] text-primary-main font-medium" hidden={disableAmount}>
        &#x20B9; {amount?.toLocaleString() || 'N/A'}
      </div>
    </div>
  );
};
