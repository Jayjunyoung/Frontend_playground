// components/common/MSWProvider.tsx 생성
"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      // 개발 환경에서만 MSW 활성화
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("@/mocks/browser");

        await worker.start({
          // 메이트 탐색 시에만 모킹 데이터를 띄우도록 설정
          onUnhandledRequest: "bypass", // 모킹하지 않은 API는 그대로 통과
        });

        console.log("🎭 MSW가 활성화되었습니다!");
      }

      setMswReady(true);
    };

    initMSW();
  }, []);

  // MSW가 준비될 때까지 로딩
  if (!mswReady && process.env.NODE_ENV === "development") {
    return null;
  }

  return <>{children}</>;
}
