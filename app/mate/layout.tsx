import LoaderIcon from "@/assets/images/loader.svg";
import DeferredComponent from "@/components/common/DeferredComponent";
import Frame from "@/components/layout/Frame";
import { Suspense } from "react";

export default function MatePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Frame>
      <Suspense
        fallback={
          <DeferredComponent>
            <LoadingSkeleton />
          </DeferredComponent>
        }
      >
        {children}
      </Suspense>
    </Frame>
  );
}

const LoadingSkeleton = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        gap: "16px",
      }}
    >
      <LoaderIcon
        className="animate-spin"
        style={{ width: "24px", height: "24px" }}
      />
      <p
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#8A92A3",
        }}
      >
        메이트 정보를 불러오는 중...
      </p>
    </div>
  );
};
