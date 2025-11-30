import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IRecommendBody } from "../model/recommend";
import { Recommend } from "../api/recommend";

export function useRecommend() {
  const queryClient = useQueryClient();

  const { mutateAsync: createRecommend } = useMutation({
    mutationFn: async (data: IRecommendBody) =>
      (await Recommend.recommend(data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  const { mutateAsync: updateRecommend } = useMutation({
    mutationFn: async ({
      recommendId,
      data,
    }: {
      recommendId: number;
      data: Pick<IRecommendBody, "description">;
    }) => (await Recommend.update(recommendId, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  const { mutateAsync: deleteRecommend } = useMutation({
    mutationFn: async (recommendId: number) =>
      (await Recommend.delete(recommendId)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommend"] });
    },
  });

  return { createRecommend, updateRecommend, deleteRecommend };
}

export function useRecommendList(limit?: number) {
  const { data: recommendList } = useQuery({
    queryKey: ["recommend", limit],
    queryFn: async () => (await Recommend.recommendList(limit)).data,
  });

  return { recommendList };
}
