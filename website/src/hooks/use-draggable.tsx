"use client";

import React from "react";
import { subscribe } from "~/lib/dom";

export function useDraggable<Element extends HTMLElement>(
  ref: React.RefObject<Element> | React.MutableRefObject<Element | undefined>,
  cbs?: {
    onDragStart?: (event: MouseEvent) => any;
    onDragEnd?: (event: MouseEvent) => any;
    onDrag?: (event: MouseEvent) => any;
  },
) {
  React.useEffect(() => {
    const handler = ref.current;
    if (handler) {
      return subscribe(handler, "mousedown", (event) => {
        cbs?.onDragStart?.(event);
        const unsubscribeMouseMove = subscribe(document, "mousemove", (event) => {
          if (event.buttons & 1) cbs?.onDrag?.(event);
        });
        return subscribe(
          document,
          "mouseup",
          (event) => {
            unsubscribeMouseMove();
            cbs?.onDragEnd?.(event);
          },
          { once: true },
        );
      });
    }
  }, [ref]);
}
