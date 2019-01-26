/* global d3 topojson:true */
const width = 1500;
const height = 750;
const projection = d3.geoKavrayskiy7().scale(230).translate([width/2,height/2]);

const path = d3.geoPath()
    .projection(projection);
        
const graticule = d3.geoGraticule();

const mapContainer = d3.select('#map');

const map = mapContainer
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMin meet');

const defs = map.append('defs');

defs.append('path')
    .datum({type: 'Sphere'})
    .attr('id', 'sphere')
    .attr('d', path);

// define the edge of the earth    
map.append('use')
    .attr('class', 'sphere')
    .attr('xlink:href', '#sphere');

// append the graticule
map.append('path')
    .datum(graticule)
    .attr('class','graticule')
    .attr('d', path);


Promise.all([d3.json('./world-50m.json'), d3.json('./topojson/1951-1975.topojson')])
    .then(maps => {
        var [world, climateData] = maps;

        map.append('path')
            .attr('class', 'land')
            .datum(topojson.feature(world, world.objects.land, function (a,b) { return a === b;}))
            .attr('d', path);

        map.append('path')
            .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
            .attr('class', 'country')
            .attr('d', path);

        
        // define a path of land borders to use as a clip path
        defs.append('path')
            .attr('id', 'land-outline')
            .datum(topojson.feature(world, world.objects.land, function (a,b) { return a === b;} ))
            .attr('d', path);

        // define the clip path
        defs.append('clipPath')
            .attr('id', 'clip')
            .append('use')
            .attr('xlink:href', '#land-outline');

        map.append('g')
            .attr('clip-path', 'url(#clip)') // use the shoreline paths as a clip path
            .selectAll('path.zone')
            .data(topojson.feature(climateData, climateData.objects.zones).features)
            .enter()
            .append('path')
            .attr('class', 'zone')
            .attr('class', d => `climate ${d.properties.CODE}`)
            .attr('d', path)
            .append('title')
            .text(d => d.properties.CODE);
    });