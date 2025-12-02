import { useState } from "react";
import type { Attribute } from "../../types/catalogTypes";

export function AttributeItem({
  attributeId,
  attributeName,
  values,
}: Attribute) {
  const [open, setOpen] = useState(false);

  const displayName = attributeName || "безымянный_атрибут";

  return (
    <div className="mb-2 w-48">
      <button
        className="w-full text-left font-medium bg-white border rounded px-3 py-2 shadow-sm hover:bg-gray-50 flex justify-between items-center transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        {displayName}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="mt-1 ml-2 p-2 bg-gray-50 border rounded shadow-inner space-y-1">
          {values.map((v) => (
            <p key={`${attributeId}-${v}`} className="text-sm text-gray-700">
              {v}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
