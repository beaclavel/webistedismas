import React, { useState, useRef } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

type ServicesBlockData = {
  title?: string;
  introText?: any;
  services?: Array<{
    title?: string;
    description?: any;
    image?: string;
  }>;
};

export const Services = ({ data }: { data: ServicesBlockData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Header Section (5-column grid like Home, but aligned top) */}
      <div className="home-grid !min-h-0 !h-auto pb-0 border-b border-transparent">
        <div className="home-cell home-title" data-tina-field={tinaField(data, "title")}>
          {data.title?.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < (data.title?.split("\n").length || 0) - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </div>

        {/* Spacer removed as requested to align text with title */}
        
        <div 
          className="home-cell home-text" 
          style={{ gridRow: '1 / 2' }} // Override to align with title
          data-tina-field={tinaField(data, "introText")}
        >
          <TinaMarkdown content={data.introText} />
        </div>
      </div>

      <div className="h-[128px]"></div>

      {/* Services List (6-column grid) */}
      <div className="w-full px-6 pb-32">
        <div className="grid grid-cols-6 gap-[3px] relative">
          {data.services?.map((service, index) => (
            <React.Fragment key={index}>
              {/* Row Container for Hover Detection */}
              <div 
                className="contents group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Number (Col 1) */}
                <div 
                  className="col-span-1 pt-4 border-t border-gray-200" 
                  data-tina-field={tinaField(data, "services", index)}
                >
                  <span className="text-[20px] font-medium leading-[21px] text-black block">
                    ({(index + 1).toString().padStart(2, '0')})
                  </span>
                </div>

                {/* Title (Col 2) */}
                <div className="col-span-1 pt-4 border-t border-gray-200">
                  <h3 
                    className="font-medium text-black uppercase"
                    style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Spacer (Col 3) - Empty column for spacing */}
                <div className="col-span-1 pt-4 border-t border-gray-200"></div>

                {/* Description (Col 4-6) - Takes 3 columns */}
                <div className="col-span-3 pt-4 border-t border-gray-200 relative">
                   <div 
                    className="text-justify font-medium"
                    style={{ fontSize: 'var(--text-size-body)', lineHeight: 'var(--line-height-body)' }}
                   >
                      <TinaMarkdown content={service.description} />
                   </div>

                   {/* Hover Image Overlay - Centered over this 3-col description */}
                   {hoveredIndex === index && service.image && (
                    <div 
                      className="absolute top-1/2 left-1/2 z-50 pointer-events-none transition-opacity duration-200 ease-out"
                      style={{
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: 'auto',
                        aspectRatio: '16/9'
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden shadow-2xl">
                        <Image 
                          src={service.image || ""} 
                          alt={service.title || "Service Image"} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Spacing Row */}
                <div className="col-span-6 h-[128px]"></div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const servicesBlockSchema: Template = {
  name: "services",
  label: "Services Page",
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
      label: "Services List",
      name: "services",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        { type: "string", label: "Title", name: "title" },
        { type: "rich-text", label: "Description", name: "description" },
        { type: "image", label: "Hover Image", name: "image" },
      ],
    },
  ],
};
