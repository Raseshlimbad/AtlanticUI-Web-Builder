import { Check } from "lucide-react";

export default function FeatureList() {
  const LIST: string[] = [
    "Custom Drag and Drop Functionality",
    "Custom Auth with Cookies, Encryption and Decryption",
    "Conversion from React Element to Custom Array for Editing and Storage Purpose",
    "Real Time Sync",
    "Tailwind CSS Editing",
    "Code Availability after Editing",
    "Full Screen Preview",
    "Undo and Redo Operations",
    "Custom State Management with Context API",
  ];
  return (
    <>
      <h1 className="mx-auto mb-16 w-max text-3xl font-semibold">
        All Features
      </h1>
      <div className="mx-auto my-8 flex max-w-[30rem] flex-col justify-center gap-3 px-6">
        {LIST.map((item, i) => (
          <h1 key={i} className="flex items-center gap-4 text-sm md:text-lg">
            <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-blue-500 md:max-h-6 md:min-h-6 md:min-w-6 md:max-w-6 md:stroke-[3]" />
            {item}
          </h1>
        ))}
      </div>
      <div className="my-20" />
    </>
  );
}
