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
  ],
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};

export const handlers = [
  // 메이트 탐색 API만 모킹
  http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/users/mates`,
    ({ request }) => {
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
