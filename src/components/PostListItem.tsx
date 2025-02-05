import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { Link as ILink } from 'gatsby-plugin-intl';

type PostData = {
  title?: string;
  subtitle?: string;
  slug: string;
  image: IGatsbyImageData;
  tag: string;
  postAuthor?: {
    name: string;
    image?: IGatsbyImageData;
    description?: string;
    role?: string;
  };
};

interface Props {
  posts: Array<PostData>;
}

const PostListItem: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => {
        const authorImg = post.postAuthor?.image ? getImage(post.postAuthor.image) : null;

        return (
            <div
              key={index}
              className="flex flex-col text-justify sm:text-left" 
            >
              <div className=""> 
                <h2 className="section-post-title font-bold text-brandPrimary ">{post.title}</h2>
                <h3 className=" sm:text-base text-xs text-brandHighlight ">{post.tag}</h3>
                
                <p className="section-post-subtitle sm:text-base ">{post.subtitle}</p>
                <div className="flex justify-between items-center mt-2">
                  {authorImg && post.postAuthor?.name && (
                    <div className="flex items-center">
                      <GatsbyImage
                        image={authorImg}
                        alt={post.postAuthor.name}
                        className="w-10 h-10  rounded-full" 
                      />
                      <div className="ml-4">
                        <p className=" section-post-subtitle font-bold text-black">{post.postAuthor.name}</p>
                        {post.postAuthor.role && (
                          <p className="section-post-subtitle font-roboto text-xs sm:text-sm text-gray-600">{post.postAuthor.role}</p>
                        )}
                      </div>
                    </div>
                  )}
                  <ILink
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-brandHighlight text-xs sm:text-base font-semibold hover:underline transition duration-150 ease-in-out"
                  >
                    <span className="mr-2">
                      <FormattedMessage id="index_readmore"/>
                    </span>
                    <ArrowRightIcon
                      className="sm:h-5 sm:w-5 h-3 w-3 text-brandHighlight"
                      aria-hidden="true"
                    />
                  </ILink>
                </div>
              </div>
              <hr className="border-t border-gray-200 w-full my-3" />
            </div>
          );
        })}
      </div>
    );
};

export default PostListItem;
