import React from "react";

import { Data } from "@/app/(protected)/chat/types";

interface ChatTopbarProps {
  data: Data;
  email?: string;
}

export default function ChatTopbar({ data, email }: ChatTopbarProps) {
  const othersTurn = data.members[0].email === email ? 1 : 0;

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="font-medium">{data.members[othersTurn].name}</span>
        </div>
      </div>
    </div>
  );
}
