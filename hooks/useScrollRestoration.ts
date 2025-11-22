import { MateItem } from "@/services/mate/searchMate";
import { sessionStorageUtil } from "@/utils/session-storage-scroll";
import { useEffect, useRef } from "react";

export function useScrollRestoration(
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  items: MateItem[],
) {
  const hasRestoredScroll = useRef(false);

  useEffect(() => {
    if (hasRestoredScroll.current || items.length === 0) return;

    const cache = sessionStorageUtil.getScrollPosition();
    if (!cache) return;

    const { anchorPosition } = cache;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = anchorPosition;
    }

    sessionStorageUtil.removeScrollPosition();
    hasRestoredScroll.current = true;
  }, [items.length]);
}
