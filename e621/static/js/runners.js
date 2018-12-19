window.explore621 = window.explore621 || {};
window.explore621.runners = window.explore621.runners || (function() {
  const module = {};

  module.RelativeTagPopularityOverDay = function(data, attributes) {
    const id = "RelativeTagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');
    
    window.explore621.vis.relative_popularity(vis, data, attributes, d => d);
  };


  module.RelativeTagPopularityOverMonth = function(data, attributes) {
    const id = "RelativeTagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, attributes, d => `${d}-01`)
  };


  module.RelativeTagPopularityOverYear = function(data, attributes) {
    const id = "RelativeTagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, attributes, d => `${d}-01-01`)
  };


  module.TagPopularityOverDay = function(data, attributes) {
    const id = "TagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => d);
  };


  module.TagPopularityOverMonth = function(data, attributes) {
    const id = "TagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01`);
  };


  module.TagPopularityOverYear = function(data, attributes) {
    const id = "TagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TagsOverDay = function(data, attributes) {
    const id = "TagsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => d);
  };


  module.TagsOverMonth = function(data, attributes) {
    const id = "TagsOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => `${d}-01`);
  };


  module.TagsOverYear = function(data, attributes) {
    const id = "TagsOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TopXTagsPastYDays = function(data, attributes) {
    const id = "TopXTagsPastYDays";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data, attributes);
  };


  module.TopXTagsPastYDaysByType = function(data, attributes) {
    const id = "TopXTagsPastYDaysByType";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data, attributes);
  };


  module.TotalPopularityOverDay = function(data, attributes) {
    const id = "TotalPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => d);
  };


  module.TotalPopularityOverMonth = function(data, attributes) {
    const id = "TotalPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01`);
  };


  module.TotalPopularityOverYear = function(data, attributes) {
    const id = "TotalPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TotalPostsOverDay = function(data, attributes) {
    const id = "TotalPostsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => d);
  };


  module.UploadsOverDay = function(data, attributes) {
    const id = "UploadsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => d);
  };


  module.UploadsOverHourPastWeek = function(data, attributes) {
    const id = "UploadsOverHourPastWeek";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => `${d}:00`);
  };


  module.SetStats = function(data, attributes) {
    const id = "SetStats";

    const vis = d3.select(`.${id}`)
      .append('g')

    window.explore621.vis.set_stats(vis, data, attributes);
  };

  return module;
})();
