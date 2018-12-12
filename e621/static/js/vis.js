window.explore621 = window.explore621 || {};
window.explore621.vis = window.explore621.vis || (function() {
  const module = {};

  module.set_stats = function(vis, data) {
    vis.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .text('NOT IMPLEMENTED YET :( :( :(');
  };

  module.relative_popularity = function(vis, data, dateFn) {
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
        d3.max(([].concat(score, fav_count)).map((d) => d.value)
          .concat([].concat(score_sd, fav_count_sd).map(d => d.value / 2))),
        d3.min(([].concat(score, fav_count)).map((d) => d.value)
          .concat([].concat(score_sd, fav_count_sd).map(d => -d.value / 2)))])
      .range([0, height - 50]);
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
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis);

    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => xScale(Date.parse(dateFn(d.key))))
      .y((d) => yScale(d.value));
    const sd_area = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(Date.parse(dateFn(d.key))))
      .y0(d => yScale(d.value / 2))
      .y1(d => yScale(-d.value / 2))

    vis.append('path')
      .datum(score)
      .style('fill', 'none')
      .style('stroke', '#1f77b4')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('text')
      .text('score')
      .attr('x', width - 95)
      .attr('y', yScale(score[score.length - 1].value))
      .style('fill', '#1f77b4');
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
    vis.append('text')
      .text('fav count')
      .attr('x', width - 95)
      .attr('y', yScale(fav_count[fav_count.length - 1].value))
      .style('fill', '#ff7f0e');
    vis.append('path')
      .datum(fav_count_sd)
      .style('display', () => sd_visible ? 'block' : 'none')
      .attr('class', 'std-dev')
      .attr('d', d => sd_area(d))
      .attr('fill', '#ff7f0e')
      .attr('opacity', 0.5);

    vis.append('line')
      .attr('x1', 60)
      .attr('x2', width - 100)
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
  };


  module.popularity = function(vis, data, dateFn) {
    const score = data.map(d => {
      return {key: d.key, value: d.value[0].value};
    });
    const fav_count = data.map(d => {
      return {key: d.key, value: d.value[1].value};
    });

    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([d3.max((score.concat(fav_count)).map((d) => d.value)), 0])
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
      .x((d) => xScale(Date.parse(dateFn(d.key))))
      .y((d) => yScale(d.value));
    vis.append('path')
      .datum(score)
      .style('fill', 'none')
      .style('stroke', '#1f77b4')
      .attr('class', 'data')
      .attr('d', line);
    vis.append('text')
      .text('score')
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
      .text('fav_count')
      .attr('x', width - 95)
      .attr('y', yScale(fav_count[fav_count.length - 1].value))
      .style('fill', '#ff7f0e');
  };


  module.tags_over_time = function(vis, data, dateFn) {
    const width = 800;
    const height = 600;

    const yScale = d3.scaleLinear()
      .domain([d3.max(data.map((d) => d.value.map(dd => dd.value)).reduce((m, d) => m.concat(d))), 0])
      .range([0, height - 20]);
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
        .x((d) => xScale(Date.parse(dateFn(d.key))))
        .y((d) => yScale(d.value));
      vis.append('path')
        .datum(datum.value)
        .style('fill', 'none')
        .style('stroke', color(datum.key))
        .attr('title', datum.key)
        .attr('class', 'data')
        .attr('d', line);
      vis.append('text')
        .text(datum.key)
        .attr('fill', color(datum.key))
        .attr('stroke-width', '0')
        .attr('x', width - 95)
        .attr('y', yScale(datum.value[datum.value.length - 1].value));
    });
  };


  module.stacked_tags = function(vis, data) {
    const width = 800;
    const height = 600;

    const dates = data.map((d) => Date.parse(d.key));
    const tags = data
        .map((d) => Object.keys(d))
        .reduce((m, d) => m.concat(d), [])
        .filter((d) => d !== 'key')
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
      .attr('stroke-width', '0')
      .style('display', 'none');
  };


  module.simple_line = function(vis, data, dateFn) {
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
      .x((d) => xScale(Date.parse(dateFn(d.key))))
      .y((d) => yScale(d.value));
    vis.append('path')
      .datum(data)
      .style('fill', 'none')
      .attr('class', 'data')
      .attr('d', line);
  };

  return module;
})();
