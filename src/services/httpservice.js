var Fetch = require('whatwg-fetch');

var service = {
    get: function (url) {
        return fetch(url)
            .then(function (response) {
                return response.json();
            });
    }
};

module.exports = service;