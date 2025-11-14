import { COLORS } from "@/constants/Theme";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  gap: 12px;
  padding: 16px;
  background-color: #fff;

  border-radius: 20px;
  border: 1.2px solid ${COLORS.GRAYSCALE_200};
`;

const SkeletonAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "14px"};
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const SkeletonTag = styled.div`
  width: 60px;
  height: 24px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 12px;
`;

export default function MateCardSkeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonAvatar />
      <SkeletonContent>
        <SkeletonLine width="40%" height="18px" />
        <SkeletonLine width="60%" height="14px" />
        <SkeletonTags>
          <SkeletonTag />
          <SkeletonTag />
        </SkeletonTags>
      </SkeletonContent>
    </SkeletonWrapper>
  );
}
