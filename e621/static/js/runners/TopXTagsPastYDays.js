function TopXTagsPastYDays(data) {
  let id = "TopXTagsPastYDays";

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;

  let dates = data.map((d) => Date.parse(d.key));
  let tags = data
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
  let stacked_data = d3.stack()
    .keys(tags)(data)

  let yScale = d3.scaleLinear()
    .domain([100, 0]).nice()
    .rangeRound([0, height - 20]);
  let xScale = d3.scaleBand()
    .domain(dates)
    .rangeRound([100, width]);
  let color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(tags);

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

  let rect = vis.append('g')
    .attr('class', 'data')
    .selectAll('g')
    .data(stacked_data)
    .enter()
    .append('g')
    .attr('fill', (d) => color(d.key))
    .attr('data-title', (d) => d.key)
    .selectAll('g')
    .data((d) => d)
    .enter()
    .append('g');
  rect.append('rect')
    .attr('x', (d, i) => xScale(Date.parse(data[i].key)))
    .attr('y', (d) => yScale(d[1]))
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .attr('width', xScale.bandwidth());
  rect.append('text')
    .attr('stroke-width', '0')
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('x', (d, i) => xScale(Date.parse(data[i].key)) + xScale.bandwidth() / 2)
    .attr('y', (d) => yScale(d[0]) + (yScale(d[1]) - yScale(d[0])) / 2)
    .text((d, i, els) => yScale(d[1]) - yScale(d[0]) ? els[0].parentElement.parentElement.dataset['title'] : '');
  function debug(d, i, els) {
    debugger;
  }
}
