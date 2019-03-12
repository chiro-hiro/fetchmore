function isEmty(obj) {
  return (Array.isArray(obj) && obj.length === 0) || (typeof (obj) === 'object' && Object.keys(obj).length === 0);
}

function buildData(object, data, parentName) {
  data = data || [];
  parentName = parentName || '';
  for (var index in object) {
    if (Array.isArray(object[index])) {
      var tmpArray = object[index];
      for (var i = 0; i < tmpArray.length; i++) {
        for (var field in tmpArray[i]) {
          data.push(`${encodeURIComponent(index)}[${i.toString()}][${encodeURIComponent(field)}]=${encodeURIComponent(tmpArray[i][field])}`);
        }
      }
    }
    else if (typeof (object[index]) === 'object') {
      buildData(object[index], data, index);
    }
    else {
      if (parentName === '') {
        data.push(`${encodeURIComponent(index)}=${encodeURIComponent(object[index])}`);
      }
      else {
        data.push(`${encodeURIComponent(parentName)}[${encodeURI(index)}]=${encodeURIComponent(object[index])}`);
      }

    }
  }
  return data.join('&');
}

function fetchmore(request, data, callback, errorCallback) {
  request = request || {};
  request.url = request.url || '/';
  request.method = request.method || 'GET';
  request.headers = request.headers || {};
  callback = callback || function () { };
  errorCallback = errorCallback || function () { };
  if (request.method === 'GET' && !isEmty(data)) {
    request.url += buildData(data);
  }
  if (request.method === 'POST') {
    if (typeof (request.headers['Content-Type']) === 'undefined') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    if ((/application\/json/i).test(request.headers['Content-Type'])) {
      request.body = JSON.stringify(data);
    } else {
      request.body = buildData(data);
    }
  }
  fetch(new Request(request.url, request))
    .then((response) => {
      response.json()
        .then((resData) => callback(resData))
        .catch(error => callback(error));
    })
    .catch(error => callback(error));
}

module.exports = fetchmore;