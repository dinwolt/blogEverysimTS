import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
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
    updatedAt:string;
};

interface Props {
    posts: Array<PostData>;
}
const formatDate = (dateString: string, locale: string = "en-US") => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

const BlogListItem: React.FC<Props> = ({ posts }) => {
    return (
        <div>
            {posts.map((post, index) => {
                const authorImg = post.postAuthor?.image ? getImage(post.postAuthor.image) : null;
                const postImg = post.image ? getImage(post.image) : null;
                return (
                    <ILink to={`/blog/${post.slug}` }className="">
                    <div className="hover:scale-105 transition-all flex flex-col sm:flex-row sm:gap-8 gap-4 items-center sm:p-6 p-2 " key={index}>
                        <div className=''>
                            {postImg && <GatsbyImage image={postImg} alt="post" className='w-full  h-18 sm:w-56 sm:h-36 rounded-xl' />}
                        </div>
                        <div className="flex-col w-full">
                            <div className="flex-col">
                                <h2 className="section-post-title font-bold text-brandPrimary ">{post.title}</h2>
                                <div className='flex justify-between items-center'>
                                    <h3 className="section-post-title sm:text-base text-sm text-brandHighlight ">{post.tag}</h3>
                                    <h3>{formatDate(post.updatedAt, useIntl().locale)}</h3>
                                </div>

                                <p className="section-post-subtitle sm:text-base ">{post.subtitle}</p>
                            </div>
                            <div className="flex justify-between mt-5 items-center">
                               
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
                                            <FormattedMessage id="index_readmore" />
                                        </span>
                                        <ArrowRightIcon
                                            className="sm:h-5 sm:w-5 h-3 w-3 text-brandHighlight"
                                            aria-hidden="true"
                                        />
                                    </ILink>
                                
                            </div>
                        </div>


                    </div>
                    </ILink>

                );
            })}
        </div>
    );
};

export default BlogListItem;
