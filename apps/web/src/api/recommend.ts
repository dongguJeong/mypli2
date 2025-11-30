import type { IRecommend, IRecommendBody } from "../model/recommend";
import { ServerRequester } from "../requester/server";

export const Recommend = {
  recommend: (data: IRecommendBody) =>
    new ServerRequester<{ id: number }, IRecommendBody>("/recommend").post(
      data
    ),
  update: (recommendId: number, data: Pick<IRecommendBody, "description">) =>
    new ServerRequester<{ id: number }, Pick<IRecommendBody, "description">>(
      `/recommend/${recommendId}`
    ).patch(data),
  delete: (recommendId: number) =>
    new ServerRequester(`/recommend/${recommendId}`).delete(),

  recommendList: (limit?: number) =>
    new ServerRequester<IRecommend[]>(
      `/recommend/list${limit !== undefined ? `?limit=${limit}` : ""}`
    ).get(),
};
