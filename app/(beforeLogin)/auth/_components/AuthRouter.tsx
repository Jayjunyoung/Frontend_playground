"use client";

import { getTokens } from "@/services/getTokens";
import { useOAuthIdStore } from "@/stores/oAuthIdStore";
import { useTokenStore } from "@/stores/tokenStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  query: {
    oAuthId?: string;
    status?: string;
    code?: string;
  };
}

export default function AuthRouter({ query }: Props) {
  const router = useRouter();
  const { addToken } = useTokenStore.getState();
  const { addOAuthId } = useOAuthIdStore.getState();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 중복 실행 방지
    if (hasProcessed.current) return;

    const handleTokens = async () => {
      try {
        console.log("🔑 토큰 요청 시작:", {
          oAuthId: query.oAuthId,
          code: query.code?.substring(0, 10) + "...",
        });

        const res = await getTokens(query.oAuthId!, query.code!);

        if (res.message === "OK") {
          addToken(res.data.accessToken);
          hasProcessed.current = true;
          router.replace("/");
        }
      } catch (error) {
        console.error("토큰 요청 실패:", error);
      }
    };

    if (query.status === "registered" && query.oAuthId && query.code) {
      hasProcessed.current = true;
      handleTokens();
    }

    if (query.status === "new" && query.oAuthId && query.code) {
      addOAuthId(query.oAuthId, query.code);
      hasProcessed.current = true;
      router.replace("/auth/signup");
    }
  }, []); // 의존성 배열 비워두기 (한 번만 실행)

  return <></>;
}
