function TopXTagsPastYDaysByType(data) {
  let id = "TopXTagsPastYDaysByType";

  let vis = d3.select(`.${id}`)
    .append('g');

  let width = 800;
  let height = 600;
  let factor = (height / data.length);

  let scale = d3.scaleLinear()
    .domain([data[0].value, data[data.length - 1].value])
    .range([factor, factor / data.length]);

  let curr_offset = 0;
  data.forEach((d) => {
    scaled_value = scale(d.value);
    curr_offset += scaled_value + 10;
    vis.append('text')
      .attr('class', 'data-text')
      .attr('x', 10)
      .attr('y', curr_offset)
      .style('font-size', `${scaled_value}px`)
      .text(d.key);
  });
}
