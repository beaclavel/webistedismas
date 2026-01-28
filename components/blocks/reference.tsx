import React, { useState, useRef, MouseEvent } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

type ReferenceBlockData = {
  title?: string;
  introText?: any;
  references?: Array<{
    projectTitle?: string;
    subtitle?: string;
    company?: string;
    details?: string;
    description?: any;
    imageBefore?: string;
    imageAfter?: string;
  }>;
};

const BeforeAfterSlider = ({ before, after, alt }: { before?: string; after?: string; alt: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  if (!before || !after) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={after}
          alt={`After ${alt}`}
          fill
          className="object-contain"
        />
      </div>

      {/* Before Image (Foreground with clip-path) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`Before ${alt}`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export const Reference = ({ data }: { data: ReferenceBlockData }) => {
  return (
    <div className="w-full">
      {/* Header Section (5-column grid like Home/Services) */}
      <div className="home-grid !min-h-0 !h-auto pb-0 border-b border-transparent">
        <div className="home-cell home-title" data-tina-field={tinaField(data, "title")}>
          {data.title?.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < (data.title?.split("\n").length || 0) - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </div>

        <div 
          className="home-cell home-text" 
          style={{ gridRow: '1 / 2' }}
          data-tina-field={tinaField(data, "introText")}
        >
          <TinaMarkdown content={data.introText} />
        </div>
      </div>

      <div className="h-[128px]"></div>

      {/* References List */}
      <div className="w-full px-6 pb-32">
        <div className="flex flex-col gap-32">
          {data.references?.map((ref, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-[3px]" data-tina-field={tinaField(data, "references", index)}>
              
              {/* Text Content (Cols 1-2) */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                <div>
                  <h3 className="font-medium uppercase" style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }}>
                    {ref.projectTitle}
                  </h3>
                  {ref.subtitle && (
                    <p className="text-gray-500 italic mt-1" style={{ fontSize: 'var(--text-size-body)' }}>
                      {ref.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-1" style={{ fontSize: 'var(--text-size-small)' }}>
                  {ref.company && <p className="font-medium uppercase">{ref.company}</p>}
                  {ref.details && <p className="text-gray-500">{ref.details}</p>}
                </div>

                <div className="prose prose-sm text-justify max-w-none" style={{ fontSize: 'var(--text-size-body)', lineHeight: 'var(--line-height-body)' }}>
                  <TinaMarkdown content={ref.description} />
                </div>
              </div>

              {/* Slider Image (Cols 3-6) */}
              <div className="col-span-1 md:col-span-4 bg-gray-100 relative min-h-[500px] flex items-center justify-center p-12 md:p-24">
                <div className="relative w-full h-[400px]">
                  <BeforeAfterSlider 
                    before={ref.imageBefore} 
                    after={ref.imageAfter} 
                    alt={ref.projectTitle || "Reference"} 
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const referenceBlockSchema: Template = {
  name: "reference",
  label: "Reference Page",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "rich-text",
      label: "Intro Text",
      name: "introText",
    },
    {
      type: "object",
      label: "References",
      name: "references",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.projectTitle }),
      },
      fields: [
        { type: "string", label: "Project Title", name: "projectTitle" },
        { type: "string", label: "Subtitle", name: "subtitle" },
        { type: "string", label: "Company", name: "company" },
        { type: "string", label: "Details", name: "details" },
        { type: "rich-text", label: "Description", name: "description" },
        { type: "image", label: "Image Before", name: "imageBefore" },
        { type: "image", label: "Image After", name: "imageAfter" },
      ],
    },
  ],
};
