// src/views/Map.vue

<template>
	<div class="map-container" id="map-container">
		<NavigationCtrl @zoomIn="zoomIn" @zoomOut="zoomOut" @resetMap="resetMap"></NavigationCtrl>
		<MapTools @point="drawPoint" @end="drawOff" @marker="addMarker" @polyline="addPolyline" @polygon="addPolygon"
			@rectangle="addRectangle"></MapTools>
	</div>

</template>

<script>
	// @ is an alias to /src
	// 引入组件
	import NavigationCtrl from "@/components/NavigationCtrl";
	import MapTools from "@/components/MapTools";
	export default {
		name: "MapView",
		components: {
			NavigationCtrl,
			MapTools
		},
		data() {
			return {
				map: null,
				// OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				OSMUrl: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
				// OSMUrl: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}",
				singleLine: [
					[36.517288954651875, 120.16685485839843753],
					[36.51194758264939, 120.1474571228027344],
					[36.51878442657495, 120.13320922851562503],
					[36.530426064343594, 120.1419639587402344],
					[36.53640593191922, 120.11209487915039064]
				],
				miltipleLine: [
					[
						[36.49282033577651, 120.11432647705078126],
						[36.48010001366223, 120.10265350341796876],
						[36.48084836613703, 120.08222579956054689],
						[36.49591970845512, 120.08239746093750001]
					],
					[
						[36.47614423230301, 120.08909225463867188],
						[36.47571655971428, 120.05973815917968751],
						[36.4829864484029, 120.03398895263671876],
						[36.49025517833079, 120.008239746093750002],
						[36.477641054786694, 120.008583068847656252],
						[36.487796767005534, 120.021800994873046875]
					]
				],
				singlePolygon: [
					[36.50203767899114, 120.13977527618408206],
					[36.505777518488806, 120.13072013854980472],
					[36.505109712517786, 120.1296043395996094],
					[36.50388092395907, 120.12921810150146487],
					[36.50345351147583, 120.12921810150146487],
					[36.50302609498369, 120.12947559356689456],
					[36.502545246638114, 120.12973308563232425],
					[36.50219796412198, 120.12990474700927737],
					[36.50177053585362, 120.12990474700927737],
					[36.5014232474337, 120.12999057769775393],
					[36.50043479667606, 120.13891696929931643],
					[36.50134310357634, 120.1399040222167969],
					[36.50195753621433, 120.13973236083984378],
					[36.50195753621433, 120.13973236083984378]
				]
			};
		},
		mounted() {
			let _this = this;
			this.map = this.$utils.map.createMap("map-container", {
					zoomControl: false //放大缩小，默认为true
				})
				// 点击地图页面操作  监听点击的位置
				.on("click", this.onMapClick);

			this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
			this.map.setView([36.09, 120.35], 5);
		},
		methods: {
			zoomIn() {
				this.map.zoomIn();
			},
			zoomOut() {
				this.map.zoomOut();
			},
			resetMap() {
				this.map.setView([36.09, 120.35], 13);
			},
			addMarker() {
				console.log("click marker");
				//默认图标
				this.$utils.map.createMakerByXY(this.map, [36.09, 120.35]);

				//自定义图标
				let gifIcon = this.$utils.map.createIcon({
					iconUrl: require("../assets/logo.png"),
					iconSize: [32, 32]
				});

				let marker = this.$utils.map.createMakerByXY(this.map, [36.09, 120.25], {
					icon: gifIcon
				});

				// 设置提示
				let tooltips = `<h3>鼠标经过了，第一次提示</h3>`;
				// 为 tooltips 指定 class 类名
				marker.bindTooltip(tooltips, {
					className: "sample-tooltips"
				});
				// 直接绑定  点击提示popup
				marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
			},
			addPolyline() {
				console.log("click polyline");
				let singleLineStyle = {
					stroke: true,
					color: "#de0000",
					weight: 3,
					opacity: 1
				};

				this.$utils.map.createPolyline(
					this.map,
					this.singleLine,
					singleLineStyle
				);

				let multipleLineStyle = {
					stroke: true,
					color: "#0085fb",
					weight: 4,
					opacity: 1
				};
				this.$utils.map.createPolyline(
					this.map,
					this.miltipleLine,
					multipleLineStyle
				);

			},
			//画多边形
			addPolygon() {
				console.log("click polyline");
				let singlePolygonStyle = {
					stroke: true,
					color: "#3f45dd",
					weight: 3,
					opacity: 1
				};

				this.$utils.map.createPolygon(
					this.map,
					this.singlePolygon,
					singlePolygonStyle
				);
			},
			// 画出矩形
			addRectangle() {
				console.log("画出矩形");
				let bounds = [
					[41, 120.5],
					[41, 121],
					[40.5, 120.5],
					[40.5, 121]
				];
				this.$utils.map.createRectangle(this.map, bounds, {
					color: "#dd444d",
					weight: 1
				});
				let bounds2 = [
					[41, 121],
					[41, 121.5],
					[40.5, 121],
					[40.5, 121.5]
				];
				this.$utils.map.createRectangle(this.map, bounds2, {
					color: "#dd444d",
					weight: 1
				});
			},
			//地图位置随时显示
			onMapClick(e) {
				// console.log("得到的经纬度" + e.latlng);
				let popup = this.$utils.map.createPopup(this.map, {
					maxWidth: 200,
					minWidth: 200,
					className: 'sample-popup'
				});
				popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(e
					.target);
			},
			drawOn(fn) {
				// 监听地图点击事件
				this.map.off("click");
				this.map.on("click", evt => fn(evt));
			},
			drawOff() {
				// 移除监听地图点击事件
				this.map.off("click");
				// 复原鼠标平移样式
				this.$utils.map.removerCursorStyle(this.map);
			},
			// 根据自己画出标注点
			drawPoint() {
				console.log("point");
				this.$utils.map.addCursorStyle(this.map, "pointer-cursor");
				let _this = this;
				this.drawOn(evt => {
					console.log(evt.latlng);
					this.$utils.map.createMakerByXY(this.map, [evt.latlng.lat, evt.latlng.lng]);
				});
			}
		}
	};
</script>
<style lang="less">
	.map-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.sample-tooltips {
		text-align: left;
		padding: 0 15px;

		h3 {
			font-size: 16px;
			font-weight: 600;
			color: red;
		}
	}

	.samplePopup {
		color: '#dd444d' !important;
	}
</style>
