function RelativeTagPopularityOverMonth(data) {
  let id = "RelativeTagPopularityOverMonth";
  let score = data.map(d => {
    return {key: d.key, value: d.value[0].value};
  });
  let fav_count = data.map(d => {
    return {key: d.key, value: d.value[1].value};
  });

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;

  let yScale = d3.scaleLinear()
    .domain([d3.max((score.concat(fav_count)).map((d) => d.value)), d3.min((score.concat(fav_count)).map((d) => d.value))])
    .range([0, height - 20]);
  let xScale = d3.scaleTime()
    .domain([Date.parse(data[0].key + '-01'), Date.parse(data[data.length - 1].key + '-01')])
    .range([100, width]);

  let yAxis = d3.axisLeft(yScale);
  vis.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(100, 0)')
    .call(yAxis);
  let xAxis = d3.axisBottom(xScale);
  vis.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height - 20})`)
    .call(xAxis);

  let line = d3.line()
    .x((d) => xScale(Date.parse(d.key)))
    .y((d) => yScale(d.value));
  vis.append('path')
    .datum(score)
    .style('fill', 'none')
    .attr('class', 'data')
    .attr('d', line);
  vis.append('path')
    .datum(fav_count)
    .style('fill', 'none')
    .attr('class', 'data')
    .attr('stroke-dasharray', '10 5')
    .attr('d', line);
  vis.append('line')
    .attr('x1', 100)
    .attr('x2', width)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0));
}
