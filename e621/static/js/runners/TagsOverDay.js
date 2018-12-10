function TagsOverDay(data) {
  let id = "TagsOverDay";

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;

  let yScale = d3.scaleLinear()
    .domain([d3.max(data.map((d) => d.value.map(dd => dd.value)).reduce((m, d) => m.concat(d))), 0])
    .range([0, height - 20]);
  let xScale = d3.scaleTime()
    .domain([Date.parse(data[0].value[0].key), Date.parse(data[0].value[data[0].value.length - 1].key)])
    .range([100, width]);
  let color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(data.map(d => d.key))

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

  data.forEach(datum => {
    let line = d3.line()
      .x((d) => xScale(Date.parse(d.key)))
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
      .attr('x', width)
      .attr('y', yScale(datum.value[datum.value.length - 1].value));
  });
}
