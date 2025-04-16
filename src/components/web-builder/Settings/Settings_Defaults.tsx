"use client";
import { Dragable } from "@/components/DragAndDrop/Dragable";
import { EditorBtns, EditorElement } from "@/context/Editor/EditorProvider";
import {
  Images,
  Rectangle,
  TextT,
  Video,
  VideoCamera,
} from "@phosphor-icons/react";
import { ReactElement } from "react";
import { v4 } from "uuid";
type SingleSetting = {
  name: string;
  icon: ReactElement;
  componentType: EditorBtns;
  componentData: EditorElement;
};
export default function Settings_Defaults() {
  const DefaultData: Array<SingleSetting> = [
    {
      name: "h1",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H1",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h1",
      },
    },
    {
      name: "h2",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H2",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h2",
      },
    },
    {
      name: "h3",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H3",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h3",
      },
    },
    {
      name: "h4",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H4",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h4",
      },
    },
    {
      name: "h5",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H5",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h5",
      },
    },
    {
      name: "h6",
      icon: <TextT />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "H6",
        styles: [],
        type: "component_element",
        special: {
          textData: "Enter your text",
        },
        tag: "h6",
      },
    },
    {
      name: "Image",
      icon: <Images size={20} />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "video",
        styles: ["rounded"],
        type: "component_element",
        special: {
          src: "https://s.cafebazaar.ir/images/upload/screenshot/com.izanaki.itachi.blackwallpapers-screenshots-2.jpg?x-img=v1/resize,h_600,lossless_false/optimize",
          alt: "Demo Image",
          width: "400",
          height: "300",
        },
        tag: "img",
      },
    },
    {
      name: "Video",
      icon: <VideoCamera size={20} />,
      componentType: "component_element",
      componentData: {
        content: [
          {
            content: [],
            id: v4(),
            name: "Source",
            type: "component_element",
            styles: [],
            special: {
              src: "https://player.vimeo.com/progressive_redirect/playback/828776067/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=3c73991a1c65c82cf47f4d0500d7063330031ea6e31511204288cfa68a6f0957",
              type: "video/mp4",
            },
            tag: "source",
          },
        ],
        id: v4(),
        name: "video",
        styles: ["rounded"],
        type: "component_element",
        special: {
          controls: true,
          width: "400",
          height: "300",
        },
        tag: "video",
      },
    },
    {
      name: "IFrame",
      icon: <Video size={20} />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "IFrame",
        styles: [],
        type: "component_element",
        special: {
          src: "https://player.vimeo.com/progressive_redirect/playback/828776067/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=3c73991a1c65c82cf47f4d0500d7063330031ea6e31511204288cfa68a6f0957",
          title: "Video",
          width: "400",
          height: "300",
        },
        tag: "iframe",
      },
    },
    {
      name: "Div",
      icon: <Rectangle size={20} />,
      componentType: "component_element",
      componentData: {
        content: [],
        id: v4(),
        name: "Div",
        styles: [],
        type: "component_element",
        special: {},
        tag: "div",
      },
    },
  ];
  return (
    <>
      <div className="h-full w-full overflow-y-auto">
        <div className="mb-6 flex h-16 items-center border-b-2 border-border px-8">
          <h1>Defaults</h1>
        </div>
        <div className="flex w-full flex-wrap justify-evenly gap-4 px-4">
          {DefaultData?.map((data, i) => (
            <Component
              name={data.name}
              key={i}
              icon={data.icon}
              componentType={data.componentType}
              componentData={data.componentData}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const Component = ({
  name,
  icon,
  componentType,
  componentData,
}: SingleSetting) => {
  return (
    <>
      <Dragable
        className="flex h-full w-[40%] flex-col items-end"
        componentType={componentType}
        componentDataEditorElement={componentData}
      >
        <div className="flex w-full flex-col items-center justify-start gap-2 rounded-lg border-2 border-secondary px-4 py-4 shadow">
          {icon}
          <h1>{name}</h1>
        </div>
      </Dragable>
    </>
  );
};
