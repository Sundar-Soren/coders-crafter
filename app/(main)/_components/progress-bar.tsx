import { Progress } from "@/components/ui/progress";
import React from "react";

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div>
      <Progress value={value} />
      <p className="pt-2">{value} % completed</p>
    </div>
  );
};

export default ProgressBar;
