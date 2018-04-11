function generateringComponent(vardata, vargeodata){
  var lookup = genLookup(vargeodata) ;
  var mapLCB = dc.leafletChoroplethChart('#MapLCB');
  var cf = crossfilter(vardata) ;
  var all = cf.groupAll();
  var nb_project = dc.numberDisplay('#count-info');
  var funds = dc.numberDisplay('#count-info2');
  var menages = dc.numberDisplay('#count-info3');
  var beneficiaires = dc.numberDisplay('#count-info4');
 
  var activityDim = cf.dimension(function(d){return d.activities});
  var activityGroup = activityDim.group().reduceSum(function(d){return d.activities});
  var mapDimension = cf.dimension(function(d) { return d.country_code});
  var mapGroup = mapDimension.group().reduceSum(function(d){ return d.personnes_ben});
  var projDim = cf.dimension(function(d){return d.nb_proj})
  var projGroup = projDim.groupAll().reduceSum(function(d){ return d.nb_proj});
  var fundDim = cf.dimension(function(d){return d.financement});
  var fundGroup = fundDim.groupAll().reduceSum(function(d){return d.financement});
  var menDim = cf.dimension(function(d){return d.menages_ben});
  var menGroup = menDim.groupAll().reduceSum(function(d){return d.menages_ben});
  var benDim = cf.dimension(function(d){return d.personnes_ben});
  var benGroup = benDim.groupAll().reduceSum(function(d){return d.personnes_ben});


dc.dataCount('#count-info')
  .dimension(cf)
  .group(all);

        mapLCB
             .dimension(mapDimension)
             .group(mapGroup)
             .center([0,0])
             .zoom(0)
             .geojson(vargeodata)
             .colors(['#f0f0f0','#fee0d2','#fc9272','#de2d26'])
             .colorDomain([0,3])
             .colorAccessor(function (d){
              var c = 0
               if (d>150000) {
                    c = 3;
               } else if (d>90000){
                  c = 2;
              } else if (d>30000) {
                c = 1;
              }else if (d>0) {
                c = 0;
              }
               return c

    })
    
             .featureKeyAccessor(function (feature){
               return feature.properties['country_code'];
             }).popup(function (d){
                // var act = d.properties['activities'] ;
                // var alltext = act.split(",");
                // var text = '<br>';
                // for (var i = 0; i < alltext.length; i++) {
                //     text += alltext[i]+'<br>';
                // }
               //return '<h4><strong>'+ d.properties['country_name'] +'</strong></h4>'+'<h5><strong>'+'Bénéficiaires:</strong><br>'+d.properties['personnes_ben']+' personnes<br>'+d.properties['menages_ben']+' ménages'+'</h5>';
                return auClick(d);
             })
             .renderPopup(true)
             .featureOptions({
                'fillColor': 'gray',
                'color': 'gray',
                'opacity':0.8,
                'fillOpacity': 0.1,
                'weight': 1
            });
//Key figure number of projects
    nb_project.group(projGroup)
              .formatNumber(d3.format(".g"))
              .valueAccessor(function (d) { return d;
              } ) ; 

function auClick(d){
  var act = d.properties['activities'] ;
  var alltext = act.split(",");
  var text = '<br>';
  for (var i = 0; i < alltext.length; i++) {
    text += alltext[i]+'<br>';
  }
  return '<h4><strong>'+ d.properties['country_name'] +'</strong></h4>'+'<h5><strong>'+'Bénéficiaires:</strong><br>'+d.properties['personnes_ben']+' personnes<br>'+d.properties['menages_ben']+' ménages'+'</h5>';
}

// key figures financement by country
var formatDecimal = function(d) {
        ret = d3.format(".2f");
        return ret(d)+ " Millions USD";
    };
funds.group(fundGroup) 
     .formatNumber(formatDecimal)
     .valueAccessor(function(d) {return d;}); 
//ménages bénéficiaires
menages.group(menGroup) 
     .formatNumber(d3.format(".g"))
     .valueAccessor(function(d) {return d;});
//personnes bénéficiaires
beneficiaires.dimension(benDim)
         .group(benGroup)
         .formatNumber(d3.format(".g"))
         .valueAccessor(function(d) {return d;});




   dc.renderAll();
    Winheight = $(window).height();
     $("#MapLCB").css("background-color","#FFFFFF");
      

      var map = mapLCB.map();

      zoomToGeom(vargeodata);

      function zoomToGeom(geodata){
        var bounds = d3.geo.bounds(geodata) ;
        map.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]])
            .setZoom(4.7)
            .setView([10, 10], 4)
           ;}

      function genLookup(geojson) {
        var lookup = {} ;
        geojson.features.forEach(function (e) {
          lookup[e.properties['country_code']] = String(e.properties['country_name']);
        });
        return lookup ;
      }
}

var dataCall = $.ajax({
    type: 'GET',
    url: 'data/datalcb.json',
    dataType: 'json',
});

var geomCall = $.ajax({
    type: 'GET',
    url: 'data/sahel.geojson',
    dataType: 'json',
});


$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){
    var geom = geomArgs[0];
    geom.features.forEach(function(e){
        e.properties['country_code'] = String(e.properties['country_code']);
    });
    generateringComponent(dataArgs[0],geom);
});
