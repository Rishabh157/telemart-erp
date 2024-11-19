import React from 'react';

// Enum for Status Types
export enum RequestStatus {
  NOT_DISPATCHED = 'NOT_DISPATCHED',
  DISPATCHED = 'DISPATCHED',
  COMPLETE = 'COMPLETE',
}

interface ATMRequestStatusProps {
  status: RequestStatus;
}

const ATMRequestStatus: React.FC<ATMRequestStatusProps> = ({ status }) => {
  // Determine the styles and labels for each status
  const renderStatus = () => {
    switch (status) {
      case RequestStatus.NOT_DISPATCHED:
        return (
          <span className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md">
            Not Dispatched
          </span>
        );
      case RequestStatus.DISPATCHED:
        return (
          <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md">
            Dispatched
          </span>
        );
      case RequestStatus.COMPLETE:
        return (
          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md">
            Complete
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
            Unknown Status
          </span>
        );
    }
  };

  return <div className="flex justify-center items-center">{renderStatus()}</div>;
};

export default ATMRequestStatus;
