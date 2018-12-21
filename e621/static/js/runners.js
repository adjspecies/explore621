window.explore621 = window.explore621 || {};
window.explore621.runners = window.explore621.runners || (function() {
  const module = {};

  module.RelativeTagPopularityOverDay = (data, attributes) => {
    const id = "RelativeTagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');
    
    window.explore621.vis.relative_popularity(vis, data, attributes, d => d);
  };


  module.RelativeTagPopularityOverMonth = (data, attributes) => {
    const id = "RelativeTagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, attributes, d => `${d}-01`)
  };


  module.RelativeTagPopularityOverYear = (data, attributes) => {
    const id = "RelativeTagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relative_popularity(vis, data, attributes, d => `${d}-01-01`)
  };


  module.TagPopularityOverDay = (data, attributes) => {
    const id = "TagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => d);
  };


  module.TagPopularityOverMonth = (data, attributes) => {
    const id = "TagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01`);
  };


  module.TagPopularityOverYear = (data, attributes) => {
    const id = "TagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TagsOverDay = (data, attributes) => {
    const id = "TagsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => d);
  };


  module.TagsOverMonth = (data, attributes) => {
    const id = "TagsOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => `${d}-01`);
  };


  module.TagsOverYear = (data, attributes) => {
    const id = "TagsOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tags_over_time(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TopXTagsPastYDays = (data, attributes) => {
    const id = "TopXTagsPastYDays";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data, attributes);
  };


  module.TopXTagsPastYDaysByType = (data, attributes) => {
    const id = "TopXTagsPastYDaysByType";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stacked_tags(vis, data, attributes);
  };


  module.TotalPopularityOverDay = (data, attributes) => {
    const id = "TotalPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => d);
  };


  module.TotalPopularityOverMonth = (data, attributes) => {
    const id = "TotalPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01`);
  };


  module.TotalPopularityOverYear = (data, attributes) => {
    const id = "TotalPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, d => `${d}-01-01`);
  };


  module.TotalPostsOverDay = (data, attributes) => {
    const id = "TotalPostsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => d);
  };


  module.UploadsOverDay = (data, attributes) => {
    const id = "UploadsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => d);
  };


  module.UploadsOverHourPastWeek = (data, attributes) => {
    const id = "UploadsOverHourPastWeek";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simple_line(vis, data, attributes, d => `${d}:00`);
  };


  module.SetStats = (data, attributes) => {
    const id = "SetStats";

    const vis = d3.select(`.${id}`)
      .append('g')

    window.explore621.vis.set_stats(vis, data, attributes);
  };

  return module;
})();
