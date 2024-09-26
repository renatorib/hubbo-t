export function subscribe<Element extends HTMLElement | Document, Event extends keyof HTMLElementEventMap>(
  element: Element,
  event: Event,
  fn: (handler: Element extends Document ? DocumentEventMap[Event] : HTMLElementEventMap[Event]) => any,
  options?: AddEventListenerOptions,
) {
  let lastRet: any;

  function handler(...args: Parameters<typeof fn>) {
    lastRet = fn(...args);
  }

  // @ts-expect-error ---
  element.addEventListener(event, handler, options);

  return () => {
    if (typeof lastRet === "function") lastRet();
    // @ts-expect-error wrongly typed handler 'this'
    element.removeEventListener(event, handler);
  };
}

export function subscribeAll(...unsubscribers: (() => any)[] | (() => any)[][]) {
  return () => unsubscribers.forEach((unsub) => (Array.isArray(unsub) ? unsub.forEach((unsub) => unsub()) : unsub()));
}
