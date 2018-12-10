function TopXTagsPastYDaysByType(data) {
  let id = "TopXTagsPastYDaysByType";

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
  let xScale = d3.scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range([100, width]);
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

  let area = d3.area()
    .curve(d3.curveLinear)
    .x((d, i) => xScale(dates[i]))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));


  let slice = vis.append('g')
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
      let mouse = d3.mouse(this)
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
}
