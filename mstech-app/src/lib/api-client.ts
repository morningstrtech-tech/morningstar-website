export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Shared API client for MS.Tech frontend.
 * Includes credentials: "include" by default for Better Auth session management.
 */
export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  async post<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  async patch<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  async delete<T>(path: string): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },

  async upload<T>(path: string, formData: FormData): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      credentials: "include",
      body: formData,
      // Note: Don't set Content-Type header, 
      // Fetch will automatically set it to 'multipart/form-data' with boundaries
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Upload error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  },
};
