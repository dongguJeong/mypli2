import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Report } from "../api/report";

export function useReport() {
  const queryClient = useQueryClient();
  const { mutateAsync: reportSong } = useMutation({
    mutationFn: async (songId: number) => (await Report.report(songId)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["report"] }),
  });

  const { data: reportList } = useQuery({
    queryFn: async () => (await Report.getList()).data,
    queryKey: ["report"],
  });

  return { reportSong, reportList };
}
