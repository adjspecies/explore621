/**
 * Visualization runners.
 *
 * These methods simply map a runner the appropriate visualization. Not much
 * work happens here, but it's worth noting that some visualizations require
 * Date formating/parsing functions.
 */
window.explore621 = window.explore621 || {};
window.explore621.runners = window.explore621.runners || (function() {
  const module = {};

  const dateFns = {
    identity: d => d,
    addDay: d => `${d}-01`,
    addMonthDay: d => `${d}-01-01`,
    addMinute: d => `${d}:00`
  };


  module.RelativeTagPopularityOverDay = (data, attributes) => {
    const id = "RelativeTagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');
    
    window.explore621.vis.relativePopularity(vis, data, attributes, dateFns.identity);
  };


  module.RelativeTagPopularityOverMonth = (data, attributes) => {
    const id = "RelativeTagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relativePopularity(vis, data, attributes, dateFns.addDay);
  };


  module.RelativeTagPopularityOverYear = (data, attributes) => {
    const id = "RelativeTagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.relativePopularity(vis, data, attributes, dateFns.addMonthDay)
  };


  module.TagPopularityOverDay = (data, attributes) => {
    const id = "TagPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.identity);
  };


  module.TagPopularityOverMonth = (data, attributes) => {
    const id = "TagPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.addDay);
  };


  module.TagPopularityOverYear = (data, attributes) => {
    const id = "TagPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.addMonthDay);
  };


  module.TagsOverDay = (data, attributes) => {
    const id = "TagsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tagsOverTime(vis, data, attributes, dateFns.identity);
  };


  module.TagsOverMonth = (data, attributes) => {
    const id = "TagsOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tagsOverTime(vis, data, attributes, dateFns.addDay);
  };


  module.TagsOverYear = (data, attributes) => {
    const id = "TagsOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.tagsOverTime(vis, data, attributes, dateFns.addMonthDay);
  };


  module.TopXTagsPastYDays = (data, attributes) => {
    const id = "TopXTagsPastYDays";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stackedTags(vis, data, attributes);
  };


  module.TopXTagsPastYDaysByType = (data, attributes) => {
    const id = "TopXTagsPastYDaysByType";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.stackedTags(vis, data, attributes);
  };


  module.TotalPopularityOverDay = (data, attributes) => {
    const id = "TotalPopularityOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.identity);
  };


  module.TotalPopularityOverMonth = (data, attributes) => {
    const id = "TotalPopularityOverMonth";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.addDay);
  };


  module.TotalPopularityOverYear = (data, attributes) => {
    const id = "TotalPopularityOverYear";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.popularity(vis, data, attributes, dateFns.addMonthDay);
  };


  module.TotalPostsOverDay = (data, attributes) => {
    const id = "TotalPostsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simpleLine(vis, data, attributes, dateFns.identity);
  };


  module.UploadsOverDay = (data, attributes) => {
    const id = "UploadsOverDay";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simpleLine(vis, data, attributes, dateFns.identity);
  };


  module.UploadsOverHourPastWeek = (data, attributes) => {
    const id = "UploadsOverHourPastWeek";

    const vis = d3.select(`.${id}`)
      .append('g');

    window.explore621.vis.simpleLine(vis, data, attributes, dateFns.addMinute);
  };


  module.SetStats = (data, attributes) => {
    const id = "SetStats";

    const vis = d3.select(`.${id}`)
      .append('g')

    window.explore621.vis.setStats(vis, data, attributes);
  };

  return module;
})();
