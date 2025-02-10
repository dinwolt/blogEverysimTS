import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { Link as ILink } from 'gatsby-plugin-intl';
import { useIntl } from 'gatsby-plugin-intl';

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

const HomeListItem: React.FC<Props> = ({ posts }) => {
    return (
        <div className="flex flex-wrap gap-4">
  {posts.map((post, index) => {
    const authorImg = post.postAuthor?.image ? getImage(post.postAuthor.image) : null;
    const postImg = post.image ? getImage(post.image) : null;
    return (
      <ILink
        to={`/blog/${post.slug}`}
        className="flex bg-skyblue dark:bg-[#1b272d] rounded-md sm:gap-8 gap-4 items-center sm:p-6 p-2 hover:scale-105 transition-transform duration-200 md:min-w-[200px] lg:min-w-[260px] xl:min-w-[330px] flex-1"
        key={index}
      >
        
        <div className="flex flex-col w-full p-1 md:min-w-[170px] lg:min-w-[230px] xl:min-w-[300px]">
          <div className="flex justify-between sm:text-base items-center ">
            <h3 className="text-brandHighlight text-xs sm:text-base">{post.tag}</h3>
            <h3 className="text-gray-400 text-xs sm:text-base hidden lg:block">{formatDate(post.updatedAt, useIntl().locale)}</h3>
          </div>
          <h2 className="font-bold text-brandPrimary mb-2 dark:text-gray-300">{post.title}</h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{post.subtitle}</p>
          <div className="flex justify-between mt-5 items-center">
            
            <div className="flex items-center text-brandHighlight text-xs sm:text-base font-semibold hover:underline transition duration-150 ease-in-out">
              <span className="mr-2">
                <FormattedMessage id="index_readmore"/>
              </span>
              <ArrowRightIcon className="sm:h-5 sm:w-5 h-3 w-3 text-brandHighlight" aria-hidden="true" />
            </div>
          </div>
        </div>
      </ILink>
    );
  })}
</div>
    );
};

export default HomeListItem;
