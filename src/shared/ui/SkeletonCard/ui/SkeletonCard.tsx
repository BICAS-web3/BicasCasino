import { FC } from "react";
import ContentLoader from "react-content-loader";

export interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: FC<SkeletonCardProps> = (props) => {
  return (
    <ContentLoader
      speed={8}
      width={200}
      height={200}
      viewBox="0 0 200 200"
      backgroundColor="#d1d1d1"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="0" y="0" rx="12" ry="12" width="200" height="200" />
    </ContentLoader>
  );
};
