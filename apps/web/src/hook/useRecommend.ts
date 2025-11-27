import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IRecommendBody } from "../model/recommend";
import { Recommend } from "../api/recommend";

export function useRecommend() {
  const queryClient = useQueryClient();

  const { mutateAsync: recommend } = useMutation({
    mutationFn: async (data: IRecommendBody) =>
      (await Recommend.recommend(data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: async (data: Partial<IRecommendBody>) =>
      (await Recommend.update(data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  const { mutateAsync: remove } = useMutation({
    mutationFn: async (recommendId: number) =>
      (await Recommend.delete(recommendId)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  return { recommend, update, remove };
}

export function useRecommendList(limit: number) {
  const { data: recommendList } = useQuery({
    queryKey: ["recommend", limit],
    queryFn: async () => (await Recommend.recommendList(limit)).data,
  });

  return recommendList;
}
