window.explore621 = window.explore621 || {};
window.explore621.vis = window.explore621.vis || (function() {
  const module = {};

  const _ = d3.format(',');
  const _f = d3.format(',.2f');


  module.set_stats = (vis, data, attributes) => {
    const posts = vis.append('g')
      .classed('subvis', true);
    const ingests = vis.append('g')
      .classed('subvis', true)
      .attr('transform', 'translate(400, 0)');
    const reports = vis.append('g')
      .classed('subvis', true)
      .attr('transform', 'translate(400, 200)');
    module.set_stats._posts(posts, data.posts);
    module.set_stats._ingests(ingests, data.ingests);
    module.set_stats._reports(reports, data.reports);
  };

  module.set_stats._posts = (vis, data, attributes) => {
    const posts_count_scale = d3.scaleLinear()
      .domain([
        0,
        d3.max([
          data.post_counts.safe,
          data.post_counts.questionable,
          data.post_counts.explicit])])
      .range([0, 100]);
    const posts_count = vis.append('g');
    posts_count.append('text')
      .classed('header', true)
      .text(`Total posts: ${_(data.post_counts.total)} (${_f(data.total_file_sizes / 1024 / 1024 / 1024 / 1024)}TB)`)
      .attr('x', 10)
      .attr('y', 15);
    posts_count.append('text')
      .text('safe')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 36);
    posts_count.append('rect')
      .attr('x', 105)
      .attr('y', 25)
      .attr('fill', '#8b8')
      .attr('height', 15)
      .attr('width', posts_count_scale(data.post_counts.safe))
    posts_count.append('text')
      .text(_(data.post_counts.safe))
      .classed('datum-text', true)
      .attr('x', 110 + posts_count_scale(data.post_counts.safe))
      .attr('y', 36);
    posts_count.append('text')
      .text('questionable')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 56);
    posts_count.append('rect')
      .attr('x', 105)
      .attr('y', 45)
      .attr('fill', '#bb8')
      .attr('height', 15)
      .attr('width', posts_count_scale(data.post_counts.questionable))
    posts_count.append('text')
      .text(_(data.post_counts.questionable))
      .classed('datum-text', true)
      .attr('x', 110 + posts_count_scale(data.post_counts.questionable))
      .attr('y', 56);
    posts_count.append('text')
      .text('explicit')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 76);
    posts_count.append('rect')
      .attr('x', 105)
      .attr('y', 65)
      .attr('fill', '#b88')
      .attr('height', 15)
      .attr('width', posts_count_scale(data.post_counts.explicit))
    posts_count.append('text')
      .text(_(data.post_counts.explicit))
      .classed('datum-text', true)
      .attr('x', 110 + posts_count_scale(data.post_counts.explicit))
      .attr('y', 76);
    posts_count.append('line')
      .attr('x1', 105)
      .attr('x2', 105)
      .attr('y1', 25)
      .attr('y2', 80);

    const tags_count = vis.append('g')
      .attr('transform', 'translate(0, 110)');
    const tags_count_scale = d3.scaleLinear()
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
    tags_count.append('text')
      .classed('header', true)
      .text(`Total tags: ${_(data.tag_counts.total)}`)
      .attr('x', 10)
      .attr('y', 15);
    tags_count.append('text')
      .text('general')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 36);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 25)
      .attr('fill', '#b88')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.general))
      .attr('title', _(data.tag_counts.general));
    tags_count.append('text')
      .text(_(data.tag_counts.general))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.general))
      .attr('y', 36);
    tags_count.append('text')
      .text('artist')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 56);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 45)
      .attr('fill', '#8b8')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.artist))
      .attr('title', _(data.tag_counts.artist));
    tags_count.append('text')
      .text(_(data.tag_counts.artist))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.artist))
      .attr('y', 56);
    tags_count.append('text')
      .text('copyright')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 76);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 65)
      .attr('fill', '#88b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.copyright))
      .attr('title', _(data.tag_counts.copyright));
    tags_count.append('text')
      .text(_(data.tag_counts.copyright))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.copyright))
      .attr('y', 76);
    tags_count.append('text')
      .text('character')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 96);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 85)
      .attr('fill', '#bb8')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.character))
      .attr('title', _(data.tag_counts.character));
    tags_count.append('text')
      .text(_(data.tag_counts.character))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.character))
      .attr('y', 96);
    tags_count.append('text')
      .text('species')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 116);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 105)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.species))
      .attr('title', _(data.tag_counts.species));
    tags_count.append('text')
      .text(_(data.tag_counts.species))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.species))
      .attr('y', 116);
    tags_count.append('text')
      .text('anatomy')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 136);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 125)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.anatomy))
      .attr('title', _(data.tag_counts.anatomy));
    tags_count.append('text')
      .text(_(data.tag_counts.anatomy))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.anatomy))
      .attr('y', 136);
    tags_count.append('text')
      .text('gender')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 156);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 145)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.gender))
      .attr('title', _(data.tag_counts.gender));
    tags_count.append('text')
      .text(_(data.tag_counts.gender))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.gender))
      .attr('y', 156);
    tags_count.append('text')
      .text('act')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 176);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 165)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.act))
      .attr('title', _(data.tag_counts.act));
    tags_count.append('text')
      .text(_(data.tag_counts.act))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.act))
      .attr('y', 176);
    tags_count.append('text')
      .text('interest')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 196);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 185)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.interest))
      .attr('title', _(data.tag_counts.interest));
    tags_count.append('text')
      .text(_(data.tag_counts.interest))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.interest))
      .attr('y', 196);
    tags_count.append('text')
      .text('objects')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 216);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 205)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.objects))
      .attr('title', _(data.tag_counts.objects));
    tags_count.append('text')
      .text(_(data.tag_counts.objects))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.objects))
      .attr('y', 216);
    tags_count.append('text')
      .text('media')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 236);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 225)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.media))
      .attr('title', _(data.tag_counts.media));
    tags_count.append('text')
      .text(_(data.tag_counts.media))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.media))
      .attr('y', 236);
    tags_count.append('text')
      .text('location')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 256);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 245)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.location))
      .attr('title', _(data.tag_counts.location));
    tags_count.append('text')
      .text(_(data.tag_counts.location))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.location))
      .attr('y', 256);
    tags_count.append('text')
      .text('theme')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 276);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 265)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.theme))
      .attr('title', _(data.tag_counts.theme));
    tags_count.append('text')
      .text(_(data.tag_counts.theme))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.theme))
      .attr('y', 276);
    tags_count.append('text')
      .text('subject attrs.')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 296);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 285)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.subject))
      .attr('title', _(data.tag_counts.subject));
    tags_count.append('text')
      .text(_(data.tag_counts.subject))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.subject))
      .attr('y', 296);
    tags_count.append('text')
      .text('image attrs.')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', 316);
    tags_count.append('rect')
      .attr('x', 105)
      .attr('y', 305)
      .attr('fill', '#b8b')
      .attr('height', 15)
      .attr('width', tags_count_scale(data.tag_counts.image))
      .attr('title', _(data.tag_counts.image));
    tags_count.append('text')
      .text(_(data.tag_counts.image))
      .classed('datum-text', true)
      .attr('x', 110 + tags_count_scale(data.tag_counts.image))
      .attr('y', 316);
    tags_count.append('line')
      .attr('x1', 105)
      .attr('x2', 105)
      .attr('y1', 25)
      .attr('y2', 325);

    const relations = vis.append('g')
      .attr('transform', 'translate(400, 300)');
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

  module.set_stats._ingests = (vis, data, attributes) => {
    const sparkline = d3.line()
      .x((d, i) => i * 5 + 155)
      .y(d => d);
    const scaled = {};
    ['duration', 'processed', 'new', 'updated',
      'fixed_tags_count', 'deleted_tags_count',
      'sources_deleted', 'artists_deleted'].forEach((d, i) => {
        let curr = data.last_10.map(dd => dd[d]).reverse();
        let scale = d3.scaleLinear()
          .domain([d3.min(curr), d3.max(curr)])
          .range([15, 0]);
        curr = curr.map(dd => scale(dd) + (20 * i) + 21);
        scaled[d] = curr;
    });
    
    vis.append('text')
      .text(`Total ingests: ${_(data.ingest_count)}`)
      .classed('header', true)
      .attr('x', 10)
      .attr('y', 15);

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

  module.set_stats._reports = (vis, data, attributes) => {
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


  module.relative_popularity = (vis, data, attributes, dateFn) => {
    const score = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'score')[0].value};
    });
    const fav_count = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'fav_count')[0].value};
    });
    const score_sd = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_score_sd')[0].value};
    });
    const fav_count_sd = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_fav_count_sd')[0].value};
    });
    let sd_visible = false;
    const score_var = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_score_var')[0].value};
    });
    const fav_count_var = data.map(d => {
      return {key: d.key, value: d.value
        .filter(dd => dd.key === 'total_fav_count_var')[0].value};
    });

    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([
        d3.max(([].concat(score, fav_count, score_sd, fav_count_sd)).map(d => d.value)),
        d3.min(([].concat(score, fav_count, score_sd, fav_count_sd)).map(d => d.value)
          .concat([].concat(score_sd, fav_count_sd).map(d => -d.value)))])
      .range([0, height - 50]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].key)), Date.parse(dateFn(data[data.length - 1].key))])
      .range([60, width]);

    const yAxis = d3.axisLeft(yScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(60, 0)')
      .call(yAxis);
    const xAxis = d3.axisBottom(xScale);
    vis.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis);

    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y(d => yScale(d.value));
    const sd_area = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y0(d => yScale(d.value))
      .y1(d => yScale(-d.value))

    vis.append('path')
      .datum(score)
      .style('fill', 'none')
      .style('stroke', '#1f77b4')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('path')
      .datum(score_sd)
      .style('display', () => sd_visible ? 'block' : 'none')
      .attr('class', 'std-dev')
      .attr('d', d => sd_area(d))
      .attr('fill', '#1f77b4')
      .attr('opacity', 0.5);

    vis.append('path')
      .datum(fav_count)
      .style('fill', 'none')
      .style('stroke', '#ff7f0e')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('path')
      .datum(fav_count_sd)
      .style('display', () => sd_visible ? 'block' : 'none')
      .attr('class', 'std-dev')
      .attr('d', d => sd_area(d))
      .attr('fill', '#ff7f0e')
      .attr('opacity', 0.5);

    vis.append('line')
      .attr('x1', 60)
      .attr('x2', width)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0));

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
        sd_visible = !sd_visible;
        if (sd_visible) {
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

    const floating_legend = vis.append('g')
      .classed('floating-legend', true)
      .classed('visible', false);
    const legend = floating_legend.append('g')
      .classed('legend', true);
    const legend_line = legend.append('line')
      .attr('y1', 0)
      .attr('y2', height - 50)
      .attr('x1', 0)
      .attr('x2', 0);
    const date = legend.append('text')
      .attr('x', 3)
      .attr('y', 15);
    const legend_score = legend.append('g')
      .classed('legend-item', true);
    const legend_score_rect = legend_score.append('rect')
      .attr('x', 0)
      .attr('y', -15)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('height', 22);
    const legend_score_text = legend_score.append('text')
      .text('score')
      .attr('x', 5)
      .attr('y', 0)
      .style('fill', '#1f77b4');
    const legend_fav_count = legend.append('g')
      .classed('legend-item', true);
    const legend_fav_count_rect = legend_fav_count.append('rect')
      .attr('x', 0)
      .attr('y', -15)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('height', 22);
    const legend_fav_count_text = legend_fav_count.append('text')
      .text("fav count")
      .attr('x', 5)
      .attr('y', 0)
      .style('stroke', '#ff7f0e');
    floating_legend.append('g')
      .classed('overlay', true)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', 0)
      .attr('x', d => xScale(Date.parse(dateFn(d.key))))
      .attr('width', (width - 60) / data.length)
      .attr('height', height - 50)
      .on('mouseenter', () => floating_legend.classed('visible', true))
      .on('mouseleave', () => floating_legend.classed('visible', false))
      .on('mousemove', function(d) {
        const el = d3.select(this);
        const curr_x = parseInt(el.attr('x'));
        const curr_score = d.value.filter(dd => dd.key == 'score')[0].value;
        const curr_fav_count = d.value.filter(dd => dd.key == 'fav_count')[0].value;
        legend.attr('transform', `translate(${curr_x}, 0)`);
        if (sd_visible) {
          const curr_score_sd = d.value.filter(dd => dd.key == 'total_score_sd')[0].value;
          const curr_fav_count_sd = d.value.filter(dd => dd.key == 'total_fav_count_sd')[0].value;
          legend_score_text.text(`rel. score: ${_f(curr_score)} (${_f(Math.abs(curr_score / curr_score_sd))})`);
          legend_fav_count_text.text(`rel. fav count: ${_f(curr_fav_count)} (${_f(Math.abs(curr_fav_count / curr_fav_count_sd))})`);
        } else {
          legend_score_text.text(`rel. score: ${_f(curr_score)}`);
          legend_fav_count_text.text(`rel. fav count: ${_f(curr_fav_count)}`);
        }
        const curr_score_width = legend_score_text.node().getBBox().width;
        const curr_score_x_offset = curr_score_width + curr_x + 60 > width ?
          -curr_score_width - 14 : 4;
        const curr_fav_count_width = legend_fav_count_text.node().getBBox().width;
        const curr_fav_count_x_offset = curr_fav_count_width + curr_x + 60 > width ?
          -curr_fav_count_width - 14 : 4;
        legend_score_rect.attr('width', curr_score_width + 10);
        legend_fav_count_rect.attr('width', curr_fav_count_width + 10);
        let curr_score_y_offset = yScale(curr_score) + 17;
        let curr_fav_count_y_offset = yScale(curr_fav_count) - 8;
        if (curr_score >= curr_fav_count) {
          curr_score_y_offset = yScale(curr_score) - 9;
          curr_fav_count_y_offset = yScale(curr_fav_count) + 17;
        }
        legend_score.attr('transform', `translate(${curr_score_x_offset}, ${curr_score_y_offset})`);
        legend_fav_count.attr('transform', `translate(${curr_fav_count_x_offset}, ${curr_fav_count_y_offset})`);
        date.text(d.key);
        const curr_date_width = date.node().getBBox().width;
        if (curr_date_width + curr_x + 60 > width) {
          date.attr('x', -curr_date_width - 3);
        } else {
          date.attr('x', 3);
        }
      });
  };


  module.popularity = (vis, data, attributes, dateFn) => {
    const score = data.map(d => {
      return {key: d.key, value: d.value[0].value};
    });
    const fav_count = data.map(d => {
      return {key: d.key, value: d.value[1].value};
    });

    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([d3.max((score.concat(fav_count)).map(d => d.value)), 0])
      .range([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].key)), Date.parse(dateFn(data[data.length - 1].key))])
      .range([60, width - 100]);

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

    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y(d => yScale(d.value));
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
    vis.append('path')
      .datum(fav_count)
      .style('fill', 'none')
      .style('stroke', '#ff7f0e')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('text')
      .text('fav count')
      .attr('dominant-baseline', 'middle')
      .attr('x', width - 95)
      .attr('y', yScale(fav_count[fav_count.length - 1].value))
      .style('fill', '#ff7f0e');
  };


  module.tags_over_time = (vis, data, attributes, dateFn) => {
    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([d3.max(data.map(d => d.value.map(dd => dd.value)).reduce((m, d) => m.concat(d))), 0])
      .range([20, height - 20]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].value[0].key)), Date.parse(dateFn(data[0].value[data[0].value.length - 1].key))])
      .range([100, width - 100]);
    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(data.map(d => d.key))

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


  module.stacked_tags = (vis, data, attributes) => {
    const width = 800;
    const height = 600;

    const dates = data.map(d => Date.parse(d.key));
    const tags = data
        .map(d => Object.keys(d))
        .reduce((m, d) => m.concat(d), [])
        .filter(d => d !== 'key')
        .filter((d, i, self) => self.indexOf(d) === i);
    data.forEach((d, i) => {
      let sum = 0
      tags.forEach((k) => {
        data[i][k] = data[i][k] || 0;
        sum += data[i][k];
      });
      tags.forEach((k) => data[i][k] = (data[i][k] / sum) * 100);
    });
    const stacked_data = d3.stack()
      .keys(tags)(data)

    const yScale = d3.scaleLinear()
      .domain([100, 0]).nice()
      .rangeRound([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([40, width]);
    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(tags);

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

    const area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d, i) => xScale(dates[i]))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]));


    const slice = vis.append('g')
      .attr('class', 'data')
      .selectAll('g')
      .data(stacked_data)
      .enter()
      .append('g')
      .on('mouseover', function() {
        d3.select(this).select('text').style('display', 'block');
      })
      .on('mouseout', function() {
        d3.select(this).select('text').style('display', 'none');
      })
      .on('mousemove', function() {
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
      .attr('title', (d, i) => stacked_data[i].key);
    slice.append('text')
      .text(d => d.key)
      .attr('dominant-baseline', 'middle')
      .attr('stroke-width', '0')
      .style('display', 'none');
  };


  module.simple_line = (vis, data, attributes, dateFn) => {
    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([d3.max(data.map(d => d.value)), d3.min(data.map(d => d.value))])
      .range([0, height - 20]);
    const xScale = d3.scaleTime()
      .domain([Date.parse(dateFn(data[0].key)), Date.parse(dateFn(data[data.length - 1].key))])
      .range([80, width]);

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
