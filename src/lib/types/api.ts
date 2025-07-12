// Generic type for standard API response wrappers
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// Optional: type for error structure (if your API sends structured errors)
export type ApiError = {
  statusCode: number;
  message: string;
  details?: string;
};

// Example: type for paginated response
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
