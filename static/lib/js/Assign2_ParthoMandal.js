
var va;
function draw(json) {

	// Year slider initialization
	var val = 2013;
	var slider = 0;
	
	var formatter = d3.format(".0f")
	var tickFormatter = function(d) {
	return formatter(d);
	}

	if (val != va){
	slider = d3.slider().min(2013).max(2003)
				   .tickValues([2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013])
				   .stepValues([2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013])
				   .tickFormat(tickFormatter).value(va);
	}
	else{
		slider = d3.slider().min(2013).max(2003)
				   .tickValues([2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013])
				   .stepValues([2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013])
				   .tickFormat(tickFormatter).value(val);
	}


	d3.select('#slider').call(slider);
	//console.log(slider.value())
	
	var data = json;


	var index = Math.round(Math.random() * data.length),
	w = 580, 
	h = 530;
	

	function key_func(d) {return d.player1;}
	
	d3.select("#slider")
		.on("click", function(d) {

			va  = slider.value()
			slider.destroy();
			svg.remove();
			svg_service.remove();
			svg_match.remove();
			d3.json("./static/data/output_"+String(va)+".json", draw);

			// ga.selectAll(".axispath").remove();
			// ga.selectAll(".axislabel").remove();

			// svg.select("#selectedplayer").remove();
			// svg.select("#selectedplayerpoints").remove();
			// svg.select(".svg_main").remove();

			// g.selectAll('.city').remove();

			// bg_service.selectAll(".party").remove();
			// bg_service.selectAll(".marker").remove();
			// bg_service.selectAll("rect").remove();
			// svg_service.select(".axisHorizontal").remove();


			// bg_match.selectAll(".matchlabel").remove();
			// bg_match.selectAll(".marker_match").remove();
			// bg_match.selectAll("rect").remove();
			// svg_match.select(".axisHorizontal").remove();
		});
	
	var rl = d3.scale.linear().domain([0, 100]).range([0, w / 2 - 60]);
	var rs = d3.scale.log().domain([1, 100]).range([0, w / 2 - 60]);
	var rr = d3.scale.linear().domain([Math.sqrt(1 / Math.PI), Math.sqrt(15 / Math.PI), Math.sqrt(100 / Math.PI)]).range([11, 3, 1]);
	var c = d3.scale.log().domain([1, 20, 100]).range(["#F9786C", "#41415F", "#193244"]);


	var axes = [
		{ 'label': 'very similar', 'value': 20 },
		{ 'label': 'similar', 'value': 40 },
		{ 'label': 'different', 'value': 60 },
		{ 'label': 'very different', 'value': 80 },
		{ 'label': 'extremely different', 'value': 100} 
	];

	var rfunc = function(d, i) { return rr(Math.sqrt(d['chi'][index] / Math.PI) == 0 ? 1 : Math.sqrt(d['chi'][index] / Math.PI)); };
	var layout = "radial";
	var size = "sim";

	var div = d3.select("body").append("div").attr("class", "toolTip");

	var svg = d3.select("#viz").append("svg")
		.attr("width", w)
		.attr("height", h)


	var svg_service = d3.select("#service").append("svg")
		.attr("width", 480)
		.attr("height", 250)

	var svg_match = d3.select("#match").append("svg")
		.attr("width", 490)
		.attr("height", 327)


	var selectedPlayer = svg.append("text")
		.attr("id", "selectedplayer")
		.attr("x", 54)
		.attr("y", 30)
		.text([data[index]["player1"]])
		.style("fill", "#000")
		.style("text-anchor", "start")
		.style("font-family", "Arimo")
		.style("font-size", "24px")

	var selectedPlayerPoints = svg.append("text")
		.attr("id", "selectedplayerpoints")
		.attr("x", 54)
		.attr("y", 55)
		.text([data[index]["total1"]])
		.style("fill", "#000")
		.style("text-anchor", "start")
		.style("font-family", "Arimo")
		.style("font-size", "20px")

	// var selectors = svg.append("foreignObject")
	// 	.attr("transform", "translate(200, 200)")
	// 	.append("body")
	// 	.append("ul")

	// // selectors.append("li")
	// selectors.append("li")

	var g = svg.append('g')
		.attr('transform', 'translate(' + w / 2 + ', ' + h / 2 + ')')

	var arc = d3.svg.arc()
		.outerRadius(function(d) { return rl(d.value); })
		.startAngle(0)
		.endAngle(2 * Math.PI)


	

	var ga = g.append("g")
		.attr("id", "axisgroup")
		.style("opacity", 50)


	d3.selectAll("#axisgroup")
			.transition()
			.duration(1300)
			.style("opacity", 1)

	// d3.select(this) svg.selectAll('circle')
                               
	// .attr("class", "selected")

	ga.selectAll(".axispath")
	  	.data(axes)
	  	  .enter().append("path")
	  	.attr("id", function(d, i) { return "axispath" + i; })
	  	.attr("class", "axispath")
	  	.attr("d", arc)
	  	.style("stroke", "#91B6D4")
	  	.style("fill", "none")
	  	.style("opacity", 0.6)

	ga.selectAll(".axislabel")
		.data(axes)
		  .enter().append("text")
		.attr("class", "axislabel")
		.attr("dy", -5)
		.attr("dx", 0)
		.style("fill", "#91B6D4")
		.style("font-size", "12px")
		.style("text-anchor", "middle")
	  .append("textPath")
	  	.attr("xlink:href", function(d, i) { return "#axispath" + i; })
	  	.attr("startOffset", "40%")
		.text(function(d, i) { return d.label; }) 

	d3.selection.prototype.moveToFront = function() { 
	    return this.each(function() { 
	        this.parentNode.appendChild(this); 
	    }); 
	}; 

	data.forEach(function(d, i) {
		d.s = i;
	})






    
  function update() {
        	d3.selectAll('.city')
	          .transition()
	          .duration(800)
	          .attr("cx", function(d, i) { return rs(d['chi'][index] == 0 ? 1 : d['chi'][index])})
	          .attr('r', rfunc)
	          .style('fill', function(d, i) { return index == d.s ? "#F9786C" : c(d['chi'][index] == 0 ? 1 : d['chi'][index]); })	
        

        d3.selectAll(".label")
        	.remove();

        d3.select("#selectedplayer")
        	.text(data[index]["player1"])
        
        d3.select("#selectedplayerpoints")
        	.text(data[index]["total1"])



        bar
    	.data([data[index]["fastServe1"],data[index]["avgFirstServe1"], data[index]["avgSecServe1"] ])
    	.transition()
    	.duration(800)
    	.attr("width", function(d) { return bs(d); })

        barMatch
    	.data([data[index]["firstPointWon1"], data[index]["secPointWon1"], data[index]["break1"], data[index]["return1"], data[index]["net1"] ])
    	.transition()
    	.duration(800)
    	.attr("width", function(d) { return bs_match(d)*100; })
  }	
  
    var circle = g.selectAll('.city')
  				  .data(data, key_func)
    .enter().append('circle')
    .attr('class', 'city')
  	.attr('r', rfunc)
  	.attr("cy", 0)
	.attr("cx", function(d, i) { return rs(d['chi'][index] == 0 ? 1 : d['chi'][index])})
	.attr("transform", function(d, i) { return "rotate(" + d.s/data.length * 360 + " 0 0)"; })
  	.style('fill', function(d, i) { return index == d.s ? "#F9786C" : c(d['chi'][index] == 0 ? 1 : d['chi'][index]); })
  	.style('stroke', 'white')
  	.style('stroke-opacity', 0.3)
  	.style("opacity", 0.9)

    .on("click", function(d, ind) {
    	d3.selectAll('.city').each(function(d, ind) {
        	if (d.s == index) {
				d3.select(this)
        			.moveToFront()
        	}
        })

        index = ind;
        
        d3.select("#cityselector").property("selectedIndex", index);

        update();

      })
	.on("mouseover", function(d, i) {

		var labelbackground = d3.select(this.parentNode)
			.append('text')
			.attr('class', 'label')
			.style('text-anchor', 'middle')
			.text(function() { return d.player1 + '  ' +d.total1; })
			.style('font-family', "'Arimo', sans-serif")
			.style('font-size', '16px')
			.style('font-weight', 'bold')
			.style('stroke', 'rgb(240,249,255)')
			.style('stroke-width', 3.5)
			.style('stroke-opacity', 0.6)
			.style('filter', 'url:(#dropshadow)')
			.attr('dy', function() { return size == "pop" ? -1 * rinw(Math.sqrt(d.inw / Math.PI)) - 5 : -1 * rr(Math.sqrt(d['chi'][index] / Math.PI) == 0 ? 1 : Math.sqrt(d['chi'][index] / Math.PI)) - 5; })
			.style('fill', 'none')

		var labelforeground = d3.select(this.parentNode)
			.append('text')
			.attr('class', 'label')
			.style('text-anchor', 'middle')
			.text(function() { return d.player1 + '  ' + d.total1; })
			.style('font-family', "'Arimo', sans-serif")
			.style('font-size', '16px')
			.style('font-weight', 'bold')
			.attr('dy', function() { return size == "pop" ? -1 * rinw(Math.sqrt(d.inw / Math.PI)) - 5 : -1 * rr(Math.sqrt(d['chi'][index] / Math.PI) == 0 ? 1 : Math.sqrt(d['chi'][index] / Math.PI)) - 5; })
			.style('fill', '#000')

	
		labelbackground
			.attr('x', function() { return index == i ? 0 : Math.cos(d.s/data.length * 2 * Math.PI) * rs(d['chi'][index] == 0 ? 1 : d['chi'][index]); })
			.attr('y', function() { return index == i ? 0 : Math.sin(d.s/data.length * 2 * Math.PI) * rs(d['chi'][index] == 0 ? 1 : d['chi'][index]); })

		labelforeground
			.attr('x', function() { return index == i ? 0 : Math.cos(d.s/data.length * 2 * Math.PI) * rs(d['chi'][index] == 0 ? 1 : d['chi'][index]); })
			.attr('y', function() { return index == i ? 0 : Math.sin(d.s/data.length * 2 * Math.PI) * rs(d['chi'][index] == 0 ? 1 : d['chi'][index]); })
	

		bg_service.selectAll(".marker")
			.data([data[d.s]["fastServe1"], data[d.s]["avgFirstServe1"], data[d.s]["avgSecServe1"] ])
			.enter().append("line")
			.attr("class", "marker")
			.attr("x1", function(d) { return 5 + bs(d); })
			.attr("y1", function(d, i) { return i * 40; })
			.attr("x2", function(d) { return 5 + bs(d); })
			.attr("y2", function(d, i) { return 20 + i * 40; })
			.style("stroke", "#000")
			.style("opacity", 0.95)


		bg_match.selectAll(".marker_match")
			.data([data[d.s]["firstPointWon1"], data[d.s]["secPointWon1"], data[d.s]["break1"], data[d.s]["return1"], data[d.s]["net1"]  ])
			.enter().append("line")
			.attr("class", "marker_match")
			.attr("x1", function(d) { return 5 + bs_match(d)*100; })
			.attr("y1", function(d, i) { return i * 40; })
			.attr("x2", function(d) { return 5 + bs_match(d)*100; })
			.attr("y2", function(d, i) { return 20 + i * 40; })
			.style("stroke", "#000")
			.style("opacity", 0.95)
	})
	.on("mouseout", function(d, i) {
		d3.selectAll('.label')
			.remove()

		d3.selectAll(".marker")
			.remove()

		d3.selectAll(".marker_match")
			.remove()
	});


	max1 = d3.max(data, function(d) { return d.fastServe1; });
    max2 = d3.max(data, function(d) { return d.avgSecServe1; });
    max3 = d3.max(data, function(d) { return d.avgFirstServe1; });
    max = d3.max(d3.values([max1,max2,max3]));


	var bs = d3.scale.linear().domain([0, max]).range([0,300]);

	var bg_service = svg_service.append("g")
		.attr("transform", "translate(130, 45)")



	var party = bg_service.selectAll(".party")
		.data(["Fast Serve", "Average First Serve", "Average Second Serve"])
		.enter().append("text")
		.attr("class", "party")
		.attr("x", 0)
		.attr("y", function(d, i) { return 8 + i * 40; })
		.text(String)
		.style("font-size", "12px")
		.style("text-anchor", "end")
		.style("fill", "#91B6D4")




	var bar = bg_service.selectAll("rect")
		.data([data[index]["fastServe1"], data[index]["avgFirstServe1"], data[index]["avgSecServe1"]])
		.enter().append("rect")
		.attr("x", 5)
		.attr("y", function(d, i) { return i * 40; })
		.attr("height", 20)
		.attr("width", function(d) { return bs(d); })
		.style("fill", "#91B6D4")

     var axisMargin = 20,
            margin = 40,
            valueMargin = 4,
            barHeight = 20,
            barPadding = 2;

    //Tooltip for bar
    bar.on("mousemove", function(d){
    			//console.log(this.__data__)
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html( this.__data__);
            });
    bar.on("mouseout", function(d){
                div.style("display", "none");
            });


  //Inserting the ticks
   var xAxis = d3.svg.axis()
            .scale(bs)
            .tickSize(3 + 2*margin + axisMargin)
            .orient("bottom");

    svg_service.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform",  "translate(135, 45)")
        .call(xAxis);


	var bs_match = d3.scale.linear().domain([0, 100]).range([0,300]);

	var bg_match = svg_match.append("g")
		.attr("transform", "translate(125, 45)")



	var matchLabel = bg_match.selectAll(".matchlabel")
		.data(["First Serve Won", "Second Serve Won", "Break Point", "Return Point", "Net Point"])
		.enter().append("text")
		.attr("class", "matchlabel")
		.attr("x", 0)
		.attr("y", function(d, i) { return 8 + i * 40; })
		.text(String)
		.style("font-size", "12px")
		.style("text-anchor", "end")
		.style("fill", "#F9786C") //#F9786C", "#41415F", "#193244


	var barMatch = bg_match.selectAll("rect")
		.data([data[index]["firstPointWon1"], data[index]["secPointWon1"], data[index]["break1"], data[index]["return1"], data[index]["net1"]  ])
		.enter().append("rect")
		.attr("x", 5)
		.attr("y", function(d, i) { return i * 40; })
		.attr("height", 20)
		.attr("width", function(d) { return bs_match(d)*100; })
		.style("fill", "#F9786C")

    //Tooltip for bar
    barMatch.on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html(String(d3.format(".0f")(this.__data__*100))+"%");
            });
    barMatch.on("mouseout", function(d){
                div.style("display", "none");
            });


  //Inserting the ticks
   var xAxis_match = d3.svg.axis()
            .scale(bs_match)
            .tickSize(85 + 2*margin + axisMargin)
            .orient("bottom");

    svg_match.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform",  "translate(130, 45)")
        .call(xAxis_match);

};    
