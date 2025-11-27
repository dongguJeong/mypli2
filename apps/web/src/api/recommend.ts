import type { IRecommend, IRecommendBody } from "../model/recommend";
import { ServerRequester } from "../requester/server";

export const Recommend = {
  recommend: (data: IRecommendBody) =>
    new ServerRequester<{ id: number }, IRecommendBody>("/recommend").post(
      data
    ),
  update: (data: Partial<IRecommendBody>) =>
    new ServerRequester<{ id: number }, Partial<IRecommendBody>>(
      "/recommend"
    ).patch(data),
  delete: (recommendId: number) =>
    new ServerRequester(`/recommend/${recommendId}`).delete(),

  recommendList: (limit: number) =>
    new ServerRequester<IRecommend[]>(`/recommend/list?limit=${limit}`).get(),
};
