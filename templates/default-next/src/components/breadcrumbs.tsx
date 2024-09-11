import React from "react";
import { ChevronRightIcon, HomeIcon } from "./icons";

function BreadcrumbsRoot(props: React.ComponentProps<"div">) {
  const children = React.Children.toArray(props.children);
  return (
    <div className="flex items-center gap-2 text-lg text-slate-700 dark:text-zinc-300 mb-6" {...props}>
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {child} {index < children.length - 1 && <ChevronRightIcon />}
        </React.Fragment>
      ))}
    </div>
  );
}

function BreadcrumbLink(props: React.ComponentProps<"a">) {
  return <a className="text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white" {...props} />;
}

function BreadcrumbHome(props: React.ComponentProps<"a">) {
  return (
    <BreadcrumbLink {...props} href="/">
      <HomeIcon />
    </BreadcrumbLink>
  );
}

function BreadcrumbActive({ prefix, ...props }: React.ComponentProps<"div"> & { prefix?: string }) {
  return (
    <div className="font-mono" {...props}>
      {prefix && <span className="text-slate-400 dark:text-zinc-600">{prefix}</span>}
      <span className="underline decoration-wavy decoration-slate-400 dark:decoration-zinc-600 decoration-from-font">
        {props.children}
      </span>
    </div>
  );
}

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Link: BreadcrumbLink,
  Home: BreadcrumbHome,
  Active: BreadcrumbActive,
});
