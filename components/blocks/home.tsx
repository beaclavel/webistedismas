import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type HomeBlockData = {
  title?: string;
  body?: any;
  domainTitle?: string;
  domains?: string[];
  contacts?: Array<{
    email?: string;
    phone?: string;
  }>;
};

export const Home = ({ data }: { data: HomeBlockData }) => {
  const contacts = data.contacts || [];
  const leftContact = contacts[0];
  const rightContact = contacts[1];

  return (
    <div className="home-grid">
      <div className="home-cell home-title" data-tina-field={tinaField(data, "title")}>
        {data.title?.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < (data.title?.split("\n").length || 0) - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </div>

      <div className="home-row-spacer home-row-spacer-top"></div>

      <div className="home-cell home-text" data-tina-field={tinaField(data, "body")}>
        <TinaMarkdown content={data.body} />
      </div>

      <div className="home-cell home-domain" data-tina-field={tinaField(data, "domainTitle")}>
        <div className="home-domain-title">{data.domainTitle}</div>
        <div className="home-domain-list" data-tina-field={tinaField(data, "domains")}>
          {data.domains?.map((domain, index) => (
            <div key={index}>{domain}</div>
          ))}
        </div>
      </div>

      <div className="home-row-spacer home-row-spacer-bottom"></div>

      <div className="home-cell home-contact-left" data-tina-field={tinaField(data, "contacts")}>
        <div className="home-label">Mail</div>
        {leftContact?.email ? (
          <div>
            <a href={`mailto:${leftContact.email}`}>{leftContact.email}</a>
          </div>
        ) : (
          <div />
        )}
        <div className="home-label">Téléphone</div>
        <div>{leftContact?.phone}</div>
      </div>

      <div className="home-cell home-contact-right" data-tina-field={tinaField(data, "contacts")}>
        <div className="home-label">Mail</div>
        {rightContact?.email ? (
          <div>
            <a href={`mailto:${rightContact.email}`}>{rightContact.email}</a>
          </div>
        ) : (
          <div />
        )}
        <div className="home-label">Téléphone</div>
        <div>{rightContact?.phone}</div>
      </div>
    </div>
  );
};

export const homeBlockSchema: Template = {
  name: "home",
  label: "Home Layout",
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
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Domain Title",
      name: "domainTitle",
    },
    {
      type: "string",
      label: "Domains",
      name: "domains",
      list: true,
    },
    {
      type: "object",
      label: "Contacts",
      name: "contacts",
      list: true,
      fields: [
        {
          type: "string",
          label: "Email",
          name: "email",
        },
        {
          type: "string",
          label: "Phone",
          name: "phone",
        },
      ],
    },
  ],
};
