import React from "react";
import { useTheme } from "../../utils/ThemeContext";

export default function Section7() {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full min-h-screen py-8 px-4 ${theme === "dark" ? "" : ""}`}
    >
      Comments
    </div>
  );
}
