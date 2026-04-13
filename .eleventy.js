module.exports = function(eleventyConfig) {
  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("admin");

  // Readable date filter — outputs "Apr 2026"
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  });

  // Limit filter — returns first N items from array
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Posts collection — sorted newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Gallery collection
  eleventyConfig.addCollection("gallery", function(collectionApi) {
    return collectionApi.getFilteredByGlob("gallery/*.md");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};