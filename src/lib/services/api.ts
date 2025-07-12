import axios from "axios";
import requestInterceptor from "@/lib/services/interceptors/requestInterceptor";
import responseInterceptor from "@/lib/services/interceptors/responseInterceptor";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(requestInterceptor.onFulfilled, requestInterceptor.onRejected);
instance.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected);

export default instance;
