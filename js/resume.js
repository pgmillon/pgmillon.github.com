function initGmaps() {
  var coord = new google.maps.LatLng(50.6691505,2.8403389);
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: coord,
    zoom: 9
  }

  var map = new google.maps.Map(document.getElementById('my-location'), mapOptions);

  var marker = new google.maps.Marker({
    position: coord,
    map: map,
    title: 'My Location'
  });
}

(function main() {
  google.maps.event.addDomListener(window, 'load', initGmaps);
})();