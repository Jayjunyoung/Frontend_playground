"use client";
import AfternoonIcon from "@/assets/images/afternoon.svg";
import ChevronLeft from "@/assets/images/chevron-left.svg";
import CircleXIcon from "@/assets/images/circle-x.svg";
import EveningIcon from "@/assets/images/evening.svg";
import MorningIcon from "@/assets/images/morning.svg";
import SearchIcon from "@/assets/images/search.svg";
import { Typography } from "@/components/atoms/Typography";
import Tooltip from "@/components/common/Tooltip/Tooltip";
import { TIME_MAPPING } from "@/constants/Time";
import { useSearchMates } from "@/hooks/queries/useSearchMates";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useRef, useState } from "react";
import FilterPanel from "./FilterPanel/FilterPanel";

import ProfileImgBadge from "@/components/common/DefaultProfileImg/ProfileImgBadge";
import { useMateFilterStore } from "@/stores/mateFilterStore";
import { sessionStorageUtil } from "@/utils/session-storage-scroll";
import MateCardSkeleton from "../mate-card-skeleton";
import * as S from "./style";

function getTimeSlot(
  timeKey: string,
): "morning" | "afternoon" | "evening" | "" {
  if (timeKey.includes("MORNING")) return "morning";
  if (timeKey.includes("AFTERNOON")) return "afternoon";
  if (timeKey.includes("EVENING")) return "evening";
  return "";
}

export default function ExploreMate() {
  const { filter, resetFilter } = useMateFilterStore();
  const router = useRouter();
  const hasRestoredScroll = useRef(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const iconMapping: Record<string, JSX.Element> = {
    morning: <MorningIcon />,
    afternoon: <AfternoonIcon />,
    evening: <EveningIcon />,
  };

  const [showTooltip, setShowTooltip] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<{
    gender: string | null;
    time: string | null;
    sports: string[];
  }>({
    gender: null,
    time: null,
    sports: [],
  });

  const preferredTimes = filters.time ? [filters.time] : undefined;
  const workoutTypes = filters.sports.length > 0 ? filters.sports : undefined;

  // useInfiniteQuery 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMates({
      gender: filters.gender || undefined,
      preferredTimes,
      workoutTypes,
      size: 10,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const mates = data?.pages.flatMap((page) => page.content) ?? [];

  // 스크롤 복원 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    if (hasRestoredScroll.current) return;

    const cache = sessionStorageUtil.getScrollPosition();
    if (!cache) return;

    const { anchorPosition } = cache;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = anchorPosition;
    }

    sessionStorageUtil.removeScrollPosition();
    hasRestoredScroll.current = true;
  }, [mates.length]);

  const getNextPageSkeletonCount = () => {
    if (!data?.pages.length) return 10;

    const lastPage = data.pages[data.pages.length - 1];
    const pageSize = 10;
    const currentTotalItems = mates.length;
    const totalPages = lastPage.totalPages || 0;
    const currentPage = lastPage.pageable.pageNumber;

    // 다음 페이지가 마지막 페이지인지 확인
    const isNextPageLast = currentPage + 1 >= totalPages - 1;

    if (isNextPageLast) {
      // 마지막 페이지면 남은 개수만 계산
      // 총 아이템 개수 = totalPages * pageSize (대략적)
      const estimatedTotal = totalPages * pageSize;
      const remaining = estimatedTotal - currentTotalItems;
      return Math.min(remaining, pageSize);
    }

    // 일반 페이지면 페이지 사이즈만큼
    return pageSize;
  };

  const skeletonCount = getNextPageSkeletonCount();

  const isFilterApplied =
    !!filters.gender || !!filters.time || filters.sports.length > 0;

  useEffect(() => {
    if (filter.time || filter.sports.length) {
      setShowTooltip(false);
    }

    return () => {
      resetFilter();
    };
  }, []);

  const handleFilterApply = (newFilters: {
    gender: string | null;
    time: string | null;
    sports: string[];
  }) => {
    setFilters(newFilters);

    setShowFilterPanel(false);
  };

  const handleFilterClick = () => {
    setShowTooltip(false);
    setShowFilterPanel(!showFilterPanel);
  };

  const handleMateClick = (mateId: number, index: number) => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    sessionStorageUtil.saveScrollPosition(scrollPosition, index);

    router.push(`/mate/mateprofile/${encodeURIComponent(mateId)}`);
  };

  const filterCount =
    (filters.gender ? 1 : 0) + (filters.time ? 1 : 0) + filters.sports.length;

  return (
    <S.ExploreMateContainer ref={scrollContainerRef}>
      {/* 필터 버튼 */}
      <S.FilterWrapper>
        <S.MateFilterTrigger
          $isFilterApplied={isFilterApplied}
          onClick={handleFilterClick}
        >
          <Typography.H5Sb color={isFilterApplied ? "#004DFF" : "#8A92A3"}>
            필터 {filterCount > 0 && `+${filterCount}`}
          </Typography.H5Sb>
          <ChevronLeft
            style={{
              transform: "rotate(270deg)",
              color: isFilterApplied ? "#004DFF" : "#8A92A3",
            }}
            width="16px"
            height="16px"
          />
        </S.MateFilterTrigger>
        {showTooltip && (
          <Tooltip
            text="원하는 메이트 조건을 설정해보세요!"
            position="left"
            left={99}
          />
        )}
      </S.FilterWrapper>

      {/* 필터 패널 */}
      {showFilterPanel && (
        <FilterPanel
          onClose={() => setShowFilterPanel(false)}
          onApply={handleFilterApply}
        />
      )}

      {mates.length === 0 ? (
        <S.EmptyWrapper>
          <S.IconWrapper>
            <SearchIcon className="search-icon" />
            <CircleXIcon className="circle-x-icon" />
          </S.IconWrapper>
          <Typography.H4Sb color="#8A92A3">
            해당하는 메이트가 없어요
          </Typography.H4Sb>
        </S.EmptyWrapper>
      ) : (
        <S.MateList>
          {mates.map((mate, index) => {
            const timeSlot = getTimeSlot(mate.preferredWorkoutTime);

            return (
              <S.MateListItem
                key={mate.id}
                onClick={() => handleMateClick(mate.id, index)}
              >
                <ProfileImgBadge
                  imageUrl={mate.profileUrl}
                  size={44}
                  badgeSize={17}
                  iconSize={11}
                />
                <S.MateInfoWrapper>
                  <S.ProfileInfo>
                    <S.ProfileInfoTitle>
                      <Typography.H3Sb>{mate.nickname}</Typography.H3Sb>
                      <Typography.H6Md color="#6C727F">
                        {mate.gender === "F" ? "여" : "남"}, {mate.age}세
                      </Typography.H6Md>
                    </S.ProfileInfoTitle>
                    <S.ProfileText>
                      <Typography.H6Md color="#8A92A3">
                        {mate.introduction}
                      </Typography.H6Md>
                    </S.ProfileText>
                  </S.ProfileInfo>
                  <S.PreferenceTags>
                    {mate.favoriteWorkouts.map((workout) => (
                      <S.Tag key={workout.code}>
                        <Typography.H7Md color="#6C727F">
                          {workout.name}
                        </Typography.H7Md>
                      </S.Tag>
                    ))}

                    <S.TimeTag>
                      {timeSlot &&
                        iconMapping[timeSlot] &&
                        iconMapping[timeSlot]}
                      <Typography.H7Md color="#6C727F">
                        {TIME_MAPPING[mate.preferredWorkoutTime]}
                      </Typography.H7Md>
                    </S.TimeTag>
                  </S.PreferenceTags>
                </S.MateInfoWrapper>
              </S.MateListItem>
            );
          })}

          {isFetchingNextPage &&
            Array.from({ length: skeletonCount }).map((_, index) => (
              <MateCardSkeleton key={`skeleton-${index}`} />
            ))}
        </S.MateList>
      )}

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </S.ExploreMateContainer>
  );
}
