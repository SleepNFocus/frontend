// src/hooks/useAIInsight.ts
import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '@/services/axios';

interface AIRecommendationResponse {
  recommendation: string;
}

interface AIInsightParams {
  date?: string;
}

export const useAIRecommendation = (params?: AIInsightParams) => {
  return useQuery({
    queryKey: ['aiRecommendation', params?.date],
    queryFn: async () => {
      if (!params?.date) return null;

      const apiClient = await getApiClient();
      const searchParams = new URLSearchParams();
      searchParams.append('date', params.date);

      const response = await apiClient.get<AIRecommendationResponse>(
        `/ai-content/recommendation/?${searchParams.toString()}`,
      );

      return response.data;
    },
    enabled: !!params?.date,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
