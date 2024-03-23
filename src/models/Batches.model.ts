// |-- Types --|

export type BatchesListResponseTypes = {
  _id: string;
  batchNumber: number;
  batchCreatedBy: string;
  orders: string[];
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  batchCreatedByLabel: string;
}
