/**************************************************
@author 杨尚波
@email  meiseayoung@gmail.com
@baseon openLayer 3
@version 0.1.0
***************************************************/
import $ from "jquery";
import ol from "openlayers";

class Map {
	constructor(opts) {
			var view = new ol.View({
				center: opts.center ? ol.proj.fromLonLat(opts.center) : ol.proj.fromLonLat([0, 0]),
				minZoom: opts.minZoom || 0,
				maxZoom: opts.maxZoom || 16,
				zoom: opts.zoom || 8
			});
			var resolutions = [];
			for (let i = 0; i < 19; i++) {
				resolutions[i] = Math.pow(2, 18 - i);
			}
			var tilegrid = new ol.tilegrid.TileGrid({
				origin: [0, 0],
				resolutions: resolutions
			});
			//下面的规则仅对百度瓦片有用( 但是百度echarts提供的geojson文件映射上去有偏移 )
			var source = new ol.source.TileImage({
				projection: ol.proj.get("EPSG:3857"),
				tileGrid: tilegrid,
				tileUrlFunction: (tileCoord, pixelRatio, proj) => {
					if (!tileCoord) {
						return "";
					}
					var z = tileCoord[0];
					var x = tileCoord[1];
					var y = tileCoord[2];
					if (x < 0) {
						x = "M" + (-x);
					}
					if (y < 0) {
						y = "M" + (-y);
					}
					return (opts.tilePath || "../../tile_baidu/") + z + "/" + x + "/" + y + ".png";
				}
			});
			var map = new ol.Map({
				target: opts.renderTo,
				layers: [
					new ol.layer.Tile({
						// source: source
						/****************下面的source适用于google瓦片**************/
						source: new ol.source.XYZ({
							url: opts.tilePath + "/{z}/{x}/{y}.png",
							tileSize: [256, 256]
						})
					})
				],
				view: view
			});
			var colorList = [
				'rgba(37,206,48,0.3)', 'rgba(140,234,237,0.3)', 'rgba(0,163,249,0.3)',
				'rgba(129,241,211,0.3)', 'rgba(0,160,233,0.3)', 'rgba(141,152,179,0.3)',
				'rgba(230, 206, 13, 0.3)', 'rgba(149, 180, 82, 0.3)', 'rgba(149, 112, 109, 0.3)',
				'rgba(220, 104, 169, 0.3)', 'rgba(7, 163, 163, 0.3)', 'rgba(153, 127, 209, 0.3)',
				'rgba(88, 143, 213, 0.3)', 'rgba(245, 155, 79, 0.3)', 'rgba(192, 79, 79, 0.3)',
				'rgba(89, 103, 139, 0.3)', 'rgba(201, 173, 0, 0.3)', 'rgba(129, 176, 10, 0.3)',
				'rgba(111, 85, 83, 0.3)', 'rgba(193, 64, 136, 0.3)', 'rgba(0,152,233,0.15)',
				'rgba(0,160,233,0.15)', 'rgba(0,151,232,0.15)', 'rgba(0,176,233,0.15)',
				'rgba(0,162,233,0.15)', 'rgba(0,174,233,0.15)'
			];
			this.config = {
				renderTo: opts.renderTo,
				center: opts.center ? ol.proj.fromLonLat(opts.center) : ol.proj.fromLonLat([0, 0]),
				minZoom: opts.minZoom || 0,
				maxZoom: opts.maxZoom || 16,
				zoom: opts.zoom || 8
			};
			this.util = {
				/**
				 *生成随机字符UID
				 *param lenth    随机字符的长度  type:Number
				 *return 随机字符串              type:String	
				 **/
				createUID: (length) => {
					var string = "abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ1234567890_";
					var strings = string.split("");
					strings.sort(function() {
						return Math.random() > 0.5
					});
					strings.length = length || 5;
					return strings.join("");
				}
			};
			this.view = view;
			this.map = map;
			this.areaInfo = {};
			this._createInfoOverlay();
		}
		/**
		 * [返回地图中心点]
		 * @param {[Array]} position [经纬度] 
		 */
	go2Center(zoomSize) {
			var me = this;
			var map = me.map;
			var view = me.view;
			var viewCenter = map.getView().getCenter();
			/**
			 *功能说明:动画
			 *@param animationName动画效果名
			 *@param 动画结束后地图中心点
			 **/
			const _animation = (animationName, center, duration) => {
				var zoom = ol.animation.zoom({
					resolution: view.getResolution()
				});
				var pan = ol.animation.pan({
					duration: duration || 500,
					source: view.getCenter()
				});
				var bounce = ol.animation.bounce({
					duration: duration || 500,
					resolution: 4 * view.getResolution(),
					start: new Date().getTime()
				});
				var rotate = ol.animation.rotate({
					duration: duration || 500,
					rotation: 2 * Math.PI,
					start: new Date().getTime()
				});
				var animate = {
					zoom: zoom,
					pan: pan,
					bounce: bounce,
					rotate: rotate
				};
				map.beforeRender(animate[animationName]);
				view.setCenter(viewCenter);
			};
			_animation("pan", ol.proj.fromLonLat(viewCenter));
			view.setZoom(zoomSize || 8);
		}
		/**
		 * [注册地图]
		 * @param  {[String]} url [地图边界信息url]
		 * @param  {[String]} name [地图名称]
		 * @param  {[Object]} name [地图样式]
		 * @return {[undefined]}         [undefined]
		 */
	registerMap(url, name, style) {
			var me = this;
			var layer = new ol.layer.Vector({
				source: new ol.source.Vector({
					url: url,
					format: new ol.format.GeoJSON()
				}),
				style: new ol.style.Style({
					fill: new ol.style.Fill({
						color: style ? style.fillColor : "rgba(255, 255, 255, 0.5)"
					}),
					stroke: new ol.style.Stroke({
						color: style ? style.strokeColor : "#40F835",
						width: style ? style.strokeWidth : 2
					})
				})
			});
			layer.setMap(me.map);
			me.areaInfo[name] = {
				name: name,
				vector: layer,
				features: layer.getSource().getFeatures() //因为请求数据是异步的，所有这里获取的features为[];
			};
			var timer = setInterval(() => {
				if (me.areaInfo[name].features.length > 0) {
					clearInterval(timer);
				} else {
					me.areaInfo[name].features = layer.getSource().getFeatures();
				}
			}, 20);
		}
		/***
		 * [高亮指定区域]
		 * @param ｛[String]｝nameSpace 图层命名空间
		 * @param ｛[Object]｝IDorName  {
		 *        						 name:"成都市",  //区域名称
		 *        						 id:5133         //区域ID
		 * }
		 * @param {[区域样式]}style
		 */
		// highLightArea: function(nameSpace, IDorName, style) {
	highLightArea(nameSpace, IDorName, style) {
			var me = this;
			var features = me.areaInfo[nameSpace].features;
			var vector = me.areaInfo[nameSpace].vector;
			var feature = null;
			if (IDorName.id && IDorName.id !== "") {
				feature = vector.getSource().getFeatureById(IDorName.id);
			}
			if (IDorName.name && IDorName.name !== "") {
				for (let i = 0; i < features.length; i++) {
					// if (IDorName.name == features[i]["values_"].name) {
					if (IDorName.name == features[i]["U"].name) {
						feature = features[i]
						break;
					}
				}
			}
			feature.setStyle(
				new ol.style.Style({
					fill: new ol.style.Fill({
						color: style ? style.fillColor : "rgba(252, 207, 104, 0.8)"
					}),
					stroke: new ol.style.Stroke({
						color: style ? style.strokeColor : "#40F835",
						width: style ? style.strokeWidth : 2
					})
				}))


			// for (var i = 0; i < features.length; i++) {
			// 	if (IDorName[id] == features[i]["id_"]) {
			// 		features[i].setStyle(
			// 			new ol.style.Style({
			// 				fill: new ol.style.Fill({
			// 					color: style ? style.fillColor : "rgba(252, 207, 104, 0.8)"
			// 				}),
			// 				stroke: new ol.style.Stroke({
			// 					color: style ? style.strokeColor : "blue",
			// 					width: style ? style.strokeWidth : 4
			// 				})
			// 			}))
			// 		break;
			// 	}
			// }
		}
		/**
		 * [初始化样式]
		 * @param  {[String]} nameSpace [命名空间(Map对象下的areaInfo的属性)]
		 * @param  {[Object]} style     [样式]
		 * @return {[undefined]}           [undefined]
		 */
	initStyle(nameSpace, style) {
			var me = this;
			var features = me.areaInfo[nameSpace].features;
			features.map((feature, index) => {
				feature.setStyle(
					new ol.style.Style({
						fill: new ol.style.Fill({
							color: style ? style.fillColor : "rgba(255,255,255,0.5)"
						}),
						stroke: new ol.style.Stroke({
							color: style ? style.strokeColor : "#50A7D2",
							width: style ? style.strokeWidth : 2
						})
					}))
			})
		}
		/**
		 * [开启图层选中效果]
		 * @param  {[Function]} cbSelect [点击选中回调]
		 * @param  {[Function]} cbHover  [鼠标移动回调]
		 * @return {[undefined]}          [undefined]
		 */
	openSelect(cbSelect, cbHover) {
			var me = this;
			var map = this.map;
			var position = {};
			var selectPointerMove = new ol.interaction.Select({
				condition: ol.events.condition.click
			});
			map.addInteraction(selectPointerMove);
			map.on("pointermove", (e) => {
				var pixel = this.getEventPixel(e.originalEvent);
				var coordinate = e.coordinate;
				position = {
					pixel: pixel,
					coordinate: coordinate
				};
				var feature = this.forEachFeatureAtPixel(pixel, (feature) => {
					return feature;
				});
				if (feature === undefined) {
					// document.getElementsByClassName('ol-popup')[0].style.display = "none";
					return;
				} else {
					var id = feature.getId();
					var name = feature.get("name");
					if (cbHover && $.type(cbHover) == "function") {
						cbHover(id, name, position);
					}
				}
			});
			selectPointerMove.on('select', (e) => {
				var name = null;
				var id = null;
				if (e.selected.length > 0) {
					name = e.selected[0]["values_"].name;
					id = e.selected[0]["id_"];
					if (cbSelect && $.type(cbSelect) == "function") {
						cbSelect(id, name, position);
					}
				}
			});
		}
		/**
		 * [地图打点]
		 * @param  {[Object]} opts  [参数对象]
		 * @param  {[Array]} opts.position  [经纬度]
		 * @param  {[String]} opts.type  [打点默认样式]
		 * @param  {[String]} opts.url [打点图标地址]
		 * @param  {[Number]} opts.width [打点图标宽度]
		 * @param  {[Number]} opts.height [打点图标高度]
		 * @param  {[Function]} opts.cbClick [打点图标点击后的回调]
		 * @param  {[Function]} opts.cbMove [打点图标点击后的回调]
		 * @return {[undefined]}           [undefined]
		 */
	markPoint(opts) {
			var me = this;
			var map = this.map;
			var offset = null;
			var align = opts.align || "bottom";
			var element = $("<div class='map-marker' data-role='map-marker' data-type='" + (opts.type || 1) + "'><a href='javascript:void 0;'></a></div>");
			element.on("click", "a", (e) => {
				e.preventDefault();
				e.stopPropagation();
				opts.cbClick ? opts.cbClick(e) : undefined;
			});
			element.on("mousemove", "a", function(e) {
				e.preventDefault();
				e.stopPropagation();
				opts.cbMove ? opts.cbMove(e) : undefined;
			});
			if (opts.url && $.type(opts.url) === "string") {
				element.css({
					"background-image": "url(" + opts.url + ")",
					"background-size": "100% 100%"
				})
			}
			if (opts.width && $.type(opts.width) === "number") {
				element.css({
					width: opts.width
				})
			}
			if (opts.height && $.type(opts.height) === "number") {
				element.css({
					height: opts.height
				})
			}
			switch (align) {
				case "center":
					offset = [-element.width() / 2, -element.height() / 2];
					break;
				case "bottom":
					offset = [-element.width() / 2, -element.height()];
					break;
				default:
					offset = [-element.width() / 2, -element.height()];
			}
			var overlay = new ol.Overlay({
				id: me.util.createUID(),
				element: element.get(0),
				stopEvent: true,
				position: ol.proj.fromLonLat(opts.position),
				offset: offset
			});
			overlay.setMap(map);
		}
		/**
		 * [弹出层信息]
		 * @param  {[Object]} opts  [{
		 *                          	coordinate:弹出位置
		 *                          	title:信息窗体标题
		 *                          	infoHTML:信息窗体主体内容
		 *                          	align:信息窗体展示对齐方式
		 * }]
		 * @return {[undefined]} [undefined]
		 */
	infoWindow(opts) {
			var me = this;
			var map = me.map;
			var container = document.getElementsByClassName('ol-popup')[0];
			var content = container.getElementsByClassName('ol-popup-content')[0];
			var closer = container.getElementsByClassName('ol-popup-closer')[0];
			var mainInfo = container.getElementsByClassName("ol-popup-content-main")[0];
			container.style.display = "block";
			opts.align ? $(container).addClass('align-' + opts.align) : "";
			me.defaultPopup.setPosition(opts.coordinate);
			content.getElementsByTagName("p")[0].innerHTML = opts.title;
			mainInfo.innerHTML = opts.infoHTML;
			closer.addEventListener("click", (e) => {
				me.hideInfoWindow();
			})
		}
		/**
		 * [隐藏信息窗体]
		 * @return {[undefined]} [undefined]
		 */
	hideInfoWindow() {
			var container = document.getElementsByClassName('ol-popup')[0];
			container.style.display = "none";
		}
		/**
		 * [创建infoWindow所需要的遮罩层]
		 * @return {[undefined]} [undefined]
		 */
	_createInfoOverlay() {
			var me = this;
			var map = me.map;
			var container = document.createElement("div");
			container.className = "ol-popup";
			container.innerHTML = `
				<span class="ol-popup-closer"></span>
	      		<div class="ol-popup-content">
		          <p></p>
		          <div class="ol-popup-content-main"></div>
	      		</div>
			`;
			document.body.appendChild(container);
			var overlay = new ol.Overlay(({
				element: container,
				autoPan: true,
				autoPanAnimation: {
					duration: 250
				}
			}));
			overlay.setMap(map);
			me.defaultPopup = overlay;
		}
		/**
		 * [获取最佳视野]
		 * @param  {[String]} nameSpace [指定区域的命名空间]
		 * @param  {[String]} areaName [指定区域的名称]
		 * @param  {[Function]} callback [回调方法]
		 * @return {[undefined]}        [undefined]
		 */
	fitBounds(nameSpace, areaName, callback) {
			var me = this;
			var map = me.map;
			var extent = null;
			var features = me.areaInfo[nameSpace].features;
			for (let i = 0; i < features.length; i++) {
				// if (features[i].values_.name === areaName) {
				if (features[i].U.name === areaName) {
					extent = features[i].getGeometry().getExtent();
					me.view.fit(extent, map.getSize());
					if (callback && $.type(callback) === "function") {
						callback(nameSpace, areaName)
					}
					break;
				}
			}
		}
		/**
		 * [获取指定区域的中心点]
		 * @param  {[String]} nameSpace [指定区域的命名空间]
		 * @param  {[String]} areaName [区域名称]
		 * @return {[Array]} [中心点坐标经伟度]
		 */
	getCenter(nameSpace, areaName) {
		var me = this;
		var map = me.map;
		var extent = null;
		var features = me.areaInfo[nameSpace].features;
		for (let i = 0; i < features.length; i++) {
			if (features[i].values_.name === areaName) {
				extent = features[i].getGeometry().getExtent();
			}
		}
		return ol.proj.toLonLat(ol.extent.getCenter(extent));
	}
}

export default Map;
