function setRadars(config, keys, locale) {
  'use strict';

  var _data,
      _max,
      _doms = {},
      _config = config,
      _maxes = {},
      _radars = {},
      _size = 200,
      _radius = 98,
      _minRadius = 10,
      _structureSize = _radius * 2,
      _color = _config.color || '#329975',
      _strokeColor = '#999',
      _profiles = _config.container,
      _keys = keys,
      _locale = locale,
      _structurePath = _keys.map(function(key, i) {
        var angle = Math.PI * 2 * i / _keys.length;

        return [
          'M',
          0.5 + _size / 2,
          0.5 + _size / 2,
          'L',
          0.5 + _size / 2 + _structureSize / 2 * Math.cos(angle),
          0.5 + _size / 2 + _structureSize / 2 * Math.sin(angle)
        ].join(' ');
      }).concat([
        'M',
        0.5 + _size / 2 + _radius,
        0.5 + _size / 2,
        'A',
        _radius,
        _radius,
        Math.PI * 2,
        1,
        1,
        0.5 + _size / 2 - _radius,
        0.5 + _size / 2,
        'A',
        _radius,
        _radius,
        Math.PI * 2,
        1,
        1,
        0.5 + _size / 2 + _radius,
        0.5 + _size / 2
      ]).join(' '),
      _overStructurePath = [
        'M',
        0.5 + _size / 2 + _minRadius,
        0.5 + _size / 2,
        'A',
        _minRadius,
        _minRadius,
        Math.PI * 2,
        1,
        1,
        0.5 + _size / 2 - _minRadius,
        0.5 + _size / 2,
        'A',
        _minRadius,
        _minRadius,
        Math.PI * 2,
        1,
        1,
        0.5 + _size / 2 + _minRadius,
        0.5 + _size / 2
      ].join(' '),
      _caption = '<div class="caption">' +
        _keys.map(function(key, i) {
          var w = 160,
              h = 20,
              mX = 4,
              mY = 8,
              pos,
              angle = Math.PI * 2 * i / _keys.length,
              klass = (angle % (Math.PI)) === Math.PI / 2 ?
                'center' :
                (angle < Math.PI / 2 || angle > 3 * Math.PI / 2) ?
                'right' :
                'left';

          switch (klass) {
            case 'center':
              pos =
                'left: ' + (
                  _size / 2 + Math.cos(angle) * (_radius + mX) - w / 2
                ) + 'px;' +
                'top: ' + (
                  _size / 2 + Math.sin(angle) * (_radius) - (angle === Math.PI / 2 ? 0 : h)
                ) + 'px;';
              break;
            case 'right':
              pos =
                'left: ' + (
                  _size / 2 + Math.cos(angle) * (_radius + mX)
                ) + 'px;' +
                'top: ' + (
                  _size / 2 + Math.sin(angle) * (_radius + mY) - h / 2
                ) + 'px;';
              break;
            case 'left':
              pos =
                'right: ' + (
                  _size / 2 - Math.cos(angle) * (_radius + mX)
                ) + 'px;' +
                'top: ' + (
                  _size / 2 + Math.sin(angle) * (_radius + mY) - h / 2
                ) + 'px;';
              break;
          }

          return (
            '<div class="caption-value ' + klass + '" ' +
                 'style="' + pos + '">' + _locale[key] + '</div>'
          );
        }).join('') + '</div>',
      _template =
        '<div class="country">' +
          '<div class="label"></div>' +
          '<div class="radar"></div>' +
        '</div>';

  $.ajax({
    url: _config.path,
    dataType: 'text',
    success: function(raw) {
      _data = parseCSV(raw);

      // Identify maxes:
      var k,
          i,
          line,
          l = _data.length;

      for (i = 0; i < l; i++) {
        line = _data[i];
        for (k in line) {
          _maxes[k] = (k in _maxes) ?
            Math.max(_maxes[k], line[k]) :
            line[k];
          _max = (typeof line[k] !== 'number' || isNaN(line[k])) ?
            _max :
            _max !== undefined ?
            Math.max(_max, line[k]) :
            line[k];
        }
      }

      // Generate DOM:
      for (i = 0; i < l; i++)
        fillCountry(_data[i][_config.countryKey], _data[i]);
    }
  });

  function fillCountry(label, data) {
    var i,
        l = _keys.length,
        path,
        key,
        size,
        dom,
        newDom;

    if (!$('div[id="' + label + '"]').length) {
      newDom = true;
      dom = $(_template).appendTo(_profiles);

      $('div.radar', dom).append(_caption);
      $('div.label', dom).text(label);
      dom.attr('id', label);
    } else {
      newDom = false;
      dom = $('div[id="' + label + '"]');
    }

    _radars[label] = {
      raphael: new Raphael(
        $('div.radar', dom)[0],
        _size,
        _size
      )
    };

    // Set path:
    path = _keys.concat([
      _keys[0]
    ]).map(function(key, i) {
      // var value = Math.log((data[key] || 0) + 1) / Math.log(_max + 1) * (_radius - _minRadius) + _minRadius,
      var value = (data[key] || 0) / _max * (_radius - _minRadius) + _minRadius,
          angle = Math.PI * 2 * i / _keys.length;
      return [
        i ? 'L' : 'M',
        0.5 + _size / 2 + value * Math.cos(angle),
        0.5 + _size / 2 + value * Math.sin(angle),
      ].join(' ');
    }).join(' ');

    if (newDom) {
      _radars[label].struct = _radars[label].raphael.path(_structurePath);
      _radars[label].struct.attr({
        stroke: _strokeColor,
        'stroke-width': 0.5
      });
    }

    _radars[label].chart = _radars[label].raphael.path(path);
    $(_radars[label].chart.node).addClass('chart');
    _radars[label].chart.attr({
      fill: _color,
      'stroke-width': 0
    });

    if (newDom) {
      _radars[label].struct = _radars[label].raphael.path(_overStructurePath);
      _radars[label].struct.attr({
        stroke: _strokeColor,
        fill: '#fff',
        'stroke-width': 0.5
      });
    }

    return dom;
  }

  function printNumber(n) {
    var s = n < 0 ? '-' : '',
        i = parseInt(n = Math.abs(+n || 0).toFixed(2)) + '',
        j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + ',' : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
      (2 ? '.' + Math.abs(n - i).toFixed(2).slice(2) : '')
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
        country,
        firstLine,
        objData = [],
        objDataIndex = {},
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
      country = line[0];

      if (line.length <= 1)
        continue;

      if (!objDataIndex[country]) {
        objDataIndex[country] = {
          Country: country
        };
        objLine = objDataIndex[country];
        objData.push(objDataIndex[country]);
      } else
        objLine = objDataIndex[country];

      objLine[line[_config.catIndex]] =
        (objLine[line[_config.catIndex]] || 0) + +line[_config.moneyIndex].replace(/,/g, '.');
    }

    return objData;
  }
}
