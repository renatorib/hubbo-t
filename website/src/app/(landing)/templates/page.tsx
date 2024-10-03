import { cn } from "~/lib/css";
import { templates } from "./templates";

export default function Templates() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="px-2">
        <div className="py-8 md:py-16 flex flex-col gap-14 md:gap-24">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <h1 className="text-center text-4xl md:text-5xl text-stone-800">Templates</h1>
            <div className="text-stone-600 text-sm md:text-base">The one that fits your needs</div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-lg">
          <div className="grid grid-cols-3 gap-4">
            {templates.map((tpl) => {
              return <TemplateCard key={tpl.id} {...tpl} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard(props: { id: string; name: string; description: string; price: number }) {
  return (
    <div className="group shadow rounded overflow-hidden bg-white">
      <div className="bg-zinc-200 h-[200px]" />
      <div className="p-3 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">{props.name}</div>
          <div className="text-sm text-zinc-600">{props.description}</div>
        </div>
        <a
          href={`/templates/${props.id}`}
          className={cn(
            "border rounded text-center py-0.5 transition max-w-48 w-full",
            props.price === 0
              ? "border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white"
              : "border-pink-600 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
          )}
        >
          {props.price === 0 ? "Use for free" : `Pay only $${props.price.toFixed(2)}`}
        </a>
      </div>
    </div>
  );
}