import { notFound } from "next/navigation";
import { templates } from "../templates";
import { GradientBorder } from "~/components/gradient-border";

export default function Template({ params }: { params: { id: string } }) {
  const template = templates.find((tpl) => tpl.id === params.id);

  if (!template) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="mx-auto  my-32">
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
          <div className="text-4xl text-center justify-center">{template.name}</div>
          <div className="">{template.description}</div>
        </div>
        <GradientBorder
          className="font-mono px-8 py-4 text-lg text-stone-100 bg-gradient-to-b from-stone-950 to-stone-800"
          radius={12}
        >
          <span className="text-pink-500 select-none">$ </span>npx create-hubbo{" "}
          <span className="text-lime-400">--template {template.id}</span>
        </GradientBorder>
      </div>
    </div>
  );
}
