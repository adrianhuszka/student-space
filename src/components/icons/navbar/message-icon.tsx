import React from "react";

export const MessageIcon = ({ count }: { count: number }) => {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32.00 32.00"
      enable-background="new 0 0 32 32"
      id="Stock_cut"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="stroke-default-400 cursor-pointer"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.512"
      />

      <g id="SVGRepo_iconCarrier">
        <desc />
        <g>
          <polyline
            fill="none"
            points="14,9 1,9 1,31 31,31 31,16 "
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <polyline
            fill="none"
            points="14,9 1,9 16,24 22,18 "
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="1"
            x2="12"
            y1="31"
            y2="20"
          />
          <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="31"
            x2="20"
            y1="31"
            y2="20"
          />
          <circle
            cx="24"
            cy="8"
            r="7"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="0"
            className="fill-danger"
          />
          <text fill="white" stroke="none" x={21.5} y={11} fontSize={10}>
            {count > 9 ? "9+" : count}
          </text>
          {/* <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="24"
            x2="24"
            y1="10"
            y2="12"
          />
          <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="24"
            x2="24"
            y1="8"
            y2="4"
          /> */}
        </g>
      </g>
    </svg>
  );
};
