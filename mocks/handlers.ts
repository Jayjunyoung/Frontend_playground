// mocks/handlers.ts
import { MateListResponse } from "@/services/mate/searchMate";
import { http, HttpResponse } from "msw";

// 목 데이터 생성
const mockMates: MateListResponse = {
  content: [
    {
      id: 1,
      nickname: "헬스왕",
      age: 28,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=1",
      introduction: "주 5회 헬스 중! 같이 운동하실 분 구해요 💪",
      favoriteWorkouts: [
        { code: "WEIGHT_TRAINING", name: "웨이트 트레이닝" },
        { code: "RUNNING", name: "러닝" },
      ],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 2,
      nickname: "요가러버",
      age: 25,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=2",
      introduction: "요가 초보자도 환영해요! 같이 건강해져요 🧘‍♀️",
      favoriteWorkouts: [
        { code: "YOGA", name: "요가" },
        { code: "PILATES", name: "필라테스" },
      ],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 3,
      nickname: "수영왕자",
      age: 30,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=3",
      introduction: "수영으로 체력 키우고 있어요! 같이해요 🏊‍♂️",
      favoriteWorkouts: [{ code: "SWIMMING", name: "수영" }],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
    {
      id: 4,
      nickname: "크로스핏러",
      age: 27,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=4",
      introduction: "크로스핏 2년차! 초보자도 함께 운동해요 🔥",
      favoriteWorkouts: [
        { code: "CROSSFIT", name: "크로스핏" },
        { code: "WEIGHT_TRAINING", name: "웨이트 트레이닝" },
      ],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 5,
      nickname: "테니스매니아",
      age: 32,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=5",
      introduction: "테니스로 스트레스 해소! 같이 치실 분? 🎾",
      favoriteWorkouts: [{ code: "TENNIS", name: "테니스" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 6,
      nickname: "클라이밍걸",
      age: 26,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=6",
      introduction: "클라이밍 같이 하실 분! 초보 환영 🧗‍♀️",
      favoriteWorkouts: [{ code: "CLIMBING", name: "클라이밍" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 7,
      nickname: "런닝크루",
      age: 29,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=7",
      introduction: "아침 러닝으로 하루를 시작해요! 🏃‍♂️",
      favoriteWorkouts: [{ code: "RUNNING", name: "러닝" }],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 8,
      nickname: "필라테스퀸",
      age: 24,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=8",
      introduction: "필라테스로 코어 강화 중! 같이해요 💃",
      favoriteWorkouts: [
        { code: "PILATES", name: "필라테스" },
        { code: "YOGA", name: "요가" },
      ],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
    {
      id: 9,
      nickname: "복싱마스터",
      age: 31,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=9",
      introduction: "복싱으로 체력과 멘탈 관리! 같이 운동해요 🥊",
      favoriteWorkouts: [{ code: "BOXING", name: "복싱" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 10,
      nickname: "사이클러",
      age: 28,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=10",
      introduction: "주말 라이딩 같이 하실 분! 🚴‍♀️",
      favoriteWorkouts: [{ code: "CYCLING", name: "사이클링" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 11,
      nickname: "배드민턴킹",
      age: 26,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=11",
      introduction: "배드민턴 중급자! 같이 땀흘려요 🏸",
      favoriteWorkouts: [{ code: "BADMINTON", name: "배드민턴" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 12,
      nickname: "축구매니아",
      age: 29,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=12",
      introduction: "주말 풋살 같이 해요! ⚽",
      favoriteWorkouts: [{ code: "SOCCER", name: "축구" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 13,
      nickname: "댄스러버",
      age: 23,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=13",
      introduction: "춤추면서 재밌게 운동해요! 💃",
      favoriteWorkouts: [{ code: "DANCE", name: "댄스" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 14,
      nickname: "농구조아",
      age: 27,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=14",
      introduction: "농구 같이 하실 분! 실력 무관 🏀",
      favoriteWorkouts: [{ code: "BASKETBALL", name: "농구" }],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
    {
      id: 15,
      nickname: "등산러",
      age: 35,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=15",
      introduction: "주말 등산 메이트 구해요! ⛰️",
      favoriteWorkouts: [{ code: "HIKING", name: "등산" }],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
    {
      id: 16,
      nickname: "골프초보",
      age: 33,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=16",
      introduction: "골프 배우는 중! 같이 연습해요 ⛳",
      favoriteWorkouts: [{ code: "GOLF", name: "골프" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 17,
      nickname: "격투기짱",
      age: 30,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=17",
      introduction: "격투기로 자신감 up! 같이 해요 🥋",
      favoriteWorkouts: [{ code: "MARTIAL_ARTS", name: "격투기" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 18,
      nickname: "발레리나",
      age: 25,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=18",
      introduction: "발레로 우아함을 찾아요 🩰",
      favoriteWorkouts: [{ code: "BALLET", name: "발레" }],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 19,
      nickname: "스피닝마니아",
      age: 28,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=19",
      introduction: "실내 사이클 스피닝 같이해요! 🚴",
      favoriteWorkouts: [{ code: "SPINNING", name: "스피닝" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 20,
      nickname: "탁구왕",
      age: 31,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=20",
      introduction: "탁구 실력자! 같이 치실 분 🏓",
      favoriteWorkouts: [{ code: "TABLE_TENNIS", name: "탁구" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 21,
      nickname: "요가마스터",
      age: 34,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=21",
      introduction: "요가 5년차! 초보자 환영해요 🧘",
      favoriteWorkouts: [{ code: "YOGA", name: "요가" }],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 22,
      nickname: "헬린이",
      age: 24,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=22",
      introduction: "헬스 시작한지 3개월! 같이 성장해요 💪",
      favoriteWorkouts: [{ code: "WEIGHT_TRAINING", name: "웨이트 트레이닝" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 23,
      nickname: "수영선수출신",
      age: 29,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=23",
      introduction: "수영 전문가! 같이 수영해요 🏊",
      favoriteWorkouts: [{ code: "SWIMMING", name: "수영" }],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 24,
      nickname: "러닝초보",
      age: 27,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=24",
      introduction: "러닝 시작했어요! 같이 뛰실 분 🏃",
      favoriteWorkouts: [{ code: "RUNNING", name: "러닝" }],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
    {
      id: 25,
      nickname: "크로스핏킹",
      age: 32,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=25",
      introduction: "크로스핏 3년차! 같이 도전해요 🔥",
      favoriteWorkouts: [{ code: "CROSSFIT", name: "크로스핏" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 26,
      nickname: "필라테스초보",
      age: 26,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=26",
      introduction: "필라테스 배우고 있어요! 같이해요 🤸",
      favoriteWorkouts: [{ code: "PILATES", name: "필라테스" }],
      preferredWorkoutTime: "WEEKDAY_MORNING",
    },
    {
      id: 27,
      nickname: "테니스고수",
      age: 35,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=27",
      introduction: "테니스 10년차! 실력 향상 도와드려요 🎾",
      favoriteWorkouts: [{ code: "TENNIS", name: "테니스" }],
      preferredWorkoutTime: "WEEKEND_AFTERNOON",
    },
    {
      id: 28,
      nickname: "클라이밍러버",
      age: 28,
      gender: "F",
      profileUrl: "https://i.pravatar.cc/150?img=28",
      introduction: "클라이밍 중독! 같이 오르실 분 🧗",
      favoriteWorkouts: [{ code: "CLIMBING", name: "클라이밍" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 29,
      nickname: "복싱챔피언",
      age: 30,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=29",
      introduction: "복싱으로 스트레스 날려요! 🥊",
      favoriteWorkouts: [{ code: "BOXING", name: "복싱" }],
      preferredWorkoutTime: "WEEKDAY_EVENING",
    },
    {
      id: 30,
      nickname: "사이클링프로",
      age: 33,
      gender: "M",
      profileUrl: "https://i.pravatar.cc/150?img=30",
      introduction: "주말 장거리 라이딩 같이해요! 🚴‍♂️",
      favoriteWorkouts: [{ code: "CYCLING", name: "사이클링" }],
      preferredWorkoutTime: "WEEKEND_MORNING",
    },
  ],
  totalPages: 3,
  pageable: {
    pageNumber: 0,
  },
};

export const handlers = [
  // 메이트 탐색 API만 모킹
  http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/users/mates`,
    async ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "0");
      const size = parseInt(url.searchParams.get("size") || "10");
      const gender = url.searchParams.get("gender");
      const preferredTimes = url.searchParams.get("preferredTimes")?.split(",");
      const workoutTypes = url.searchParams.get("workoutTypes")?.split(",");

      console.log("🎭 MSW: 메이트 탐색 API 모킹 중...", {
        page,
        size,
        gender,
        preferredTimes,
        workoutTypes,
      });

      if (page > 0) {
        console.log("⏳ 다음 페이지 로딩 - 1.5초 딜레이");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // 필터링 로직
      let filteredMates = [...mockMates.content];

      if (gender) {
        filteredMates = filteredMates.filter((mate) => mate.gender === gender);
      }

      if (preferredTimes && preferredTimes.length > 0) {
        filteredMates = filteredMates.filter((mate) =>
          preferredTimes.includes(mate.preferredWorkoutTime),
        );
      }

      if (workoutTypes && workoutTypes.length > 0) {
        filteredMates = filteredMates.filter((mate) =>
          mate.favoriteWorkouts.some((workout) =>
            workoutTypes.includes(workout.code),
          ),
        );
      }

      // 페이지네이션
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedMates = filteredMates.slice(startIndex, endIndex);

      const response: MateListResponse = {
        content: paginatedMates,
        totalPages: Math.ceil(filteredMates.length / size),
        pageable: {
          pageNumber: page,
        },
      };

      console.log("✅ MSW: 응답 데이터", response);

      return HttpResponse.json({
        message: "success",
        data: response,
      });
    },
  ),
];
