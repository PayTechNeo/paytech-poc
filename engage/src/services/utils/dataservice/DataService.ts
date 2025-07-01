import axios from 'axios';

interface Config {
  [key: string]: any;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  data?: any;
}

// Extend ImportMeta interface for Vite
declare global {
  interface ImportMetaEnv {
    VITE_API_URL?: string;
  }
}

class DataService {
  static token: string | null = null;
  private _baseUrl: string;

  constructor() {
    this._baseUrl = import.meta.env.VITE_API_URL || 'https://dev-api.subtrac.io'
  }

  static getToken = (): boolean => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      DataService.token = storedToken;
      return true;
    }
    return false;
  }

  get(relativeUrl: string, config: Config = {}): Promise<any> {
    try {
      return axios.get(this._generateUrl(relativeUrl), this._config(config));
    } catch (error) {
      this._handleError(error, 'GET', relativeUrl);
      throw error;
    }
  }

  post(relativeUrl: string, data: any = null, config: Config = {}): Promise<any> {
    try {
      return axios.post(this._generateUrl(relativeUrl), data, this._config(config));
    } catch (error) {
      this._handleError(error, 'POST', relativeUrl);
      throw error;
    }
  }

  put(relativeUrl: string, data: any = null, config: Config = {}): Promise<any> {
    try {
      return axios.put(this._generateUrl(relativeUrl), data, this._config(config));
    } catch (error) {
      this._handleError(error, 'PUT', relativeUrl);
      throw error;
    }
  }

  patch(relativeUrl: string, data: any = null, config: Config = {}): Promise<any> {
    try {
      return axios.patch(this._generateUrl(relativeUrl), data, this._config(config));
    } catch (error) {
      this._handleError(error, 'PATCH', relativeUrl);
      throw error;
    }
  }

  delete(relativeUrl: string, data: any = null, config: Config = {}): Promise<any> {
    try {
      if (data) {
        return axios.delete(this._generateUrl(relativeUrl), { 
          ...this._config(config),
          data: data 
        });
      } else {
        return axios.delete(this._generateUrl(relativeUrl), this._config(config));
      }
    } catch (error) {
      this._handleError(error, 'DELETE', relativeUrl);
      throw error;
    }
  }

  setCommonHeader(key: string, value: string): void {
    axios.defaults.headers.common[key] = value;
  }

  setBaseUrl(baseUrl: string): void {
    this._baseUrl = baseUrl;
  }

  private _generateUrl(relativeUrl: string): string {
    return `${this._baseUrl}/${relativeUrl}`;
  }

  private _config(config: Config = {}): Config {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Only add Authorization header if token exists (for authenticated requests)
    if (DataService?.token) {
      headers.Authorization = `Bearer ${DataService.token}`;
    }

    return {
      headers,
      withCredentials: false, // Disable credentials for CORS
      ...config,
    };
  }

  private _handleError(error: any, method: string, url: string): void {
    console.error(`DataService ${method} error for ${url}:`, error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - possible CORS issue or server unavailable');
    } else if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error - no response received');
    }
  }
}

export default DataService; 