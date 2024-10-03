export default async function NotFound() {
  return (
    <div className="mx-auto max-w-screen-xl min-h-[calc(600px)] grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="text-8xl font-bold text-black">404</div>
        <div>This page could not be found.</div>
      </div>
    </div>
  );
}
