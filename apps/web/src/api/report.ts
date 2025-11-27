import type { IReport } from "../model/report";
import { ServerRequester } from "../requester/server";

export const Report = {
  report: (songId: number) =>
    new ServerRequester<IReport>("/report").post(songId),
  delete: (reportId: number) =>
    new ServerRequester<IReport>(`/report/${reportId}`).delete(),
  getList: () => new ServerRequester("/report/list").get(),
};
