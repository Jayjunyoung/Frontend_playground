import type { MateListResponse } from "@/services/mate/searchMate";
import { fetchMates } from "@/services/mate/searchMate";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";

export function useSearchMates({
  nickname,
  gender,
  preferredTimes,
  workoutTypes,
  size = 10,
}: {
  nickname?: string;
  gender?: string;
  preferredTimes?: string[];
  workoutTypes?: string[];
  size?: number;
}) {
  return useSuspenseInfiniteQuery<
    MateListResponse,
    Error,
    InfiniteData<MateListResponse>,
    (string | string[] | undefined)[],
    number //명시적 지정
  >({
    queryKey: ["mates"],
    queryFn: ({ pageParam = 0 }) =>
      fetchMates({
        pageParam,
        nickname,
        gender,
        preferredTimes,
        workoutTypes,
        size,
      }),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pageable?.pageNumber ?? 0;
      const totalPages = lastPage.totalPages ?? 1;

      const nextPage = currentPage + 1;

      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
}
