import React from "react";

export default function ContentBox({ children }: { children: React.ReactNode }) {
  return <div className="border border-gray-300 p-3 rounded-lg">{children}</div>;
}
