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
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _utils_graph_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/graph.util */ "n37/");
/* harmony import */ var _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared-graph-lib.component */ "ciip");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/logger.service */ "Mb37");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");










const _c0 = ["containerElementRef"];
class D3Component extends _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_6__["SharedGraphLibComponent"] {
    constructor(logger, graphService) {
        super(logger, graphService);
        this.logger = logger;
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.componentName = 'D3';
        this.handleClick = (event, d) => {
            event.stopPropagation();
            this.g.selectAll('.graphElement').style('opacity', (o) => {
                if (d instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_4__["EdgeViewGraphModel"]) {
                    if (o instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_4__["EdgeViewGraphModel"]) {
                        // d = EDGE and o = EDGE
                        if (o === d) {
                            return 1.0;
                        }
                        return 0;
                    }
                    else if (o instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_4__["NodeViewGraphModel"]) {
                        // d = EDGE and o = NODE
                        if (o.id === d.source.id || o.id === d.target.id) {
                            return 1.0;
                        }
                        return 0;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    if (o instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_4__["EdgeViewGraphModel"]) {
                        // d = NODE and o = EDGE
                        if (o.source.id === d.id || o.target.id === d.id) {
                            return 1.0;
                        }
                        return 0;
                    }
                    else if (o instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_4__["NodeViewGraphModel"]) {
                        // d = NODE and o = NODE
                        if (o.id === d.id) {
                            return 1;
                        }
                        if (this.isConnected(o.id, d.id)) {
                            return 0.5;
                        }
                        return 0;
                    }
                    else {
                        return 0;
                    }
                }
            });
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](event.target).style('opacity', 1);
            super.handleSelectedElement(d);
        };
    }
    ngOnInit() {
        super.onInit();
    }
    ngOnDestroy() {
        super.onDestroy();
    }
    destroy() {
        this.stopSimulation();
    }
    stopSimulation() {
        var _a;
        this.logger.info(`${this.componentName} stop simulation called.`)();
        (_a = this.simulation) === null || _a === void 0 ? void 0 : _a.stop();
        this.graphService.isSimulating = false;
    }
    init(data) {
        super.beforeInit(data);
        this.width = this.containerElementRef.nativeElement.clientWidth;
        this.height = this.containerElementRef.nativeElement.clientHeight;
        this.createSvg();
        if (this.nodes && this.edges) {
            if (this.simulation) {
                this.simulation.stop();
            }
            this.simulation = d3__WEBPACK_IMPORTED_MODULE_1__["forceSimulation"](this.nodes)
                .force('link', d3__WEBPACK_IMPORTED_MODULE_1__["forceLink"](this.edges).id((d) => d.id))
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
                .data(this.edges)
                .join('line')
                .attr('class', 'graphElement')
                .attr('marker-end', 'url(#arrowhead)')
                .attr('stroke', (d) => {
                var _a;
                if ((_a = d === null || d === void 0 ? void 0 : d.refTransfer) === null || _a === void 0 ? void 0 : _a.type) {
                    switch (d.refTransfer.type) {
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
                .attr('stroke-width', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_5__["GraphUtil"].calculateEdgeWidth(d.strength))
                .on('click', this.handleClick);
            if (this.graphService.drawEdgeLabel) {
                this.edgeLabel = this.g
                    .selectAll('.edgeLabel')
                    .data(this.edges)
                    .enter()
                    .append('text')
                    .style('pointer-events', 'none')
                    .attr('font-size', 5)
                    .attr('fill', 'black')
                    .attr('class', 'graphElement')
                    .text((d) => d.name);
            }
            this.node = this.g
                .selectAll('.node')
                .data(this.nodes)
                .join('circle')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5)
                .attr('r', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_5__["GraphUtil"].calculateNodeRadius(d.weight))
                .attr('fill', _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].SECONDARY_COLOR)
                .attr('class', 'graphElement')
                .on('click', this.handleClick)
                .call(this.drag());
            if (this.graphService.drawNodeLabel) {
                this.nodeLabel = this.g
                    .selectAll('.nodeLabel')
                    .data(this.nodes)
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
                .text((d) => d.name);
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
        }
        super.afterInit();
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
        super.registerMouseWheelEvent(this.svg.node());
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
    center(count) {
        if (!this.state.isDestroyed && !this.state.isZoomed) {
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
D3Component.ɵfac = function D3Component_Factory(t) { return new (t || D3Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_7__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_8__["GraphService"])); };
D3Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: D3Component, selectors: [["hopr-d3"]], viewQuery: function D3Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, outputs: { selectEmitter: "selectEmitter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function D3Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtBQUNSIiwiZmlsZSI6ImQzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "/2aV":
/*!*************************************!*\
  !*** ./src/app/enums/chain.enum.ts ***!
  \*************************************/
/*! exports provided: ChainType, ChainTxEventType, ChainSourceType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainType", function() { return ChainType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainTxEventType", function() { return ChainTxEventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainSourceType", function() { return ChainSourceType; });
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
    ChainTxEventType[ChainTxEventType["BRIDGE_START"] = 4] = "BRIDGE_START";
    ChainTxEventType[ChainTxEventType["BRIDGE_END"] = 5] = "BRIDGE_END";
})(ChainTxEventType || (ChainTxEventType = {}));
var ChainSourceType;
(function (ChainSourceType) {
    ChainSourceType[ChainSourceType["UNKNOWN"] = 0] = "UNKNOWN";
    ChainSourceType[ChainSourceType["FILE"] = 1] = "FILE";
    ChainSourceType[ChainSourceType["RPC"] = 2] = "RPC";
    ChainSourceType[ChainSourceType["GRAPHQL"] = 3] = "GRAPHQL";
})(ChainSourceType || (ChainSourceType = {}));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! G:\Projects\GitHub\hopr-network-graph\src\main.ts */"zUnb");


/***/ }),

/***/ "0RC7":
/*!********************************************!*\
  !*** ./src/app/clients/thegraph.client.ts ***!
  \********************************************/
/*! exports provided: TheGraphClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TheGraphClient", function() { return TheGraphClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_subgraph_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/subgraph.model */ "iWl/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class TheGraphClient {
    constructor() {
    }
    handleResponse(response, transformFn) {
        if ((response === null || response === void 0 ? void 0 : response.data) || (response === null || response === void 0 ? void 0 : response.error)) {
            if (response.data) {
                if (Array.isArray(response.data)) {
                    return Promise.resolve(response.data.map((e) => transformFn(e)));
                }
                else {
                    return Promise.resolve(transformFn(response.data));
                }
            }
        }
        return Promise.reject(response);
    }
    getTransactions(chain, limit = 1000, lastIndex = 0) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(chain.theGraphUrl, {
            query: `{
        transactions(first: ${limit}, orderBy: index, orderDirection: asc, where: { index_gt: ${lastIndex} }) {
          id
          index
          from
          to
          blockNumber
          blockTimestamp
          ${this.getTransferEventsQuery(chain.type)}
        }
      }`
        }).then(result => {
            return this.handleResponse(result === null || result === void 0 ? void 0 : result.data, (e) => {
                var _a;
                return (_a = e === null || e === void 0 ? void 0 : e.transactions) === null || _a === void 0 ? void 0 : _a.map((e1) => _models_subgraph_model__WEBPACK_IMPORTED_MODULE_2__["SubgraphTransactionModel"].fromJS(e1));
            });
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    getStatContainer(url) {
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
            query: `{
        statsContainers {
          id,
          lastAccountIndex,
          lastAccountSnapshotIndex,
          lastTransactionIndex,
          lastTransferEventIndex
        }
      }`
        }).then(result => {
            return this.handleResponse(result === null || result === void 0 ? void 0 : result.data, (e) => {
                var _a;
                const containers = (_a = e === null || e === void 0 ? void 0 : e.statsContainers) === null || _a === void 0 ? void 0 : _a.map((e1) => _models_subgraph_model__WEBPACK_IMPORTED_MODULE_2__["SubgraphStatContainerModel"].fromJS(e1));
                return (containers === null || containers === void 0 ? void 0 : containers.length) > 0 ? containers[0] : undefined;
            });
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    getTransferEventsQuery(chainType) {
        switch (chainType) {
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].ETH_MAIN:
                return `transferEvents {
          id
          index
          transaction
          logIndex
          blockNumber
          blockTimestamp
          from
          to
          amount
        }`;
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].XDAI_MAIN:
                return `transferEvents {
          id
          index
          transaction
          logIndex
          blockNumber
          blockTimestamp
          from
          to
          amount
          tokenType
        }`;
            default:
                break;
        }
        return undefined;
    }
}
TheGraphClient.ɵfac = function TheGraphClient_Factory(t) { return new (t || TheGraphClient)(); };
TheGraphClient.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: TheGraphClient, factory: TheGraphClient.ɵfac, providedIn: 'root' });


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
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared-graph-lib.component */ "ciip");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/logger.service */ "Mb37");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");











const _c0 = ["containerElementRef"];
class CytoscapeComponent extends _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_7__["SharedGraphLibComponent"] {
    constructor(logger, graphService) {
        super(logger, graphService);
        this.logger = logger;
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.componentName = 'Cytoscape';
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
                    'background-color': _app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"].SECONDARY_COLOR
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
        super.onInit();
    }
    ngOnDestroy() {
        super.onDestroy();
    }
    destroy() {
        this.cy.destroy();
    }
    init(data) {
        super.beforeInit(data);
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
                    this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_6__["NodeGraphModel"]({
                        data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_6__["NodeDataModel"]({
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
                    this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_6__["EdgeGraphModel"]({
                        data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_6__["EdgeDataModel"]({
                            name: edge.data('name'),
                            source: edge.data('source'),
                            target: edge.data('target'),
                            strength: edge.data('strength')
                        }),
                        scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_6__["GraphScratchModel"]({
                            refTransfer: edge.scratch('refTransfer')
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
        super.afterInit();
    }
    unselectAll() {
        this.cy.elements().removeClass('faded');
        this.selectEmitter.emit(undefined);
    }
    center(counter) {
    }
}
CytoscapeComponent.ɵfac = function CytoscapeComponent_Factory(t) { return new (t || CytoscapeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_8__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_9__["GraphService"])); };
CytoscapeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CytoscapeComponent, selectors: [["hopr-cytoscape"]], viewQuery: function CytoscapeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, inputs: { style: "style", layout: "layout", zoom: "zoom" }, outputs: { selectEmitter: "selectEmitter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function CytoscapeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN5dG9zY2FwZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLE1BQU07QUFDUiIsImZpbGUiOiJjeXRvc2NhcGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "0bl3":
/*!**************************************!*\
  !*** ./src/app/models/type.model.ts ***!
  \**************************************/
/*! exports provided: TypeModel, ChainTypeModel, ChainSourceTypeModel, GraphLibraryTypeModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeModel", function() { return TypeModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainTypeModel", function() { return ChainTypeModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainSourceTypeModel", function() { return ChainSourceTypeModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphLibraryTypeModel", function() { return GraphLibraryTypeModel; });
class TypeModel {
    constructor(init) {
        Object.assign(this, init);
    }
}
class ChainTypeModel extends TypeModel {
    constructor(init) {
        super(init);
    }
}
class ChainSourceTypeModel extends TypeModel {
    constructor(init) {
        super(init);
    }
}
class GraphLibraryTypeModel extends TypeModel {
    constructor(init) {
        super(init);
    }
}


/***/ }),

/***/ 1:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1J7u":
/*!************************************************!*\
  !*** ./src/app/factories/extractor.factory.ts ***!
  \************************************************/
/*! exports provided: ChainExtractorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainExtractorFactory", function() { return ChainExtractorFactory; });
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _extractors_file_extractor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extractors/file.extractor */ "y2kS");
/* harmony import */ var _extractors_rpc_extractor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extractors/rpc.extractor */ "1Mnr");
/* harmony import */ var _extractors_graphql_extractor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extractors/graphql.extractor */ "VEB8");





class ChainExtractorFactory {
    constructor(fileExtractor, rpcExtractor, graphqlExtractor) {
        this.fileExtractor = fileExtractor;
        this.rpcExtractor = rpcExtractor;
        this.graphqlExtractor = graphqlExtractor;
    }
    get(type) {
        switch (type) {
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].GRAPHQL:
                return this.graphqlExtractor;
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].RPC:
                return this.rpcExtractor;
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].FILE:
            default:
                return this.fileExtractor;
        }
    }
}
ChainExtractorFactory.ɵfac = function ChainExtractorFactory_Factory(t) { return new (t || ChainExtractorFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_extractors_file_extractor__WEBPACK_IMPORTED_MODULE_2__["FileChainExtractor"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_extractors_rpc_extractor__WEBPACK_IMPORTED_MODULE_3__["RpcChainExtractor"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_extractors_graphql_extractor__WEBPACK_IMPORTED_MODULE_4__["GraphqlChainExtractor"])); };
ChainExtractorFactory.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ChainExtractorFactory, factory: ChainExtractorFactory.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "1Mnr":
/*!*********************************************!*\
  !*** ./src/app/extractors/rpc.extractor.ts ***!
  \*********************************************/
/*! exports provided: RpcChainExtractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RpcChainExtractor", function() { return RpcChainExtractor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_event_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/event.model */ "Z2SW");
/* harmony import */ var _base_extractor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.extractor */ "Tge8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");
/* harmony import */ var _clients_ethers_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../clients/ethers.client */ "2938");







class RpcChainExtractor extends _base_extractor__WEBPACK_IMPORTED_MODULE_3__["BaseChainExtractor"] {
    constructor(logger, client) {
        super(logger);
        this.logger = logger;
        this.client = client;
    }
    get type() {
        return _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].RPC;
    }
    extractAsyncInternal(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.client.getAllEvents(chain).then(result => {
                if (Array.isArray(result)) {
                    return Promise.resolve(result.map(e => _models_event_model__WEBPACK_IMPORTED_MODULE_2__["EventModel"].fromJS(e, chain)));
                }
                return Promise.resolve(undefined);
            }).catch(error => {
                return Promise.reject(error);
            });
        });
    }
}
RpcChainExtractor.ɵfac = function RpcChainExtractor_Factory(t) { return new (t || RpcChainExtractor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_5__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_clients_ethers_client__WEBPACK_IMPORTED_MODULE_6__["EthersClient"])); };
RpcChainExtractor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: RpcChainExtractor, factory: RpcChainExtractor.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "2938":
/*!******************************************!*\
  !*** ./src/app/clients/ethers.client.ts ***!
  \******************************************/
/*! exports provided: EthersClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EthersClient", function() { return EthersClient; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "wDBh");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");
/* harmony import */ var _utils_file_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/file.util */ "YcFz");








class EthersClient {
    constructor(logger, fileUtil) {
        this.logger = logger;
        this.fileUtil = fileUtil;
    }
    createEthersProvider(url) {
        _utils_ensure_util__WEBPACK_IMPORTED_MODULE_4__["Ensure"].notNullOrWhiteSpace(url, 'url');
        return new ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].providers.JsonRpcProvider(url);
    }
    getBlockNumberAsync(provider) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const blockNumber = yield provider.getBlockNumber();
            this.logger.info('Current block number', blockNumber)();
            return blockNumber;
        });
    }
    getSymbolAsync(contract) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const symbol = yield contract.symbol();
            this.logger.info('symbol', symbol)();
            return symbol;
        });
    }
    getBalanceAsync(contract, address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const balance = yield contract.balanceOf(address);
            const balanceFormatted = ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].utils.formatUnits(balance, 18);
            this.logger.info('balance', balanceFormatted)();
            return balanceFormatted;
        });
    }
    getAllEvents(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let events = [];
            events = events.concat(yield this.getTokenEvents(chain));
            events = events.concat(yield this.getBridgeEvents(chain));
            return events;
        });
    }
    getTokenEvents(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const provider = this.createEthersProvider(chain.rpcProviderUrl);
            const blockNumber = yield this.getBlockNumberAsync(provider);
            const abi = yield this.fileUtil.readFileAsync(chain.tokenContractAbiPath);
            const contract = new ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].Contract(chain.tokenContractAddress, JSON.parse(abi), provider);
            // this.logger.info(chain.tokenContractAddress, await contract.name())();
            let events = [];
            for (const eventType of [_enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].MINT, _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].TRANSFER, _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].BURN]) {
                events = events.concat(yield this.getEventsByTypeAsync(chain, contract, eventType, blockNumber));
            }
            return events;
        });
    }
    getBridgeEvents(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const provider = this.createEthersProvider(chain.rpcProviderUrl);
            const blockNumber = yield this.getBlockNumberAsync(provider);
            const abi = yield this.fileUtil.readFileAsync(chain.bridgeContractAbiPath);
            const contract = new ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].Contract(chain.bridgeContractAddress, JSON.parse(abi), provider);
            // this.logger.info(chain.bridgeContractAddress)();
            let events = [];
            for (const eventType of [_enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].BRIDGE_START, _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].BRIDGE_END]) {
                events = events.concat(yield this.getEventsByTypeAsync(chain, contract, eventType, blockNumber));
            }
            return events;
        });
    }
    getEventsByTypeAsync(chain, contract, type, blockNumber) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const chainName = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainType"][chain.type];
            const eventSignature = chain.mapTxEventTypeToString(type);
            if (_utils_common_util__WEBPACK_IMPORTED_MODULE_3__["CommonUtil"].isNullOrWhitespace(eventSignature)) {
                this.logger.info(`Extract ${_enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"][type]} events of ${chainName} skipped (no signature found).`)();
                return Promise.resolve([]);
            }
            else {
                this.logger.info(`Extract ${eventSignature} events of ${chainName} started.`)();
                // Create a filter e.g. contract.filters.Transfer() if the eventName is equal to Transfer
                let filter;
                switch (type) {
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].BRIDGE_START:
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainTxEventType"].BRIDGE_END:
                        // Filter by token smart contract address
                        // - TokensBridged(address indexed token, address indexed recipient, uint256 value, bytes32 indexed messageId)
                        // - TokensBridgingInitiated(index_topic_1 address token, index_topic_2 address sender, ...)
                        filter = contract.filters[eventSignature](chain.tokenContractAddress);
                        break;
                    default:
                        filter = contract.filters[eventSignature]();
                        break;
                }
                const events = yield this.getEventsByBlockAsync(contract, filter, chain.startBlock, blockNumber);
                this.logger.info(`Extract ${eventSignature} events of ${chainName} ended.`)();
                return events;
            }
        });
    }
    getEventsByBlockAsync(contract, filter, fromBlock, toBlock) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (fromBlock <= toBlock) {
                try {
                    return yield contract.queryFilter(filter, fromBlock, toBlock);
                }
                catch (error) {
                    const midBlock = (fromBlock + toBlock) >> 1;
                    this.logger.info(`Divide and conquer block ${midBlock}`)();
                    const arr1 = yield this.getEventsByBlockAsync(contract, filter, fromBlock, midBlock);
                    const arr2 = yield this.getEventsByBlockAsync(contract, filter, midBlock + 1, toBlock);
                    return [...arr1, ...arr2];
                }
            }
            return [];
        });
    }
    test(contract) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const filter = contract.filters.Burn();
            const events = yield contract.queryFilter(filter);
            this.logger.info('test', events)();
            if (events && events.length > 0) {
                const test = events[0];
                this.logger.info(test.decode(test.data, test.topics))();
            }
        });
    }
}
EthersClient.ɵfac = function EthersClient_Factory(t) { return new (t || EthersClient)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_6__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_utils_file_util__WEBPACK_IMPORTED_MODULE_7__["FileUtil"])); };
EthersClient.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: EthersClient, factory: EthersClient.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Ag5x":
/*!*************************************!*\
  !*** ./src/app/models/log.model.ts ***!
  \*************************************/
/*! exports provided: LogEventModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogEventModel", function() { return LogEventModel; });
class LogEventModel {
    constructor(init) {
        Object.assign(this, init);
    }
}


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
    production: false,
    version: __webpack_require__(/*! ../../package.json */ "kiQV").version
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
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/config.service */ "r4Kj");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cytoscape/cytoscape.component */ "0afA");
/* harmony import */ var _stardust_stardust_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../stardust/stardust.component */ "wJvV");
/* harmony import */ var _d3canvas_d3canvas_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../d3canvas/d3canvas.component */ "GOCD");
/* harmony import */ var _d3_d3_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../d3/d3.component */ "+yM7");












function GraphComponent_hopr_cytoscape_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "hopr-cytoscape", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectEmitter", function GraphComponent_hopr_cytoscape_2_Template_hopr_cytoscape_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r9.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_hopr_stardust_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "hopr-stardust", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectEmitter", function GraphComponent_hopr_stardust_3_Template_hopr_stardust_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_hopr_d3canvas_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "hopr-d3canvas", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectEmitter", function GraphComponent_hopr_d3canvas_4_Template_hopr_d3canvas_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r13.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_hopr_d3_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "hopr-d3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectEmitter", function GraphComponent_hopr_d3_5_Template_hopr_d3_selectEmitter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r15.nodeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Loading... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r6.message, " ");
} }
function GraphComponent_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "address: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Selected node (", ctx_r17.node == null ? null : ctx_r17.node.data == null ? null : ctx_r17.node.data.name, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx_r17.buildAddressUrl(ctx_r17.node == null ? null : ctx_r17.node.data == null ? null : ctx_r17.node.data.id), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r17.node == null ? null : ctx_r17.node.data == null ? null : ctx_r17.node.data.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("weight: ", ctx_r17.node == null ? null : ctx_r17.node.data == null ? null : ctx_r17.node.data.weight, "");
} }
function GraphComponent_div_10_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "address1: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "address2: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Selected edge (", ctx_r19.edge == null ? null : ctx_r19.edge.data == null ? null : ctx_r19.edge.data.name, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx_r19.buildAddressUrl(ctx_r19.edge == null ? null : ctx_r19.edge.data == null ? null : ctx_r19.edge.data.source), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r19.edge == null ? null : ctx_r19.edge.data == null ? null : ctx_r19.edge.data.source);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx_r19.buildAddressUrl(ctx_r19.edge == null ? null : ctx_r19.edge.data == null ? null : ctx_r19.edge.data.target), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r19.edge == null ? null : ctx_r19.edge.data == null ? null : ctx_r19.edge.data.target);
} }
function GraphComponent_div_10_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GraphComponent_div_10_div_5_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r23.revealTransfers(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Show");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GraphComponent_div_10_ng_template_6_ul_0_li_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const transfer_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("blockTimestamp: ", transfer_r26.blockTimestamp, "");
} }
function GraphComponent_div_10_ng_template_6_ul_0_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "to: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const transfer_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx_r28.buildAddressUrl(transfer_r26.argsTo), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](transfer_r26.argsTo);
} }
function GraphComponent_div_10_ng_template_6_ul_0_li_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "transactionHash: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const transfer_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("href", ctx_r29.buildTxUrl(transfer_r26.transactionHash), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](transfer_r26.transactionHash);
} }
const _c0 = function (a0) { return { color: a0 }; };
function GraphComponent_div_10_ng_template_6_ul_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "li", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, GraphComponent_div_10_ng_template_6_ul_0_li_3_Template, 2, 1, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, GraphComponent_div_10_ng_template_6_ul_0_li_4_Template, 4, 2, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, GraphComponent_div_10_ng_template_6_ul_0_li_5_Template, 4, 2, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const transfer_r26 = ctx.$implicit;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c0, ctx_r25.getTransferColor(transfer_r26)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("amount: ", transfer_r26.argsAmount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", transfer_r26.blockTimestamp);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r25.node);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", transfer_r26.transactionHash);
} }
function GraphComponent_div_10_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, GraphComponent_div_10_ng_template_6_ul_0_Template, 6, 7, "ul", 9);
} if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r22.transfers);
} }
function GraphComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, GraphComponent_div_10_div_1_Template, 9, 4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GraphComponent_div_10_ng_template_2_Template, 10, 5, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Transfers ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, GraphComponent_div_10_div_5_Template, 5, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, GraphComponent_div_10_ng_template_6_Template, 1, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](3);
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](7);
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r7.node)("ngIfElse", _r18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r7.showTransfers)("ngIfElse", _r21);
} }
function GraphComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function GraphComponent_ng_container_12_Template_input_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r35); const kvp_r33 = ctx.$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r34.changeFilter(kvp_r33.key, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const kvp_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", kvp_r33.key)("name", kvp_r33.key)("checked", kvp_r33.value.isSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("for", kvp_r33.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", kvp_r33.value.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](kvp_r33.value.name);
} }
const _c1 = function (a0) { return { "loading": a0 }; };
class GraphComponent {
    constructor(configService, graphService) {
        this.configService = configService;
        this.graphService = graphService;
        this.subs = [];
        this.graphLibraries = {
            d3: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"].D3,
            cytoscape: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"].CYTOSCAPE,
            stardust: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"].STARDUST,
            d3canvas: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"].D3_CANVAS
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
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    handleOnChangeSubject(data) {
        if (data) {
            switch (data.type) {
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphEventType"].DATA_CHANGED:
                    this.onDataChanged(this.graphService.currentData);
                    break;
                default:
                    break;
            }
        }
    }
    onDataChanged(data) {
        this.node = undefined;
        this.edge = undefined;
        this.transfers = undefined;
        this._showTransfers = false;
        if (Array.isArray(data === null || data === void 0 ? void 0 : data.nodes) && data.nodes.length > 0) {
            this.message = undefined;
        }
        else {
            this.message = 'Graph is empty. Consider changing the minimum weight.';
        }
    }
    get showTransfers() {
        var _a;
        return this._showTransfers || ((_a = this.transfers) === null || _a === void 0 ? void 0 : _a.length) <= 100;
    }
    nodeChange(event) {
        this._showTransfers = false;
        if (event instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_3__["NodeGraphModel"]) {
            this.node = event;
            this.transfers = this.node.scratch.transfers;
            this.edge = undefined;
        }
        else if (event instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_3__["EdgeGraphModel"]) {
            this.edge = event;
            this.transfers = this.edge.scratch.transfers;
            this.node = undefined;
        }
        else {
            this.node = undefined;
            this.edge = undefined;
            this.transfers = undefined;
        }
    }
    get isLoading() {
        return this.graphService.isLoading;
    }
    get selectedGraphLibraryType() {
        return this.configService.config.selectedGraphLibraryType;
    }
    get filter() {
        return this.graphService.filter;
    }
    revealTransfers() {
        this._showTransfers = true;
    }
    getTransferColor(transfer) {
        if (transfer) {
            switch (transfer.type) {
                case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainTxEventType"].BURN:
                    return _app_constants__WEBPACK_IMPORTED_MODULE_0__["AppConstants"].TX_EVENT_BURN_COLOR;
                case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainTxEventType"].MINT:
                    return _app_constants__WEBPACK_IMPORTED_MODULE_0__["AppConstants"].TX_EVENT_MINT_COLOR;
                default:
                    break;
            }
        }
        return '#000';
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
GraphComponent.ɵfac = function GraphComponent_Factory(t) { return new (t || GraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_6__["GraphService"])); };
GraphComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: GraphComponent, selectors: [["hopr-network-graph"]], decls: 14, vars: 13, consts: [["id", "graphContainer", 3, "ngClass"], [3, "ngSwitch"], [3, "selectEmitter", 4, "ngSwitchCase"], [3, "selectEmitter", 4, "ngSwitchDefault"], ["id", "infoContainer"], [4, "ngIf", "ngIfElse"], ["showMessageBlock", ""], ["id", "info", 4, "ngIf"], ["id", "filter"], [4, "ngFor", "ngForOf"], [3, "selectEmitter"], ["id", "info"], ["showEdgeBlock", ""], ["showTransfersBlock", ""], ["target", "_blank", 3, "href"], [3, "click"], [3, "ngStyle"], [4, "ngIf"], ["type", "checkbox", 3, "id", "name", "checked", "change"], [3, "for"]], template: function GraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "container-element", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GraphComponent_hopr_cytoscape_2_Template, 1, 0, "hopr-cytoscape", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, GraphComponent_hopr_stardust_3_Template, 1, 0, "hopr-stardust", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, GraphComponent_hopr_d3canvas_4_Template, 1, 0, "hopr-d3canvas", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, GraphComponent_hopr_d3_5_Template, 1, 0, "hopr-d3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, GraphComponent_div_7_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, GraphComponent_ng_template_8_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, GraphComponent_div_10_Template, 8, 4, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, GraphComponent_ng_container_12_Template, 5, 7, "ng-container", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](11, _c1, ctx.isLoading));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngSwitch", ctx.selectedGraphLibraryType);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngSwitchCase", ctx.graphLibraries.cytoscape);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngSwitchCase", ctx.graphLibraries.stardust);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngSwitchCase", ctx.graphLibraries.d3canvas);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isLoading)("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.node || ctx.edge);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 9, ctx.filter));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgSwitchDefault"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_8__["CytoscapeComponent"], _stardust_stardust_component__WEBPACK_IMPORTED_MODULE_9__["StardustComponent"], _d3canvas_d3canvas_component__WEBPACK_IMPORTED_MODULE_10__["D3CanvasComponent"], _d3_d3_component__WEBPACK_IMPORTED_MODULE_11__["D3Component"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgStyle"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["KeyValuePipe"]], styles: ["ul[_ngcontent-%COMP%] {\r\n  margin-block-start: 8px;\r\n  margin-block-end: 8px;\r\n}\r\n\r\n#graphContainer[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n}\r\n\r\n.loading[_ngcontent-%COMP%] {\r\n  background-color: black;\r\n  opacity: 0.5;\r\n}\r\n\r\n#infoContainer[_ngcontent-%COMP%] {\r\n  float: left;\r\n  width: 100%;\r\n  position: relative;\r\n  height: 170px;\r\n  overflow-y: auto;\r\n}\r\n\r\n#info[_ngcontent-%COMP%] {\r\n  padding: 8px;\r\n}\r\n\r\n#filter[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBdUI7RUFDdkIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFFBQVE7QUFDViIsImZpbGUiOiJncmFwaC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidWwge1xyXG4gIG1hcmdpbi1ibG9jay1zdGFydDogOHB4O1xyXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDhweDtcclxufVxyXG5cclxuI2dyYXBoQ29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5sb2FkaW5nIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuXHJcbiNpbmZvQ29udGFpbmVyIHtcclxuICBmbG9hdDogbGVmdDtcclxuICB3aWR0aDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAxNzBweDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4jaW5mbyB7XHJcbiAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4jZmlsdGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "GOCD":
/*!***********************************************************!*\
  !*** ./src/app/components/d3canvas/d3canvas.component.ts ***!
  \***********************************************************/
/*! exports provided: D3CanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3CanvasComponent", function() { return D3CanvasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/chain.enum */ "/2aV");
/* harmony import */ var _utils_graph_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/graph.util */ "n37/");
/* harmony import */ var _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared-graph-lib.component */ "ciip");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/logger.service */ "Mb37");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");









const _c0 = ["containerElementRef"];
class D3CanvasComponent extends _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_5__["SharedGraphLibComponent"] {
    constructor(logger, graphService) {
        super(logger, graphService);
        this.logger = logger;
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.componentName = 'D3Canvas';
    }
    ngOnInit() {
        super.onInit();
    }
    ngOnDestroy() {
        super.onDestroy();
    }
    destroy() {
        this.stopSimulation();
    }
    stopSimulation() {
        var _a;
        this.logger.info(`${this.componentName} stop simulation called.`)();
        (_a = this.simulation) === null || _a === void 0 ? void 0 : _a.stop();
        this.graphService.isSimulating = false;
    }
    init(data) {
        super.beforeInit(data);
        this.width = this.containerElementRef.nativeElement.clientWidth;
        this.height = this.containerElementRef.nativeElement.clientHeight;
        this.createCanvas();
        if (this.nodes && this.edges) {
            if (this.simulation) {
                this.simulation.stop();
            }
            this.simulation = d3__WEBPACK_IMPORTED_MODULE_1__["forceSimulation"](this.nodes)
                .force('link', d3__WEBPACK_IMPORTED_MODULE_1__["forceLink"](this.edges).id((d) => d.id))
                .force('charge', d3__WEBPACK_IMPORTED_MODULE_1__["forceManyBody"]().strength(-400))
                .force('center', d3__WEBPACK_IMPORTED_MODULE_1__["forceCenter"](this.width / 2, this.height / 2))
                .force('x', d3__WEBPACK_IMPORTED_MODULE_1__["forceX"]())
                .force('y', d3__WEBPACK_IMPORTED_MODULE_1__["forceY"]())
                .on('end', () => {
                this.graphService.isSimulating = false;
                this.logger.info(`${this.componentName} simulation ended.`)();
            });
            this.graphService.isSimulating = true;
            this.simulation.on('tick', () => {
                this.requestRender();
            });
        }
        super.afterInit();
    }
    requestRender() {
        if (this.state.requestedAnimationFrame) {
            return;
        }
        this.state.requestedAnimationFrame = requestAnimationFrame(() => {
            this.render();
        });
    }
    render() {
        this.state.requestedAnimationFrame = undefined;
        this.context.save();
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.translate(this.transform.x, this.transform.y);
        this.context.scale(this.transform.k, this.transform.k);
        this.drawEdges();
        this.drawNodes();
        this.context.restore();
    }
    drawEdges() {
        // draw links
        this.context.strokeStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_TRANSFER_COLOR;
        this.context.beginPath();
        this.edges.forEach((d) => {
            var _a;
            if ((_a = d === null || d === void 0 ? void 0 : d.refTransfer) === null || _a === void 0 ? void 0 : _a.type) {
                switch (d.refTransfer.type) {
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].MINT:
                        this.context.strokeStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_MINT_COLOR;
                        break;
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_3__["ChainTxEventType"].BURN:
                        this.context.strokeStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_BURN_COLOR;
                        break;
                    default:
                        this.context.strokeStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_TRANSFER_COLOR;
                        break;
                }
            }
            else {
                this.context.strokeStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_TRANSFER_COLOR;
            }
            this.context.moveTo(d.source.x, d.source.y);
            this.context.lineTo(d.target.x, d.target.y);
        });
        this.context.stroke();
    }
    drawNodes() {
        this.context.fillStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].SECONDARY_COLOR;
        this.context.beginPath();
        this.nodes.forEach((d) => {
            const radius = _utils_graph_util__WEBPACK_IMPORTED_MODULE_4__["GraphUtil"].calculateNodeRadius(d.weight);
            this.context.moveTo(d.x + radius, d.y);
            this.context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            this.context.fillText(d.name, d.x, d.y);
        });
        this.context.fill();
    }
    drawNodes1() {
        this.nodes.forEach((d) => {
            this.context.beginPath();
            this.context.fillStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].SECONDARY_COLOR;
            const radius = _utils_graph_util__WEBPACK_IMPORTED_MODULE_4__["GraphUtil"].calculateNodeRadius(d.weight);
            this.context.moveTo(d.x + radius, d.y);
            this.context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            this.context.fill();
            this.context.beginPath();
            this.context.fillStyle = _app_constants__WEBPACK_IMPORTED_MODULE_2__["AppConstants"].TX_EVENT_BURN_COLOR;
            this.context.fillText(d.name, d.x, d.y);
        });
    }
    createCanvas() {
        d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#canvasContainer').remove();
        this.canvas = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#container')
            .append('canvas')
            .attr('id', 'canvasContainer')
            .attr('width', this.width)
            .attr('height', this.height)
            .on('click', () => {
            this.selectEmitter.emit(undefined);
        });
        this.context = this.canvas.node().getContext('2d');
        this.transform = d3__WEBPACK_IMPORTED_MODULE_1__["zoomIdentity"];
        super.registerMouseWheelEvent(this.canvas.node());
        // this.canvas.call(d3.drag().subject((e) => console.log(e)));
        // this.canvas.call(this.drag());
        this.zoom = d3__WEBPACK_IMPORTED_MODULE_1__["zoom"]()
            .extent([[0, 0], [this.width, this.height]])
            .scaleExtent([0, 10])
            .on('zoom', (e) => {
            this.transform = e.transform;
            this.requestRender();
        });
        this.canvas.call(this.zoom);
    }
    center(count) {
        if (!this.state.isDestroyed && !this.state.isZoomed) {
            const width = this.canvas.node().clientWidth;
            const height = this.canvas.node().clientHeight;
            // TODO: set min/max nodes
            if (width && height) {
                const scale = Math.min(this.width / width, this.height / height) * 0.8;
                if (count > 0) {
                    this.canvas.transition()
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
D3CanvasComponent.ɵfac = function D3CanvasComponent_Factory(t) { return new (t || D3CanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_6__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_7__["GraphService"])); };
D3CanvasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: D3CanvasComponent, selectors: [["hopr-d3canvas"]], viewQuery: function D3CanvasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, outputs: { selectEmitter: "selectEmitter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function D3CanvasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQzY2FudmFzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtBQUNSIiwiZmlsZSI6ImQzY2FudmFzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG59Il19 */"] });


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
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lz-string */ "6xEa");
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lz_string__WEBPACK_IMPORTED_MODULE_2__);



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
    static isObject(value) {
        return value && typeof value === 'object';
    }
    static isFunction(value) {
        return value && typeof value === 'function';
    }
    static toBigNumber(bn) {
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(bn);
    }
    static toJsonString(data) {
        return JSON.stringify(data, null, 2);
    }
    static formatBigNumber(bn) {
        return ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].utils.formatUnits(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__["BigNumber"].from(bn), 18);
    }
    static tryParseInt(value) {
        try {
            return parseInt(value, 10);
        }
        catch (error) {
            return undefined;
        }
    }
    static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static compress(data) {
        return lz_string__WEBPACK_IMPORTED_MODULE_2__["compressToUTF16"](data);
    }
    static decompress(data) {
        return lz_string__WEBPACK_IMPORTED_MODULE_2__["decompressFromUTF16"](data);
    }
    static assign(values, ctor) {
        const instance = new ctor();
        return Object.keys(instance).reduce((acc, key) => {
            acc[key] = values[key];
            return acc;
        }, {});
    }
    static combineIndex(index1, index2) {
        if (CommonUtil.isNullOrWhitespace(index1) || CommonUtil.isNullOrWhitespace(index2)) {
            return undefined;
        }
        if (index1 > index2) {
            return `${index2}_${index1}`;
        }
        return `${index1}_${index2}`;
    }
    static hexToRgb(hex) {
        if (CommonUtil.isNullOrWhitespace(hex)) {
            return [0, 0, 0];
        }
        const bigint = parseInt(hex.startsWith('#') ? hex.substring(1, hex.length) : hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }
    static scrollTo(element, offset) {
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
}


/***/ }),

/***/ "K2Fl":
/*!********************************************!*\
  !*** ./src/app/utils/browser-file.util.ts ***!
  \********************************************/
/*! exports provided: BrowserFileUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserFileUtil", function() { return BrowserFileUtil; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _common_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.util */ "Hg6u");
/* harmony import */ var _file_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file.util */ "YcFz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class BrowserFileUtil extends _file_util__WEBPACK_IMPORTED_MODULE_2__["FileUtil"] {
    readFileAsync(path) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield fetch(path);
            return response.text();
        });
    }
    writeFile(data, path) {
        const blob = new Blob([_common_util__WEBPACK_IMPORTED_MODULE_1__["CommonUtil"].toJsonString(data)], { type: 'application/json' });
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
}
BrowserFileUtil.ɵfac = function BrowserFileUtil_Factory(t) { return ɵBrowserFileUtil_BaseFactory(t || BrowserFileUtil); };
BrowserFileUtil.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: BrowserFileUtil, factory: BrowserFileUtil.ɵfac });
const ɵBrowserFileUtil_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetInheritedFactory"](BrowserFileUtil);


/***/ }),

/***/ "Mb37":
/*!********************************************!*\
  !*** ./src/app/services/logger.service.ts ***!
  \********************************************/
/*! exports provided: Logger, DefaultLoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultLoggerService", function() { return DefaultLoggerService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/log.enum */ "NVX8");
/* harmony import */ var _models_log_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/log.model */ "Ag5x");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class Logger {
}
const noop = () => undefined;
class DefaultLoggerService extends Logger {
    constructor() {
        super();
        this._onLogEventSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    get onLogEventSubject() {
        return this._onLogEventSubject;
    }
    get isEnabled() {
        return true;
    }
    timestamp(type) {
        return `[${type} ${new Date().toLocaleTimeString()}]`;
    }
    createLogEventModel(type, ...args) {
        const mapFn = (e) => {
            if (_utils_common_util__WEBPACK_IMPORTED_MODULE_3__["CommonUtil"].isString(e)) {
                return e;
            }
            else if (e instanceof Error) {
                return e.message;
            }
            return _utils_common_util__WEBPACK_IMPORTED_MODULE_3__["CommonUtil"].toJsonString(e);
        };
        const result = new _models_log_model__WEBPACK_IMPORTED_MODULE_2__["LogEventModel"]({
            type: _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__["LogEventType"].MESSAGE,
            banner: this.timestamp(type),
            args: args === null || args === void 0 ? void 0 : args.map(e => Array.isArray(e) ? e.map(e1 => mapFn(e1)) : mapFn(e))
        });
        this._onLogEventSubject.next(result);
        return result;
    }
    get debug() {
        if (this.isEnabled) {
            return (...args) => {
                const result = this.createLogEventModel('DEBUG', args);
                return Function.prototype.bind.call(console.debug, console, result.banner, ...args);
            };
        }
        else {
            return noop;
        }
    }
    get info() {
        if (this.isEnabled) {
            return (...args) => {
                const result = this.createLogEventModel('INFO', args);
                return Function.prototype.bind.call(console.info, console, result.banner, ...args);
            };
        }
        else {
            return noop;
        }
    }
    get warn() {
        if (this.isEnabled) {
            return (...args) => {
                const result = this.createLogEventModel('WARN', args);
                return Function.prototype.bind.call(console.warn, console, result.banner, ...args);
            };
        }
        else {
            return noop;
        }
    }
    get error() {
        if (this.isEnabled) {
            return (...args) => {
                if ((args === null || args === void 0 ? void 0 : args.length) > 0) {
                    if (!_utils_common_util__WEBPACK_IMPORTED_MODULE_3__["CommonUtil"].isString(args[0])) {
                        args.push('(See console output for more information.)');
                    }
                }
                const result = this.createLogEventModel('ERROR', args);
                return Function.prototype.bind.call(console.error, console, result.banner, ...args);
            };
        }
        else {
            return noop;
        }
    }
    clear() {
        this._onLogEventSubject.next(new _models_log_model__WEBPACK_IMPORTED_MODULE_2__["LogEventModel"]({
            type: _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__["LogEventType"].CLEAR
        }));
    }
}
DefaultLoggerService.ɵfac = function DefaultLoggerService_Factory(t) { return new (t || DefaultLoggerService)(); };
DefaultLoggerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: DefaultLoggerService, factory: DefaultLoggerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "NVX8":
/*!***********************************!*\
  !*** ./src/app/enums/log.enum.ts ***!
  \***********************************/
/*! exports provided: LogEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogEventType", function() { return LogEventType; });
var LogEventType;
(function (LogEventType) {
    LogEventType[LogEventType["MESSAGE"] = 0] = "MESSAGE";
    LogEventType[LogEventType["CLEAR"] = 1] = "CLEAR";
})(LogEventType || (LogEventType = {}));


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
    GraphLibraryType[GraphLibraryType["STARDUST"] = 2] = "STARDUST";
    GraphLibraryType[GraphLibraryType["D3_CANVAS"] = 3] = "D3_CANVAS";
})(GraphLibraryType || (GraphLibraryType = {}));
var GraphEventType;
(function (GraphEventType) {
    GraphEventType[GraphEventType["DATA_CHANGED"] = 0] = "DATA_CHANGED";
    GraphEventType[GraphEventType["STOP_SIMULATION"] = 1] = "STOP_SIMULATION";
})(GraphEventType || (GraphEventType = {}));


/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn-bd": "loYQ",
	"./bn-bd.js": "loYQ",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-in": "7C5Q",
	"./en-in.js": "7C5Q",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./en-sg": "t+mt",
	"./en-sg.js": "t+mt",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-mx": "tbfe",
	"./es-mx.js": "tbfe",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fil": "1ppg",
	"./fil.js": "1ppg",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-deva": "qvJo",
	"./gom-deva.js": "qvJo",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./oc-lnc": "Fnuy",
	"./oc-lnc.js": "Fnuy",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tk": "Wv91",
	"./tk.js": "Wv91",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-mo": "OmwH",
	"./zh-mo.js": "OmwH",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

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
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums/graph.enum */ "Qlbi");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/logger.service */ "Mb37");
/* harmony import */ var _utils_moment_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/moment.util */ "nBAI");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/config.service */ "r4Kj");
/* harmony import */ var _services_chain_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/chain.service */ "wXGM");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/graph.service */ "Tv8v");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_logs_logs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/logs/logs.component */ "nnAZ");
/* harmony import */ var _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/graph/graph.component */ "FzN6");












function AppComponent_div_4_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const chain_r8 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", chain_r8.type)("selected", chain_r8.type === ctx_r5.selectedChainType);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", chain_r8.name, " ");
} }
function AppComponent_div_4_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const library_r9 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", library_r9.type)("selected", library_r9.type === ctx_r6.selectedLibraryType);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", library_r9.name, " ");
} }
function AppComponent_div_4_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_div_4_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r10.stopSimulation(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Stop simulation");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AppComponent_div_4_Template_select_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r12.changeChain($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AppComponent_div_4_option_2_Template, 2, 3, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " min. weight ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AppComponent_div_4_Template_input_change_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r14.changeMinWeight($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AppComponent_div_4_Template_select_change_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r15.changeLibrary($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, AppComponent_div_4_option_7_Template, 2, 3, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, AppComponent_div_4_button_8_Template, 2, 0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.chains);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx_r0.minWeight);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.minWeight, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.libraries);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.showStopSimulationButton);
} }
function AppComponent_hopr_network_graph_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "hopr-network-graph");
} }
function AppComponent_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Last block: ", ctx_r16.selectedChainStat.lastBlock, " ");
} }
function AppComponent_div_9_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, "Load failed");
} }
function AppComponent_div_9_div_4_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const source_r21 = ctx.$implicit;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", source_r21.type)("selected", source_r21.type === ctx_r20.selectedChainStat.source);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", source_r21.name, " ");
} }
function AppComponent_div_9_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " \u00A0/ Source: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AppComponent_div_9_div_4_Template_select_change_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r22.changeSource($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AppComponent_div_9_div_4_option_3_Template, 2, 3, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r19.sources);
} }
function AppComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AppComponent_div_9_div_1_Template, 2, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AppComponent_div_9_ng_template_2_Template, 1, 0, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AppComponent_div_9_div_4_Template, 4, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_div_9_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r24.reload(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Reload");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](3);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.selectedChainStat == null ? null : ctx_r2.selectedChainStat.extractSuccess)("ngIfElse", _r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.selectedChainStat == null ? null : ctx_r2.selectedChainStat.source);
} }
function AppComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, "Loading...");
} }
class AppComponent {
    constructor(logger, momentUtil, configService, chainService, graphService) {
        this.logger = logger;
        this.momentUtil = momentUtil;
        this.configService = configService;
        this.chainService = chainService;
        this.graphService = graphService;
        this.minWeight = 0;
        this.selectedLibraryType = _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"].D3;
        this.selectedChainType = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].TEST;
        this.chains = _app_constants__WEBPACK_IMPORTED_MODULE_0__["AppConstants"].CHAINS;
        this.libraries = _app_constants__WEBPACK_IMPORTED_MODULE_0__["AppConstants"].LIBRARIES;
        this.sources = _app_constants__WEBPACK_IMPORTED_MODULE_0__["AppConstants"].SOURCES;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.setMinWeight();
            this.setSelectedLibraryType();
            this.setSelectedChainType();
            this.load();
        }, 0);
    }
    changeMinWeight($event) {
        this.configService.config.minWeight = $event.target.value;
        this.setMinWeight();
        this.load();
    }
    changeChain($event) {
        this.configService.config.selectedChainType = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"][$event.target.value]];
        this.setSelectedChainType();
        this.setSelectedChainStat();
        this.load();
    }
    changeLibrary($event) {
        this.graphService.stopSimulation();
        setTimeout(() => {
            this.configService.config.selectedGraphLibraryType = _enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"][_enums_graph_enum__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryType"][$event.target.value]];
            this.setSelectedLibraryType();
            this.load();
        }, 0);
    }
    changeSource($event) {
        this.clear();
        const source = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"][$event.target.value]];
        this.chainService.extractChainBySourceAsync(this.configService.config.selectedChainType, source).then(() => {
            this.setSelectedChainStat();
            this.graphService.load();
        });
    }
    get isLoading() {
        return this.chainService.isExtracting;
    }
    get showGraph() {
        var _a;
        return !this.chainService.isExtracting && (((_a = this.selectedChainStat) === null || _a === void 0 ? void 0 : _a.extractSuccess) || this.selectedChainType === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].TEST);
    }
    get showStopSimulationButton() {
        return this.graphService.isSimulating;
    }
    get appVersion() {
        return 'v' + this.configService.config.version;
    }
    stopSimulation() {
        this.graphService.stopSimulation();
    }
    reload() {
        this.chainService.clearAllAsync().then(() => {
            this.load();
        });
    }
    formatDate(date) {
        return this.momentUtil.getLocalReverseFormatted(date);
    }
    setMinWeight() {
        this.minWeight = this.configService.config.minWeight;
    }
    setSelectedChainStat() {
        this.chainService.getChainStatByType(this.configService.config.selectedChainType).then(result => {
            this.selectedChainStat = result;
        });
    }
    setSelectedChainType() {
        this.selectedChainType = this.configService.config.selectedChainType;
    }
    setSelectedLibraryType() {
        this.selectedLibraryType = this.configService.config.selectedGraphLibraryType;
    }
    clear() {
        this.logger.clear();
        this.graphService.clear();
    }
    load() {
        this.clear();
        this.chainService.extractAsync().then(() => {
            this.setSelectedChainStat();
            this.graphService.load();
            // this.graphService.transformCrossChain();
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_utils_moment_util__WEBPACK_IMPORTED_MODULE_5__["MomentUtil"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_chain_service__WEBPACK_IMPORTED_MODULE_7__["ChainService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_8__["GraphService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["hopr-root"]], decls: 14, vars: 6, consts: [["id", "app"], ["id", "header"], [4, "ngIf"], ["id", "main"], [3, "hidden"], ["id", "footer"], [4, "ngIf", "ngIfElse"], ["showLoadingBlock", ""], ["id", "appVersion"], [3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["type", "range", "min", "0", "max", "100", "step", "1", 3, "value", "change"], [3, "click", 4, "ngIf"], [3, "value", "selected"], [3, "click"], ["extractFailedBlock", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "HOPR network graph");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AppComponent_div_4_Template, 9, 5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "hopr-logs", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, AppComponent_hopr_network_graph_7_Template, 1, 0, "hopr-network-graph", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, AppComponent_div_9_Template, 7, 3, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, AppComponent_ng_template_10_Template, 1, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("hidden", ctx.showGraph);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showGraph);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoading)("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.appVersion, " ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _components_logs_logs_component__WEBPACK_IMPORTED_MODULE_10__["LogsComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_11__["GraphComponent"]], styles: ["button[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\r\n  margin: 0 5px 0 5px;\r\n}\r\n\r\n#app[_ngcontent-%COMP%] {\r\n  min-width: 740px;\r\n}\r\n\r\n#header[_ngcontent-%COMP%] {\r\n  margin: 8px;\r\n}\r\n\r\n#header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n}\r\n\r\n#main[_ngcontent-%COMP%] {\r\n  height: 70vh;\r\n  float: left;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n#footer[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  padding: 5px;\r\n  background-color: #fff;\r\n}\r\n\r\n#footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n}\r\n\r\n#appVersion[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  bottom: 0;\r\n  right: 0;\r\n  padding: 5px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsT0FBTztFQUNQLFlBQVk7RUFDWixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFFBQVE7RUFDUixZQUFZO0FBQ2QiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24sXHJcbnNlbGVjdCB7XHJcbiAgbWFyZ2luOiAwIDVweCAwIDVweDtcclxufVxyXG5cclxuI2FwcCB7XHJcbiAgbWluLXdpZHRoOiA3NDBweDtcclxufVxyXG5cclxuI2hlYWRlciB7XHJcbiAgbWFyZ2luOiA4cHg7XHJcbn1cclxuXHJcbiNoZWFkZXIgZGl2IHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbiNtYWluIHtcclxuICBoZWlnaHQ6IDcwdmg7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4jZm9vdGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbiNmb290ZXIgZGl2IHtcclxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG5cclxuI2FwcFZlcnNpb24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgcGFkZGluZzogNXB4O1xyXG59Il19 */"] });


/***/ }),

/***/ "Tge8":
/*!**********************************************!*\
  !*** ./src/app/extractors/base.extractor.ts ***!
  \**********************************************/
/*! exports provided: BaseChainExtractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseChainExtractor", function() { return BaseChainExtractor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");




class BaseChainExtractor {
    constructor(logger) {
        this.logger = logger;
    }
    get name() {
        var _a, _b;
        return (_b = (_a = _app_constants__WEBPACK_IMPORTED_MODULE_1__["AppConstants"].SOURCES.find(e => e.type === this.type)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown';
    }
    extractAsync(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__["Ensure"].notNull(chain, 'chain');
            this.logger.info(`${this.name} extraction of ${_enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainType"][chain.type]} started.`)();
            try {
                const result = yield this.extractAsyncInternal(chain);
                this.logger.info(`${this.name} extraction of ${_enums_chain_enum__WEBPACK_IMPORTED_MODULE_2__["ChainType"][chain.type]} ended.`)();
                return result;
            }
            catch (error) {
                this.logger.error(error)();
                return Promise.reject('Chain data could not be extracted.');
            }
        });
    }
}


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
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! data-forge */ "UjV8");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_chain_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/chain.model */ "tUmK");
/* harmony import */ var _models_config_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/config.model */ "oRqo");
/* harmony import */ var _models_event_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../models/event.model */ "Z2SW");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../models/graph.model */ "XZxx");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./logger.service */ "Mb37");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./config.service */ "r4Kj");
/* harmony import */ var _repositories_event_repository__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../repositories/event.repository */ "VeAt");
/* harmony import */ var _utils_file_util__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/file.util */ "YcFz");
/* harmony import */ var _utils_moment_util__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../utils/moment.util */ "nBAI");


















class GraphService {
    constructor(logger, configService, eventRepository, fileUtil, momentUtil) {
        this.logger = logger;
        this.configService = configService;
        this.eventRepository = eventRepository;
        this.fileUtil = fileUtil;
        this.momentUtil = momentUtil;
        this.isLoading = false;
        this.isSimulating = false;
        this.drawArrow = false;
        this.drawEdgeLabel = false;
        this.drawNodeLabel = false;
        this._onChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.filter = new Map([
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].MINT],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_6__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].MINT],
                    name: 'Mint',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].TX_EVENT_MINT_COLOR
                })
            ],
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].TRANSFER],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_6__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].TRANSFER],
                    name: 'Transfer',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].TX_EVENT_TRANSFER_COLOR
                })
            ],
            [
                _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].BURN],
                new _models_chain_model__WEBPACK_IMPORTED_MODULE_6__["ChainFilterItemModel"]({
                    id: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].BURN],
                    name: 'Burn',
                    isSelected: true,
                    color: _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].TX_EVENT_BURN_COLOR
                })
            ]
        ]);
    }
    get currentData() {
        return this._currentData;
    }
    get onChangeSubject() {
        return this._onChangeSubject;
    }
    clear() {
        this._data = undefined;
        this._currentData = undefined;
        this._nodeMap = undefined;
        this._edgeMap = undefined;
        this.submitDataSubjectEvent(undefined);
    }
    load() {
        this.isLoading = true;
        this.loadAsync().catch((error) => {
            this.logger.info(error)();
        }).finally(() => {
            this.isLoading = false;
        });
    }
    stopSimulation() {
        this._onChangeSubject.next(new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["GraphEventModel"]({
            type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_5__["GraphEventType"].STOP_SIMULATION
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
    transformCrossChain() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const chain1 = this.configService.config.getChainByType(_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainType"].ETH_MAIN);
            const chain2 = this.configService.config.getChainByType(_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainType"].XDAI_MAIN);
            const bridgeAddress1 = chain1.bridgeContractAddress;
            const bridgeAddress2 = chain2.bridgeContractAddress;
            const events = yield this.eventRepository.getAllAsync();
            let eventsDataFrame = new data_forge__WEBPACK_IMPORTED_MODULE_1__["DataFrame"](events).setIndex('_id').bake();
            eventsDataFrame = eventsDataFrame.where(e => e.chainType === chain1.type || e.chainType === chain2.type);
            const transfersDataFrame = eventsDataFrame.where(e => e.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].TRANSFER).cast();
            this.logger.info('transfersDataFrame', transfersDataFrame.count())();
            const startEvents = eventsDataFrame.where(e => e.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].BRIDGE_START).cast()
                .join(transfersDataFrame, left => left.transactionHash, right => right.transactionHash, (left1, right1) => {
                return {
                    messageId: left1.argsMessageId,
                    bridgeStart: left1,
                    transfer: right1
                };
            });
            this.logger.info('startEvents', startEvents.count())();
            this.logger.info(startEvents.take(3).toArray())();
            const endEvents = eventsDataFrame.where(e => e.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].BRIDGE_END).cast()
                .join(startEvents, left => left.argsMessageId, right => right.messageId, (left1, right1) => {
                const innerResult = {
                    index: right1.transfer._id,
                    transactionHash: left1.transactionHash,
                    transfer: right1.transfer,
                    excludeTransfer: false
                };
                if (right1.transfer.argsTo === bridgeAddress1 || right1.transfer.argsTo === bridgeAddress2) {
                    // sender -> bridge
                    innerResult.excludeTransfer = true;
                }
                if (right1.transfer.argsFrom === bridgeAddress1 || right1.transfer.argsFrom === bridgeAddress2) {
                    if (right1.transfer.argsTo === _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].VOID_ADDRESS) {
                        // bridge -> 0x
                        innerResult.excludeTransfer = true;
                    }
                    else {
                        // bridge -> fee receiver
                        // Clone the transfer object before modifying values
                        const transferCloned = new _models_event_model__WEBPACK_IMPORTED_MODULE_8__["TransferEventModel"](innerResult.transfer);
                        transferCloned.argsFrom = right1.bridgeStart.argsSender;
                        innerResult.transfer = transferCloned;
                    }
                }
                return innerResult;
            }).setIndex('index').bake();
            this.logger.info('endEvents', endEvents.count())();
            this.logger.info(endEvents.take(3).toArray())();
            // this.logger.info(leftEvents.where(e => e._id === rightEnd.first().transfer?._id).first());
            const projectedTransfers = endEvents.distinct(e => e.transactionHash).join(transfersDataFrame, left => left.transactionHash, right => right.transactionHash, (left1, right1) => {
                // 0x -> recipient or bridge -> recipient
                if (right1.argsFrom === _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].VOID_ADDRESS || right1.argsFrom === bridgeAddress1 || right1.argsFrom === bridgeAddress2) {
                    // Clone the transfer object before modifying values
                    const transferCloned = new _models_event_model__WEBPACK_IMPORTED_MODULE_8__["TransferEventModel"](right1);
                    transferCloned.argsFrom = left1.transfer.argsFrom;
                    return transferCloned;
                }
                return right1;
            }).setIndex('_id').bake();
            this.logger.info('projectedTransfers', projectedTransfers.count())();
            this.logger.info(projectedTransfers.take(4).toArray())();
            const projectedTransfer = projectedTransfers.first();
            this.logger.info(projectedTransfer)();
            // Build final transfers array...
            // const finalResult = transfersDataFrame.joinOuterLeft(
            //   projectedTransfers,
            //   left => left._id,
            //   right => right._id,
            //   (left1, right1) => {
            //     if (right1) {
            //       return right1;
            //     }
            //     return left1;
            //   }
            // );
            this.logger.info('excludeTransfer', endEvents.where(e => e.excludeTransfer).count())();
            const endEventsMap = new Map(endEvents.toPairs());
            const projectedTransfersMap = new Map(projectedTransfers.toPairs());
            const finalResult = [];
            transfersDataFrame.toArray().forEach(e => {
                const endEvent = endEventsMap.get(e._id);
                if (endEvent) {
                    if (!endEvent.excludeTransfer) {
                        finalResult.push(endEvent.transfer);
                    }
                }
                else if (projectedTransfersMap.has(e._id)) {
                    finalResult.push(projectedTransfersMap.get(e._id));
                }
                else {
                    finalResult.push(e);
                }
            });
            this.logger.info('finalResult', finalResult.length)();
            this.logger.info(finalResult.find(e => e._id === projectedTransfer._id))();
        });
    }
    loadAsync() {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this._nodeMap = new Map();
            this._edgeMap = new Map();
            if ((_a = this.configService.config) === null || _a === void 0 ? void 0 : _a.selectedChain) {
                const data = yield this.init((_b = this.configService.config) === null || _b === void 0 ? void 0 : _b.selectedChain);
                this.submitDataSubjectEvent(data);
            }
            else {
                this.logger.info('No chain is selected.')();
                this.submitDataSubjectEvent(undefined);
            }
        });
    }
    init(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_11__["Ensure"].notNull(chain, _models_config_model__WEBPACK_IMPORTED_MODULE_7__["ChainConfigModel"].name);
            try {
                if (chain.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainType"].TEST) {
                    const rawData = yield this.fileUtil.readFileAsync(chain.eventsPath);
                    this._data = this.convertTestData(JSON.parse(rawData));
                }
                else {
                    const events = yield this.eventRepository.getByChainTypeAsync(chain.type);
                    this._data = this.convertChainEvents(events);
                }
                return this.applyFilters(this._data);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    convertTestData(testData) {
        var _a, _b;
        const data = this.createGraphContainerModel();
        if (Array.isArray(testData === null || testData === void 0 ? void 0 : testData.nodes) && Array.isArray(testData === null || testData === void 0 ? void 0 : testData.edges)) {
            data.nodes = (_a = testData === null || testData === void 0 ? void 0 : testData.nodes) === null || _a === void 0 ? void 0 : _a.map((e) => new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["NodeGraphModel"](e));
            data.edges = (_b = testData === null || testData === void 0 ? void 0 : testData.edges) === null || _b === void 0 ? void 0 : _b.map((e) => new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["EdgeGraphModel"](e));
            for (const node of data.nodes) {
                this._nodeMap.set(node.data.id, node);
            }
        }
        return data;
    }
    convertChainEvents(events) {
        const data = this.createGraphContainerModel();
        if (Array.isArray(events)) {
            for (const item of events) {
                if (item.type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].TRANSFER) {
                    this.addGraphElements(this.createTransferEventModel(item), data);
                }
            }
        }
        return data;
    }
    addGraphElements(transfer, data) {
        this.tryAddNode(transfer.argsFrom, transfer, data);
        this.tryAddNode(transfer.argsTo, transfer, data);
        this.tryAddEdge(transfer, data);
    }
    tryAddNode(address, transfer, data) {
        if (this._nodeMap.has(address)) {
            const node = this._nodeMap.get(address);
            this.addTransfer(transfer, node.scratch.transfers);
            node.data.weight = Math.min(node.scratch.transfers.length, 100);
            node.data.name = node.scratch.transfers.length.toString();
        }
        else {
            const node = this.createNodeModel(address, this.copyTransfer(transfer));
            this._nodeMap.set(address, node);
            data.nodes.push(node);
        }
    }
    tryAddEdge(transfer, data) {
        const index = _utils_common_util__WEBPACK_IMPORTED_MODULE_10__["CommonUtil"].combineIndex(transfer.argsFrom, transfer.argsTo);
        if (_utils_common_util__WEBPACK_IMPORTED_MODULE_10__["CommonUtil"].isNullOrWhitespace(index)) {
            throw new Error('Invalid transfer');
        }
        if (this._edgeMap.has(index)) {
            const edge = this._edgeMap.get(index);
            this.addTransfer(transfer, edge.scratch.transfers);
            edge.data.strength = Math.min(edge.scratch.transfers.length, 100);
            edge.data.name = edge.scratch.transfers.length.toString();
        }
        else {
            const edge = this.createEdgeModel(this.copyTransfer(transfer));
            this._edgeMap.set(index, edge);
            data.edges.push(edge);
        }
    }
    copyTransfer(transfer) {
        const transferCopy = new _models_event_model__WEBPACK_IMPORTED_MODULE_8__["TransferEventModel"](transfer);
        if (transfer.blockTimestamp) {
            const timestamp = _utils_common_util__WEBPACK_IMPORTED_MODULE_10__["CommonUtil"].tryParseInt(transfer.blockTimestamp);
            if (timestamp && timestamp > 0) {
                transferCopy.blockTimestamp = this.momentUtil.getLocalReverseFormatted(this.momentUtil.getFromUnix(timestamp));
            }
        }
        return transferCopy;
    }
    addTransfer(transfer, transfers) {
        const transferCopy = this.copyTransfer(transfer);
        transfers.unshift(transferCopy);
        return transferCopy;
    }
    applyFilters(data) {
        let filteredData;
        if (data) {
            filteredData = this.filterByWeight(data, this.configService.config.minWeight);
            filteredData = this.filterBySelection(filteredData);
        }
        return filteredData;
    }
    filterByWeight(data, minWeight) {
        const result = this.createGraphContainerModel();
        if (data) {
            this.logger.info(`${data.nodes.length} nodes and ${data.edges.length} edges before filtering by weight.`)();
            result.nodes = data.nodes.filter((e) => e.data.weight > minWeight);
            result.edges = data.edges.filter((e) => {
                var _a, _b;
                return ((_a = this._nodeMap.get(e.data.source)) === null || _a === void 0 ? void 0 : _a.data.weight) > minWeight
                    && ((_b = this._nodeMap.get(e.data.target)) === null || _b === void 0 ? void 0 : _b.data.weight) > minWeight;
            });
            this.logger.info(`${result.nodes.length} nodes and ${result.edges.length} edges after filtering by weight.`)();
        }
        return result;
    }
    filterBySelection(data) {
        var _a;
        let result;
        if (data) {
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
                    if (types.includes(_enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"][(_a = edge.scratch.refTransfer) === null || _a === void 0 ? void 0 : _a.type])) {
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
        }
        return result;
    }
    submitDataSubjectEvent(data) {
        this._currentData = data;
        this._onChangeSubject.next(new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["GraphEventModel"]({
            type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_5__["GraphEventType"].DATA_CHANGED
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
    createTransferEventModel(element) {
        if (element) {
            const model = new _models_event_model__WEBPACK_IMPORTED_MODULE_8__["TransferEventModel"](element);
            model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].TRANSFER;
            if (model.argsFrom === _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].VOID_ADDRESS) {
                model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].MINT;
            }
            else if (model.argsTo === _app_constants__WEBPACK_IMPORTED_MODULE_3__["AppConstants"].VOID_ADDRESS) {
                model.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_4__["ChainTxEventType"].BURN;
            }
            return model;
        }
        return undefined;
    }
    createNodeModel(address, transfer) {
        return new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["NodeGraphModel"]({
            data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["NodeDataModel"]({
                id: address,
                name: '1'
            }),
            scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["GraphScratchModel"]({
                transfers: [transfer]
            })
        });
    }
    createEdgeModel(transfer) {
        return new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["EdgeGraphModel"]({
            data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["EdgeDataModel"]({
                name: '1',
                source: transfer.argsFrom,
                target: transfer.argsTo
            }),
            scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_9__["GraphScratchModel"]({
                refTransfer: transfer,
                transfers: [transfer]
            })
        });
    }
}
GraphService.ɵfac = function GraphService_Factory(t) { return new (t || GraphService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_logger_service__WEBPACK_IMPORTED_MODULE_13__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_14__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_repositories_event_repository__WEBPACK_IMPORTED_MODULE_15__["EventRepository"]), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_utils_file_util__WEBPACK_IMPORTED_MODULE_16__["FileUtil"]), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_utils_moment_util__WEBPACK_IMPORTED_MODULE_17__["MomentUtil"])); };
GraphService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({ token: GraphService, factory: GraphService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "V9FA":
/*!******************************************!*\
  !*** ./src/app/models/position.model.ts ***!
  \******************************************/
/*! exports provided: PositionModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionModel", function() { return PositionModel; });
class PositionModel {
    constructor(data) {
        this.init(data);
    }
    init(data) {
        if (data) {
            this.x = data.x;
            this.y = data.y;
        }
    }
}


/***/ }),

/***/ "VCjm":
/*!*************************************************!*\
  !*** ./src/app/repositories/stat.repository.ts ***!
  \*************************************************/
/*! exports provided: StatRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatRepository", function() { return StatRepository; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_stat_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/stat.model */ "tw/Z");
/* harmony import */ var _base_repository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.repository */ "sWCe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/config.service */ "r4Kj");







class StatRepository extends _base_repository__WEBPACK_IMPORTED_MODULE_3__["BaseRepository"] {
    constructor(logger, configService) {
        super(logger);
        this.logger = logger;
        this.configService = configService;
    }
    init() {
        super.createDatabase('stats');
    }
    getOrCreateByChainTypeAsync(type) {
        const _super = Object.create(null, {
            getByIdAsync: { get: () => super.getByIdAsync },
            insertAsync: { get: () => super.insertAsync }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const id = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"][type];
            try {
                let result = yield _super.getByIdAsync.call(this, id);
                if (!result) {
                    result = new _models_stat_model__WEBPACK_IMPORTED_MODULE_2__["ChainStatModel"]({
                        _id: id,
                        version: this.configService.config.version,
                        type
                    });
                    yield _super.insertAsync.call(this, result);
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
StatRepository.ɵfac = function StatRepository_Factory(t) { return new (t || StatRepository)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_5__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"])); };
StatRepository.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: StatRepository, factory: StatRepository.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "VEB8":
/*!*************************************************!*\
  !*** ./src/app/extractors/graphql.extractor.ts ***!
  \*************************************************/
/*! exports provided: GraphqlChainExtractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphqlChainExtractor", function() { return GraphqlChainExtractor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_event_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/event.model */ "Z2SW");
/* harmony import */ var _models_subgraph_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/subgraph.model */ "iWl/");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _base_extractor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.extractor */ "Tge8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");
/* harmony import */ var _clients_thegraph_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../clients/thegraph.client */ "0RC7");









class GraphqlChainExtractor extends _base_extractor__WEBPACK_IMPORTED_MODULE_5__["BaseChainExtractor"] {
    constructor(logger, client) {
        super(logger);
        this.logger = logger;
        this.client = client;
    }
    get type() {
        return _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].GRAPHQL;
    }
    extractAsyncInternal(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // Get all transactions and transform them
            const events = [];
            const transactions = yield this.getTransactionsRecursiveAsync(chain, 1000);
            this.transform(chain, transactions, events);
            return events;
        });
    }
    getTransactionsRecursiveAsync(chain, limit, lastIndex = 0) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info(`Extracting transactions with index greater than ${lastIndex}.`)();
            let transactions = yield this.client.getTransactions(chain, limit, lastIndex);
            if ((transactions === null || transactions === void 0 ? void 0 : transactions.length) >= limit) {
                const index = _utils_common_util__WEBPACK_IMPORTED_MODULE_4__["CommonUtil"].tryParseInt(transactions[transactions.length - 1].index);
                if (index && index > 0) {
                    transactions = transactions.concat(yield this.getTransactionsRecursiveAsync(chain, limit, index));
                }
            }
            return transactions;
        });
    }
    transform(chain, transactions, events) {
        if (transactions && events) {
            const eventSignature = chain.mapTxEventTypeToString(_enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainTxEventType"].TRANSFER);
            for (const transaction of transactions) {
                for (const transfer of transaction.transferEvents) {
                    if (!this.shouldSkip(chain.type, transfer.tokenType)) {
                        const event = this.transformTransfer(chain.type, transaction, transfer, eventSignature);
                        if (event) {
                            events.push(event);
                        }
                    }
                }
            }
        }
    }
    transformTransfer(chainType, transaction, transfer, eventSignature) {
        if (transfer) {
            return new _models_event_model__WEBPACK_IMPORTED_MODULE_2__["TransferEventModel"]({
                chainType,
                eventSignature,
                blockNumber: _utils_common_util__WEBPACK_IMPORTED_MODULE_4__["CommonUtil"].tryParseInt(transfer.blockNumber),
                blockTimestamp: transfer.blockTimestamp,
                transactionHash: transaction.id,
                logIndex: _utils_common_util__WEBPACK_IMPORTED_MODULE_4__["CommonUtil"].tryParseInt(transfer.logIndex),
                argsFrom: transfer.from,
                argsTo: transfer.to,
                argsAmount: transfer.amount
            });
        }
        return undefined;
    }
    shouldSkip(chainType, tokenType) {
        if (chainType === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].XDAI_MAIN && tokenType !== _models_subgraph_model__WEBPACK_IMPORTED_MODULE_3__["SubgraphTokenTypes"].XHOPR) {
            return true;
        }
        return false;
    }
}
GraphqlChainExtractor.ɵfac = function GraphqlChainExtractor_Factory(t) { return new (t || GraphqlChainExtractor)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_7__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_clients_thegraph_client__WEBPACK_IMPORTED_MODULE_8__["TheGraphClient"])); };
GraphqlChainExtractor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: GraphqlChainExtractor, factory: GraphqlChainExtractor.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "VeAt":
/*!**************************************************!*\
  !*** ./src/app/repositories/event.repository.ts ***!
  \**************************************************/
/*! exports provided: EventRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventRepository", function() { return EventRepository; });
/* harmony import */ var _base_repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.repository */ "sWCe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");



class EventRepository extends _base_repository__WEBPACK_IMPORTED_MODULE_0__["BaseRepository"] {
    constructor(logger) {
        super(logger);
        this.logger = logger;
    }
    init() {
        super.createDatabase('events');
    }
    getByChainTypeAsync(type) {
        try {
            return Promise.resolve(this._db({ chainType: type }).get());
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    getLastBlockByChainTypeAsync(type) {
        try {
            return Promise.resolve(this._db({ chainType: type }).max('blockNumber'));
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    clearByChainType(type) {
        try {
            this._db({ chainType: type }).remove();
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
EventRepository.ɵfac = function EventRepository_Factory(t) { return new (t || EventRepository)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_2__["Logger"])); };
EventRepository.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EventRepository, factory: EventRepository.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Wp+X":
/*!**********************************!*\
  !*** ./src/app/utils/id.util.ts ***!
  \**********************************/
/*! exports provided: IdUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdUtil", function() { return IdUtil; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "4USb");

class IdUtil {
    static create() {
        return Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v1"])();
    }
}


/***/ }),

/***/ "XZxx":
/*!***************************************!*\
  !*** ./src/app/models/graph.model.ts ***!
  \***************************************/
/*! exports provided: BaseGraphModel, NodeGraphModel, NodeDataModel, NodeViewGraphModel, EdgeGraphModel, EdgeDataModel, EdgeViewGraphModel, GraphContainerModel, GraphScratchModel, GraphEventModel, GraphStateModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseGraphModel", function() { return BaseGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeGraphModel", function() { return NodeGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeDataModel", function() { return NodeDataModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeViewGraphModel", function() { return NodeViewGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeGraphModel", function() { return EdgeGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeDataModel", function() { return EdgeDataModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeViewGraphModel", function() { return EdgeViewGraphModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphContainerModel", function() { return GraphContainerModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphScratchModel", function() { return GraphScratchModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphEventModel", function() { return GraphEventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphStateModel", function() { return GraphStateModel; });
/* harmony import */ var _event_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event.model */ "Z2SW");
/* harmony import */ var _position_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./position.model */ "V9FA");


class BaseGraphModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a, _b, _c, _d, _e;
        if (init) {
            this.selected = init.selected;
            this.selectable = init.selectable;
            this.locked = init.locked;
            this.grabbable = init.grabbable;
            this.pannable = init.pannable;
            if (Array.isArray(init.classes)) {
                this.classes = [];
                for (const item of init.classes) {
                    this.classes.push(item);
                }
            }
            if (init.position) {
                this.position = new _position_model__WEBPACK_IMPORTED_MODULE_1__["PositionModel"](init.position);
            }
            if (init.renderedPosition) {
                this.renderedPosition = new _position_model__WEBPACK_IMPORTED_MODULE_1__["PositionModel"](init.renderedPosition);
            }
            if (init.scratch) {
                this.scratch = new GraphScratchModel(init.scratch);
            }
        }
        this.selected = (_a = this.selected) !== null && _a !== void 0 ? _a : false;
        this.selectable = (_b = this.selectable) !== null && _b !== void 0 ? _b : true;
        this.locked = (_c = this.locked) !== null && _c !== void 0 ? _c : false;
        this.grabbable = (_d = this.grabbable) !== null && _d !== void 0 ? _d : true;
        this.pannable = (_e = this.pannable) !== null && _e !== void 0 ? _e : false;
        if (!this.classes) {
            this.classes = [];
        }
        if (!this.scratch) {
            this.scratch = new GraphScratchModel();
        }
    }
}
class NodeGraphModel extends BaseGraphModel {
    constructor(init) {
        super(init);
    }
    init(init) {
        super.init(init);
        if (init) {
            if (init.data) {
                this.data = new NodeDataModel(init.data);
            }
        }
    }
    get group() {
        return 'nodes';
    }
}
class NodeDataModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a;
        if (init) {
            this.id = init.id;
            this.name = init.name;
            this.weight = init.weight;
            this.colorCode = init.colorCode;
            this.shapeType = init.shapeType;
        }
        this.weight = (_a = this.weight) !== null && _a !== void 0 ? _a : 1;
    }
}
class NodeViewGraphModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a;
        if (init) {
            this.type = init.type;
            this.id = init.id;
            this.name = init.name;
            this.weight = init.weight;
            this.x = init.x;
            this.y = init.y;
            this.transfers = (_a = init.transfers) === null || _a === void 0 ? void 0 : _a.map((e) => new _event_model__WEBPACK_IMPORTED_MODULE_0__["TransferEventModel"](e));
        }
        if (!this.transfers) {
            this.transfers = [];
        }
    }
}
class EdgeGraphModel extends BaseGraphModel {
    constructor(init) {
        super(init);
    }
    init(init) {
        super.init(init);
        if (init) {
            if (init.data) {
                this.data = new EdgeDataModel(init.data);
            }
        }
    }
    get group() {
        return 'edges';
    }
}
class EdgeDataModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a;
        if (init) {
            this.name = init.name;
            this.source = init.source;
            this.target = init.target;
            this.strength = init.strength;
            this.colorCode = init.colorCode;
        }
        this.strength = (_a = this.strength) !== null && _a !== void 0 ? _a : 1;
    }
}
class EdgeViewGraphModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a;
        if (init) {
            this.type = init.type;
            this.name = init.name;
            this.source = init.source;
            this.target = init.target;
            this.strength = init.strength;
            if (init.refTransfer) {
                this.refTransfer = new _event_model__WEBPACK_IMPORTED_MODULE_0__["TransferEventModel"](init.refTransfer);
            }
            this.transfers = (_a = init.transfers) === null || _a === void 0 ? void 0 : _a.map((e) => new _event_model__WEBPACK_IMPORTED_MODULE_0__["TransferEventModel"](e));
        }
        if (!this.transfers) {
            this.transfers = [];
        }
    }
}
class GraphContainerModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        var _a, _b;
        if (init) {
            this.nodes = (_a = init.nodes) === null || _a === void 0 ? void 0 : _a.map((e) => new NodeGraphModel(e));
            this.edges = (_b = init.edges) === null || _b === void 0 ? void 0 : _b.map((e) => new EdgeGraphModel(e));
        }
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
        this.init(init);
    }
    init(init) {
        var _a;
        if (init) {
            if (init === null || init === void 0 ? void 0 : init.refTransfer) {
                this.refTransfer = new _event_model__WEBPACK_IMPORTED_MODULE_0__["TransferEventModel"](init.refTransfer);
            }
            this.transfers = (_a = init.transfers) === null || _a === void 0 ? void 0 : _a.map((e) => new _event_model__WEBPACK_IMPORTED_MODULE_0__["TransferEventModel"](e));
        }
        if (!this.transfers) {
            this.transfers = [];
        }
    }
}
class GraphEventModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        if (init) {
            this.type = init.type;
            this.payload = init.payload;
        }
    }
}
class GraphStateModel {
    constructor(init) {
        this.init(init);
    }
    init(init) {
        if (init) {
            this.isDestroyed = init.isDestroyed;
            this.isZoomed = init.isZoomed;
            this.requestedAnimationFrame = init.requestedAnimationFrame;
        }
    }
}


/***/ }),

/***/ "YcFz":
/*!************************************!*\
  !*** ./src/app/utils/file.util.ts ***!
  \************************************/
/*! exports provided: FileUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUtil", function() { return FileUtil; });
class FileUtil {
}


/***/ }),

/***/ "Z2SW":
/*!***************************************!*\
  !*** ./src/app/models/event.model.ts ***!
  \***************************************/
/*! exports provided: EventModel, TransferEventModel, TokensBridgingInitiatedEventModel, TokensBridgedEventModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventModel", function() { return EventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferEventModel", function() { return TransferEventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokensBridgingInitiatedEventModel", function() { return TokensBridgingInitiatedEventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokensBridgedEventModel", function() { return TokensBridgedEventModel; });
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_id_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/id.util */ "Wp+X");



class EventModel {
    constructor(data) {
        this.init(data);
    }
    static fromJS(data, chain) {
        data = typeof data === 'object' ? data : {};
        data.chainType = chain.type;
        data.type = chain.mapTxEventSignatureToType(data.eventSignature);
        switch (data.type) {
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].TRANSFER:
                return TransferEventModel.fromJS(data);
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].BRIDGE_START:
                return TokensBridgingInitiatedEventModel.fromJS(data);
            case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].BRIDGE_END:
                return TokensBridgedEventModel.fromJS(data);
            default:
                break;
        }
        return new EventModel(data);
    }
    init(data) {
        if (data) {
            this._id = data._id;
            this.chainType = data.chainType;
            this.blockNumber = data.blockNumber;
            this.blockHash = data.blockHash;
            this.blockTimestamp = data.blockTimestamp;
            this.transactionIndex = data.transactionIndex;
            this.removed = data.removed;
            this.address = data.address;
            this.data = data.data;
            if (Array.isArray(data.topics)) {
                this.topics = [];
                for (const item of data.topics) {
                    this.topics.push(item);
                }
            }
            this.transactionHash = data.transactionHash;
            this.logIndex = data.logIndex;
            this.eventSignature = data.eventSignature;
            this.type = data.type;
        }
        if (!this._id) {
            this._id = _utils_id_util__WEBPACK_IMPORTED_MODULE_2__["IdUtil"].create();
        }
        if (!this.topics) {
            this.topics = [];
        }
    }
}
class TransferEventModel extends EventModel {
    constructor(data) {
        super(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        const result = new TransferEventModel(data);
        if (Array.isArray(data.args)) {
            if (data.args.length !== 3) {
                throw new Error('Invalid TransferEvent arguments.');
            }
            result.argsFrom = data.args[0];
            result.argsTo = data.args[1];
            result.argsAmount = _utils_common_util__WEBPACK_IMPORTED_MODULE_1__["CommonUtil"].formatBigNumber(data.args[2]);
        }
        return result;
    }
    init(data) {
        super.init(data);
        if (data) {
            this.argsFrom = data.argsFrom;
            this.argsTo = data.argsTo;
            this.argsAmount = data.argsAmount;
        }
        if (!this.type) {
            this.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].TRANSFER;
        }
    }
}
class TokensBridgingInitiatedEventModel extends EventModel {
    constructor(data) {
        super(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        const result = new TokensBridgingInitiatedEventModel(data);
        if (Array.isArray(data.args)) {
            if (data.args.length !== 4) {
                throw new Error('Invalid TokensBridgingInitiatedEvent arguments.');
            }
            result.argsToken = data.args[0];
            result.argsSender = data.args[1];
            result.argsValue = data.args[2];
            result.argsMessageId = data.args[3];
        }
        return result;
    }
    init(data) {
        super.init(data);
        if (data) {
            this.argsToken = data.argsToken;
            this.argsSender = data.argsSender;
            this.argsValue = data.argsValue;
            this.argsMessageId = data.argsMessageId;
        }
        if (!this.type) {
            this.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].BRIDGE_START;
        }
    }
}
class TokensBridgedEventModel extends EventModel {
    constructor(data) {
        super(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        const result = new TokensBridgedEventModel(data);
        if (Array.isArray(data.args)) {
            if (data.args.length !== 4) {
                throw new Error('Invalid TokensBridgedEvent arguments.');
            }
            result.argsToken = data.args[0];
            result.argsRecipient = data.args[1];
            result.argsValue = data.args[2];
            result.argsMessageId = data.args[3];
        }
        return result;
    }
    init(data) {
        super.init(data);
        if (data) {
            this.argsToken = data.argsToken;
            this.argsRecipient = data.argsRecipient;
            this.argsValue = data.argsValue;
            this.argsMessageId = data.argsMessageId;
        }
        if (!this.type) {
            this.type = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].BRIDGE_END;
        }
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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cytoscape/cytoscape.component */ "0afA");
/* harmony import */ var _components_d3_d3_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/d3/d3.component */ "+yM7");
/* harmony import */ var _components_d3canvas_d3canvas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/d3canvas/d3canvas.component */ "GOCD");
/* harmony import */ var _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/graph/graph.component */ "FzN6");
/* harmony import */ var _components_logs_logs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/logs/logs.component */ "nnAZ");
/* harmony import */ var _components_stardust_stardust_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/stardust/stardust.component */ "wJvV");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/config.service */ "r4Kj");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/logger.service */ "Mb37");
/* harmony import */ var _utils_browser_file_util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/browser-file.util */ "K2Fl");
/* harmony import */ var _utils_file_util__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/file.util */ "YcFz");















function initConfig(config) {
    return () => config.initAsync();
}
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _utils_file_util__WEBPACK_IMPORTED_MODULE_13__["FileUtil"],
            useClass: _utils_browser_file_util__WEBPACK_IMPORTED_MODULE_12__["BrowserFileUtil"]
        },
        {
            provide: _services_logger_service__WEBPACK_IMPORTED_MODULE_11__["Logger"],
            useClass: _services_logger_service__WEBPACK_IMPORTED_MODULE_11__["DefaultLoggerService"]
        },
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
            useFactory: initConfig,
            deps: [_services_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"]],
            multi: true
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_cytoscape_cytoscape_component__WEBPACK_IMPORTED_MODULE_4__["CytoscapeComponent"],
        _components_d3_d3_component__WEBPACK_IMPORTED_MODULE_5__["D3Component"],
        _components_d3canvas_d3canvas_component__WEBPACK_IMPORTED_MODULE_6__["D3CanvasComponent"],
        _components_graph_graph_component__WEBPACK_IMPORTED_MODULE_7__["GraphComponent"],
        _components_logs_logs_component__WEBPACK_IMPORTED_MODULE_8__["LogsComponent"],
        _components_stardust_stardust_component__WEBPACK_IMPORTED_MODULE_9__["StardustComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"]] }); })();


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

/***/ "ciip":
/*!*****************************************************************!*\
  !*** ./src/app/components/shared/shared-graph-lib.component.ts ***!
  \*****************************************************************/
/*! exports provided: SharedGraphLibComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedGraphLibComponent", function() { return SharedGraphLibComponent; });
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/common.util */ "Hg6u");



class SharedGraphLibComponent {
    constructor(logger, graphService) {
        this.logger = logger;
        this.graphService = graphService;
        this.subs = [];
        this.connectedLookup = {};
    }
    onInit() {
        this.state = new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["GraphStateModel"]();
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
        if (this.graphService.currentData) {
            setTimeout(() => {
                this.init(this.graphService.currentData);
            }, 0);
        }
    }
    onDestroy() {
        this.logger.info(`${this.componentName} onDestroy called.`)();
        this.destroy();
        this.nodes = undefined;
        this.edges = undefined;
        this.connectedLookup = undefined;
        this.state.isDestroyed = true;
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    handleOnChangeSubject(data) {
        if (data && !this.state.isDestroyed) {
            switch (data.type) {
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphEventType"].DATA_CHANGED:
                    this.init(this.graphService.currentData);
                    break;
                case _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphEventType"].STOP_SIMULATION:
                    this.destroy();
                    break;
                default:
                    break;
            }
        }
    }
    beforeInit(data) {
        this.logger.info(`${this.componentName} init called.`)();
        this.state.isZoomed = false;
        this.graphService.isLoading = true;
        if (data) {
            this.nodes = data.nodes.map((e) => {
                var _a;
                return new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["NodeViewGraphModel"]({
                    type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphElementType"].NODE,
                    id: e.data.id,
                    name: (_a = e.data.name) !== null && _a !== void 0 ? _a : '-',
                    weight: e.data.weight,
                    transfers: e.scratch.transfers
                });
            });
            this.edges = data.edges.map((e) => {
                var _a;
                return new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["EdgeViewGraphModel"]({
                    type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_0__["GraphElementType"].EDGE,
                    name: (_a = e.data.name) !== null && _a !== void 0 ? _a : '-',
                    source: e.data.source,
                    target: e.data.target,
                    strength: e.data.strength,
                    refTransfer: e.scratch.refTransfer,
                    transfers: e.scratch.transfers
                });
            });
        }
    }
    afterInit() {
        var _a;
        this.connectedLookup = {};
        (_a = this.edges) === null || _a === void 0 ? void 0 : _a.forEach((d) => {
            this.connectedLookup[_utils_common_util__WEBPACK_IMPORTED_MODULE_2__["CommonUtil"].combineIndex(d.source.id, d.target.id)] = true;
        });
        this.center(0);
        this.graphService.isLoading = false;
    }
    registerMouseWheelEvent(element) {
        if (element) {
            element.onwheel = () => {
                this.state.isZoomed = true;
            };
        }
    }
    handleSelectedElement(element) {
        if (element instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["EdgeViewGraphModel"]) {
            this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["EdgeGraphModel"]({
                data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["EdgeDataModel"]({
                    name: element.name,
                    source: element.source.id,
                    target: element.target.id,
                    strength: element.strength
                }),
                scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["GraphScratchModel"]({
                    refTransfer: element.refTransfer,
                    transfers: element.transfers
                })
            }));
        }
        else if (element instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["NodeViewGraphModel"]) {
            this.selectEmitter.emit(new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["NodeGraphModel"]({
                data: new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["NodeDataModel"]({
                    id: element.id,
                    name: element.name,
                    weight: element.weight
                }),
                scratch: new _models_graph_model__WEBPACK_IMPORTED_MODULE_1__["GraphScratchModel"]({
                    transfers: element.transfers
                })
            }));
        }
    }
    isConnected(a, b) {
        return this.connectedLookup[_utils_common_util__WEBPACK_IMPORTED_MODULE_2__["CommonUtil"].combineIndex(a, b)] || a === b;
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
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/chain.enum */ "/2aV");
/* harmony import */ var _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/graph.enum */ "Qlbi");
/* harmony import */ var _models_type_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/type.model */ "0bl3");



class AppConstants {
}
AppConstants.VOID_ADDRESS = '0x0000000000000000000000000000000000000000';
AppConstants.PIMARY_COLOR = '#ffffa0';
AppConstants.SECONDARY_COLOR = '#0000b4';
AppConstants.TX_EVENT_MINT_COLOR = '#18cc7e';
AppConstants.TX_EVENT_TRANSFER_COLOR = '#a9a9a9';
AppConstants.TX_EVENT_BURN_COLOR = '#d04a35';
AppConstants.CHAINS = [
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["ChainTypeModel"]({
        type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"].ETH_MAIN,
        name: 'ETH mainnet'
    }),
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["ChainTypeModel"]({
        type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainType"].XDAI_MAIN,
        name: 'xDai chain'
    })
];
AppConstants.LIBRARIES = [
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryTypeModel"]({
        type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].D3,
        name: 'd3'
    }),
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryTypeModel"]({
        type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].CYTOSCAPE,
        name: 'cytoscape'
    }),
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["GraphLibraryTypeModel"]({
        type: _enums_graph_enum__WEBPACK_IMPORTED_MODULE_1__["GraphLibraryType"].STARDUST,
        name: 'stardust'
    }),
];
AppConstants.SOURCES = [
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["ChainSourceTypeModel"]({
        type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].FILE,
        name: 'File'
    }),
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["ChainSourceTypeModel"]({
        type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].RPC,
        name: 'RPC'
    }),
    new _models_type_model__WEBPACK_IMPORTED_MODULE_2__["ChainSourceTypeModel"]({
        type: _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainSourceType"].GRAPHQL,
        name: 'GraphQL'
    })
];


/***/ }),

/***/ "iWl/":
/*!******************************************!*\
  !*** ./src/app/models/subgraph.model.ts ***!
  \******************************************/
/*! exports provided: SubgraphTokenTypes, SubgraphTransactionModel, SubgraphTransactionEventModel, SubgraphTransferEventModel, SubgraphStatContainerModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubgraphTokenTypes", function() { return SubgraphTokenTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubgraphTransactionModel", function() { return SubgraphTransactionModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubgraphTransactionEventModel", function() { return SubgraphTransactionEventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubgraphTransferEventModel", function() { return SubgraphTransferEventModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubgraphStatContainerModel", function() { return SubgraphStatContainerModel; });
class SubgraphTokenTypes {
}
SubgraphTokenTypes.XHOPR = 'xHOPR';
SubgraphTokenTypes.WXHOPR = 'wxHOPR';
class SubgraphTransactionModel {
    constructor(data) {
        this.init(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        return new SubgraphTransactionModel(data);
    }
    init(data) {
        if (data) {
            this.id = data.id;
            this.index = data.index;
            this.blockNumber = data.blockNumber;
            this.blockTimestamp = data.blockTimestamp;
            this.from = data.from;
            this.to = data.to;
            if (Array.isArray(data.transferEvents)) {
                this.transferEvents = [];
                for (const item of data.transferEvents) {
                    this.transferEvents.push(SubgraphTransferEventModel.fromJS(item));
                }
            }
        }
        if (!this.transferEvents) {
            this.transferEvents = [];
        }
    }
}
class SubgraphTransactionEventModel {
    constructor(data) {
        this.init(data);
    }
    init(data) {
        if (data) {
            this.id = data.id;
            this.index = data.index;
            this.blockNumber = data.blockNumber;
            this.blockTimestamp = data.blockTimestamp;
            this.logIndex = data.logIndex;
        }
    }
}
class SubgraphTransferEventModel extends SubgraphTransactionEventModel {
    constructor(data) {
        super(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        return new SubgraphTransferEventModel(data);
    }
    init(data) {
        super.init(data);
        if (data) {
            this.from = data.from;
            this.to = data.to;
            this.amount = data.amount;
            this.tokenType = data.tokenType;
        }
    }
}
class SubgraphStatContainerModel {
    constructor(data) {
        this.init(data);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        return new SubgraphStatContainerModel(data);
    }
    init(data) {
        if (data) {
            this.id = data.id;
            this.lastAccountIndex = data.lastAccountIndex;
            this.lastAccountSnapshotIndex = data.lastAccountSnapshotIndex;
            this.lastTransactionIndex = data.lastTransactionIndex;
            this.lastTransferEventIndex = data.lastTransferEventIndex;
        }
    }
}


/***/ }),

/***/ "kiQV":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, scripts, private, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"hopr-network-graph\",\"version\":\"0.0.3\",\"scripts\":{\"ng\":\"ng\",\"start\":\"ng serve\",\"build\":\"ng build\",\"test\":\"ng test\",\"lint\":\"ng lint\",\"e2e\":\"ng e2e\"},\"private\":true,\"dependencies\":{\"@angular/animations\":\"~11.2.12\",\"@angular/common\":\"~11.2.12\",\"@angular/compiler\":\"~11.2.12\",\"@angular/core\":\"~11.2.12\",\"@angular/forms\":\"~11.2.12\",\"@angular/platform-browser\":\"~11.2.12\",\"@angular/platform-browser-dynamic\":\"~11.2.12\",\"@angular/router\":\"~11.2.12\",\"axios\":\"^0.21.1\",\"cytoscape\":\"^3.18.2\",\"cytoscape-fcose\":\"^2.0.0\",\"cytoscape-klay\":\"^3.1.4\",\"d3\":\"^6.7.0\",\"data-forge\":\"^1.8.17\",\"ethers\":\"^5.1.4\",\"lz-string\":\"^1.4.4\",\"moment\":\"^2.29.1\",\"rxjs\":\"~6.6.0\",\"stardust-core\":\"^0.2.4\",\"stardust-webgl\":\"^0.2.4\",\"taffydb\":\"^2.7.3\",\"tslib\":\"^2.0.0\",\"uuid\":\"^8.3.2\",\"zone.js\":\"~0.11.3\"},\"devDependencies\":{\"@angular-devkit/build-angular\":\"~0.1102.11\",\"@angular/cli\":\"~11.2.11\",\"@angular/compiler-cli\":\"~11.2.12\",\"@typechain/ethers-v5\":\"^6.0.5\",\"@types/cytoscape\":\"^3.14.14\",\"@types/d3\":\"^6.3.0\",\"@types/jasmine\":\"~3.6.0\",\"@types/node\":\"^12.11.1\",\"codelyzer\":\"^6.0.0\",\"jasmine-core\":\"~3.6.0\",\"jasmine-spec-reporter\":\"~5.0.0\",\"karma\":\"~6.1.0\",\"karma-chrome-launcher\":\"~3.1.0\",\"karma-coverage\":\"~2.0.3\",\"karma-jasmine\":\"~4.0.0\",\"karma-jasmine-html-reporter\":\"^1.5.0\",\"protractor\":\"~7.0.0\",\"ts-node\":\"~8.3.0\",\"tslint\":\"~6.1.0\",\"typechain\":\"^4.0.3\",\"typescript\":\"~4.1.5\"}}");

/***/ }),

/***/ "n37/":
/*!*************************************!*\
  !*** ./src/app/utils/graph.util.ts ***!
  \*************************************/
/*! exports provided: GraphUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphUtil", function() { return GraphUtil; });
class GraphUtil {
    static calculateNodeRadius(weight) {
        return Math.min(10, Math.max(5, weight / 10));
    }
    static calculateEdgeWidth(strength) {
        return Math.max(1, strength / 10);
    }
}


/***/ }),

/***/ "nBAI":
/*!**************************************!*\
  !*** ./src/app/utils/moment.util.ts ***!
  \**************************************/
/*! exports provided: MomentUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentUtil", function() { return MomentUtil; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class MomentUtil {
    constructor() {
        moment__WEBPACK_IMPORTED_MODULE_0__["locale"](navigator.language);
    }
    setLocale(language) {
        moment__WEBPACK_IMPORTED_MODULE_0__["locale"](language);
    }
    getFromUnix(date) {
        return moment__WEBPACK_IMPORTED_MODULE_0__["unix"](date);
    }
    getLocal(date) {
        return moment__WEBPACK_IMPORTED_MODULE_0__["utc"](date).local();
    }
    getLocalTime(date) {
        return this.getLocal(date).format('LTS');
    }
    getLocalDate(date) {
        return this.getLocal(date).format('L');
    }
    getLocalFormatted(date) {
        return this.getLocalTime(date) + ' ' + this.getLocalDate(date);
    }
    getLocalReverseFormatted(date) {
        return this.getLocalDate(date) + ' ' + this.getLocalTime(date);
    }
}
MomentUtil.ɵfac = function MomentUtil_Factory(t) { return new (t || MomentUtil)(); };
MomentUtil.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MomentUtil, factory: MomentUtil.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "nnAZ":
/*!***************************************************!*\
  !*** ./src/app/components/logs/logs.component.ts ***!
  \***************************************************/
/*! exports provided: LogsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsComponent", function() { return LogsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/log.enum */ "NVX8");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/common.util */ "Hg6u");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/logger.service */ "Mb37");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = ["containerElementRef"];
function LogsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const log_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", log_r2.banner, " ", log_r2.args, " ");
} }
class LogsComponent {
    constructor(logger) {
        this.logger = logger;
        this.subs = [];
        this.maxSize = 30;
        this.logs = [];
    }
    ngOnInit() {
        if (this.logger.onLogEventSubject) {
            const sub1 = this.logger.onLogEventSubject.subscribe({
                next: (data) => {
                    switch (data.type) {
                        case _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__["LogEventType"].MESSAGE:
                            const length = this.logs.push(data);
                            if (length > this.maxSize) {
                                this.logs.shift();
                            }
                            break;
                        case _enums_log_enum__WEBPACK_IMPORTED_MODULE_1__["LogEventType"].CLEAR:
                            this.logs.length = 0;
                            break;
                        default:
                            break;
                    }
                    this.scrollToBottom();
                }
            });
            this.subs.push(sub1);
            // this.testAsync();
        }
    }
    ngOnDestroy() {
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
        this.subs = [];
    }
    testAsync() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let index = 0; index < 30; index++) {
                this.logger.debug(`Log test message ${index}.`)();
                yield _utils_common_util__WEBPACK_IMPORTED_MODULE_2__["CommonUtil"].timeout(500);
            }
        });
    }
    scrollToBottom() {
        setTimeout(() => {
            try {
                this.containerElementRef.nativeElement.scrollTop = this.containerElementRef.nativeElement.scrollHeight;
            }
            catch (e) {
                this.logger.info(e)();
            }
        }, 0);
    }
}
LogsComponent.ɵfac = function LogsComponent_Factory(t) { return new (t || LogsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["Logger"])); };
LogsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LogsComponent, selectors: [["hopr-logs"]], viewQuery: function LogsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, decls: 5, vars: 1, consts: [["id", "logsContainer"], ["containerElementRef", ""], ["class", "logMessage", 4, "ngFor", "ngForOf"], [1, "logMessage"]], template: function LogsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, LogsComponent_div_4_Template, 2, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.logs);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: ["#logsContainer[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: calc(100% - 16px);\r\n  width: calc(100% - 16px);\r\n  padding: 8px;\r\n  overflow-y: auto;\r\n  background-color: white;\r\n  z-index: 1;\r\n}\r\n\r\n.logMessage[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ3MuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLHlCQUF5QjtFQUN6Qix3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsV0FBVztBQUNiIiwiZmlsZSI6ImxvZ3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNsb2dzQ29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxNnB4KTtcclxuICB3aWR0aDogY2FsYygxMDAlIC0gMTZweCk7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmxvZ01lc3NhZ2Uge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59Il19 */"] });


/***/ }),

/***/ "oRqo":
/*!****************************************!*\
  !*** ./src/app/models/config.model.ts ***!
  \****************************************/
/*! exports provided: ConfigModel, ChainConfigModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigModel", function() { return ConfigModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainConfigModel", function() { return ChainConfigModel; });
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");

class ConfigModel {
    constructor(init) {
        this.init(init);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        return new ConfigModel(data);
    }
    init(data) {
        var _a, _b;
        if (data) {
            this.isDevelopment = data.isDevelopment;
            this.version = data.version;
            this.minWeight = data.minWeight;
            this.selectedChainType = data.selectedChainType;
            this.selectedGraphLibraryType = data.selectedGraphLibraryType;
            if (Array.isArray(data.chains)) {
                this.chains = [];
                for (const item of data.chains) {
                    this.chains.push(ChainConfigModel.fromJS(item));
                }
            }
        }
        if (!this.chains) {
            this.chains = [];
        }
        else {
            this.chains = (_b = (_a = data === null || data === void 0 ? void 0 : data.chains) === null || _a === void 0 ? void 0 : _a.map((e) => ChainConfigModel.fromJS(e))) !== null && _b !== void 0 ? _b : [];
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
    getChainByType(type) {
        var _a;
        return (_a = this.chains) === null || _a === void 0 ? void 0 : _a.find(e => e.type === type);
    }
    setSelectedChain(value) {
        this._selectedChain = this.getChainByType(value);
    }
}
class ChainConfigModel {
    constructor(init) {
        this.init(init);
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        return new ChainConfigModel(data);
    }
    init(data) {
        if (data) {
            this.type = data.type;
            this.rpcProviderUrl = data.rpcProviderUrl;
            this.theGraphUrl = data.theGraphUrl;
            this.startBlock = data.startBlock;
            this.addressUrl = data.addressUrl;
            this.txUrl = data.txUrl;
            this.tokenContractAbiPath = data.tokenContractAbiPath;
            this.tokenContractAddress = data.tokenContractAddress;
            this.bridgeContractAbiPath = data.bridgeContractAbiPath;
            this.bridgeContractAddress = data.bridgeContractAddress;
            this.txEventSignatures = Object.assign({}, data.txEventSignatures);
            this.eventsPath = data.eventsPath;
        }
        if (!this.txEventSignatures) {
            this.txEventSignatures = {};
        }
        this.txEventSignaturesMap = new Map();
        for (const key of Object.keys(this.txEventSignatures)) {
            this.txEventSignaturesMap.set(this.txEventSignatures[key], _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"][key]);
        }
    }
    mapTxEventTypeToString(type) {
        const typeName = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"][type];
        if (this.txEventSignatures && this.txEventSignatures.hasOwnProperty(typeName)) {
            return this.txEventSignatures[typeName];
        }
        return undefined;
    }
    mapTxEventSignatureToType(signature) {
        var _a;
        return (_a = this.txEventSignaturesMap.get(signature)) !== null && _a !== void 0 ? _a : _enums_chain_enum__WEBPACK_IMPORTED_MODULE_0__["ChainTxEventType"].UNKNOWN;
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
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _models_config_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/config.model */ "oRqo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utils_file_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/file.util */ "YcFz");





class ConfigService {
    constructor(fileUtil) {
        this.fileUtil = fileUtil;
        this._config = new _models_config_model__WEBPACK_IMPORTED_MODULE_2__["ConfigModel"]();
    }
    get config() {
        return this._config;
    }
    initAsync() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const config = yield this.fileUtil.readFileAsync('./assets/config.json');
            this._config = new _models_config_model__WEBPACK_IMPORTED_MODULE_2__["ConfigModel"](JSON.parse(config));
            this._config.isDevelopment = !_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production;
            this._config.version = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].version;
        });
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_utils_file_util__WEBPACK_IMPORTED_MODULE_4__["FileUtil"])); };
ConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "sWCe":
/*!*************************************************!*\
  !*** ./src/app/repositories/base.repository.ts ***!
  \*************************************************/
/*! exports provided: BaseRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRepository", function() { return BaseRepository; });
/* harmony import */ var taffydb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taffydb */ "bck2");
/* harmony import */ var taffydb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(taffydb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");



class BaseRepository {
    constructor(logger) {
        this.logger = logger;
        this._isLocalStorageDisabled = true;
        this._namespace = 'hopr_network_graph_taffydb_';
        this.init();
    }
    createDatabase(name) {
        _utils_ensure_util__WEBPACK_IMPORTED_MODULE_2__["Ensure"].notNullOrWhiteSpace(name, 'name');
        this._dbName = name;
        this._db = Object(taffydb__WEBPACK_IMPORTED_MODULE_0__["taffy"])(this.getLocalStorage());
    }
    getByIdAsync(id) {
        try {
            return Promise.resolve(this._db({ _id: id }).first());
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    getAllAsync() {
        try {
            return Promise.resolve(this._db().get());
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    insertAsync(item) {
        try {
            this._db.insert(item);
            this.updateLocalStorage();
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    insertManyAsync(items) {
        try {
            this._db.insert(items);
            this.updateLocalStorage();
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    clearAllAsync() {
        try {
            this._db().remove();
            this.updateLocalStorage();
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    get localStorageKey() {
        return this._namespace + this._dbName;
    }
    updateLocalStorage() {
        try {
            if (!this._isLocalStorageDisabled) {
                const json = JSON.stringify(this._db().get());
                localStorage.setItem(this.localStorageKey, _utils_common_util__WEBPACK_IMPORTED_MODULE_1__["CommonUtil"].compress(json));
            }
        }
        catch (error) {
            this.logger.error(error)();
        }
    }
    getLocalStorage() {
        try {
            if (!this._isLocalStorageDisabled) {
                const data = localStorage.getItem(this.localStorageKey);
                if (data) {
                    return JSON.parse(_utils_common_util__WEBPACK_IMPORTED_MODULE_1__["CommonUtil"].decompress(data));
                }
            }
            return undefined;
        }
        catch (error) {
            this.logger.error(error)();
        }
    }
}


/***/ }),

/***/ "tUmK":
/*!***************************************!*\
  !*** ./src/app/models/chain.model.ts ***!
  \***************************************/
/*! exports provided: ChainFilterItemModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainFilterItemModel", function() { return ChainFilterItemModel; });
class ChainFilterItemModel {
    constructor(init) {
        Object.assign(this, init);
    }
}


/***/ }),

/***/ "tw/Z":
/*!**************************************!*\
  !*** ./src/app/models/stat.model.ts ***!
  \**************************************/
/*! exports provided: StatModel, ChainStatModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatModel", function() { return StatModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainStatModel", function() { return ChainStatModel; });
class StatModel {
    constructor(init) {
        Object.assign(this, init);
        if (!this.extractedDate) {
            this.extractedDate = new Date();
        }
    }
}
class ChainStatModel extends StatModel {
    constructor(init) {
        super(init);
    }
}


/***/ }),

/***/ "wJvV":
/*!***********************************************************!*\
  !*** ./src/app/components/stardust/stardust.component.ts ***!
  \***********************************************************/
/*! exports provided: StardustComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StardustComponent", function() { return StardustComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! data-forge */ "UjV8");
/* harmony import */ var stardust_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stardust-core */ "Xrjm");
/* harmony import */ var stardust_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stardust_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var stardust_webgl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stardust-webgl */ "5Kyl");
/* harmony import */ var stardust_webgl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(stardust_webgl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app.constants */ "dkQB");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_graph_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../models/graph.model */ "XZxx");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/graph.util */ "n37/");
/* harmony import */ var _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared-graph-lib.component */ "ciip");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/logger.service */ "Mb37");
/* harmony import */ var _services_graph_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/graph.service */ "Tv8v");














const _c0 = ["containerElementRef"];
class StardustComponent extends _shared_shared_graph_lib_component__WEBPACK_IMPORTED_MODULE_10__["SharedGraphLibComponent"] {
    constructor(logger, graphService) {
        super(logger, graphService);
        this.logger = logger;
        this.graphService = graphService;
        this.selectEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.componentName = 'Stardust';
        const webGLversion = stardust_webgl__WEBPACK_IMPORTED_MODULE_4__["version"];
    }
    ngOnInit() {
        super.onInit();
    }
    ngOnDestroy() {
        super.onDestroy();
    }
    destroy() {
        this.stopSimulation();
        this.nodesDataFrame = undefined;
    }
    stopSimulation() {
        var _a;
        this.logger.info(`${this.componentName} stop simulation called.`)();
        (_a = this.simulation) === null || _a === void 0 ? void 0 : _a.stop();
        this.graphService.isSimulating = false;
    }
    init(data) {
        super.beforeInit(data);
        this.width = this.containerElementRef.nativeElement.clientWidth;
        this.height = this.containerElementRef.nativeElement.clientHeight;
        this.createCanvas();
        if (this.nodes && this.edges) {
            this.nodesDataFrame = new data_forge__WEBPACK_IMPORTED_MODULE_2__["DataFrame"](this.nodes).bake();
            function mapColor(color, opacity = 1) {
                return [color[0] / 255, color[1] / 255, color[2] / 255, opacity];
            }
            const colors = [
                mapColor([0, 0, 0], 0.5),
                mapColor([0, 0, 0], 1),
                mapColor(_utils_common_util__WEBPACK_IMPORTED_MODULE_8__["CommonUtil"].hexToRgb(_app_constants__WEBPACK_IMPORTED_MODULE_5__["AppConstants"].PIMARY_COLOR)),
                mapColor(_utils_common_util__WEBPACK_IMPORTED_MODULE_8__["CommonUtil"].hexToRgb(_app_constants__WEBPACK_IMPORTED_MODULE_5__["AppConstants"].SECONDARY_COLOR)),
                mapColor(_utils_common_util__WEBPACK_IMPORTED_MODULE_8__["CommonUtil"].hexToRgb(_app_constants__WEBPACK_IMPORTED_MODULE_5__["AppConstants"].TX_EVENT_BURN_COLOR)),
                mapColor(_utils_common_util__WEBPACK_IMPORTED_MODULE_8__["CommonUtil"].hexToRgb(_app_constants__WEBPACK_IMPORTED_MODULE_5__["AppConstants"].TX_EVENT_MINT_COLOR)),
                mapColor(_utils_common_util__WEBPACK_IMPORTED_MODULE_8__["CommonUtil"].hexToRgb(_app_constants__WEBPACK_IMPORTED_MODULE_5__["AppConstants"].TX_EVENT_TRANSFER_COLOR))
            ];
            this.starNodes.attr('radius', 2).attr('color', colors[2]);
            this.starNodesBg.attr('radius', 3).attr('color', colors[0]);
            this.starNodesSelected.attr('radius', 4).attr('color', colors[3]);
            this.starEdges.attr('width', 1).attr('color', (d) => {
                var _a;
                switch ((_a = d.refTransfer) === null || _a === void 0 ? void 0 : _a.type) {
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_6__["ChainTxEventType"].BURN:
                        return colors[4];
                    case _enums_chain_enum__WEBPACK_IMPORTED_MODULE_6__["ChainTxEventType"].MINT:
                        return colors[5];
                    default:
                        break;
                }
                return colors[6];
            });
            this.starEdgesSelected.attr('width', 1).attr('color', colors[3]);
            this.starNodeText.attr('text', (d) => d.name)
                // .attr('up', [0, 1])
                .attr('fontFamily', 'Arial')
                .attr('fontSize', 12)
                // .attr('scale', d => this.transform.k)
                // .attr('scale', d => 1 + Math.sin(d) / 2)
                .attr('color', colors[1]);
            this.starEdgeText.attr('text', (d) => d.name)
                .attr('fontFamily', 'Arial')
                .attr('fontSize', 10)
                .attr('color', colors[1]);
            this.positions = stardust_core__WEBPACK_IMPORTED_MODULE_3__["array"]()
                .value((d) => [
                d.x * this.transform.k + this.transform.x,
                d.y * this.transform.k + this.transform.y
            ])
                .data(this.nodes);
            const edgePositions = stardust_core__WEBPACK_IMPORTED_MODULE_3__["array"]()
                .value((d) => [
                ((d.source.x * this.transform.k + this.transform.x) + (d.target.x * this.transform.k + this.transform.x)) / 2,
                ((d.source.y * this.transform.k + this.transform.y) + (d.target.y * this.transform.k + this.transform.y)) / 2
            ])
                .data(this.edges);
            const positionScale = stardust_core__WEBPACK_IMPORTED_MODULE_3__["scale"].custom('array(pos, value)').attr('pos', 'Vector2Array', this.positions);
            const edgePositionScale = stardust_core__WEBPACK_IMPORTED_MODULE_3__["scale"].custom('array(pos, value)').attr('pos', 'Vector2Array', edgePositions);
            this.starNodes.attr('center', positionScale(d => d.index));
            this.starNodesBg.attr('center', positionScale(d => d.index));
            this.starNodesSelected.attr('center', positionScale(d => d.index));
            this.starNodeText.attr('position', positionScale(d => d.index));
            this.starEdges.attr('p1', positionScale(d => d.source.index));
            this.starEdges.attr('p2', positionScale(d => d.target.index));
            this.starEdgesSelected.attr('p1', positionScale(d => d.source.index));
            this.starEdgesSelected.attr('p2', positionScale(d => d.target.index));
            this.starEdgeText.attr('position', edgePositionScale(d => d.index));
            this.starNodes.data(this.nodes);
            this.starNodesBg.data(this.nodes);
            this.starNodeText.data(this.nodes);
            this.starEdges.data(this.edges);
            this.starEdgeText.data(this.edges);
            if (this.simulation) {
                this.simulation.stop();
            }
            this.simulation = d3__WEBPACK_IMPORTED_MODULE_1__["forceSimulation"](this.nodes)
                .force('link', d3__WEBPACK_IMPORTED_MODULE_1__["forceLink"](this.edges).id((d) => d.id))
                .force('charge', d3__WEBPACK_IMPORTED_MODULE_1__["forceManyBody"]().strength(-400))
                .force('center', d3__WEBPACK_IMPORTED_MODULE_1__["forceCenter"](this.width / 2, this.height / 2))
                .force('x', d3__WEBPACK_IMPORTED_MODULE_1__["forceX"]())
                .force('y', d3__WEBPACK_IMPORTED_MODULE_1__["forceY"]())
                .on('end', () => {
                this.graphService.isSimulating = false;
                this.logger.info(`${this.componentName} simulation ended.`)();
            });
            this.graphService.isSimulating = true;
            this.simulation.on('tick', () => {
                // positions.data(this.nodes);
                this.requestRender();
            });
            this.requestRender();
        }
        super.afterInit();
    }
    requestRender() {
        if (this.state.requestedAnimationFrame) {
            return;
        }
        this.state.requestedAnimationFrame = requestAnimationFrame(() => {
            this.render();
        });
    }
    render() {
        this.state.requestedAnimationFrame = undefined;
        // Cleanup and re-render.
        // this.platform.clear([1, 1, 1, 1]);
        this.starEdges.attr('width', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__["GraphUtil"].calculateEdgeWidth(d.strength) * this.transform.k);
        this.starEdges.render();
        this.starEdgesSelected.attr('width', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__["GraphUtil"].calculateEdgeWidth(d.strength) * this.transform.k + 1);
        this.starEdgesSelected.render();
        this.starNodesBg.attr('radius', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__["GraphUtil"].calculateNodeRadius(d.weight) * this.transform.k + 1);
        this.starNodesBg.render();
        this.starNodes.attr('radius', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__["GraphUtil"].calculateNodeRadius(d.weight) * this.transform.k);
        this.starNodes.render();
        this.starNodesSelected.attr('radius', (d) => _utils_graph_util__WEBPACK_IMPORTED_MODULE_9__["GraphUtil"].calculateNodeRadius(d.weight) * this.transform.k);
        this.starNodesSelected.render();
        this.starNodeText.attr('scale', this.transform.k);
        this.starNodeText.render();
        this.starNodeText.attr('alignX', 0.5);
        this.starNodeText.attr('alignY', 0.6);
        this.starEdgeText.attr('scale', this.transform.k);
        this.starEdgeText.render();
        this.starEdgeText.attr('alignX', 0.5);
        this.starEdgeText.attr('alignY', 0.6);
        // Render the picking buffer.
        this.platform.beginPicking(this.width, this.height);
        this.starEdges.render();
        this.starNodes.render();
        this.platform.endPicking();
    }
    createCanvas() {
        const canvasId = 'mainCanvas';
        d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#' + canvasId).remove();
        this.canvasContainer = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#container')
            .append('canvas')
            .attr('id', canvasId)
            .attr('width', this.width)
            .attr('height', this.height);
        this.canvas = document.getElementById(canvasId);
        this.platform = stardust_core__WEBPACK_IMPORTED_MODULE_3__["platform"]('webgl-2d', this.canvas, this.width, this.height);
        this.platform.pixelRatio = 1;
        this.starNodes = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].create(stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].circle(), this.platform);
        this.starNodesBg = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].create(stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].circle(), this.platform);
        this.starNodesSelected = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].create(stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].circle(), this.platform);
        this.starEdges = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].create(stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].line(), this.platform);
        this.starEdgesSelected = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].create(stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].line(), this.platform);
        this.starNodeText = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].createText('2d', this.platform);
        this.starEdgeText = stardust_core__WEBPACK_IMPORTED_MODULE_3__["mark"].createText('2d', this.platform);
        this.transform = d3__WEBPACK_IMPORTED_MODULE_1__["zoomIdentity"];
        this.registerMouseEvents();
        this.zoom = d3__WEBPACK_IMPORTED_MODULE_1__["zoom"]()
            .extent([[0, 0], [this.width, this.height]])
            .scaleExtent([0, 10])
            .on('zoom', (e) => {
            this.transform = e.transform;
            this.requestRender();
        });
        this.canvasContainer.call(this.zoom);
    }
    registerMouseEvents() {
        super.registerMouseWheelEvent(this.canvas);
        this.canvas.onmousemove = (e) => {
            e.stopPropagation();
            if (!this.isSelectionPermanent) {
                const element = this.tryGetSelectedElement(e);
                if (element) {
                    if (this.selectedElement !== element) {
                        this.handleSelectedElement(element);
                    }
                }
                else {
                    this.deselectElement();
                }
            }
        };
        this.canvas.onclick = (e) => {
            e.stopPropagation();
            const element = this.tryGetSelectedElement(e);
            if (element) {
                if (this.isSelectionPermanent) {
                    if (this.selectedElement === element) {
                        this.isSelectionPermanent = false;
                        this.deselectElement();
                    }
                    else {
                        this.handleSelectedElement(element);
                    }
                }
                else {
                    this.isSelectionPermanent = true;
                    if (this.selectedElement !== element) {
                        this.handleSelectedElement(element);
                    }
                }
            }
            else {
                this.deselectElement();
            }
        };
    }
    handleSelectedElement(element) {
        super.handleSelectedElement(element);
        this.selectedElement = element;
        if (this.selectedElement instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["EdgeViewGraphModel"]) {
            this.starEdgesSelected.data([this.selectedElement]);
            this.starNodesSelected.data(this.nodes.filter(e => e.id === this.selectedElement.source.id || e.id === this.selectedElement.target.id));
        }
        else if (this.selectedElement instanceof _models_graph_model__WEBPACK_IMPORTED_MODULE_7__["NodeViewGraphModel"]) {
            this.starNodesSelected.data([this.selectedElement]);
            this.starEdgesSelected.data(this.edges.filter(e => e.source.id === this.selectedElement.id || e.target.id === this.selectedElement.id));
        }
        this.requestRender();
    }
    deselectElement() {
        if (this.selectedElement != null) {
            this.isSelectionPermanent = false;
            this.selectedElement = null;
            this.requestRender();
            this.selectEmitter.emit(undefined);
            this.starEdgesSelected.data([]);
            this.starNodesSelected.data([]);
        }
    }
    tryGetSelectedElement(e) {
        const bb = this.canvas.getBoundingClientRect();
        const x = e.clientX - bb.left;
        const y = e.clientY - bb.top;
        const p = this.platform.getPickingPixel(x * this.platform.pixelRatio, y * this.platform.pixelRatio);
        if (p) {
            return p[0].data()[p[1]];
        }
        return undefined;
    }
    center(count) {
        if (!this.state.isDestroyed && !this.state.isZoomed) {
            if (this.nodesDataFrame) {
                const seriesX = this.nodesDataFrame.deflate(e => e.x);
                const seriesY = this.nodesDataFrame.deflate(e => e.y);
                const minMaxNodes = {
                    minX: seriesX.min(),
                    minY: seriesY.min(),
                    maxX: seriesX.max(),
                    maxY: seriesY.max()
                };
                const width = minMaxNodes.maxX - minMaxNodes.minX;
                const height = minMaxNodes.maxY - minMaxNodes.minY;
                if (width && height) {
                    const scale = Math.min(this.width / width, this.height / height) * 0.8;
                    if (count > 0) {
                        this.canvasContainer.transition()
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
}
StardustComponent.ɵfac = function StardustComponent_Factory(t) { return new (t || StardustComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_11__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_graph_service__WEBPACK_IMPORTED_MODULE_12__["GraphService"])); };
StardustComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StardustComponent, selectors: [["hopr-stardust"]], viewQuery: function StardustComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElementRef = _t.first);
    } }, outputs: { selectEmitter: "selectEmitter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [["id", "container"], ["containerElementRef", ""]], template: function StardustComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
    } }, styles: ["#container[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  left: 0;\r\n  top: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJkdXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtBQUNSIiwiZmlsZSI6InN0YXJkdXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "wXGM":
/*!*******************************************!*\
  !*** ./src/app/services/chain.service.ts ***!
  \*******************************************/
/*! exports provided: ChainService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainService", function() { return ChainService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _utils_common_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/common.util */ "Hg6u");
/* harmony import */ var _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ensure.util */ "b4nj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logger.service */ "Mb37");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config.service */ "r4Kj");
/* harmony import */ var _factories_extractor_factory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../factories/extractor.factory */ "1J7u");
/* harmony import */ var _repositories_stat_repository__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../repositories/stat.repository */ "VCjm");
/* harmony import */ var _repositories_event_repository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../repositories/event.repository */ "VeAt");










class ChainService {
    constructor(logger, configService, extractorFactory, statRepository, eventRepository) {
        this.logger = logger;
        this.configService = configService;
        this.extractorFactory = extractorFactory;
        this.statRepository = statRepository;
        this.eventRepository = eventRepository;
    }
    get isExtracting() {
        return this._isExtracting;
    }
    clearAllAsync() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.logger.info('Clearing local data.')();
                yield this.statRepository.clearAllAsync();
                yield this.eventRepository.clearAllAsync();
            }
            catch (error) {
                this.logger.error(error)();
            }
        });
    }
    getChainStatByType(chainType) {
        return this.statRepository.getOrCreateByChainTypeAsync(chainType);
    }
    extractAsync() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.logger.info('Data extraction started.')();
            this._isExtracting = true;
            for (const chain of this.configService.config.chains) {
                yield this.extractChainAsync(chain.type);
            }
            this._isExtracting = false;
            this.logger.info('Data extraction ended.')();
        });
    }
    extractChainBySourceAsync(type, source) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const chain = this.configService.config.getChainByType(type);
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__["Ensure"].notNull(chain, 'chain');
            this.logger.info('Chain extraction started.')();
            this._isExtracting = true;
            try {
                const events = yield this.extractEventsAsync(chain, source);
                yield this.saveEventsAsync(type, source, events);
            }
            catch (error) {
                this.logger.error(error);
            }
            this._isExtracting = false;
            this.logger.info('Chain extraction ended.')();
        });
    }
    extractChainAsync(type) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (type === _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"].TEST) {
                return Promise.resolve();
            }
            const chain = this.configService.config.getChainByType(type);
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__["Ensure"].notNull(chain, 'chain');
            const existing = yield this.eventRepository.getByChainTypeAsync(chain.type);
            if (existing && existing.length > 0) {
                this.logger.info(`Found ${existing.length} existing events for ${_enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainType"][chain.type]}`)();
                this._isExtracting = false;
                return;
            }
            // Use file extractor by default
            let source = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].FILE;
            let events = yield this.extractEventsAsync(chain, source);
            if ((!events || (events === null || events === void 0 ? void 0 : events.length) <= 0) && !_utils_common_util__WEBPACK_IMPORTED_MODULE_2__["CommonUtil"].isNullOrWhitespace(chain.theGraphUrl)) {
                // Use GraphQL extractor
                source = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].GRAPHQL;
                events = yield this.extractEventsAsync(chain, source);
            }
            if ((!events || (events === null || events === void 0 ? void 0 : events.length) <= 0) && !_utils_common_util__WEBPACK_IMPORTED_MODULE_2__["CommonUtil"].isNullOrWhitespace(chain.rpcProviderUrl)) {
                // Use RPC extractor
                source = _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].RPC;
                events = yield this.extractEventsAsync(chain, source);
            }
            yield this.saveEventsAsync(type, source, events);
        });
    }
    saveEventsAsync(chainType, source, events) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const chainStat = yield this.initChainStatAsync(chainType);
            _utils_ensure_util__WEBPACK_IMPORTED_MODULE_3__["Ensure"].notNull(chainStat, 'chainStat');
            if ((events === null || events === void 0 ? void 0 : events.length) > 0) {
                yield this.eventRepository.clearByChainType(chainType);
                yield this.eventRepository.insertManyAsync(events);
                const lastBlock = yield this.eventRepository.getLastBlockByChainTypeAsync(chainType);
                yield this.updateChainStatAsync(chainStat, true, source, lastBlock);
            }
            else {
                yield this.eventRepository.clearByChainType(chainType);
                yield this.updateChainStatAsync(chainStat, false, source, 0);
            }
        });
    }
    initChainStatAsync(chainType) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = yield this.statRepository.getOrCreateByChainTypeAsync(chainType);
            if (result.version !== this.configService.config.version) {
                yield this.clearAllAsync();
                result = yield this.statRepository.getOrCreateByChainTypeAsync(chainType);
            }
            return result;
        });
    }
    updateChainStatAsync(chainStat, success, source, lastBlock) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            chainStat.extractSuccess = success;
            chainStat.extractedDate = new Date();
            chainStat.source = source;
            chainStat.lastBlock = lastBlock;
            yield this.statRepository.insertAsync(chainStat);
        });
    }
    extractEventsAsync(chain, extractorType) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const extractor = this.extractorFactory.get(extractorType);
                return yield extractor.extractAsync(chain);
            }
            catch (error) {
                this.logger.error(error)();
                return undefined;
            }
        });
    }
}
ChainService.ɵfac = function ChainService_Factory(t) { return new (t || ChainService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_logger_service__WEBPACK_IMPORTED_MODULE_5__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_factories_extractor_factory__WEBPACK_IMPORTED_MODULE_7__["ChainExtractorFactory"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_repositories_stat_repository__WEBPACK_IMPORTED_MODULE_8__["StatRepository"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_repositories_event_repository__WEBPACK_IMPORTED_MODULE_9__["EventRepository"])); };
ChainService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: ChainService, factory: ChainService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "y2kS":
/*!**********************************************!*\
  !*** ./src/app/extractors/file.extractor.ts ***!
  \**********************************************/
/*! exports provided: FileChainExtractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileChainExtractor", function() { return FileChainExtractor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/chain.enum */ "/2aV");
/* harmony import */ var _models_event_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/event.model */ "Z2SW");
/* harmony import */ var _base_extractor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.extractor */ "Tge8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/logger.service */ "Mb37");
/* harmony import */ var _utils_file_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/file.util */ "YcFz");







class FileChainExtractor extends _base_extractor__WEBPACK_IMPORTED_MODULE_3__["BaseChainExtractor"] {
    constructor(logger, fileUtil) {
        super(logger);
        this.logger = logger;
        this.fileUtil = fileUtil;
    }
    get type() {
        return _enums_chain_enum__WEBPACK_IMPORTED_MODULE_1__["ChainSourceType"].FILE;
    }
    extractAsyncInternal(chain) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let rawData = yield this.fileUtil.readFileAsync(chain.eventsPath);
            rawData = JSON.parse(rawData);
            if (Array.isArray(rawData)) {
                return Promise.resolve(rawData.map(e => _models_event_model__WEBPACK_IMPORTED_MODULE_2__["EventModel"].fromJS(e, chain)));
            }
            return Promise.resolve(undefined);
        });
    }
}
FileChainExtractor.ɵfac = function FileChainExtractor_Factory(t) { return new (t || FileChainExtractor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_logger_service__WEBPACK_IMPORTED_MODULE_5__["Logger"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_utils_file_util__WEBPACK_IMPORTED_MODULE_6__["FileUtil"])); };
FileChainExtractor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: FileChainExtractor, factory: FileChainExtractor.ɵfac, providedIn: 'root' });


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