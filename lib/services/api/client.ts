import axios from "axios";
import requestInterceptor from "@/lib/services/api/interceptors/requestInterceptor";
import responseInterceptor from "@/lib/services/api/interceptors/responseInterceptor";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional: only if your API uses cookies for auth
});

// Attach request interceptors
instance.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);

// Attach response interceptors
instance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

export default instance;
