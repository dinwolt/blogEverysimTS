const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language || 'en-US',  // Fallback to 'en' if locale is not found
    },
  });
};

const blogPost = path.resolve("./src/templates/blog-post-contentful.js");
const blogIndex = path.resolve("./src/templates/blog-page.js");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Remove the use of `useIntl` as it cannot be used here
  const locales = ['en-US', 'ko-KR']; // Assuming you have a list of locales to handle

  for (const locale of locales) {
    const result = await graphql(`
      query ContentfulPosts($locale: String) {
        allContentfulPost(filter: { node_locale: { eq: $locale } }) {
          totalCount
          edges {
            node {
              content {
                raw
              }
              title
              subtitle
              slug
              image {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 800
                  placeholder: BLURRED
                  quality: 90
                )
              }
              tag
              postAuthor {
                name
                image {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 150
                    placeholder: BLURRED
                    quality: 90
                  )
                }
                description
                role
              }
            }
          }
        }
      }
    `, {
      locale
    });

    if (result.errors) {
      reporter.panicOnBuild("There was an error loading your blog posts", result.errors);
      return;
    }

    const posts = result.data.allContentfulPost.edges;
    const postsPerPage = 6;
    const totalPosts = result.data.allContentfulPost.totalCount;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const previous = index === 0 ? null : posts[index - 1].node;
        const next = index === posts.length - 1 ? null : posts[index + 1].node;
        console.log(`CURREN LOCALE IS    ${locale}`)
        createPage({
          path: `/blog/${post.node.slug}`,
          component: blogPost,
          context: {
            slug: post.node.slug,
            authorName: post.node.postAuthor.name,
            previous,
            next,
            locale,
          },
        });
      });
    }

    Array.from({ length: totalPages }).forEach((_, i) => {
      const pagePath = i === 0 ? `/blog/1` : `/blog/${i + 1}`;
      createPage({
        path: pagePath,
        component: blogIndex,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages,
          currentPage: i + 1,
          locale,
        },
      });
    });
  }
};