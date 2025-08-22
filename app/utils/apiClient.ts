"use client";

export interface CounterResponse {
  message: string;
  timestamp: string;
  dbResult: {
    success: boolean;
    message: string;
    counter: {
      id: string;
      count: number;
    };
  };
  event: any;
}

class ApiClient {
  /**
   * Fetch the visitor counter from the API
   */
  static async getVisitorCount(): Promise<CounterResponse> {
    try {
      const response = await fetch(`${window.location.origin}/api/`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching from API:", error);
      throw error;
    }
  }
}

export default ApiClient;
