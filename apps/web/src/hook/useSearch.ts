// apps/web/src/hooks/useSearch.ts
import { useQuery } from "@tanstack/react-query";
import { Search } from "../api/search";

export function useTrackSearch(q: string) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: async () => (await Search.tracks(q)).data,
    enabled: !!q,
  });
}
