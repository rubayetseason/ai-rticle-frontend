"use client";

import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  return <ArrowLeft onClick={() => history.back()} className="size-7 cursor-pointer" />;
};

export default GoBackButton;
