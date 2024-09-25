import classnames, { Argument } from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Argument[]) {
  return twMerge(classnames(inputs));
}
