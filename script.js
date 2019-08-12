//drawing function
      var drawit = function() {
        _viewport = myCanvas.append("g")
                  .attr("class", "diagram-viewport")
                  .attr("width", "2250px")
                  .attr("height", "3300px")
                  .classed("noselect", true);




            // axis
            myCanvas.selectAll('.axis').remove();
            myCanvas.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + chartheight + ')')
                .call(d3.axisBottom(x));

            // axis labels
            myCanvas.select('#xlab').remove();

            myCanvas.append('text')
                .attr('id','xlab')
                .attr('transform','translate('+ (margin.left+(chartwidth/2))+','+(chartheight+axisLabelSpace)+')')
                .style('text-anchor','middle')
                .text(xname);



            var _path;
            var _isDrawing = false;

            var trainingString = "";

            var line = d3.line()

                .x(function (d, i) {
                    return d.x;
                })
                .y(function (d, i) {
                    return d.y;
                });

            myCanvas.on("pointerdown", listen)
                .on("pointerup", ignore)
                .on("pointerleave", ignore);

            //ignore default touch behavior
            var touchEvents = ['touchstart', 'touchmove', 'touchend'];
            touchEvents.forEach(function (eventName) {
                window.addEventListener(eventName, ev => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                }, { passive: false });
            });

            function listen() {
                console.log(d3.event.pointerType);
                if (d3.event.pointerType == 'touch') {
                    _istouchMove = true;
                    return;
                }
                _isDrawing = true;
                _istouchMove = false;
              //  _ptdata = [];
              //  _currentElementId = _idGenerator.generate();
                _path = _viewport.append("path")
                    .data([_ptdata])
                    .attr("class", "line")
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    //.attr("id", _currentElementId)
                    .attr("d", line);
                myCanvas.on("pointermove", onmove);



            }

            function ignore() {
                myCanvas.on("pointermove", null);

                if (!_isDrawing) return;
                _isDrawing = false;
                _istouchMove = false;
                //if (!_currentElementId) {
                //    return;
                //}
                //_ptdata = simplify(_ptdata);
                refresh();

              //  _svgElements[_currentElementId] = _path;
              //  processSVGStroke(_currentElementId);
              //  _currentElementId = null;
                console.log(trainingString);
                trainingString = "";

                //todo : add stuff here to keep track and process lines
            }

            function onmove() {
                 var type = d3.event.type;
                 var point;

                 if (type === 'pointermove') {
                     point = d3.mouse(this);

                 }
                 else {
                     point = d3.touches(this)[0];

                 }

                 _ptdata.push({ x: point[0], y: point[1] });

                 //console.log(_ptdata);
                 n=Math.round(10000*x.invert(point[0]))/10000;
                 data.push({x:n});
                 refresh();

             }

            function refresh() {
                _path.attr("d", function (d) { return line(d);})
            }

            function panzoom() {
                if (d3.event.pointerType == 'touch') {
                    myCanvas.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                }
            }
            // calculate stats

           var xm = 'N/A', xs = 'N/A';
            if (data.length>0) {
                   var xm = Math.round(10000*d3.mean(data, function(d) { return d.x; }))/10000;

                   }
            if (data.length>1) {
                     var xs = Math.round(10000*d3.deviation(data, function(d) { return d.x; }))/10000;

                   }
            document.getElementById('muq').value=xm;
            document.getElementById('sigmaq').value=xs;
          

            // update stats
            d3.select('div p#thestats').text('N = ' + data.length + ' ; ' +
              																	 xname + ' mean = ' + xm + ' ; ' +
              																	 xname + ' SD = ' + xs + ' ; ') ;
            // update the table
            d3.select('#datatable').remove();
            // column definitions
            var columns = [
              { head: xname, cl: 'title', html: ƒ('x') }];
            //  { head: yname, cl: 'center', html: ƒ('y') } ];
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
