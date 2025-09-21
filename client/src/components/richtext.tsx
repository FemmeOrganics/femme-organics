'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";

export const Display = ({ content }: { content: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div
        className={`prose max-w-none transition-all duration-300 ${
          expanded ? "" : "line-clamp-2"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button
        variant="ghost"
        className="p-0 text-sm h-auto text-blue-400 underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Less" : "More"}
      </Button>
    </div>
  );
};
