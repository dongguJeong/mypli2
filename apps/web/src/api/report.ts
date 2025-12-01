import type { IReport, IReportList } from "../model/report";
import { ServerRequester } from "../requester/server";

export const Report = {
  report: (songId: number) =>
    new ServerRequester<IReport>("/report").post(songId),
  delete: (songId: number) =>
    new ServerRequester<IReport>(`/report/${songId}`).delete(),
  getList: () => new ServerRequester<IReportList[]>("/report/list").get(),
};
