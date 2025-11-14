import Header from "@/components/common/Header/Header";
import { fetchMates } from "@/services/mate/searchMate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import ExploreMate from "../_components/ExploreMate/ExploreMate";

// app/mate/explore/page.tsx 수정

export default async function ExplorePage() {
  console.log("🔷 [SERVER] ExplorePage 시작");

  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const serverToken = cookieStore.get("accessToken")?.value;

  console.log("🔷 [SERVER] 서버 토큰 존재 여부:", !!serverToken);

  // 개발 환경에서는 prefetch 건너뛰기 (MSW 테스트용)
  const isDevelopment = process.env.NODE_ENV === "development";

  if (serverToken && !isDevelopment) {
    console.log("🔷 [SERVER] prefetchInfiniteQuery 시작");

    try {
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["mates"],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
          console.log("🔷 [SERVER] fetchMates 호출, pageParam:", pageParam);

          const result = await fetchMates({
            pageParam,
            nickname: undefined,
            gender: undefined,
            preferredTimes: undefined,
            workoutTypes: undefined,
            size: 10,
            serverToken,
          });

          console.log(
            "🔷 [SERVER] fetchMates 성공, 데이터 개수:",
            result.content?.length,
          );
          return result;
        },
      });

      console.log("✅ [SERVER] prefetchInfiniteQuery 완료");
    } catch (error) {
      console.error("❌ [SERVER] prefetchInfiniteQuery 실패:", error);
    }
  } else {
    console.log("⚠️ [SERVER] prefetch 건너뜀 (개발 모드 또는 토큰 없음)");
  }

  const isEditingProfile = false;
  const dehydratedState = dehydrate(queryClient);

  console.log("🔷 [SERVER] dehydratedState 생성 완료");
  console.log(
    "🔷 [SERVER] 캐시된 쿼리 개수:",
    Object.keys(dehydratedState.queries || {}).length,
  );

  return (
    <>
      <Header isEditingProfile={isEditingProfile} />
      <HydrationBoundary state={dehydratedState}>
        <ExploreMate />
      </HydrationBoundary>
    </>
  );
}
