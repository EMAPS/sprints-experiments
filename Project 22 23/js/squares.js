function setSquares(config, keys, dividors) {
  'use strict';

  var _data,
      _maxes = {},
      _moneyMax = 0,
      _sizeMax = 100,
      _config = config,
      _profiles = _config.container,
      _keys = keys,
      _doms = {},
      _dividors = dividors,
      _keysIndex = _keys.reduce(function(res, o) {
        res[o.key] = o;
        return res;
      }, {}),
      _template =
        '<div class="country">' +
          '<div class="label"></div>' +
          '<div class="squares">' +
            _keys.map(function(o) {
              return '<div class="square" data-column="' + o.key + '"></div>';
            }).join('') +
          '</div>' +
        '</div>';

  $.ajax({
    url: _config.path,
    dataType: 'text',
    success: function(raw) {
      _data = parseCSV(raw);

      // Identify maxes:
      var i,
          k,
          k2,
          line,
          l = _data.length;

      for (i = 0; i < l; i++) {
        line = _data[i];
        for (k in line) {
          if (_keysIndex[k] && _keysIndex[k].money) {
            _moneyMax = Math.max(line[k], _moneyMax)

            for (k2 in _dividors)
              _maxes[_dividors[k2]] = (_dividors[k2] in _maxes) ?
                Math.max(_maxes[_dividors[k2]], line[k] / (line[_dividors[k2]] || Infinity)) :
                line[k] / (line[_dividors[k2]] || Infinity);
          }
        }
      }

      // Generate DOM:
      for (i = 0; i < l; i++) {
        _doms[_data[i].Country] = fillCountry(_data[i].Country, _data[i])
        _profiles.append(_doms[_data[i].Country]);
      }

      // Publish updator:
      window.normalize = function(dividor) {
        for (i = 0; i < l; i++)
          fillCountry(_data[i].Country, _data[i], _doms[_data[i].Country], dividor);
      };
    }
  });

  function fillCountry(label, data, dom, dividor) {
    var size,
        dom = dom || $(_template);

    // Set values:
    $('div.label', dom).text(label);
    dom.attr('id', label);

    _keys.forEach(function(o, i) {
      size = getSize(data, o.key, dividor);
      if (isNaN(size)) debugger;
      $('div.square[data-column="' + o.key + '"]', dom).css({
        width: size,
        height: size,
        top: _sizeMax / 2 - size / 2
      }).attr({
        title: o.key + ' : ' + printNumber(data[o.key], o.money) + (o.money ? '$' : ''),
        'data-raw': data[o.key],
        'data-size': size
      });

      dom.attr(
        'data-key' + i,
        data[o.key]
      );
    });

    $('div.square', dom).sort(function(a, b) {
      return +$(b).attr('data-size') - +$(a).attr('data-size');
    }).appendTo($('.squares', dom));

    return dom;
  }

  function getSize(data, key, dividor) {
    var max = dividor ?
      _maxes[dividor] :
      _moneyMax;

    return Math.sqrt(
      data[key] / (dividor ? (data[dividor] || Infinity) : 1) / max * (_sizeMax * _sizeMax)
    );
  }

  function printNumber(n, full) {
    var s = n < 0 ? '-' : '',
        i = parseInt(n = Math.abs(+n || 0).toFixed(2)) + '',
        j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + ',' : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
      (full ? '.' + Math.abs(n - i).toFixed(2).slice(2) : '')
    );
   };

  function parseCSV(strData, strDelimiter) {
    strDelimiter = strDelimiter || ';';

    var i,
        j,
        k,
        l,
        line,
        objLine,
        firstLine,
        objData = [],
        arrData = [[]],
        arrMatches = null,
        strMatchedValue,
        strMatchedDelimiter,
        objPattern = new RegExp(
          (
            // Delimiters.
            '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +

            // Quoted fields.
            '(?:"([^"]*(?:"[^"]*)*)"|' +

            // Standard fields.
            '([^"\\' + strDelimiter + '\\r\\n]*))'
          ),
          'gi'
        );

    // Get array data:
    while (arrMatches = objPattern.exec(strData)) {
      strMatchedDelimiter = arrMatches[1];

      if (
        strMatchedDelimiter.length &&
        (strMatchedDelimiter != strDelimiter)
      )
        arrData.push([]);

      if (arrMatches[2])
        strMatchedValue = arrMatches[2].replace(
          new RegExp('"', 'g'),
          '"'
        );
      else
        strMatchedValue = arrMatches[3];

      arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Get object data:
    l = arrData.length;
    firstLine = arrData[0];
    for (i = 1; i < l; i++) {
      line = arrData[i];
      objLine = {};

      k = line.length;
      for (j = 0; j < k; j++)
        objLine[firstLine[j]] = j ? +line[j].replace(/,/g, '.') : line[j];

      if (k > 1)
        objData.push(objLine);
    }

    return objData;
  }
}
