import React from "react";

// Decorative network illustration; it does not represent live security data.
export default function SecurityVisual() {
  return (
    <div className="security-visual" aria-hidden="true">
      <svg viewBox="0 0 480 480" fill="none" focusable="false">
        <g stroke="currentColor">
          <circle cx="240" cy="240" r="196" opacity="0.12" />
          <circle
            className="security-orbit"
            cx="240"
            cy="240"
            r="155"
            opacity="0.25"
            strokeDasharray="3 12"
          />
          <circle cx="240" cy="240" r="116" opacity="0.12" />
          <path
            d="M44 240h105m182 0h105M240 44v96m0 200v96M101 101l76 76m126 126 76 76M101 379l76-76m126-126 76-76"
            opacity="0.35"
          />
          <path
            d="M240 140l78 31v69c0 55-42 88-78 106-36-18-78-51-78-106v-69z"
            fill="currentColor"
            fillOpacity="0.07"
            strokeWidth="2"
          />
          <path
            d="M240 156l64 26v58c0 44-31 73-64 91-33-18-64-47-64-91v-58z"
            opacity="0.3"
          />
          <rect x="215" y="224" width="50" height="43" rx="8" strokeWidth="3" />
          <path
            d="M225 224v-12a15 15 0 0 1 30 0v12m-15 16v12"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <g fill="var(--surface)" stroke="currentColor" strokeWidth="2">
          <rect x="80" y="80" width="42" height="42" rx="10" />
          <rect x="358" y="80" width="42" height="42" rx="10" />
          <rect x="80" y="358" width="42" height="42" rx="10" />
          <rect x="358" y="358" width="42" height="42" rx="10" />
          <circle cx="44" cy="240" r="7" />
          <circle cx="436" cy="240" r="7" />
          <circle cx="240" cy="44" r="7" />
          <circle cx="240" cy="436" r="7" />
        </g>
        <g className="security-nodes" fill="currentColor">
          <circle cx="101" cy="101" r="4" />
          <circle cx="379" cy="101" r="4" />
          <circle cx="101" cy="379" r="4" />
          <circle cx="379" cy="379" r="4" />
        </g>
      </svg>
    </div>
  );
}
