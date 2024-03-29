import React from "react";

export const NotificationIcon = ({ count }: { count: number }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
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
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <desc />{" "}
        <g>
          {" "}
          <path
            d="M8,27c0,2.209,1.791,4,4,4 s4-1.791,4-4"
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />{" "}
          <path
            d="M15,8.674 C14.091,8.242,13.074,8,12,8h0c-3.866,0-7,3.134-7,7v8l-2,2v2h18v-2l-2-2v-5"
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />{" "}
          <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="5"
            x2="12"
            y1="23"
            y2="23"
          />{" "}
          <path d="M12,5L12,5c-1.105,0-2,0.895-2,2v2h4V7C14,5.895,13.105,5,12,5z" />{" "}
          <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="14"
            x2="16"
            y1="23"
            y2="23"
          />{" "}
          {/* <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="22"
            x2="22"
            y1="10"
            y2="12"
          />{" "} */}
          {/* <line
            fill="none"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            x1="22"
            x2="22"
            y1="8"
            y2="4"
          /> */}
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
            {count}
          </text>
        </g>
      </g>
    </svg>
  );
};
