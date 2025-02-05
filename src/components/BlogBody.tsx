import React from "react";
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { ContentfulRichTextGatsbyReference, RenderRichTextData } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import { Bold, Heading1,Heading2, Heading3, Text } from "./Markdown";
import Prism from 'prismjs'
import 'prismjs/themes/prism-coy.css'; 

type BlogBodyProps = {
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  references:{
    contentful_id:string;
    language:string;
    childrenContentfulCodeSnippetCodeTextNode:{
      code:string;
    }[]
  }[]
};

export const BlogBody = ({ content, references }: BlogBodyProps) => {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.HEADING_2]: (node, children) => {
        if (Array.isArray(children)) {
          return (
            <h2 className="sm:text-4xl text-3xl text-brandHighlight font-bold font-spoqa my-10  ">
              {children.map((child, index) =>
                typeof child === 'string' ? child : child.props?.children
              )}
            </h2>
          );
        }
        return (
          <h2 className="sm:text-4xl text-3xl font-semibold text-gray-800 mt-6 mb-5">
            {children}
          </h2>
        );
      },
      
      [BLOCKS.HEADING_3]: (node, children) => {
        console.log(children)
        if (Array.isArray(children)) {
          return (
            <h3 className="sm:text-2xl text-xl font-medium font-spoqa text-black  mt-7 mb-3 dark:text-white">
              {children.map((child, index) =>
                typeof child === 'string' ? child : child.props?.children
              )}
            </h3>
          );
        }
        return (
          <h3 className="sm:text-xl text-xl font-medium text-black  mt-5 mb-4">{children}</h3>
        );
        
      },
      [BLOCKS.HEADING_4]: (node, children) => 
        {
          console.log(children)
          if (Array.isArray(children)) {
            return (
              <h4 className="sm:text-xl text-lg font-medium dark:text-gray-200 text-bold font-spoqa mt-5 mb-4">
                {children.map((child, index) =>
                  typeof child === 'string' ? child : child.props?.children
                )}
              </h4>
            );
          }
          return (
            <h4 className="sm:text-xl text-lg font-bold text-red-700 font-poqa mt-5 mb-4">{children}</h4>
          );
          
        },
        
     
      //[BLOCKS.PARAGRAPH]: (node, children) => ,
      [BLOCKS.PARAGRAPH]: (node,children)=>{
       
            if (Array.isArray(children)) {
              return (
                <Text>
                  {children.map((child, index) =>
                    typeof child === 'string' ? child : child.props?.children
                  )}
                </Text>
              );
            }
            
            return(
              <Text>{children}</Text>
            )
          
        
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        console.log(children)
        
        return(
        
        <ul className="list-disc  pl-6 my-4  ">{children}</ul>
      )},
      [BLOCKS.OL_LIST]: (node, children) =>{ 
        console.log(children);
        return(
        
        <ol className="list-decimal pl-6 my-4  ">{children}</ol>
      )},
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="text-gray-700 dark:text-gray-200  mb-2   ">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 pl-4 italic text-gray-600 bg-gray-50 my-6 text-lg">{children}</blockquote>
      ),
      [BLOCKS.HR]: (node) => <div className="my-8 h-4 " />,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entryId = node.data.target.sys.id;
        const reference = references?.find(ref => ref.contentful_id === entryId);
        const language = reference?.language || "javascript";
        const code = reference?.childrenContentfulCodeSnippetCodeTextNode[0].code || "";

        if(language === "dummy"){
          return(<></>)

        }
        return (
          <div className="bg-gray-100 p-6">
            <pre className={language}>
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(code, Prism.languages[language] || Prism.languages.plaintext, language),
              }}
            ></code>
          </pre>
          </div>
          
        );
      },

    },
  };

  return (
    <article className=" mx-auto max-w-screen-lg">
      {renderRichText(content, options)}
    </article>
  );
};
