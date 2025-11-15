interface MateScrollCache {
  anchorPosition: number;
  clickedMateIndex: number;
}

const STORAGE_KEY = "mate_explore_scroll_cache";

export const sessionStorageUtil = {
  // 스크롤 정보 저장
  saveScrollPosition(scrollY: number, mateIndex: number) {
    if (typeof window === "undefined") return;

    const data: MateScrollCache = {
      anchorPosition: scrollY,
      clickedMateIndex: mateIndex,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // 스크롤 정보 가져오기
  getScrollPosition(): MateScrollCache | null {
    if (typeof window === "undefined") return null;

    const data = sessionStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as MateScrollCache;
    } catch {
      return null;
    }
  },

  // 스크롤 정보 제거
  removeScrollPosition() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
  },
};
