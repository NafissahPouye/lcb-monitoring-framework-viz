var map = L.map('MapLCB',

    {
        
        maxZoom: 18,
        minZoom: 2,
        zoomControl: false,

        
       // scrollWheelZoom: false
    });

//map.setView([20, 40], 1);
map.setView([15, 15], 2)
      .setZoom(4.3)
//map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
/*map.scrollWheelZoom.disable();
map.on('mouseover', map.scrollWheelZoom.disable.bind(map.scrollWheelZoom) );*/
//map.dragging.disable();
//3/13.67/
/*L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
    
}).addTo(map);*/

Winheight = $(window).height("#MapLCB");
     $("#MapLCB").css("background-color","#FFFFFF");
     $('.leaflet-control-attribution').hide();


var geojson;


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        // color: '#ff4000', //'#3182bd', //'#666',
        //dashArray: '',
        //fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
//
//function zoomToFeature(e) {
//    // map.fitBounds(e.target.getBounds());
//}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
    layer.bindPopup('<h4>'+ feature.properties['country_name'] +'</h4>'+'<h6>'+'Bénéficiaires:<br>'+feature.properties['personnes_ben']+' personnes<br>'+feature.properties['menages_ben']+' ménages'+'</h6>');

}


function style(feature) {
    if (feature.properties.personnes_ben == 971607) {
        return {

            fillColor:  '#de2d26',
            weight: 4,
            opacity: 0.2,
            color: '#de2d26',
            fillOpacity: 0.8
        };
    } else if (feature.properties.personnes_ben == 141200) {
        return {

            fillColor: '#fc9272',
            weight: 2,
            opacity: 0.6,

           color: '#fc9272',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    } else if (feature.properties.personnes_ben == 92500) {
        return {
            fillColor: '#fc9272',
            weight: 2,
            opacity: 0.6,
            color: '#fc9272',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    } else if (feature.properties.personnes_ben == 37500) {
        return {
            fillColor: '#fbb4ae',
            weight: 2,
            opacity: 0.6,
            color: '#fbb4ae',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    }
}



geojson = L.geoJson(sahel, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
        d > 50 ? '#FD8D3C' :
        d > 20 ? '#FEB24C' :
        d > 10 ? '#FED976' :
        '#FFEDA0';
}
if (map.scrollWheelZoom) {
  map.scrollWheelZoom.disable();
}

//
//var legend = L.control({
//    position: 'bottomright'
//});
//
//legend.onAdd = function (map) {
//
//    var div = L.DomUtil.create('div', 'info legend'),
//
//    div.innerHTML +=
//        '<i style="background:#FF493D">Very heavily affected</i>  <br/'
//    div.innerHTML +=
//        '<i style="background:#2b8cbe">Heavily affected</i>  <br/'
//    div.innerHTML +=
//        '<i style="background:#ffeda0">Affected</i>  <br/'
//
//
//    return div;
//};
//
//legend.addTo(map);
