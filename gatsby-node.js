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

const blogPost = path.resolve("./src/templates/blog-post-contentful.js");
const blogIndex = path.resolve("./src/templates/blog-page.js");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulPost {
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
  `);

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

      createPage({
        path: `/blog/${post.node.slug}`,
        component: blogPost,
        context: {
          slug: post.node.slug,
          authorName:post.node.postAuthor.name,
          previous,
          next,
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
      },
    });
  });
};
