"use client";

import React from "react";
import { cn } from "~/lib/css";
import { useDraggable } from "~/hooks/use-draggable";

export function WindowSplit(props: { left: React.ReactNode; right: React.ReactNode }) {
  const [ratio, setRatio] = React.useState(0.5);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const handlerRef = React.useRef<HTMLDivElement>(null);
  const rect = React.useRef<DOMRect>();

  useDraggable(handlerRef, {
    onDragStart: React.useCallback(() => {
      rect.current = wrapperRef.current?.getBoundingClientRect();
    }, []),
    onDrag: React.useCallback((event: MouseEvent) => {
      if (rect.current) setRatio((event.x - rect.current.x) / rect.current.width);
    }, []),
  });

  const size = `${Math.min(Math.max(ratio, 0.05), 0.95) * 100}%`;

  return (
    <div ref={wrapperRef} className="group relative w-fit h-fit select-none">
      <div>{props.left}</div>

      <div
        draggable={false}
        className="absolute inset-0 w-full h-full z-10"
        style={{ maskImage: `linear-gradient(to right, transparent ${size}, black ${size})` }}
      >
        {props.right}
      </div>

      <div
        draggable={false}
        ref={handlerRef}
        style={{ left: size }}
        className={cn(
          "absolute inset-0 h-full -translate-x-[50%] z-20",
          "w-[12px]",
          "bg-transparent group-hover:bg-zinc-700/20 hover:!bg-zinc-800/90",
          "transition cursor-col-resize active:cursor-grabbing",
        )}
      />
    </div>
  );
}

/* export function WindowSplit(props: { left: React.ReactNode; right: React.ReactNode }) {
  const [ratio, setRatio] = React.useState(0.5);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const handlerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const handler = handlerRef.current;
    if (wrapper && handler) {
      let rect: DOMRect;
      return subscribe(handler, "mousedown", () => {
        rect = wrapper.getBoundingClientRect();
        const mousemove = subscribe(document, "mousemove", (event) => {
          if (event.buttons & 1) {
            setRatio((event.x - rect.x) / rect.width);
          }
        });
        subscribe(document, "mouseup", mousemove);
      });
    }
  }, [wrapperRef, handlerRef]);

  const size = `${Math.min(Math.max(ratio, 0.05), 0.95) * 100}%`;

  return (
    <div ref={wrapperRef} className="group relative w-fit h-fit select-none">
      <div className="opacity-0">{props.left}</div>

      <div
        draggable={false}
        className="absolute inset-0 w-full h-full z-10"
        style={{ maskImage: `linear-gradient(to right, black ${size}, transparent ${size})` }}
      >
        {props.left}
      </div>

      <div
        draggable={false}
        className="absolute inset-0 w-full h-full z-10"
        style={{ maskImage: `linear-gradient(to right, transparent ${size}, black ${size})` }}
      >
        {props.right}
      </div>

      <div
        draggable={false}
        ref={handlerRef}
        style={{ left: size }}
        className={cn(
          "absolute inset-0 h-full -translate-x-[50%] z-20",
          "w-[12px]",
          "bg-transparent group-hover:bg-zinc-700/20 hover:!bg-zinc-800/90",
          "transition cursor-col-resize active:cursor-grabbing",
        )}
      />
    </div>
  );
} */
