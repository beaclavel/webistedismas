import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

type TeamBlockData = {
  headerImage?: string;
  introTitle?: string;
  introSubtitle?: string;
  introText?: any;
  founders?: Array<{
    name?: string;
    role?: string;
    image?: string;
    description?: any;
    details?: Array<{
      label?: string;
      value?: string;
    }>;
  }>;
  teamMembers?: Array<{
    name?: string;
    role?: string;
    number?: string;
    email?: string;
  }>;
};

export const Team = ({ data }: { data: TeamBlockData }) => {
  return (
    <div className="w-full">
      {/* Header Image */}
      {data.headerImage && (
        <div className="w-full h-[60vh] relative overflow-hidden" data-tina-field={tinaField(data, "headerImage")}>
          <Image
            src={data.headerImage}
            alt="Team Header"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Intro Section */}
      <div className="w-full px-6 py-16">
        <div className="text-center mb-16">
            <h2 className="font-medium uppercase mb-2" style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }} data-tina-field={tinaField(data, "introTitle")}>{data.introTitle}</h2>
            <h3 className="text-xl text-gray-500 mb-8" data-tina-field={tinaField(data, "introSubtitle")}>{data.introSubtitle}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-none mx-auto">
             <div className="col-span-1 md:col-start-2">
                 <div className="prose prose-lg text-justify max-w-none" 
                      style={{ fontSize: 'var(--text-size-body)', lineHeight: 'var(--line-height-body)' }}
                      data-tina-field={tinaField(data, "introText")}>
                  <TinaMarkdown content={data.introText} />
                </div>
             </div>
        </div>
      </div>

      {/* Founders Section - Constrained Width & Margins */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {data.founders?.map((founder, index) => (
            <div key={index} className="flex flex-col gap-6" data-tina-field={tinaField(data, "founders", index)}>
              {founder.image && (
                <div className="relative aspect-[3/4] w-3/4 mx-auto md:w-full md:mx-0 overflow-hidden bg-gray-100">
                  <Image
                    src={founder.image}
                    alt={founder.name || "Founder"}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}
              <div>
                <h3 className="font-medium uppercase" style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }}>{founder.name}</h3>
                <p className="text-gray-500 uppercase text-sm mb-4">{founder.role}</p>
                <div className="prose prose-sm text-justify mb-6 max-w-none" style={{ fontSize: 'var(--text-size-body)', lineHeight: 'var(--line-height-body)' }}>
                  <TinaMarkdown content={founder.description} />
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {founder.details?.map((detail, i) => (
                    <React.Fragment key={i}>
                      <span className="text-gray-500">{detail.label}</span>
                      <span>{detail.value}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team List Section */}
      <div className="w-full px-6 py-16 border-t border-gray-200">
        <h3 className="font-medium uppercase mb-12 text-center" style={{ fontSize: 'var(--text-size-title)', lineHeight: 'var(--line-height-title)' }}>L’Équipe</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.teamMembers?.map((member, index) => (
            <div key={index} className="flex flex-col gap-1 border-l-2 border-gray-100 pl-4" data-tina-field={tinaField(data, "teamMembers", index)}>
              <span className="text-4xl font-light text-gray-200 mb-2">{(index + 1).toString().padStart(2, '0')}</span>
              <h4 className="font-medium text-lg">{member.name}</h4>
              <p className="text-sm text-gray-500 uppercase">{member.role}</p>
              <p className="text-sm">{member.number}</p>
              <a href={`mailto:${member.email}`} className="text-sm hover:underline text-gray-600">{member.email}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const teamBlockSchema: Template = {
  name: "team",
  label: "Team Page",
  fields: [
    {
      type: "image",
      label: "Header Image",
      name: "headerImage",
    },
    {
      type: "string",
      label: "Intro Title",
      name: "introTitle",
    },
    {
      type: "string",
      label: "Intro Subtitle",
      name: "introSubtitle",
    },
    {
      type: "rich-text",
      label: "Intro Text",
      name: "introText",
    },
    {
      type: "object",
      label: "Founders",
      name: "founders",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        { type: "string", label: "Name", name: "name" },
        { type: "string", label: "Role", name: "role" },
        { type: "image", label: "Portrait", name: "image" },
        { type: "rich-text", label: "Description", name: "description" },
        {
          type: "object",
          label: "Details",
          name: "details",
          list: true,
          fields: [
            { type: "string", label: "Label", name: "label" },
            { type: "string", label: "Value", name: "value" },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Team Members",
      name: "teamMembers",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        { type: "string", label: "Name", name: "name" },
        { type: "string", label: "Role", name: "role" },
        { type: "string", label: "Phone Number", name: "number" },
        { type: "string", label: "Email", name: "email" },
      ],
    },
  ],
};
