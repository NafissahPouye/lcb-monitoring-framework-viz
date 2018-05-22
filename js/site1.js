var map = L.map('MapLCB',
    {
    
        maxZoom: 18,
        minZoom: 2,
        zoomControl: false,

       // scrollWheelZoom: false
    });

//map.setView([20, 40], 1);
map.setView([14, 14], 2)
      .setZoom(4.6);
//map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

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


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
    layer.bindPopup('<h4>'+ feature.properties['country_name'] +'</h4>'+'<h6>'+'Bénéficiaires:<br>'+feature.properties['personnes_ben']+' personnes<br>'+feature.properties['menages_ben']+' ménages'+'</h6>');
    layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
}


function style(feature) {
    if (feature.properties.personnes_ben == 1090000) {
        return {

            fillColor: '#de2d26',
            weight: 2,
            opacity: 0.6,
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
