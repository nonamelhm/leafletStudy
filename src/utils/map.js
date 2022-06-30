import "leaflet/dist/leaflet.css";
import "../assets/style/leaflet.css";
import $L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = $L.icon({
	iconAnchor: [13, 41],
	iconUrl: icon,
	shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

const createMap = (divId, options) => {
	let map = $L.map(divId, options);
	return map;
};

const createTileLayer = async (map, url, options) => {
	let tileLayer = await $L.tileLayer(url, options);
	tileLayer.addTo(map);
	return tileLayer;
};

/**
 * 通过 [x, y] 坐标添加 Maker
 *
 * @param {Object} map
 * @param {Object} latLng
 * @param {Object} options
 * 
 */


const createIcon = options => {
	return $L.icon(options);
};

//图标
const createMakerByXY = (map, coordinate, options = {}) => {
	console.log(coordinate);
	let marker = $L.marker($L.latLng([...coordinate]), options);
	marker.addTo(map);
	return marker;
};
// 画折线
const createPolyline = (map, linePath, lineOpts) => {
	let polyline = $L.polyline(linePath, lineOpts);
	polyline.addTo(map);
	return polyline;
};
//画多边形
const createPolygon = (map, linePath, lineOpts) => {
	let polygon = $L.polygon(linePath, lineOpts);
	polygon.addTo(map);
	return polygon;
};
// 提示tooltips  鼠标移入移出
const createTooltips = (map, linePath, lineOpts) => {
	let polygon = $L.polygon(linePath, lineOpts);
	polygon.addTo(map);
	return polygon;
};
//点击提示popup
const createPopup = (map, options) => {
	let popup = $L.popup(options);
	return popup;
};

// 通过数组创建 latlng
const createLatlonByArray = (coordinate) => {
	let latLng = $L.latLng([...coordinate]);
	return latLng;
};

//画出矩形
const createRectangle=(map,bounds,options)=>{
	let rectangle=$L.rectangle(bounds,options);
	rectangle.addTo(map);
	return rectangle;
}
// 存储鼠标样式
let CursorStyle = "";
// 添加鼠标样式
const addCursorStyle = (map, cursorStyle) => {
  CursorStyle = cursorStyle;
  $L.DomUtil.addClass(map._container, cursorStyle);
};
// 移除鼠标样式
const removerCursorStyle = map => {
  $L.DomUtil.removeClass(map._container, CursorStyle);
};

export default {
	createMap,
	createTileLayer,
	createIcon,
	createMakerByXY,
	createPolyline,
	createPolygon,
	createPopup,
	createLatlonByArray,
	createRectangle,
	addCursorStyle,
	removerCursorStyle
};
