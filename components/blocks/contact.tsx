import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";

type ContactBlockData = {
  headerImage?: string;
  title?: string;
  ateliers?: Array<{
    name?: string;
    address?: string;
    zipCity?: string;
  }>;
};

export const Contact = ({ data }: { data: ContactBlockData }) => {
  return (
    <div className="w-full">
      {/* Header Image (Full Width) */}
      {data.headerImage && (
        <div className="w-full h-[60vh] relative overflow-hidden" data-tina-field={tinaField(data, "headerImage")}>
          <Image
            src={data.headerImage}
            alt="Contact Map"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Ateliers Section */}
      <div className="w-full px-6 py-16">
        <h2 
          className="font-medium uppercase mb-16" 
          style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }} 
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.ateliers?.map((atelier, index) => (
            <div key={index} className="flex flex-col gap-1" data-tina-field={tinaField(data, "ateliers", index)}>
              <h3 className="font-medium uppercase text-black" style={{ fontSize: 'var(--text-size-body)', lineHeight: 'var(--line-height-body)' }}>
                {atelier.name}
              </h3>
              <div className="text-gray-500" style={{ fontSize: 'var(--text-size-small)', lineHeight: 'var(--line-height-small)' }}>
                <p>{atelier.address}</p>
                <p className="uppercase">{atelier.zipCity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const contactBlockSchema: Template = {
  name: "contact",
  label: "Contact Page",
  fields: [
    {
      type: "image",
      label: "Header Image",
      name: "headerImage",
    },
    {
      type: "string",
      label: "Section Title",
      name: "title",
    },
    {
      type: "object",
      label: "Ateliers",
      name: "ateliers",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        { type: "string", label: "Name", name: "name" },
        { type: "string", label: "Address", name: "address" },
        { type: "string", label: "Zip / City", name: "zipCity" },
      ],
    },
  ],
};
