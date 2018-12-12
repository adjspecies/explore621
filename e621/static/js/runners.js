window.explore621 = window.explore621 || {};
window.explore621.runners = window.explore621.runners || (function() {
  const module = {};

  module.RelativeTagPopularityOverDay = function(data) {
    const id = "RelativeTagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');
    
    window.explore621.vis.relative_popularity(vis, data, d => d);
  };


  module.RelativeTagPopularityOverMonth = function(data) {
    const id = "RelativeTagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, d => `${d}-01`)
  };


  module.RelativeTagPopularityOverYear = function(data) {
    const id = "RelativeTagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, d => `${d}-01-01`)
  };


  module.TagPopularityOverDay = function(data) {
    const id = "TagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => d);
  };


  module.TagPopularityOverMonth = function(data) {
    const id = "TagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => `${d}-01`);
  };


  module.TagPopularityOverYear = function(data) {
    const id = "TagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => `${d}-01-01`);
  };


  module.TagsOverDay = function(data) {
    const id = "TagsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, d => d);
  };


  module.TagsOverMonth = function(data) {
    const id = "TagsOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, d => `${d}-01`);
  };


  module.TagsOverYear = function(data) {
    const id = "TagsOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, d => `${d}-01-01`);
  };


  module.TopXTagsPastYDays = function(data) {
    const id = "TopXTagsPastYDays";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data);
  };


  module.TopXTagsPastYDaysByType = function(data) {
    const id = "TopXTagsPastYDaysByType";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data);
  };


  module.TotalPopularityOverDay = function(data) {
    const id = "TotalPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => d);
  };


  module.TotalPopularityOverMonth = function(data) {
    const id = "TotalPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => `${d}-01`);
  };


  module.TotalPopularityOverYear = function(data) {
    const id = "TotalPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, d => `${d}-01-01`);
  };


  module.TotalPostsOverDay = function(data) {
    const id = "TotalPostsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, d => d);
  };


  module.UploadsOverDay = function(data) {
    const id = "UploadsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, d => d);
  };


  module.UploadsOverHourPastWeek = function(data) {
    const id = "UploadsOverHourPastWeek";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, d => `${d}:00`);
  };


  module.SetStats = function(data) {
    const id = "SetStats";

    const vis = d3.select(`.${id}`)
      .append('g')

    window.explore621.vis.set_stats(vis, data);
  };

  return module;
})();
