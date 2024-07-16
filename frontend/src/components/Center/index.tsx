import type { ReactNode } from "react";
import { classNames } from "../../utils";

interface ICenter {
  children: ReactNode;
  className?: string;
}

export default function Center({ children, className }: ICenter) {
  return (
    <div
      className={classNames(
        className,
        "flex flex-1 self-center items-center justify-center text-center"
      )}
    >
      {children}
    </div>
  );
}
