function TopXTagsPastYDays(data) {
  let id = "TopXTagsPastYDays";

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;

  let dates = data.map((d) => Date.parse(d.key));
  let keys = data
      .map((d) => Object.keys(d))
      .reduce((m, d) => m.concat(d), [])
      .filter((d) => d !== 'key')
  let values = data
    .map(d => Object.values(d).filter(i => !isNaN(i)))
    .reduce((m, d) => m.concat(d.reduce((mm, dd) => mm + dd)), [])
  data.forEach((d, i) => {
    keys.forEach((k) => {
      data[i][k] = data[i][k] || 0;
    });
  });
  let stacked_data = d3.stack()
    .keys(keys)(data)

  let yScale = d3.scaleLinear()
    .domain([d3.max(values), 0]).nice()
    .rangeRound([0, height - 20]);
  let xScale = d3.scaleBand()
    .domain(dates)
    .rangeRound([100, width]);
  let color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(keys);

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

  vis.append('g')
    .attr('class', 'data')
    .selectAll('g')
    .data(stacked_data)
    .enter()
    .append('g')
    .attr('fill', (d) => color(d.key))
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(Date.parse(data[i].key)))
    .attr('y', (d) => yScale((d[1])))
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .attr('width', xScale.bandwidth());
}
