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
      // When accessing through CloudFront, this will be routed to the Lambda URL
      // CloudFront's behavior will handle the routing based on the /api path
      const apiPath = '/api/';
      const response = await fetch(apiPath);
      
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
