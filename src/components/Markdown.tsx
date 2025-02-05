import React from "react";

type NodeProps = {
  children: React.ReactNode;
};

export const Bold = ({ children }: NodeProps) => (
  <strong className="font-semibold text-gray-800 sm:text-xl">{children}</strong>
);

export const Text = ({ children }: NodeProps) => (
  <p className="sm:text-md sm:leading-7 leading-6 font-sans text-gray-600 mb-4">{children}</p>
);

export const Heading1 = ({ children }: NodeProps) => (
  <h1 className="text-6xl font-extrabold text-gray-900 mt-8 mb-6">{children}</h1>
);

export const Heading2 = ({ children }: NodeProps) => (
  <h2 className="text-4xl font-semibold text-gray-800 mt-6 mb-5">{children}</h2>
);

export const Heading3 = ({ children }: NodeProps) => (
  <h3 className="text-3xl font-medium text-gray-700 mt-5 mb-4">{children}</h3>
);

export const Blockquote = ({ children }: NodeProps) => (
  <blockquote className="border-l-4 pl-4 italic text-gray-600 bg-gray-50 my-6 text-lg">
    {children}
  </blockquote>
);

export const UnorderedList = ({ children }: NodeProps) => (
  <ul className="list-disc list-inside pl-6 my-4 text-lg">{children}</ul>
);

export const OrderedList = ({ children }: NodeProps) => (
  <ol className="list-decimal list-inside pl-6 my-4 text-lg">{children}</ol>
);

export const ListItem = ({ children }: NodeProps) => (
  <li className="text-gray-700 mb-2 text-lg">{children}</li>
);

export const Link = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} className="text-blue-600 hover:text-blue-800 underline text-lg" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export const Code = ({ children }: NodeProps) => (
  <code className="bg-gray-100 p-1 rounded-md text-base">{children}</code>
);

export const InlineCode = ({ children }: NodeProps) => (
  <code className="bg-gray-100 p-1 rounded-sm text-base">{children}</code>
);
