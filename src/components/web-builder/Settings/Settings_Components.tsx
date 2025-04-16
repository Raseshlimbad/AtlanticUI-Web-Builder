"use client";
import { Dragable } from "@/components/DragAndDrop/Dragable";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
  components,
} from "@/package/React/data";
import { CaretDown, CaretUp, Eye } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Settings_Components() {
  return (
    <>
      <div className="h-full w-full overflow-y-auto">
        <div className="mb-6 flex h-16 items-center border-b-2 border-border px-8">
          <h1>Components</h1>
        </div>
        {components?.map((data, i) => (
          <Component componentName={data.name} key={i} />
        ))}
      </div>
    </>
  );
}

const Component = ({ componentName }: { componentName: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [variantsData, setVariantsData] = useState<Variants[] | null>(null);

  useEffect(() => {
    const DataObtained: Components | null = FindComponentData(componentName);

    if (DataObtained) {
      setVariantsData(FindVariantsOfAComponent(DataObtained?.variants));
    }
  }, [componentName]);

  return (
    <>
      <div className="w-full transition-all duration-500">
        <button
          className="flex h-10 w-full items-center justify-between px-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {componentName}
          {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
        </button>
        <div
          className={clsx(
            "mb-6 flex flex-col items-end gap-4 pr-4",
            { hidden: isOpen === false },
            { block: isOpen === true },
          )}
        >
          {variantsData?.map((variant, i) => (
            <Dragable
              className="flex w-[90%] flex-col items-end"
              key={i}
              componentDataJsx={variant.element}
              componentType="component"
            >
              <div
                className="flex min-h-8 w-full items-center justify-between rounded-lg bg-secondary px-4 py-2"
                key={i}
              >
                <h1>{variant.name}</h1>
                <a href={`/preview/${variant.id}`} target="_blank">
                  <Eye size={16} />
                </a>
              </div>
            </Dragable>
          ))}
        </div>
      </div>
    </>
  );
};
