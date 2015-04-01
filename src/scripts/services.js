'use strict';

angular.module('example-app')
  .factory('ItemService', function ($resource, $sce) {
    function photoImageUrl(photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' +
              photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
    }

    return $resource(
      'https://api.flickr.com/services/rest/',
      {
        'api_key': '7428c2f55d331953ea8991abcedd7198',
        'format': 'json',
        'jsoncallback': 'JSON_CALLBACK'
      },
      {
        getList: {
          method: 'jsonp',
          params: {
            'method': 'flickr.photos.search',
            'text': '@q',
            'sort': 'interestingness-desc',
            'per_page': 10,
            'page': 0,
          },
          cache: true,
          isArray: true,
          transformResponse: function (data) {
            var items = (data.photos ? data.photos.photo : []).map(function (photo) {
              return {
                id: photo.id,
                title: photo.title,
                image: photoImageUrl(photo)
              };
            });
            return items;
          }
        },
        getItem: {
          method: 'jsonp',
          params: {
            'method': 'flickr.photos.getInfo',
            'photo_id': '@id'
          },
          cache: true,
          transformResponse: function (data) {
            var photo = data.photo;
            return {
              id: photo.id,
              title: photo.title._content,
              image: photoImageUrl(photo),
              date: photo.dates.taken,
              description: $sce.trustAsHtml(photo.description._content),
              user: photo.owner.realname || photo.owner.username
            };
          }
        }
      }
    );
  });
