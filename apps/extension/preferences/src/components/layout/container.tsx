import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => (
  <div className="relative flex justify-center w-full">
    <div className="relative overflow-scroll">
      <div className="relative flex flex-col p-1 font-sans font-normal min-w-[420px] w-full">
        {children}
      </div>
    </div>
  </div>
);

export default Container;
