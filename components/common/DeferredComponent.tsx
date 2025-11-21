"use client";

import { ReactNode, useEffect, useState } from "react";

interface DeferredComponentProps {
  children: ReactNode;
  delay?: number; // ms
}

export default function DeferredComponent({
  children,
  delay = 300,
}: DeferredComponentProps) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        visibility: showSkeleton ? "visible" : "hidden",
        transition: "visibility 200ms ease-in",
      }}
    >
      {/* children(스켈레톤)은 항상 렌더링하되 visibility로 제어 */}
      {children}
    </div>
  );
}
