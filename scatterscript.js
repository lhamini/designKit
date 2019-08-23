var scatti = function() {


			// calculate stats
			var xm = 'N/A', ym = 'N/A', xs = 'N/A', ys = 'N/A', cor = 'N/A';
			if (data.length>0) {
				var xm = Math.round(10000*d3.mean(data, function(d) { return d.x; }))/10000;
				var ym = Math.round(10000*d3.mean(data, function(d) { return d.y; }))/10000;
			}
			if (data.length>1) {
				var xs = Math.round(10000*d3.deviation(data, function(d) { return d.x; }))/10000;
				var ys = Math.round(10000*d3.deviation(data, function(d) { return d.y; }))/10000;
				var cor = Math.round(10000*((data.length*myxy.reduce(add,0) -
																			myx.reduce(add,0)*myy.reduce(add,0))/
																			(Math.sqrt(
																				(data.length*myx2.reduce(add,0)-
																					myx.reduce(add,0)*myx.reduce(add,0))*
																				(data.length*myy2.reduce(add,0)-
																					myy.reduce(add,0)*myy.reduce(add,0))))))/10000;


			}
			// update stats

		  	document.getElementById('nofpoints').value=data.length;
			  document.getElementById('xmean').value=xm;
				document.getElementById('xsd').value=xs;
			  document.getElementById('ymean').value=ym;
				document.getElementById('ysd').value=ys;
				document.getElementById('pearcor').value=cor;
		//	d3.select('p#thestats').text('N = ' + data.length + ' ; ' +
		//															 xname + ' mean = ' + xm + ' ; ' +
			//														 xname + ' SD = ' + xs + ' ; ' +
			//													 	 yname + ' mean = ' + ym + ' ; ' +
		//														   yname + ' SD = ' + ys + ' ; ' +
			//													 	 'Pearson correlation = ' + cor);
			// update the scatterplot
			svg.selectAll('circle.click')
				.data(data)
				.enter()
						.append('circle')
								.attr('r', 4)
								.attr('class', 'click')
								.attr('cx', function(d) { return(x(d.x)); } )
								.attr('cy', function(d) { return(y(d.y)); } );

			svg.selectAll('circle.click')
				.data(data)
				.exit()
				.remove();
			// axes
			svg.selectAll('.axis').remove();
			svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0,' + chartheight + ')')
					.call(d3.axisBottom(x));
			svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + margin.left + ',0)')
					.call(d3.axisLeft(y));
			// axis labels
			svg.select('#xlab').remove();
			svg.select('#ylab').remove();
			svg.append('text')
					.attr('id','xlab')
					.attr('transform','translate('+ (margin.left+(chartwidth/2))+','+(chartheight+axisLabelSpace)+')')
					.style('text-anchor','middle')
					.text(xname);
			svg.append('text')
					.attr('id','ylab')
					.attr('transform','rotate(-90)')
					.attr('x',0-(chartheight/2)-margin.top)
					.attr('y',margin.left-axisLabelSpace)
					.style('text-anchor','middle')
					.text(yname);

			// update the table
			d3.select('#datatable').remove();
			// column definitions
    	var columns = [
        { head: xname, cl: 'title', html: ƒ('x') },
        { head: yname, cl: 'center', html: ƒ('y') } ];
			// create table
    	var table = d3.select('div#divtable')
        .append('table')
				.attr('id','datatable');
    	// create table header
    	table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', ƒ('cl'))
        .text(ƒ('head'));
    	// create table body
    	table.append('tbody')
        .selectAll('tr')
        .data(data).enter()
        .append('tr')
        .selectAll('td')
        .data(function(row, i) {
            return columns.map(function(c) {
                // compute cell values for this specific row
                var cell = {};
                d3.keys(c).forEach(function(k) {
                    cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                });
                return cell;
            });
        }).enter()
        .append('td')
        .html(ƒ('html'))
        .attr('class', ƒ('cl'));
	}
