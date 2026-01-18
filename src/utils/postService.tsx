import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Helper to get token (Client Side) - in real app, might come from secureStorage
function getClientToken() {
    if (typeof window !== 'undefined') {
        const value = "; " + document.cookie;
        const parts = value.split("; v4r2d9z5m3h0c1p0x7l=");
        if (parts.length === 2) return parts.pop()?.split(";").shift();

        // Also check sessionStorage as backup if requirement says "Save to Cookie & sessionStorage"
        return sessionStorage.getItem('token');
    }
    return null;
}

const api = axios.create({
    baseURL: '/api', // Relative path to our Next.js API Routes (Proxy)
    timeout: 30000,
});

api.interceptors.request.use(
    (config) => {
        // Auto-Auth: Inject Token
        const token = getClientToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Safety: Validate URL (Basic check, more logic can be added)
        if (config.url && config.url.includes('..')) {
            throw new Error('Invalid URL');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle "Force Logout" or 403
        if (error.response && error.response.status === 403) {
            console.error('Access Denied / Forbidden');
            // Trigger logout flow event or redirect
            if (typeof window !== 'undefined') {
                // window.location.href = '/signin'; // Optional auto-redirect
            }
        }
        return Promise.reject(error);
    }
);

export const postService = async <T,>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
};

export const getService = async <T,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
};
