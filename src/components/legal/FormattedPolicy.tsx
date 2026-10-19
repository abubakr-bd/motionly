import React from "react";

type FormattedPolicyProps = { content: string };

export const FormattedPolicy = ({ content }: FormattedPolicyProps) => {
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul className="site-policy-list" key={`list-${key++}`}>
        {listItems.map((item, index) => <li key={`item-${index}`}>{item}</li>)}
      </ul>,
    );
    listItems = [];
  };

  content.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();
    if (!line) return;

    if (line.startsWith("# ")) {
      blocks.push(<h2 key={`heading-${key++}`}>{line.slice(2)}</h2>);
    } else if (/^\d+\./.test(line)) {
      blocks.push(<h3 key={`heading-${key++}`}>{line}</h3>);
    } else if (line.startsWith("Email:")) {
      const email = line.slice("Email:".length).trim();
      blocks.push(<p key={`contact-${key++}`}>Email: <a href={`mailto:${email}`}>{email}</a></p>);
    } else if (line.startsWith("Website:")) {
      const website = line.slice("Website:".length).trim();
      blocks.push(<p key={`contact-${key++}`}>Website: <a href={website}>{website}</a></p>);
    } else if (/^Last Updated\b/i.test(line)) {
      blocks.push(<p className="site-policy-meta" key={`meta-${key++}`}>{line}</p>);
    } else if (line.length < 60 && !line.includes(".")) {
      blocks.push(<h3 key={`heading-${key++}`}>{line}</h3>);
    } else {
      blocks.push(<p key={`paragraph-${key++}`}>{line}</p>);
    }
  });

  flushList();
  return <div className="site-policy-content">{blocks}</div>;
};
