import { Suspense } from "react";
import ShopAll from "@/components/shopAll.jsx";

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading shop...</div>}>
      <ShopAll />
    </Suspense>
  );
}
