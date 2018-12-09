function UploadsOverHourPastWeek(data) {
  let id = "UploadsOverHourPastWeek";

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;

  let yScale = d3.scaleLinear()
    .domain([d3.max(data.map((d) => d.value)), 0])
    .range([0, height - 20]);
  let xScale = d3.scaleTime()
    .domain([Date.parse(`${data[0].key}:00`), Date.parse(`${data[data.length - 1].key}:00`)])
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
    .x((d) => xScale(Date.parse(`${d.key}:00`)))
    .y((d) => yScale(d.value));
  vis.append('path')
    .datum(data)
    .attr('class', 'data')
    .attr('d', line);
}
