// Type for login API request payload
export type LoginRequest = {
  employeeId: string;
  password: string;
};

  
  // Type for login API response (if your login API returns both tokens and name)
  export type LoginResponse = {
    access: string;
    refresh: string;
    employeeName: string;
  };
  
  // Type for token refresh API response (confirmed by your curl response)
  export type RefreshTokenResponse = {
    access: string;
    refresh: string;
  };
  
  // Optional: Type for a decoded JWT token if you’re using jwt-decode on frontend
  export type DecodedToken = {
    exp: number;              // expiry timestamp
    iat: number;              // issued at timestamp
    jti: string;              // JWT ID
    token_type: string;       // "access"
    user_id: number;          // Django user ID
    name: string;             // from your JWT payload { "name": "Satis" }
  };
  