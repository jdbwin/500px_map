$(function() {

  var map = new GMaps({
    div: '#map',
    lat: -12.043333,
    lng: -77.028333
  });

  function getPhotos() {
    var mapCenter = '' + map.getCenter().lat() + ',' + map.getCenter().lng() + ',2km';
    var url = 'https://api.500px.com/v1/photos/search?geo='+mapCenter+'&consumer_key='+CONSUMER_KEY;

    $.getJSON(url, function(data) {
      $.each(data.photos, function(key, value) {
        setPhotoMarkers(value)
      });
    });

  };

  function setPhotoMarkers(photo) {
    var lat = photo.latitude;
    var lng = photo.longitude;
    var title = photo.name;
    var thumbnail = "<div><img src="+photo.image_url+"</div>"
    var marker = map.addMarker({
      lat: lat,
      lng: lng,
      title: title,
      infoWindow: {
        content: thumbnail
      }
    });

    marker.addListener('click', function () {
      infoWindow.open(map, marker);

    });

  };

  //map events
  map.addListener('center_changed', function () {
    getPhotos();
  });

  //on load
  getPhotos();

});
