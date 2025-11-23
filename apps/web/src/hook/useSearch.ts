import { useQuery } from "@tanstack/react-query";
import { Search } from "../api/search";

export function useSearch(q: string) {
  const playlist = useQuery({
    queryKey: ["searchPlaylist", q],
    queryFn: async () => (await Search.playlist(q)).data,
    enabled: !!q,
  });

  const youtube = useQuery({
    queryKey: ["searchYoutube", q],
    queryFn: async () => (await Search.youtube(q)).data,
    enabled: !!q,
  });

  return {
    playlist,
    youtube,
  };
}
