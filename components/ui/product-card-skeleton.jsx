
export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse w-[220px] min-w-44 h-[360px] rounded-xl bg-slate-100 flex flex-col gap-4 shadow-md">
      <div className="h-36 rounded-t-xl bg-slate-300" />
      <div className="flex-1 flex flex-col gap-2 px-4 pt-2">
        <div className="w-2/3 h-5 bg-slate-300 rounded" />
        <div className="w-1/3 h-4 bg-slate-300 rounded" />
        <div className="w-1/2 h-4 bg-slate-200 rounded mt-1" />
        <div className="w-full h-6 mt-3 bg-slate-300 rounded" />
      </div>
    </div>
  );
}
