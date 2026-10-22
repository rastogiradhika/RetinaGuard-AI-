export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  isMock: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiPagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
