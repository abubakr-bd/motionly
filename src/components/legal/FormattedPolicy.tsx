import React from "react";

type FormattedPolicyProps = { content: string };

export const FormattedPolicy: React.FC<FormattedPolicyProps> = ({ content }) => {
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul className="my-5 pl-6 list-disc space-y-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed" key={`list-${key++}`}>
        {listItems.map((item, index) => <li key={`item-${index}`}>{item}</li>)}
      </ul>
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
      blocks.push(
        <h2 key={`heading-${key++}`} className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mt-10 mb-4 tracking-tight border-b border-black/[0.06] dark:border-white/[0.08] pb-2">
          {line.slice(2)}
        </h2>
      );
    } else if (/^\d+\./.test(line)) {
      blocks.push(
        <h3 key={`heading-${key++}`} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 tracking-tight flex items-baseline gap-2">
          <span className="font-mono text-sm text-[#2563EB] dark:text-[#38BDF8]">{line.match(/^\d+\./)?.[0]}</span>
          <span>{line.replace(/^\d+\.\s*/, "")}</span>
        </h3>
      );
    } else if (line.startsWith("Email:")) {
      const email = line.slice("Email:".length).trim();
      blocks.push(
        <p key={`contact-${key++}`} className="my-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white font-semibold">Email:</strong>{" "}
          <a href={`mailto:${email}`} className="text-[#2563EB] dark:text-[#38BDF8] hover:underline font-mono">
            {email}
          </a>
        </p>
      );
    } else if (line.startsWith("Website:")) {
      const website = line.slice("Website:".length).trim();
      blocks.push(
        <p key={`contact-${key++}`} className="my-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white font-semibold">Website:</strong>{" "}
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] dark:text-[#38BDF8] hover:underline font-mono">
            {website}
          </a>
        </p>
      );
    } else if (/^Last Updated\b/i.test(line)) {
      blocks.push(
        <p className="my-3 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400" key={`meta-${key++}`}>
          {line}
        </p>
      );
    } else if (line.length < 60 && !line.includes(".")) {
      blocks.push(
        <h3 key={`heading-${key++}`} className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-2">
          {line}
        </h3>
      );
    } else {
      blocks.push(
        <p key={`paragraph-${key++}`} className="my-4 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
          {line}
        </p>
      );
    }
  });

  flushList();
  return <div className="space-y-1">{blocks}</div>;
};
