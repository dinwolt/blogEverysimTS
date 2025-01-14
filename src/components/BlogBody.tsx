import React from "react";
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { ContentfulRichTextGatsbyReference, RenderRichTextData } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import { Bold, Heading1, Text } from "./Markdown";

type BlogBodyProps = {
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
};

export const BlogBody = ({ content }: BlogBodyProps) => {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="sm:text-4xl text-2xl font-semibold text-gray-800 mt-6 mb-5">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="sm:text-3xl text-xl font-medium text-gray-700 mt-5 mb-4">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="sm:text-3xl text-xl font-medium text-gray-700 mt-5 mb-4">{children}</h4>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-inside pl-6 my-4 text-lg">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal list-inside pl-6 my-4 text-lg">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="text-gray-700 mb-2 text-lg">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 pl-4 italic text-gray-600 bg-gray-50 my-6 text-lg">{children}</blockquote>
      ),
      [BLOCKS.HR]: (node) => <hr className="my-8 border-t-2 border-gray-300" />,
    },
  };

  return (
    <article className="py-6 mx-auto max-w-screen-lg">
      {renderRichText(content, options)}
    </article>
  );
};
