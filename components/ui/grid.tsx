import React from "react";
import { View } from "react-native";
import { cn } from "~/lib/utils";
import type { DimensionValue } from "react-native";

interface GridProps {
  /** number of columns (1, 2, 3, 4 or 6) */
  columns?: 1 | 2 | 3 | 4 | 6;
  /** Tailwind spacing unit for gap (0,1,2,3,4,5,6…) */
  gap?: number;
  /** extra tailwind classes on the container */
  className?: string;
  itemClassName?: string;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap = 2,
  className = "",
  itemClassName = "",
  children,
}) => {
  const itemWidth: DimensionValue = `${100 / columns}%`;
  const halfGap = gap / 2;

  return (
    <View
      className={cn("flex-row flex-wrap", className)}
      style={{ margin: -halfGap }}
    >
      {React.Children.map(children, (child, i) => (
        <View
          key={i}
          className={cn(itemClassName)}
          style={{ width: itemWidth, padding: halfGap }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};
