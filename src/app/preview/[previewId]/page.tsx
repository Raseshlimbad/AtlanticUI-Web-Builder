"use client";
import { FindVariantFromId, Variants } from "@/package/React/data";
import { useEffect, useState } from "react";

export default function PreviewFullscreen({
  params,
}: {
  params: { previewId: string };
}) {
  const [variantsData, setVariantsData] = useState<Variants | null>(null);

  useEffect(() => {
    if (params.previewId) {
      const myVal = new Number(params.previewId);
      getVariantData(parseInt(params.previewId));
    }
  }, [variantsData, params.previewId]);

  const getVariantData = (id: number) => {
    var data: Variants | null = FindVariantFromId(id);
    setVariantsData(data);
  };

  return (
    <>
      {variantsData ? (
        <div className="min-h-screen w-full">
          <Background />
          <variantsData.component />
        </div>
      ) : null}
    </>
  );
}

function Background() {
  return (
    <>
      {" "}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    </>
  );
}
