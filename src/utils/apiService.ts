// API Base URL - ajuste conforme necessário
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/Player/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userName: string, name: string, email: string, password: string) => {
    return apiRequest('/Player/register', {
      method: 'POST',
      body: JSON.stringify({ userName, name, email, password }),
    });
  },

  forgotPassword: async (email: string) => {
    return apiRequest('/Player/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return apiRequest('/Player/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },

  oauthLogin: async (provider: string, idToken: string, email?: string, name?: string, picture?: string) => {
    return apiRequest('/Player/oauth-login', {
      method: 'POST',
      body: JSON.stringify({ provider, idToken, email, name, picture }),
    });
  },
};

// Player API
export const playerAPI = {
  getById: async (id: string) => {
    return apiRequest(`/Player/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: { userName?: string; name?: string; avatarUrl?: string }) => {
    return apiRequest(`/Player/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getStatus: async (id: string) => {
    return apiRequest(`/Player/${id}/status`, {
      method: 'GET',
    });
  },
};

export default {
  authAPI,
  playerAPI,
};