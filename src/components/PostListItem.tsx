import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

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
              className="flex flex-col my-6 r" 
            >
              <div className=""> 
                <h2 className="font-anton text-2xl text-brandPrimary mb-2">{post.title}</h2>
                <h3 className="font-robotoCondensed text-lg text-brandHighlight mb-3">{post.tag}</h3>
                
                <p className="font-roboto mb-4 text-gray-600">{post.subtitle}</p>
                <div className="flex justify-between items-center mt-4">
                  {authorImg && post.postAuthor?.name && (
                    <div className="flex items-center">
                      <GatsbyImage
                        image={authorImg}
                        alt={post.postAuthor.name}
                        className="w-12 h-12 rounded-full" // Slightly larger author image
                      />
                      <div className="ml-4">
                        <p className="font-roboto font-bold text-gray-800">{post.postAuthor.name}</p>
                        {post.postAuthor.role && (
                          <p className="font-roboto text-sm text-gray-600">{post.postAuthor.role}</p>
                        )}
                      </div>
                    </div>
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-brandHighlight font-semibold hover:underline transition duration-150 ease-in-out"
                  >
                    <span className="mr-2">Read More</span>
                    <ArrowRightIcon
                      className="h-5 w-5 text-brandHighlight"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
              <hr className="border-t border-gray-200 w-full" />
            </div>
          );
        })}
      </div>
    );
};

export default PostListItem;
