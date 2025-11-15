import type { MateListResponse } from "@/services/mate/searchMate";
import { fetchMates } from "@/services/mate/searchMate";
import { sessionStorageUtil } from "@/utils/session-storage-scroll";
import {
  InfiniteData,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    const restoreScrollData = async () => {
      const cache = sessionStorageUtil.getScrollPosition();
      if (!cache) return;

      const { clickedMateIndex } = cache;

      // 필요한 페이지 수 계산
      const neededPages = Math.ceil(clickedMateIndex / size);

      // 각 페이지 prefetch
      for (let page = 0; page < neededPages; page++) {
        await queryClient.prefetchInfiniteQuery({
          queryKey: ["mates"],
          initialPageParam: 0,
          queryFn: ({ pageParam = page }) => fetchMates({ pageParam, size }),
          getNextPageParam: (lastPage: MateListResponse) => {
            const currentPage = lastPage.pageable?.pageNumber ?? 0;
            const totalPages = lastPage.totalPages ?? 1;
            return currentPage + 1 <= totalPages ? currentPage + 1 : undefined;
          },
        });
      }
    };

    restoreScrollData();
  }, []);

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
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pageable?.pageNumber ?? 0;
      const totalPages = lastPage.totalPages ?? 1;

      const nextPage = currentPage + 1;

      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
}
