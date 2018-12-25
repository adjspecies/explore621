/**
 * Visualizations for explore621.
 *
 * This includes some basic visualizations such as line charts and the like
 * used on explore621, as well as some more specific visualizations.
 */
window.explore621 = window.explore621 || {};
window.explore621.vis = window.explore621.vis || (() => {
  const module = {};

  // Some basic number formats, kept short for simplicity's sake.
  const _ = d3.format(',');
  const _f = d3.format(',.2f');

  /**
   * Visualizations for stats of the entire dataset.
   *
   * Non-reusable.
   */
  module.setStats = (vis, data, attributes) => {
    // Append a sub-visualization <g> for each logical section of the result.
    const posts = vis.append('g')
      .classed('subvis', true);
    const ingests = vis.append('g')
      .classed('subvis', true)
      .attr('transform', 'translate(400, 0)');
    const reports = vis.append('g')
      .classed('subvis', true)
      .attr('transform', 'translate(400, 200)');

    // Generate the sub-visualizations.
    module.setStats._posts(posts, data.posts);
    module.setStats._ingests(ingests, data.ingests);
    module.setStats._reports(reports, data.reports);
  };

  /**
   * The sub-visualization for post-related data in the dataset vis.
   */
  module.setStats._posts = (vis, data, attributes) => {
    /*** Posts by rating ***/
    // Generate scale.
    const postsCountScale = d3.scaleLinear()
      .domain([
        0,
        d3.max([
          data.post_counts.safe,
          data.post_counts.questionable,
          data.post_counts.explicit])])
      .range([0, 100]);

    // Container.
    const postsCount = vis.append('g');

    // Header.
    postsCount.append('text')
      .classed('header', true)
      .text(`Total posts: ${_(data.post_counts.total)} (${_f(data.total_file_sizes / 1024 / 1024 / 1024 / 1024)}TB)`)
      .attr('x', 10)
      .attr('y', 15);

    /** Bar chart for rating post counts. **/
    postsCount.append('line')
      .attr('x1', 105)
      .attr('x2', 105)
      .attr('y1', 25)
      .attr('y2', 80);

    // Safe.
    postsCount.append('text')
      .text('safe')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 36);
    postsCount.append('rect')
      .attr('x', 105)
      .attr('y', 25)
      .attr('fill', '#8b8')
      .attr('height', 15)
      .attr('width', postsCountScale(data.post_counts.safe))
    postsCount.append('text')
      .text(_(data.post_counts.safe))
      .classed('datum-text', true)
      .attr('x', 110 + postsCountScale(data.post_counts.safe))
      .attr('y', 36);

    // Questionable.
    postsCount.append('text')
      .text('questionable')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 56);
    postsCount.append('rect')
      .attr('x', 105)
      .attr('y', 45)
      .attr('fill', '#bb8')
      .attr('height', 15)
      .attr('width', postsCountScale(data.post_counts.questionable))
    postsCount.append('text')
      .text(_(data.post_counts.questionable))
      .classed('datum-text', true)
      .attr('x', 110 + postsCountScale(data.post_counts.questionable))
      .attr('y', 56);

    // Explicit
    postsCount.append('text')
      .text('explicit')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 76);
    postsCount.append('rect')
      .attr('x', 105)
      .attr('y', 65)
      .attr('fill', '#b88')
      .attr('height', 15)
      .attr('width', postsCountScale(data.post_counts.explicit))
    postsCount.append('text')
      .text(_(data.post_counts.explicit))
      .classed('datum-text', true)
      .attr('x', 110 + postsCountScale(data.post_counts.explicit))
      .attr('y', 76);

    /*** Tags ***/
    // Generate scale.
    const tagsCountScale = d3.scaleLinear()
      .domain([
        0,
        d3.max([
          data.tag_counts.general,
          data.tag_counts.artist,
          data.tag_counts.copyright,
          data.tag_counts.character,
          data.tag_counts.species,
          data.tag_counts.anatomy,
          data.tag_counts.gender,
          data.tag_counts.act,
          data.tag_counts.interest,
          data.tag_counts.objects,
          data.tag_counts.media,
          data.tag_counts.location,
          data.tag_counts.theme,
          data.tag_counts.subject,
          data.tag_counts.image])])
      .range([0, 100]);

    // Container.
    const tagsCount = vis.append('g')
      .attr('transform', 'translate(0, 110)');

    // Header.
    tagsCount.append('text')
      .classed('header', true)
      .text(`Total tags: ${_(data.tag_counts.total)}`)
      .attr('x', 10)
      .attr('y', 15);

    /** Bar chart for tag counts. **/
    tagsCount.append('line')
      .attr('x1', 105)
      .attr('x2', 105)
      .attr('y1', 25)
      .attr('y2', 325);

    // General type.
    tagsCount.append('text')
      .text('general')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 36);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 25)
      .attr('fill', '#b88')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.general))
      .attr('title', _(data.tag_counts.general));
    tagsCount.append('text')
      .text(_(data.tag_counts.general))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.general))
      .attr('y', 36);

    // Artist type.
    tagsCount.append('text')
      .text('artist')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 56);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 45)
      .attr('fill', '#8b8')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.artist))
      .attr('title', _(data.tag_counts.artist));
    tagsCount.append('text')
      .text(_(data.tag_counts.artist))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.artist))
      .attr('y', 56);

    // Copyright type.
    tagsCount.append('text')
      .text('copyright')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 76);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 65)
      .attr('fill', '#88b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.copyright))
      .attr('title', _(data.tag_counts.copyright));
    tagsCount.append('text')
      .text(_(data.tag_counts.copyright))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.copyright))
      .attr('y', 76);
    
    // Character type.
    tagsCount.append('text')
      .text('character')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 96);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 85)
      .attr('fill', '#bb8')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.character))
      .attr('title', _(data.tag_counts.character));
    tagsCount.append('text')
      .text(_(data.tag_counts.character))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.character))
      .attr('y', 96);

    // Species type.
    tagsCount.append('text')
      .text('species')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 116);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 105)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.species))
      .attr('title', _(data.tag_counts.species));
    tagsCount.append('text')
      .text(_(data.tag_counts.species))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.species))
      .attr('y', 116);

    // Anatomy type.
    tagsCount.append('text')
      .text('anatomy')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 136);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 125)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.anatomy))
      .attr('title', _(data.tag_counts.anatomy));
    tagsCount.append('text')
      .text(_(data.tag_counts.anatomy))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.anatomy))
      .attr('y', 136);

    // Gender type.
    tagsCount.append('text')
      .text('gender')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 156);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 145)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.gender))
      .attr('title', _(data.tag_counts.gender));
    tagsCount.append('text')
      .text(_(data.tag_counts.gender))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.gender))
      .attr('y', 156);

    // Act type.
    tagsCount.append('text')
      .text('act')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 176);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 165)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.act))
      .attr('title', _(data.tag_counts.act));
    tagsCount.append('text')
      .text(_(data.tag_counts.act))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.act))
      .attr('y', 176);

    // Interest type.
    tagsCount.append('text')
      .text('interest')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 196);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 185)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.interest))
      .attr('title', _(data.tag_counts.interest));
    tagsCount.append('text')
      .text(_(data.tag_counts.interest))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.interest))
      .attr('y', 196);

    // Objects type
    tagsCount.append('text')
      .text('objects')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 216);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 205)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.objects))
      .attr('title', _(data.tag_counts.objects));
    tagsCount.append('text')
      .text(_(data.tag_counts.objects))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.objects))
      .attr('y', 216);

    // Media type
    tagsCount.append('text')
      .text('media')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 236);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 225)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.media))
      .attr('title', _(data.tag_counts.media));
    tagsCount.append('text')
      .text(_(data.tag_counts.media))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.media))
      .attr('y', 236);

    // Location type
    tagsCount.append('text')
      .text('location')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 256);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 245)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.location))
      .attr('title', _(data.tag_counts.location));
    tagsCount.append('text')
      .text(_(data.tag_counts.location))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.location))
      .attr('y', 256);

    // Theme type.
    tagsCount.append('text')
      .text('theme')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 276);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 265)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.theme))
      .attr('title', _(data.tag_counts.theme));
    tagsCount.append('text')
      .text(_(data.tag_counts.theme))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.theme))
      .attr('y', 276);

    // Subject attributes type.
    tagsCount.append('text')
      .text('subject attrs.')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 296);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 285)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.subject))
      .attr('title', _(data.tag_counts.subject));
    tagsCount.append('text')
      .text(_(data.tag_counts.subject))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.subject))
      .attr('y', 296);

    // Image attributes type.
    tagsCount.append('text')
      .text('image attrs.')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 316);
    tagsCount.append('rect')
      .attr('x', 105)
      .attr('y', 305)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tagsCountScale(data.tag_counts.image))
      .attr('title', _(data.tag_counts.image));
    tagsCount.append('text')
      .text(_(data.tag_counts.image))
      .classed('datum-text', true)
      .attr('x', 110 + tagsCountScale(data.tag_counts.image))
      .attr('y', 316);

    /*** Relations counts ***/
    // Container
    const relations = vis.append('g')
      .attr('transform', 'translate(400, 300)');

    // Header
    relations.append('text')
      .text('Relations')
      .classed('header', true)
      .attr('x', 10)
      .attr('y', 15);

    relations.append('text')
      .text('Total tags on all posts:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 35);
    relations.append('text')
      .text(_(data.post_tags_count))
      .attr('x', 165)
      .attr('y', 35);

    relations.append('text')
      .text('Max tags per post:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 55);
    relations.append('text')
      .text(_(data.max_tags_per_post))
      .attr('x', 165)
      .attr('y', 55);

    relations.append('text')
      .text('Avg tags per post:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 75);
    relations.append('text')
      .text(_f(data.avg_tags_per_post))
      .attr('x', 165)
      .attr('y', 75);

    relations.append('text')
      .text('Post artists:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 95);
    relations.append('text')
      .text(`${_(data.artist_count)} (used ${_(data.post_artists_count)} times)`)
      .attr('x', 165)
      .attr('y', 95);

    relations.append('text')
      .text('Post sources:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 115);
    relations.append('text')
      .text(`${_(data.source_count)} (used ${_(data.post_sources_count)} times)`)
      .attr('x', 165)
      .attr('y', 115);
  };

  /**
   * The sub-visualization for ingest data.
   */
  module.setStats._ingests = (vis, data, attributes) => {
    // Sparkline generator used for each subset of data.
    const sparkline = d3.line()
      .x((d, i) => i * 5 + 155)
      .y(d => d);

    // Build an object from the ingest data subsets where data is scaled
    // rather than absolute.
    const scaled = {};
    ['duration', 'processed', 'new', 'updated',
      'fixed_tags_count', 'deleted_tags_count',
      'sources_deleted', 'artists_deleted'].forEach((d, i) => {

        // Get all the data for the current subset.
        let curr = data.last_10.map(dd => dd[d]).reverse();

        // Generate a scale based on that data.
        let scale = d3.scaleLinear()
          .domain([d3.min(curr), d3.max(curr)])
          .range([15, 0]);

        // Scale all the data in curr.
        curr = curr.map(dd => scale(dd) + (20 * i) + 21);

        // Save it to scaled.
        scaled[d] = curr;
    });
    
    // Header.
    vis.append('text')
      .text(`Total ingests: ${_(data.ingest_count)}`)
      .classed('header', true)
      .attr('x', 10)
      .attr('y', 15);

    // Subsets.
    vis.append('text')
      .text('Ingest duration')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 35);
    vis.append('text')
      .text(`${_f(data.ingest_avg_duration)}s (avg)`)
      .attr('x', 205)
      .attr('y', 35)
    vis.append('path')
      .datum(scaled.duration)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Posts processed')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 55);
    vis.append('text')
      .text(`${_f(data.avg_processed)} (avg)`)
      .attr('x', 205)
      .attr('y', 55)
    vis.append('path')
      .datum(scaled.processed)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('New posts')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 75);
    vis.append('text')
      .text(`${_f(data.avg_new)} (avg)`)
      .attr('x', 205)
      .attr('y', 75)
    vis.append('path')
      .datum(scaled['new'])
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Updated posts')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 95);
    vis.append('text')
      .text(`${_f(data.avg_updated)} (avg)`)
      .attr('x', 205)
      .attr('y', 95)
    vis.append('path')
      .datum(scaled.updated)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Fixed tags')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 115);
    vis.append('text')
      .text(`${_f(data.avg_fixed_tags_count)} (avg)`)
      .attr('x', 205)
      .attr('y', 115)
    vis.append('path')
      .datum(scaled.fixed_tags_count)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Deleted tags')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 135);
    vis.append('text')
      .text(`${_f(data.avg_deleted_tags_count)} (avg)`)
      .attr('x', 205)
      .attr('y', 135)
    vis.append('path')
      .datum(scaled.deleted_tags_count)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Deleted sources')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 155);
    vis.append('text')
      .text(`${_f(data.avg_sources_deleted)} (avg)`)
      .attr('x', 205)
      .attr('y', 155)
    vis.append('path')
      .datum(scaled.sources_deleted)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);

    vis.append('text')
      .text('Deleted artists')
      .attr('text-anchor', 'end')
      .attr('x', 150)
      .attr('y', 175);
    vis.append('text')
      .text(`${_f(data.avg_artists_deleted)} (avg)`)
      .attr('x', 205)
      .attr('y', 175)
    vis.append('path')
      .datum(scaled.artists_deleted)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', sparkline);
  };

  /**
   * The sub-visualization for reports-related data.
   */
  module.setStats._reports = (vis, data, attributes) => {
    // Header.
    vis.append('text')
      .classed('header', true)
      .text(`Total reports: ${_(data.report_count)}`)
      .attr('x', 10)
      .attr('y', 15);

    vis.append('text')
      .text('Runs:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 36);
    vis.append('text')
      .text(_(data.run_count))
      .attr('x', 165)
      .attr('y', 36);

    vis.append('text')
      .text('Average run duration:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 56)
    vis.append('text')
      .text(`${_f(data.run_avg_duration)}s`)
      .attr('x', 165)
      .attr('y', 56);

    vis.append('text')
      .text('Datum models:')
      .attr('text-anchor', 'end')
      .attr('x', 160)
      .attr('y', 76);
    vis.append('text')
      .text(_(data.datum_count))
      .attr('x', 165)
      .attr('y', 76);
  };


  /**
   * Visualization for popularity (score/fav count) relative to the mean over
   * time, including standard deviation and (not used) variance.
   *
   * Non-reusable.
   */
  module.relativePopularity = (vis, data, attributes, dateFn) => {
    // Get data subsets.
    const score = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'score')[0].value};
    });
    const favCount = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'fav_count')[0].value};
    });
    const scoreSd = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_score_sd')[0].value};
    });
    const favCountSd = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_fav_count_sd')[0].value};
    });
    let sdVisible = false;
    const scoreVar = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_score_var')[0].value};
    });
    const favCountVar = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_fav_count_var')[0].value};
    });

    // Visualization size.
    const width = 800;
    const height = 600;

    // Generate scales.
    const yScale = d3.scaleLinear()
      .domain([
        d3.max(([].concat(score, favCount, scoreSd, favCountSd)).map(d => d.value)),
        d3.min(([].concat(score, favCount, scoreSd, favCountSd)).map(d => d.value)
          .concat([].concat(scoreSd, favCountSd).map(d => -d.value)))])
      .range([50, height - 50]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].key)), Date.parse(dateFn(data[data.length - 1].key))])
      .range([60, width]);

    // Generate axes.
    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(60, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(50, ${height - 50})`)
      .call(xAxis);

    // Line generator for score/fav count.
    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y(d => yScale(d.value));

    // Area generator for standard deviation.
    const sdArea = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y0(d => yScale(d.value))
      .y1(d => yScale(-d.value))

    // Draw line for score and area for score standard deviation.
    vis.append('path')
      .datum(score)
      .style('fill', 'none')
      .style('stroke', '#1f77b4')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('path')
      .datum(scoreSd)
      .style('display', () => sdVisible ? 'block' : 'none')
      .attr('class', 'std-dev')
      .attr('d', d => sdArea(d))
      .attr('fill', '#1f77b4')
      .attr('opacity', 0.5);

    // Draw line for fav count and area for fav count standard deviation.
    vis.append('path')
      .datum(favCount)
      .style('fill', 'none')
      .style('stroke', '#ff7f0e')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('path')
      .datum(favCountSd)
      .style('display', () => sdVisible ? 'block' : 'none')
      .attr('class', 'std-dev')
      .attr('d', d => sdArea(d))
      .attr('fill', '#ff7f0e')
      .attr('opacity', 0.5);

    // Draw a line at the mean for total popularity.
    vis.append('line')
      .attr('x1', 60)
      .attr('x2', width)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0));

    // Button for turning standard deviation areas on and off.
    const button = vis.append('g')
      .classed('sd-button', true)
      .classed('button-off', true);
    button.append('rect')
      .attr('x', width / 2 - 97)
      .attr('y', height - 22)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', 194)
      .attr('height', 22);
    button.append('text')
      .text('show standard deviation')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .on('click', () => {
        // Toggle standard deviation visibility.
        sdVisible = !sdVisible;
        if (sdVisible) {
          vis.selectAll('.std-dev')
            .style('display', 'block');
          button.classed('button-on', true)
            .classed('button-off', false)
            .select('text')
            .text('Hide standard deviation');
        } else {
          vis.selectAll('.std-dev')
            .style('display', 'none');
          button.classed('button-on', false)
            .classed('button-off', true)
            .select('text')
            .text('Show standard deviation');
        }
      });

    /*** Create a floating legend that follows the mouse over time. ***/
    // Container for legend and overlay.
    const floatingLegend = vis.append('g')
      .classed('floating-legend', true)
      .classed('visible', false);

    // Container for holding the legend itself.
    const legend = floatingLegend.append('g')
      .classed('legend', true);

    // Line to show x value.
    const legendLine = legend.append('line')
      .attr('y1', 0)
      .attr('y2', height - 50)
      .attr('x1', 0)
      .attr('x2', 0);

    // Text for current date.
    const date = legend.append('text')
      .attr('x', 3)
      .attr('y', 15);

    // Legend item for the score data.
    const legendScore = legend.append('g')
      .classed('legend-item', true);
    const legendScoreRect = legendScore.append('rect')
      .attr('x', 0)
      .attr('y', -15)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('height', 22);
    const legendScoreText = legendScore.append('text')
      .text('score')
      .attr('x', 5)
      .attr('y', 0)
      .style('fill', '#1f77b4');

    // Legend item for the fav count data.
    const legendFavCount = legend.append('g')
      .classed('legend-item', true);
    const legendFavCountRect = legendFavCount.append('rect')
      .attr('x', 0)
      .attr('y', -15)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('height', 22);
    const legendFavCountText = legendFavCount.append('text')
      .text("fav count")
      .attr('x', 5)
      .attr('y', 0)
      .style('stroke', '#ff7f0e');

    // Overlay container, which contains transparent rectangles for each date
    // stretching the entire height of the visualization, which manage mouse
    // events.
    floatingLegend.append('g')
      .classed('overlay', true)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', 0)
      .attr('x', d => xScale(Date.parse(dateFn(d.key))))
      .attr('width', (width - 60) / data.length)
      .attr('height', height - 50)
      .on('mouseenter', function(d) {
        // This handles the case of the visualization loading with the mouse
        // already over the overlay.
        floatingLegend.classed('visible', true);
        legendTick.call(this, d);
      })
      .on('mouseleave', () => floatingLegend.classed('visible', false))
      .on('mousemove', legendTick);
        
      /**
       * Handle moving the legend.
       */
      function legendTick(d) {
        // Get current information
        const el = d3.select(this);
        const currX = parseInt(el.attr('x'));
        const currScore = d.value.filter(dd => dd.key == 'score')[0].value;
        const currFavCount = d.value.filter(dd => dd.key == 'fav_count')[0].value;

        // Translate the legend <g> to the current x coordinate - y is always 0.
        legend.attr('transform', `translate(${currX}, 0)`);
        
        if (sdVisible) {
          // If we're currently showing the standard deviation, set the text of
          // the legend to the current score/fav count, plus the std dev away
          // from the mean.
          const currScoreSd = d.value.filter(dd => dd.key == 'total_score_sd')[0].value;
          const currFavCountSd = d.value.filter(dd => dd.key == 'total_fav_count_sd')[0].value;
          legendScoreText.text(
            `rel. score: ${_f(currScore)} (${_f(Math.abs(currScore / currScoreSd))})`);
          legendFavCountText.text(
            `rel. fav count: ${_f(currFavCount)} (${_f(Math.abs(currFavCount / currFavCountSd))})`);
        } else {
          // Otherwise, just set it to the current score/fav count.
          legendScoreText.text(`rel. score: ${_f(currScore)}`);
          legendFavCountText.text(`rel. fav count: ${_f(currFavCount)}`);
        }
        
        // Get the width of the <text> for the legend and set the width
        // of the backing <rect> acordingly. Also, set the x offset: if the
        // legend item will go off the edge of the <svg>, shift it to the other
        // side of the guide line.
        const currScoreWidth = legendScoreText.node().getBBox().width;
        const currScoreX_offset = currScoreWidth + currX + 60 > width ?
          -currScoreWidth - 14 : 4;
        legendScoreRect.attr('width', currScoreWidth + 10);
        const currFavCountWidth = legendFavCountText.node().getBBox().width;
        const currFavCountX_offset = currFavCountWidth + currX + 60 > width ?
          -currFavCountWidth - 14 : 4;
        legendFavCountRect.attr('width', currFavCountWidth + 10);
        
        // Set the Y offset so that the legend items never cross each other,
        // mostly by setting it so that whichever number is greatest, the
        // item is above the line, and whichever is lowest, the item is
        // below the line.
        let currScoreY_offset = yScale(currScore) + 17;
        let currFavCountY_offset = yScale(currFavCount) - 8;
        if (currScore >= currFavCount) {
          currScoreY_offset = yScale(currScore) - 8;
          currFavCountY_offset = yScale(currFavCount) + 17;
        }

        // Translate the legend items.
        legendScore.attr(
          'transform',
          `translate(${currScoreX_offset}, ${currScoreY_offset})`);
        legendFavCount.attr(
          'transform', 
          `translate(${currFavCountX_offset}, ${currFavCountY_offset})`);
        
        // Translate the date item.
        date.text(d.key);
        const currDateWidth = date.node().getBBox().width;
        if (currDateWidth + currX + 60 > width) {
          date.attr('x', -currDateWidth - 3);
        } else {
          date.attr('x', 3);
        }
      };
  };

  /**
   * Visualization for popularity (score/fav count) over time.
   *
   * Non-reusable.
   */
  module.popularity = (vis, data, attributes, dateFn) => {
    // Visualization size.
    const width = 800;
    const height = 600;

    // Get just the score/fav count data
    const score = data.map(d => {
      return {key: d.key, value: d.value[0].value};
    });
    const favCount = data.map(d => {
      return {key: d.key, value: d.value[1].value};
    });

    // Generate scales.
    const yScale = d3.scaleLinear()
      .domain([
        d3.max((score.concat(favCount)).map(d => d.value)),
        0
      ])
      .range([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([
        Date.parse(dateFn(data[0].key)),
        Date.parse(dateFn(data[data.length - 1].key))
      ])
      .range([60, width - 100]);

    // Generate axes.
    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(60, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - 20})`)
      .call(xAxis);

    // Line generator.
    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y(d => yScale(d.value));

    // Score line.
    vis.append('path')
      .datum(score)
      .style('fill', 'none')
      .style('stroke', '#1f77b4')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('text')
      .text('score')
      .attr('dominant-baseline', 'middle')
      .attr('x', width - 95)
      .attr('y', yScale(score[score.length - 1].value))
      .style('fill', '#1f77b4');

    // Fav count line.
    vis.append('path')
      .datum(favCount)
      .style('fill', 'none')
      .style('stroke', '#ff7f0e')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('text')
      .text('fav count')
      .attr('dominant-baseline', 'middle')
      .attr('x', width - 95)
      .attr('y', yScale(favCount[favCount.length - 1].value))
      .style('fill', '#ff7f0e');
  };

  /**
   * Visualization for one or more tags over time.
   *
   * May be reusable.
   */
  module.tagsOverTime = (vis, data, attributes, dateFn) => {
    // Visualization size.
    const width = 800;
    const height = 600;

    // Generate scales.
    const yScale = d3.scaleLinear()
      .domain([
        d3.max(data.map(d => d.value.map(dd => dd.value)).reduce((m, d) => m.concat(d))),
        0
      ])
      .range([20, height - 20]);
    const xScale = d3.scaleTime()
      .domain([
        Date.parse(dateFn(data[0].value[0].key)),
        Date.parse(dateFn(data[0].value[data[0].value.length - 1].key))
      ])
      .range([100, width - 100]);
    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(data.map(d => d.key))

    // Generate axes.
    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(100, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - 20})`)
      .call(xAxis);

    // Draw a line for each tag provided and the label at the end.
    data.forEach(datum => {
      const line = d3.line()
        .curve(d3.curveMonotoneX)
        .x(d => xScale(Date.parse(dateFn(d.key))))
        .y(d => yScale(d.value));
      vis.append('path')
        .datum(datum.value)
        .style('fill', 'none')
        .style('stroke', color(datum.key))
        .attr('title', datum.key)
        .attr('class', 'data')
        .attr('d', line);
      vis.append('text')
        .text(datum.key)
        .style('fill', color(datum.key))
        .attr('dominant-baseline', 'middle')
        .attr('x', width - 95)
        .attr('y', yScale(datum.value[datum.value.length - 1].value));
    });
  };

  /**
   * Visualization for stacked data (e.g. tags over time)
   *
   * Reusable.
   */
  module.stackedTags = (vis, data, attributes) => {
    // Visualization size.
    const width = 800;
    const height = 600;

    // Retrieve the dates and tags from the data.
    const dates = data.map(d => Date.parse(d.key));
    const tags = data
        .map(d => Object.keys(d))
        .reduce((m, d) => m.concat(d), [])
        .filter(d => d !== 'key')
        .filter((d, i, self) => self.indexOf(d) === i);

    // Flesh out data by:
    // - setting a tag to zero if it's not in the object.
    // - setting values to percentages.
    let emptyTagDays = 0;
    data.forEach((d, i) => {
      let sum = 0
      tags.forEach((k) => {
        data[i][k] = data[i][k] || 0;
        if (data[i][k] == 0) {
          emptyTagDays++;
        }
        sum += data[i][k];
      });
      tags.forEach((k) => data[i][k] = (data[i][k] / sum) * 100);
    });

    // Set curve based on the tag turnover. That is, if there are fewer
    // than 25% of tags shared from day to day, use a step chart instead
    // of a monotone curve.
    let curve = d3.curveMonotoneX;
    if (tags.length / emptyTagDays < 0.25) {
      curve = d3.curveStepBefore;
      
      // Add empty date because otherwise, curveStepBefore will chop off
      // the first date.
      dates.splice(0, 0, dates[0] - (dates[1] - dates[0]));
      const empty = {key: dates[0]};
      tags.forEach(d => empty[d] = 0);
      data.splice(0, 0, empty);
    }

    // Generate stacked data.
    const stackedData = d3.stack()
      .keys(tags)(data)

    // Generate scales.
    const yScale = d3.scaleLinear()
      .domain([100, 0]).nice()
      .rangeRound([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([40, width]);
    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(tags);

    // Generate axes.
    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(40, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - 20})`)
      .call(xAxis);
    
    // Create area factory for building the stacked chart.
    const area = d3.area()
      .curve(curve)
      .x((d, i) => xScale(dates[i]))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]));

    // Generate the SVG data for the stacked chart.
    const slice = vis.append('g')
      .attr('class', 'data')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .on('mouseover', function() {
        d3.select(this).select('text').style('display', 'block');
      })
      .on('mouseout', function() {
        d3.select(this).select('text').style('display', 'none');
      })
      .on('mousemove', function() {
        // Make the label follow the mouse.
        const mouse = d3.mouse(this)
        d3.select(this)
          .select('text')
          .attr('x', mouse[0] + 10)
          .attr('y', mouse[1]);
      });
    slice.append('path')
      .attr('d', d => area(d))
      .style('cursor', 'crosshair')
      .attr('fill', d => color(d.key))
      .attr('title', (d, i) => stackedData[i].key);
    slice.append('text')
      .text(d => d.key)
      .attr('dominant-baseline', 'middle')
      .attr('stroke-width', '0')
      .style('display', 'none');
  };

  /**
   * Visualization for data requiring a single line.
   *
   * Reusable.
   */
  module.simpleLine = (vis, data, attributes, dateFn) => {
    // Visualization size.
    const width = 800;
    const height = 600;

    // Generate scales.
    const yScale = d3.scaleLinear()
      .domain([d3.max(data.map(d => d.value)), d3.min(data.map(d => d.value))])
      .range([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].key)), Date.parse(dateFn(data[data.length - 1].key))])
      .range([80, width]);

    // Generate axes.
    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(80, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - 20})`)
      .call(xAxis);

    // Draw the line.
    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y(d => yScale(d.value));
    vis.append('path')
      .datum(data)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', line);
  };

  return module;
})();
