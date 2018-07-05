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
                    data.push(encodeURIComponent(index) + '[' + encodeURIComponent(field) + '][' + i.toString() + ']' + '=' + encodeURIComponent(tmpArray[i][field]));
                }
            }
        }
        else if (typeof (object[index]) === 'object') {
            buildData(object[index], data, index);
        }
        else {
            if (parentName === '') {
                data.push(encodeURIComponent(index) + '=' + encodeURIComponent(object[index]));
            }
            else {
                data.push(encodeURIComponent(parentName) + '[' + encodeURI(index) + ']' + '=' + encodeURIComponent(object[index]));
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
        if (typeof (request.headers['content-type']) === 'undefined') {
            request.headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        request.body = buildData(data);
    }
    fetch(new Request(request.url, request)).then(function (response) {
        try {
            response.json().then(function (resData) {
                callback(resData);
            }, errorCallback);
        } catch (e) {
            errorCallback(e);
        }
    }, errorCallback);
}

module.exports = fetchmore;