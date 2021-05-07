(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+yM7":
/*!***********************************************!*\
  !*** ./src/app/components/d3/d3.component.ts ***!
  \***********************************************/
/*! exports provided: D3Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3Component", function() { return D3Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");








const _c0 = ["containerElementRef"];
class D3Component {
    constructor(graphService) {
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isDestroyed = false;
        this.connectedLookup = {};
        this.subs = [];
        this.handleClick = (event, d) => {
            event.stopPropagation();
            this.g.selectAll('.graphElement').style('opacity', (o) => {
                if (d.type === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].EDGE) {
                    if (o.type === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].EDGE) {
                        // d = EDGE and o = EDGE
                        if (o === d) {
                            return 1.0;
                        }
                        return 0;
                    }
                    else {
                        // d = EDGE and o = NODE
                        if (o.id === d.source.id || o.id === d.target.id) {
                            return 1.0;
                        }
                        return 0;
                    }
                }
                else {
                    if (o.type === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].EDGE) {
                        // d = NODE and o = EDGE
                        if (o.source.id === d.id || o.target.id === d.id) {
                            return 1.0;
                        }
                        return 0;
                    }
                    else {
                        // d = NODE and o = NODE
                        if (o.id === d.id) {
                            return 1;
                        }
                        if (this.isConnected(o.id, d.id)) {
                            return 0.5;
                        }
                        return 0;
                    }
                }
            });
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](event.target).style('opacity', 1);
            if (d.type === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].EDGE) {
                this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_5__["EdgeGraphModel"]({
                    data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_5__["EdgeDataModel"]({
                        source: d.source.id,
                        target: d.target.id,
                        strength: d.strength
                    }),
                    scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_5__["GraphScratchModel"]({
                        transfer: d.transfer
                    })
                }));
            }
            else if (d.type === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].NODE) {
                this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_5__["NodeGraphModel"]({
                    data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_5__["NodeDataModel"]({
                        id: d.id,
                        name: d.name,
                        weight: d.weight
                    })
                }));
            }
        };
    }
    ngOnInit() {
        if (this.graphService.onChangeSubject) {
            const sub1 = this.graphService.onChangeSubject.subscribe({
                next: (data) => {
                    setTimeout(() => {
                        this.handleOnChangeSubject(data);
                    }, 0);
                }
            });
            this.subs.push(sub1);
        }
    }
    ngOnDestroy() {
        console.log('D3 destroy called.');
        this.stopSimulation();
        this.isDestroyed = true;
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    handleOnChangeSubject(data) {
        if (data && !this.isDestroyed) {
            switch (data.type) {
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphEventType"].DATA_CHANGED:
                    this.render(data.payload);
                    break;
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphEventType"].STOP_SIMULATION:
                    this.stopSimulation();
                    break;
                default:
                    break;
            }
        }
    }
    stopSimulation() {
        var _a;
        console.log('D3 stop simulation called.');
        (_a = this.simulation) === null || _a === void 0 ? void 0 : _a.stop();
        this.graphService.isSimulating = false;
    }
    render(data) {
        this.graphService.isLoading = true;
        this.width = this.containerElementRef.nativeElement.clientWidth;
        this.height = this.containerElementRef.nativeElement.clientHeight;
        this.createSvg();
        if (data) {
            const nodes = data.nodes.map((e) => {
                return {
                    type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].NODE,
                    id: e.data.id,
                    name: e.data.name,
                    weight: e.data.weight
                };
            });
            const edges = data.edges.map((e) => {
                var _a;
                return {
                    type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphElementType"].EDGE,
                    source: e.data.source,
                    target: e.data.target,
                    strength: e.data.strength,
                    transfer: (_a = e.scratch) === null || _a === void 0 ? void 0 : _a.transfer
                };
            });
            if (this.simulation) {
                this.simulation.stop();
            }
            this.simulation = d3__WEBPACK_IMPORTED_MODULE_1__["forceSimulation"](nodes)
                .force('link', d3__WEBPACK_IMPORTED_MODULE_1__["forceLink"](edges).id((d) => d.id))
                .force('charge', d3__WEBPACK_IMPORTED_MODULE_1__["forceManyBody"]().strength(-400))
                .force('center', d3__WEBPACK_IMPORTED_MODULE_1__["forceCenter"](this.width / 2, this.height / 2))
                .force('x', d3__WEBPACK_IMPORTED_MODULE_1__["forceX"]())
                .force('y', d3__WEBPACK_IMPORTED_MODULE_1__["forceY"]())
                .on('end', () => {
                this.graphService.isSimulating = false;
            });
            this.graphService.isSimulating = true;
            this.edge = this.g
                .selectAll('.edge')
                .data(edges)
                .join('line')
                .attr('class', 'graphElement')
                .attr('marker-end', 'url(#arrowhead)')
                .attr('stroke', (d) => {
                var _a;
                if ((_a = d === null || d === void 0 ? void 0 : d.transfer) === null || _a === void 0 ? void 0 : _a.type) {
                    switch (d.transfer.type) {
                        case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].MINT:
                            return _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_MINT_COLOR;
                        case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].BURN:
                            return _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_BURN_COLOR;
                        default:
                            break;
                    }
                }
                return _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_TRANSFER_COLOR;
            })
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 2)
                .on('click', this.handleClick);
            if (this.graphService.drawEdgeLabel) {
                this.edgeLabel = this.g
                    .selectAll('.edgeLabel')
                    .data(edges)
                    .enter()
                    .append('text')
                    .style('pointer-events', 'none')
                    .attr('font-size', 5)
                    .attr('fill', 'black')
                    .attr('class', 'graphElement')
                    .text((d) => { var _a, _b, _c; return (_c = (_b = (_a = d.transfer) === null || _a === void 0 ? void 0 : _a.args) === null || _b === void 0 ? void 0 : _b.amount) !== null && _c !== void 0 ? _c : d.type; });
            }
            this.node = this.g
                .selectAll('.node')
                .data(nodes)
                .join('circle')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5)
                .attr('r', (d) => Math.max(5, (d.weight / 10) + 5))
                .attr('fill', _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].NODE_COLOR)
                .attr('class', 'graphElement')
                .on('click', this.handleClick)
                .call(this.drag());
            if (this.graphService.drawNodeLabel) {
                this.nodeLabel = this.g
                    .selectAll('.nodeLabel')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .attr('font-size', 10)
                    .attr('fill', 'black')
                    .attr('class', 'graphElement')
                    .text((d) => d.name);
            }
            this.node.append('title')
                .text((d) => d.id);
            this.node.append('text')
                .attr('font-size', 10)
                .attr('fill', 'black')
                .text((d) => {
                return d.name;
            });
            this.simulation.on('tick', () => {
                this.graphService.isSimulating = true;
                this.edge
                    .attr('x1', (d) => d.source.x)
                    .attr('y1', (d) => d.source.y)
                    .attr('x2', (d) => d.target.x)
                    .attr('y2', (d) => d.target.y);
                if (this.graphService.drawEdgeLabel) {
                    this.edgeLabel
                        .attr('x', (d) => (d.source.x + d.target.x) / 2)
                        .attr('y', (d) => (d.source.y + d.target.y) / 2);
                }
                this.node
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y);
                if (this.graphService.drawNodeLabel) {
                    this.nodeLabel
                        .attr('x', (d) => d.x)
                        .attr('y', (d) => d.y);
                }
            });
            this.connectedLookup = {};
            edges.forEach((d) => {
                this.connectedLookup[`${d.source.id},${d.target.id}`] = true;
            });
            this.center(0);
            this.graphService.isLoading = false;
        }
    }
    createSvg() {
        d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#svgContainer').remove();
        this.svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#container')
            .append('svg')
            .attr('id', 'svgContainer')
            .attr('width', this.width)
            .attr('height', this.height)
            .on('click', () => {
            this.g.selectAll('.graphElement').style('opacity', 1);
            this.selectEmitter.emit(undefined);
        });
        // Draw arrows
        if (this.graphService.drawArrow) {
            this.svg.append('defs')
                .append('marker')
                .attr('id', 'arrowhead')
                .attr('viewBox', '-0 -5 10 10')
                .attr('refX', 10)
                .attr('refY', 0)
                .attr('orient', 'auto')
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('xoverflow', 'visible')
                .append('svg:path')
                .attr('d', 'M 0,-2.5 L 5,0 L 0,2.5')
                .attr('fill', '#ccc')
                .attr('stroke', '#ccc');
        }
        this.g = this.svg.append('g');
        this.zoom = d3__WEBPACK_IMPORTED_MODULE_1__["zoom"]()
            .extent([[0, 0], [this.width, this.height]])
            .scaleExtent([0, 10])
            .on('zoom', (e) => {
            this.g.attr('transform', e.transform);
        });
        this.svg.call(this.zoom);
    }
    drag() {
        const dragstarted = (event, d) => {
            if (!event.active) {
                this.simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        };
        const dragged = (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
        };
        const dragended = (event, d) => {
            if (!event.active) {
                this.simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        };
        return d3__WEBPACK_IMPORTED_MODULE_1__["drag"]()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
    isConnected(a, b) {
        return this.isConnectedAsTarget(a, b) || this.isConnectedAsSource(a, b) || a === b;
    }
    isConnectedAsSource(a, b) {
        return this.connectedLookup[`${a},${b}`];
    }
    isConnectedAsTarget(a, b) {
        return this.connectedLookup[`${b},${a}`];
    }
    center(count) {
        if (!this.isDestroyed) {
            const { width, height } = this.g.node().getBBox();
            if (width && height) {
                const scale = Math.min(this.width / width, this.height / height) * 0.8;
                if (count > 0) {
                    this.svg.transition()
                        .duration(750)
                        .call(this.zoom.scaleTo, scale);
                }
            }
            if (this.graphService.isSimulating && count < 5) {
                setTimeout(() => {
                    this.center(++count);
                }, 1000);
            }
        }
    }
}
D3Component.ɵfac = function D3Component_Factory(t) { return new (t || D3Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_6__["GraphService"])); };
D3Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: D3Component, selectors: [["hopr-d3"]], viewQuery: function D3Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, outputs: { selectEmitter: "selectEmitter" }, decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function D3Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtBQUNSIiwiZmlsZSI6ImQzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "/2aV":
/*!*************************************!*\
  !*** ./src/app/enums/chain.enum.ts ***!
  \*************************************/
/*! exports provided: ChainType, ChainTxEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainType", function() { return ChainType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainTxEventType", function() { return ChainTxEventType; });
var ChainType;
(function (ChainType) {
    ChainType[ChainType["TEST"] = 0] = "TEST";
    ChainType[ChainType["ETH_MAIN"] = 1] = "ETH_MAIN";
    ChainType[ChainType["XDAI_MAIN"] = 2] = "XDAI_MAIN";
})(ChainType || (ChainType = {}));
var ChainTxEventType;
(function (ChainTxEventType) {
    ChainTxEventType[ChainTxEventType["UNKNOWN"] = 0] = "UNKNOWN";
    ChainTxEventType[ChainTxEventType["MINT"] = 1] = "MINT";
    ChainTxEventType[ChainTxEventType["TRANSFER"] = 2] = "TRANSFER";
    ChainTxEventType[ChainTxEventType["BURN"] = 3] = "BURN";
})(ChainTxEventType || (ChainTxEventType = {}));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! G:\Projects\GitHub\hopr-network-graph\src\main.ts */"zUnb");


/***/ }),

/***/ "0afA":
/*!*************************************************************!*\
  !*** ./src/app/components/cytoscape/cytoscape.component.ts ***!
  \*************************************************************/
/*! exports provided: CytoscapeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CytoscapeComponent", function() { return CytoscapeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cytoscape */ "ROFb");
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cytoscape__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cytoscape_fcose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cytoscape-fcose */ "D1Mh");
/* harmony import */ var cytoscape_fcose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cytoscape_fcose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cytoscape_klay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cytoscape-klay */ "jfV5");
/* harmony import */ var cytoscape_klay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cytoscape_klay__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");










const _c0 = ["containerElementRef"];
class CytoscapeComponent {
    constructor(graphService) {
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.subs = [];
        cytoscape__WEBPACK_IMPORTED_MODULE_1___default.a.use(cytoscape_fcose__WEBPACK_IMPORTED_MODULE_2___default.a);
        cytoscape__WEBPACK_IMPORTED_MODULE_1___default.a.use(cytoscape_klay__WEBPACK_IMPORTED_MODULE_3___default.a);
        this.layout = this.layout || {
            name: 'grid',
            animate: false,
            spacingFactor: 2
        };
        this.zoom = this.zoom || {
            min: 0.01,
            max: 3.0
        };
        this.style = this.style || [
            {
                selector: 'node',
                style: {
                    'height': 'mapData(weight, 1, 100, 20, 60)',
                    'width': 'mapData(weight, 1, 100, 20, 60)',
                    'font-size': 'mapData(weight, 1, 100, 5, 10)',
                    // 'content': 'data(name)',
                    'text-valign': 'center',
                    'background-color': _app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].NODE_COLOR
                }
            },
            {
                selector: ':selected',
                style: {
                    'border-width': 3,
                    'border-color': 'black',
                    'background-color': '#999'
                }
            },
            {
                selector: 'edge',
                style: {
                    // 'curve-style': 'bezier',
                    'curve-style': 'straight',
                    // 'curve-style': 'haystack',
                    'opacity': 0.666,
                    'width': 1,
                    // 'width': 'mapData(strength, 1, 100, 1, 10)',
                    'target-arrow-shape': 'triangle',
                    'line-color': (d) => {
                        var _a;
                        switch (((_a = d === null || d === void 0 ? void 0 : d.scratch('transfer')) === null || _a === void 0 ? void 0 : _a.type) || _enums_chain_enum__WEBPACK_IMPORTED_MODULE_5__["ChainTxEventType"].UNKNOWN) {
                            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_5__["ChainTxEventType"].MINT:
                                return _app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].TX_EVENT_MINT_COLOR;
                            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_5__["ChainTxEventType"].BURN:
                                return _app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].TX_EVENT_BURN_COLOR;
                            default:
                                break;
                        }
                        return _app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].TX_EVENT_TRANSFER_COLOR;
                    }
                }
            },
            {
                selector: '.faded',
                style: {
                    'opacity': 0,
                    'text-opacity': 0
                }
            }
        ];
    }
    ngOnInit() {
        if (this.graphService.onChangeSubject) {
            const sub1 = this.graphService.onChangeSubject.subscribe({
                next: (data) => {
                    setTimeout(() => {
                        this.handleOnChangeSubject(data);
                    }, 0);
                }
            });
            this.subs.push(sub1);
        }
    }
    ngOnDestroy() {
        console.log('Cytoscape destroy called.');
        this.cy.destroy();
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    handleOnChangeSubject(data) {
        if (data) {
            switch (data.type) {
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_6__["GraphEventType"].DATA_CHANGED:
                    this.render(data.payload);
                    break;
                default:
                    break;
            }
        }
    }
    render(data) {
        this.graphService.isLoading = true;
        if (data) {
            if (this.cy) {
                this.cy.destroy();
            }
            this.cy = cytoscape__WEBPACK_IMPORTED_MODULE_1___default()({
                container: this.containerElementRef.nativeElement,
                layout: this.layout,
                minZoom: this.zoom.min,
                maxZoom: this.zoom.max,
                style: this.style,
                elements: data,
            });
            this.cy.on('tap', 'node', (e) => {
                const node = e.target;
                if (node.selected()) {
                    node.unselect();
                    this.unselectAll();
                }
                else {
                    const neighborhood = node.neighborhood().add(node);
                    this.cy.elements().addClass('faded');
                    neighborhood.removeClass('faded');
                    this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["NodeGraphModel"]({
                        data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["NodeDataModel"]({
                            id: node.data('id'),
                            name: node.data('name'),
                            weight: node.data('weight')
                        })
                    }));
                }
            });
            this.cy.on('tap', 'edge', (e) => {
                const edge = e.target;
                if (edge.selected()) {
                    edge.unselect();
                    this.unselectAll();
                }
                else {
                    this.cy.elements().addClass('faded');
                    edge.removeClass('faded');
                    edge.source().removeClass('faded');
                    edge.target().removeClass('faded');
                    this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["EdgeGraphModel"]({
                        data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["EdgeDataModel"]({
                            source: edge.data('source'),
                            target: edge.data('target'),
                            strength: edge.data('strength')
                        }),
                        scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["GraphScratchModel"]({
                            transfer: edge.scratch('transfer')
                        })
                    }));
                }
            });
            this.cy.on('tap', (e) => {
                if (e.target === this.cy) {
                    this.unselectAll();
                }
            });
        }
        this.graphService.isLoading = false;
    }
    unselectAll() {
        this.cy.elements().removeClass('faded');
        this.selectEmitter.emit(undefined);
    }
}
CytoscapeComponent.ɵfac = function CytoscapeComponent_Factory(t) { return new (t || CytoscapeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_8__["GraphService"])); };
CytoscapeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CytoscapeComponent, selectors: [["hopr-cytoscape"]], viewQuery: function CytoscapeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, inputs: { style: "style", layout: "layout", zoom: "zoom" }, outputs: { selectEmitter: "selectEmitter" }, decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function CytoscapeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN5dG9zY2FwZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLE1BQU07QUFDUiIsImZpbGUiOiJjeXRvc2NhcGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 1:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "FzN6":
/*!*****************************************************!*\
  !*** ./src/app/components/graph/graph.component.ts ***!
  \*****************************************************/
/*! exports provided: GraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphComponent", function() { return GraphComponent; });
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/config.service */ "r4Kj");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cytoscape/cytoscape.component */ "0afA");
/* harmony import */ var _d3_d3_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../d3/d3.component */ "+yM7");








function GraphComponent_hopr_cytoscape_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "hopr-cytoscape", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("selectEmitter", function GraphComponent_hopr_cytoscape_1_Template_hopr_cytoscape_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function GraphComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "hopr-d3", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("selectEmitter", function GraphComponent_ng_template_2_Template_hopr_d3_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r10.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function GraphComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Loading... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function GraphComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r5.message, " ");
} }
function GraphComponent_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Selected node ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "address: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx_r12.buildAddressUrl(ctx_r12.node == null ? null : ctx_r12.node.data == null ? null : ctx_r12.node.data.id), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r12.node == null ? null : ctx_r12.node.data == null ? null : ctx_r12.node.data.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("weight: ", ctx_r12.node == null ? null : ctx_r12.node.data == null ? null : ctx_r12.node.data.weight, "");
} }
function GraphComponent_div_8_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Selected edge (transactionHash: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "source: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "target: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx_r14.buildTxUrl(ctx_r14.edge == null ? null : ctx_r14.edge.scratch == null ? null : ctx_r14.edge.scratch.transfer == null ? null : ctx_r14.edge.scratch.transfer.transactionHash), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r14.edge == null ? null : ctx_r14.edge.scratch == null ? null : ctx_r14.edge.scratch.transfer == null ? null : ctx_r14.edge.scratch.transfer.transactionHash, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx_r14.buildAddressUrl(ctx_r14.edge == null ? null : ctx_r14.edge.data == null ? null : ctx_r14.edge.data.source), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r14.edge == null ? null : ctx_r14.edge.data == null ? null : ctx_r14.edge.data.source);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx_r14.buildAddressUrl(ctx_r14.edge == null ? null : ctx_r14.edge.data == null ? null : ctx_r14.edge.data.target), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r14.edge == null ? null : ctx_r14.edge.data == null ? null : ctx_r14.edge.data.target);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("amount: ", ctx_r14.edge == null ? null : ctx_r14.edge.scratch == null ? null : ctx_r14.edge.scratch.transfer == null ? null : ctx_r14.edge.scratch.transfer.args == null ? null : ctx_r14.edge.scratch.transfer.args.amount, "");
} }
function GraphComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, GraphComponent_div_8_div_1_Template, 9, 3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, GraphComponent_div_8_ng_template_2_Template, 14, 7, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r6.node)("ngIfElse", _r13);
} }
function GraphComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function GraphComponent_ng_container_10_Template_input_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17); const kvp_r15 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r16.changeFilter(kvp_r15.key, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const kvp_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", kvp_r15.key)("name", kvp_r15.key)("checked", kvp_r15.value.isSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("for", kvp_r15.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("color", kvp_r15.value.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](kvp_r15.value.name);
} }
const _c0 = function (a0) { return { "loading": a0 }; };
class GraphComponent {
    constructor(configService, graphService) {
        this.configService = configService;
        this.graphService = graphService;
        this.subs = [];
    }
    ngOnInit() {
        if (this.graphService.onChangeSubject) {
            const sub1 = this.graphService.onChangeSubject.subscribe({
                next: (data) => {
                    setTimeout(() => {
                        this.handleOnChangeSubject(data);
                    }, 0);
                }
            });
            this.subs.push(sub1);
        }
    }
    ngOnDestroy() {
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    handleOnChangeSubject(data) {
        if (data) {
            switch (data.type) {
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphEventType"].DATA_CHANGED:
                    this.onDataChanged(data.payload);
                    break;
                default:
                    break;
            }
        }
    }
    onDataChanged(data) {
        this.node = undefined;
        this.edge = undefined;
        if (Array.isArray(data === null || data === void 0 ? void 0 : data.nodes) && data.nodes.length > 0) {
            this.message = undefined;
        }
        else {
            this.message = 'Graph is empty. Consider changing the minimum weight.';
        }
    }
    nodeChange(event) {
        if (event instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["NodeGraphModel"]) {
            this.node = event;
            this.edge = undefined;
        }
        else if (event instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["EdgeGraphModel"]) {
            this.edge = event;
            this.node = undefined;
        }
        else {
            this.node = undefined;
            this.edge = undefined;
        }
    }
    get isLoading() {
        return this.graphService.isLoading;
    }
    get useCytoscapeLibrary() {
        return this.configService.config.selectedGraphLibraryType === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphLibraryType"].CYTOSCAPE;
    }
    get filter() {
        return this.graphService.filter;
    }
    buildAddressUrl(address) {
        var _a, _b;
        if (address && ((_b = (_a = this.configService.config) === null || _a === void 0 ? void 0 : _a.selectedChain) === null || _b === void 0 ? void 0 : _b.addressUrl)) {
            return this.configService.config.selectedChain.addressUrl.replace('{address}', address);
        }
        return undefined;
    }
    buildTxUrl(transactionHash) {
        var _a, _b;
        if (transactionHash && ((_b = (_a = this.configService.config) === null || _a === void 0 ? void 0 : _a.selectedChain) === null || _b === void 0 ? void 0 : _b.txUrl)) {
            return this.configService.config.selectedChain.txUrl.replace('{transactionHash}', transactionHash);
        }
        return undefined;
    }
    changeFilter(id, event) {
        this.graphService.changeFilter(id);
    }
}
GraphComponent.ɵfac = function GraphComponent_Factory(t) { return new (t || GraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_4__["GraphService"])); };
GraphComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: GraphComponent, selectors: [["hopr-network-graph"]], decls: 12, vars: 11, consts: [["id", "graphContainer", 3, "ngClass"], [3, "selectEmitter", 4, "ngIf", "ngIfElse"], ["showD3Block", ""], ["id", "infoContainer"], [4, "ngIf", "ngIfElse"], ["showMessageBlock", ""], [4, "ngIf"], ["id", "filter"], [4, "ngFor", "ngForOf"], [3, "selectEmitter"], ["showEdgeBlock", ""], ["target", "_blank", 3, "href"], ["type", "checkbox", 3, "id", "name", "checked", "change"], [3, "for"]], template: function GraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, GraphComponent_hopr_cytoscape_1_Template, 1, 0, "hopr-cytoscape", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, GraphComponent_ng_template_2_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, GraphComponent_div_5_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, GraphComponent_ng_template_6_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, GraphComponent_div_8_Template, 4, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, GraphComponent_ng_container_10_Template, 5, 7, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](9, _c0, ctx.isLoading));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.useCytoscapeLibrary)("ngIfElse", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading)("ngIfElse", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.node || ctx.edge);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 7, ctx.filter));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_6__["CytoscapeComponent"], _d3_d3_component__WEBPACK_IMPORTED_MODULE_7__["D3Component"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["KeyValuePipe"]], styles: ["#graphContainer[_ngcontent-%COMP%] {\r\n  height: 80vh;\r\n  float: left;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n.loading[_ngcontent-%COMP%] {\r\n  background-color: black;\r\n  opacity: 0.5;\r\n}\r\n\r\n#infoContainer[_ngcontent-%COMP%] {\r\n  float: left;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n#filter[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFFBQVE7QUFDViIsImZpbGUiOiJncmFwaC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2dyYXBoQ29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDgwdmg7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4ubG9hZGluZyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4jaW5mb0NvbnRhaW5lciB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4jZmlsdGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "Hg6u":
/*!**************************************!*\
  !*** ./src/app/utils/common.util.ts ***!
  \**************************************/
/*! exports provided: CommonUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonUtil", function() { return CommonUtil; });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bignumber */ "OheS");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "wDBh");


class CommonUtil {
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    static isNullOrWhitespace(value) {
        if (!CommonUtil.isString(value)) {
            // console.log('Expected a string but got: ', value);
            return true;
        }
        else {
            return value === null || value === undefined || value.trim() === '';
        }
    }
    static download(blob) {
        const textFile = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('download', 'data.json');
        link.href = textFile;
        document.body.appendChild(link);
        // wait for the link to be added to the document
        window.requestAnimationFrame(() => {
            const event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
            // revoke the object URL to avoid memory leaks.
            window.URL.revokeObjectURL(textFile);
        });
    }
    static toBigNumber(bn) {
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(bn);
    }
    static formatBigNumber(bn) {
        return ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].utils.formatUnits(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(bn), 18);
    }
}


/***/ }),

/***/ "Qlbi":
/*!*************************************!*\
  !*** ./src/app/enums/graph.enum.ts ***!
  \*************************************/
/*! exports provided: GraphElementType, GraphLibraryType, GraphEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphElementType", function() { return GraphElementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphLibraryType", function() { return GraphLibraryType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphEventType", function() { return GraphEventType; });
var GraphElementType;
(function (GraphElementType) {
    GraphElementType[GraphElementType["NODE"] = 0] = "NODE";
    GraphElementType[GraphElementType["EDGE"] = 1] = "EDGE";
})(GraphElementType || (GraphElementType = {}));
var GraphLibraryType;
(function (GraphLibraryType) {
    GraphLibraryType[GraphLibraryType["D3"] = 0] = "D3";
    GraphLibraryType[GraphLibraryType["CYTOSCAPE"] = 1] = "CYTOSCAPE";
})(GraphLibraryType || (GraphLibraryType = {}));
var GraphEventType;
(function (GraphEventType) {
    GraphEventType[GraphEventType["DATA_CHANGED"] = 0] = "DATA_CHANGED";
    GraphEventType[GraphEventType["STOP_SIMULATION"] = 1] = "STOP_SIMULATION";
})(GraphEventType || (GraphEventType = {}));


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_chain_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/chain.model */ "tUmK");
/* harmony import */ var _models_library_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/library.model */ "bVYH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/config.service */ "r4Kj");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/graph.service */ "Tv8v");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/graph/graph.component */ "FzN6");









function AppComponent_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const chain_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", chain_r5.type)("selected", chain_r5.type === ctx_r1.selectedChainType);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", chain_r5.name, " ");
} }
function AppComponent_option_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const library_r6 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", library_r6.type)("selected", library_r6.type === ctx_r3.selectedLibraryType);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", library_r6.name, " ");
} }
function AppComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r7.stopSimulation(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Stop simulation");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(configService, graphService) {
        this.configService = configService;
        this.graphService = graphService;
        this.minWeight = 0;
        this.selectedLibraryType = _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].D3;
        this.selectedChainType = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"].TEST;
        this.chains = [
            new _models_chain_model__WEBPACK_IMPORTED_MODULE_2__["ChainModel"]({
                type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"].ETH_MAIN,
                name: 'ETH mainnet'
            }),
            new _models_chain_model__WEBPACK_IMPORTED_MODULE_2__["ChainModel"]({
                type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"].XDAI_MAIN,
                name: 'xDai chain'
            })
        ];
        this.libraries = [
            new _models_library_model__WEBPACK_IMPORTED_MODULE_3__["LibraryModel"]({
                type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].D3,
                name: 'd3'
            }),
            new _models_library_model__WEBPACK_IMPORTED_MODULE_3__["LibraryModel"]({
                type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].CYTOSCAPE,
                name: 'cytoscape'
            })
        ];
        this.setMinWeight();
        this.setSelectedLibraryType();
        this.setSelectedChainType();
        this.load();
    }
    changeMinWeight($event) {
        this.configService.config.minWeight = $event.target.value;
        this.setMinWeight();
        this.load();
    }
    changeChain($event) {
        this.configService.config.selectedChainType = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"][$event.target.value]];
        this.setSelectedChainType();
        this.load();
    }
    changeLibrary($event) {
        this.configService.config.selectedGraphLibraryType = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"][$event.target.value]];
        this.setSelectedLibraryType();
        this.load();
    }
    get showStopSimulationButton() {
        return this.graphService.isSimulating && this.configService.config.selectedGraphLibraryType === _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].D3;
    }
    stopSimulation() {
        this.graphService.stopSimulation();
    }
    setMinWeight() {
        this.minWeight = this.configService.config.minWeight;
    }
    setSelectedChainType() {
        this.selectedChainType = this.configService.config.selectedChainType;
    }
    setSelectedLibraryType() {
        this.selectedLibraryType = this.configService.config.selectedGraphLibraryType;
    }
    load() {
        this.graphService.load();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_6__["GraphService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["hopr-root"]], decls: 12, vars: 5, consts: [[3, "change"], ["dropdown", ""], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["type", "range", "min", "0", "max", "100", "step", "1", 3, "value", "change"], [3, "click", 4, "ngIf"], [3, "value", "selected"], [3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, "HOPR network graph ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "select", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function AppComponent_Template_select_change_1_listener($event) { return ctx.changeChain($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, AppComponent_option_3_Template, 2, 3, "option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " min. weight ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function AppComponent_Template_input_change_5_listener($event) { return ctx.changeMinWeight($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "select", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function AppComponent_Template_select_change_7_listener($event) { return ctx.changeLibrary($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, AppComponent_option_9_Template, 2, 3, "option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, AppComponent_button_10_Template, 2, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "hopr-network-graph");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.chains);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.minWeight);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\n", ctx.minWeight, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.libraries);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showStopSimulationButton);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_8__["GraphComponent"]], styles: ["button[_ngcontent-%COMP%] {\r\n  margin: 0 5px 0 5px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uIHtcclxuICBtYXJnaW46IDAgNXB4IDAgNXB4O1xyXG59Il19 */"] });


/***/ }),

/***/ "Tv8v":
/*!*******************************************!*\
  !*** ./src/app/services/graph.service.ts ***!
  \*******************************************/
/*! exports provided: GraphService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphService", function() { return GraphService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_chain_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/chain.model */ "tUmK");
/* harmony import */ var _models_config_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/config.model */ "oRqo");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/graph.model */ "XZxx");
/* harmony import */ var _models_transfer_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../models/transfer.model */ "lLpu");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");
/* harmony import */ var _utils_json_util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/json.util */ "gjW3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config.service */ "r4Kj");













class GraphService {
    constructor(configService) {
        this.configService = configService;
        this.isLoading = false;
        this.isSimulating = false;
        this.drawArrow = false;
        this.drawEdgeLabel = false;
        this.drawNodeLabel = false;
        this._onChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.filter = new Map([
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].MINT],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_5__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].MINT],
                    name: 'Mint',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_MINT_COLOR
                })
            ],
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].TRANSFER],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_5__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].TRANSFER],
                    name: 'Transfer',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_TRANSFER_COLOR
                })
            ],
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].BURN],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_5__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].BURN],
                    name: 'Burn',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_BURN_COLOR
                })
            ]
        ]);
    }
    get onChangeSubject() {
        return this._onChangeSubject;
    }
    load() {
        this.isLoading = true;
        this.loadAsync().finally();
    }
    loadAsync() {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._nodeMap = new Map();
            if ((_a = this.configService.config) === null || _a === void 0 ? void 0 : _a.selectedChain) {
                const data = yield this.init((_b = this.configService.config) === null || _b === void 0 ? void 0 : _b.selectedChain);
                this.submitDataSubjectEvent(data);
            }
            else {
                this.submitDataSubjectEvent(undefined);
            }
        });
    }
    init(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_9__["Ensure"].notNull(chain, _models_config_model__WEBPACK_IMPORTED_MODULE_6__["ConfigChainModel"].name);
            const rawData = yield _utils_json_util__WEBPACK_IMPORTED_MODULE_10__["JsonUtil"].loadLocalAsync(chain.jsonPath);
            if (chain.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainType"].TEST) {
                this._data = this.convertTestData(rawData);
            }
            else {
                this._data = this.convertChainData(rawData);
            }
            return this.applyFilters(this._data);
        });
    }
    stopSimulation() {
        this._onChangeSubject.next(new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["GraphEventModel"]({
            type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphEventType"].STOP_SIMULATION,
            payload: undefined
        }));
    }
    changeFilter(id) {
        this.isLoading = true;
        const item = this.filter.get(id);
        if (item) {
            item.isSelected = !item.isSelected;
        }
        const data = this.applyFilters(this._data);
        this.submitDataSubjectEvent(data);
    }
    convertTestData(testData) {
        const data = this.createGraphContainerModel();
        if (Array.isArray(testData === null || testData === void 0 ? void 0 : testData.nodes) && Array.isArray(testData === null || testData === void 0 ? void 0 : testData.edges)) {
            data.nodes = testData === null || testData === void 0 ? void 0 : testData.nodes;
            data.edges = testData === null || testData === void 0 ? void 0 : testData.edges;
            for (const node of data.nodes) {
                this._nodeMap.set(node.data.id, node);
            }
        }
        return data;
    }
    convertChainData(chainData) {
        const data = this.createGraphContainerModel();
        if (Array.isArray(chainData)) {
            for (const element of chainData) {
                if (element.event === 'Transfer') {
                    this.addGraphElements(this.createTransferModel(element), data);
                }
            }
        }
        return data;
    }
    addGraphElements(transfer, data) {
        this.tryAddNode(transfer.args.from, data);
        this.tryAddNode(transfer.args.to, data);
        data.edges.push(this.createEdgeModel(transfer));
    }
    tryAddNode(address, data) {
        if (this._nodeMap.has(address)) {
            const node = this._nodeMap.get(address);
            node.data.weight = Math.min(++node.data.weight, 100);
        }
        else {
            const node = this.createNodeModel(address);
            this._nodeMap.set(address, node);
            data.nodes.push(node);
        }
    }
    applyFilters(data) {
        let filteredData;
        filteredData = this.filterByWeight(data, this.configService.config.minWeight);
        filteredData = this.filterBySelection(filteredData);
        return filteredData;
    }
    filterByWeight(data, minWeight) {
        console.log('nodes/edges before filterByWeight', data.nodes.length, '/', data.edges.length);
        const result = this.createGraphContainerModel();
        result.nodes = data.nodes.filter((e) => { var _a; return ((_a = this._nodeMap.get(e.data.id)) === null || _a === void 0 ? void 0 : _a.data.weight) > minWeight; });
        result.edges = data.edges.filter((e) => {
            var _a, _b;
            return ((_a = this._nodeMap.get(e.data.source)) === null || _a === void 0 ? void 0 : _a.data.weight) > minWeight
                && ((_b = this._nodeMap.get(e.data.target)) === null || _b === void 0 ? void 0 : _b.data.weight) > minWeight;
        });
        console.log('nodes/edges after filterByWeight', result.nodes.length, '/', result.edges.length);
        return result;
    }
    filterBySelection(data) {
        var _a, _b;
        let result;
        const filterItems = Array.from(this.filter.values());
        // Check if any item is not selected
        if (filterItems.filter(e => !e.isSelected).length > 0) {
            result = this.createGraphContainerModel();
            // Check if any item is selected
            const selectedItems = filterItems.filter(e => e.isSelected);
            if (selectedItems.length === 0) {
                return result;
            }
            const types = selectedItems.map(e => e.id);
            for (const edge of data.edges) {
                if (types.includes(_enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"][(_b = (_a = edge.scratch) === null || _a === void 0 ? void 0 : _a.transfer) === null || _b === void 0 ? void 0 : _b.type])) {
                    result.edges.push(edge);
                    result.nodes.push(this._nodeMap.get(edge.data.source));
                    result.nodes.push(this._nodeMap.get(edge.data.target));
                }
            }
            // Remove duplicates
            result.nodes = [...new Set(result.nodes)];
        }
        else {
            result = data;
        }
        return result;
    }
    submitDataSubjectEvent(data) {
        this._onChangeSubject.next(new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["GraphEventModel"]({
            type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_4__["GraphEventType"].DATA_CHANGED,
            payload: data
        }));
    }
    createGraphContainerModel() {
        // Cytoscape does not work with instance of GraphContainerModel
        // TODO: replace with "return new GraphContainerModel();"
        return {
            nodes: [],
            edges: []
        };
    }
    createTransferModel(element) {
        if (element) {
            const model = new _models_transfer_model__WEBPACK_IMPORTED_MODULE_8__["TransferModel"](element);
            model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].TRANSFER;
            if (model.args.from === _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].VOID_ADDRESS) {
                model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].MINT;
            }
            else if (model.args.to === _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].VOID_ADDRESS) {
                model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].BURN;
            }
            return model;
        }
        return undefined;
    }
    createNodeModel(address) {
        return new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["NodeGraphModel"]({
            data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["NodeDataModel"]({
                id: address,
                name: address.substring(0, 4)
            })
        });
    }
    createEdgeModel(transfer) {
        return new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["EdgeGraphModel"]({
            data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["EdgeDataModel"]({
                source: transfer.args.from,
                target: transfer.args.to
            }),
            scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["GraphScratchModel"]({
                transfer
            })
        });
    }
}
GraphService.ɵfac = function GraphService_Factory(t) { return new (t || GraphService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_12__["ConfigService"])); };
GraphService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({ token: GraphService, factory: GraphService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "XZxx":
/*!***************************************!*\
  !*** ./src/app/models/graph.model.ts ***!
  \***************************************/
/*! exports provided: BaseGraphModel, NodeGraphModel, NodeDataModel, EdgeGraphModel, EdgeDataModel, GraphContainerModel, GraphScratchModel, GraphEventModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseGraphModel", function() { return BaseGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeGraphModel", function() { return NodeGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeDataModel", function() { return NodeDataModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeGraphModel", function() { return EdgeGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeDataModel", function() { return EdgeDataModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphContainerModel", function() { return GraphContainerModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphScratchModel", function() { return GraphScratchModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphEventModel", function() { return GraphEventModel; });
class BaseGraphModel {
    constructor(init) {
        this.selected = false; // whether the element is selected (default false)
        this.selectable = true; // whether the selection state is mutable (default true)
        this.locked = false; // when locked a node's position is immutable (default false)
        this.grabbable = true; // whether the node can be grabbed and moved by the user
        this.pannable = false; // whether dragging the node causes panning instead of grabbing
        Object.assign(this, init);
    }
}
class NodeGraphModel extends BaseGraphModel {
    constructor(init) {
        super(init);
        Object.assign(this, init);
    }
    get group() {
        return 'nodes';
    }
}
class NodeDataModel {
    constructor(init) {
        this.weight = 1;
        Object.assign(this, init);
    }
}
class EdgeGraphModel extends BaseGraphModel {
    constructor(init) {
        super(init);
        Object.assign(this, init);
    }
    get group() {
        return 'edges';
    }
}
class EdgeDataModel {
    constructor(init) {
        this.strength = 1;
        Object.assign(this, init);
    }
}
class GraphContainerModel {
    constructor(init) {
        Object.assign(this, init);
        if (!this.nodes) {
            this.nodes = [];
        }
        if (!this.edges) {
            this.edges = [];
        }
    }
}
class GraphScratchModel {
    constructor(init) {
        Object.assign(this, init);
    }
}
class GraphEventModel {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: initConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initConfig", function() { return initConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cytoscape/cytoscape.component */ "0afA");
/* harmony import */ var _components_d3_d3_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/d3/d3.component */ "+yM7");
/* harmony import */ var _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/graph/graph.component */ "FzN6");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/config.service */ "r4Kj");








function initConfig(config) {
    return () => config.initAsync();
}
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"],
            useFactory: initConfig,
            deps: [_services_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]],
            multi: true
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _components_cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_3__["CytoscapeComponent"],
        _components_d3_d3_component__WEBPACK_IMPORTED_MODULE_4__["D3Component"],
        _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_5__["GraphComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]] }); })();


/***/ }),

/***/ "b4nj":
/*!**************************************!*\
  !*** ./src/app/utils/ensure.util.ts ***!
  \**************************************/
/*! exports provided: Ensure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ensure", function() { return Ensure; });
class Ensure {
    static notNull(property, propertyName) {
        if (property === null || property === undefined) {
            throw new Error('Unexpected null exception. ' + propertyName);
        }
    }
    static notNullOrWhiteSpace(property, propertyName) {
        if (property === null || property === undefined || (property === null || property === void 0 ? void 0 : property.trim()) === '') {
            throw new Error('Unexpected null exception. ' + propertyName);
        }
    }
}


/***/ }),

/***/ "bVYH":
/*!*****************************************!*\
  !*** ./src/app/models/library.model.ts ***!
  \*****************************************/
/*! exports provided: LibraryModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibraryModel", function() { return LibraryModel; });
class LibraryModel {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ "dkQB":
/*!**********************************!*\
  !*** ./src/app/app.constants.ts ***!
  \**********************************/
/*! exports provided: AppConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConstants", function() { return AppConstants; });
class AppConstants {
}
AppConstants.VOID_ADDRESS = '0x0000000000000000000000000000000000000000';
AppConstants.NODE_COLOR = '#0000b4';
AppConstants.TX_EVENT_MINT_COLOR = '#18cc7e';
AppConstants.TX_EVENT_TRANSFER_COLOR = '#999';
AppConstants.TX_EVENT_BURN_COLOR = '#d04a35';


/***/ }),

/***/ "gjW3":
/*!************************************!*\
  !*** ./src/app/utils/json.util.ts ***!
  \************************************/
/*! exports provided: JsonUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonUtil", function() { return JsonUtil; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _common_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.util */ "Hg6u");


class JsonUtil {
    static toString(data) {
        return JSON.stringify(data, null, 2);
    }
    static loadLocalAsync(path) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield fetch(path);
            return yield response.json();
        });
    }
    static download(data) {
        const blob = new Blob([JsonUtil.toString(data)], { type: 'application/json' });
        _common_util__WEBPACK_IMPORTED_MODULE_1__["CommonUtil"].download(blob);
    }
}


/***/ }),

/***/ "lLpu":
/*!******************************************!*\
  !*** ./src/app/models/transfer.model.ts ***!
  \******************************************/
/*! exports provided: TransferModel, TransferArgsModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferModel", function() { return TransferModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferArgsModel", function() { return TransferArgsModel; });
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");

class TransferModel {
    constructor(init) {
        Object.assign(this, init);
        if (init === null || init === void 0 ? void 0 : init.args) {
            this.args = TransferArgsModel.create(init === null || init === void 0 ? void 0 : init.args);
        }
    }
}
class TransferArgsModel {
    constructor(init) {
        Object.assign(this, init);
    }
    static create(items) {
        if (!Array.isArray(items) || items.length !== 3) {
            throw new Error('Invalid transfer arguments.');
        }
        return new TransferArgsModel({
            from: items[0],
            to: items[1],
            amount: _utils_common_util__WEBPACK_IMPORTED_MODULE_0__["CommonUtil"].formatBigNumber(items[2])
        });
    }
}


/***/ }),

/***/ "oRqo":
/*!****************************************!*\
  !*** ./src/app/models/config.model.ts ***!
  \****************************************/
/*! exports provided: ConfigModel, ConfigChainModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigModel", function() { return ConfigModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigChainModel", function() { return ConfigChainModel; });
class ConfigModel {
    constructor(init) {
        Object.assign(this, init);
        if (!this.chains) {
            this.chains = [];
        }
    }
    get selectedChainType() {
        return this._selectedChainType;
    }
    set selectedChainType(value) {
        this._selectedChainType = value;
        this.setSelectedChain(value);
    }
    get selectedChain() {
        var _a;
        if (((_a = this._selectedChain) === null || _a === void 0 ? void 0 : _a.type) !== this._selectedChainType) {
            this.setSelectedChain(this._selectedChainType);
        }
        return this._selectedChain;
    }
    setSelectedChain(value) {
        var _a;
        this._selectedChain = (_a = this.chains) === null || _a === void 0 ? void 0 : _a.find(e => e.type === value);
    }
}
class ConfigChainModel {
    constructor(init) {
        Object.assign(this, init);
        if (!this.tokenContractAbi) {
            this.tokenContractAbi = [];
        }
        if (!this.txEventNames) {
            this.txEventNames = {};
        }
    }
}


/***/ }),

/***/ "r4Kj":
/*!********************************************!*\
  !*** ./src/app/services/config.service.ts ***!
  \********************************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _models_config_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/config.model */ "oRqo");
/* harmony import */ var _utils_json_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/json.util */ "gjW3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class ConfigService {
    constructor() {
        this._config = new _models_config_model__WEBPACK_IMPORTED_MODULE_1__["ConfigModel"]();
    }
    get config() {
        return this._config;
    }
    initAsync() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const config = yield _utils_json_util__WEBPACK_IMPORTED_MODULE_2__["JsonUtil"].loadLocalAsync('./assets/config.json');
            this._config = new _models_config_model__WEBPACK_IMPORTED_MODULE_1__["ConfigModel"](config);
        });
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
ConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "tUmK":
/*!***************************************!*\
  !*** ./src/app/models/chain.model.ts ***!
  \***************************************/
/*! exports provided: ChainModel, ChainFilterItemModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainModel", function() { return ChainModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainFilterItemModel", function() { return ChainFilterItemModel; });
class ChainModel {
    constructor(init) {
        Object.assign(this, init);
    }
}
class ChainFilterItemModel {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map