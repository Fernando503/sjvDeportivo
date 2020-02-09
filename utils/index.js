'use strict'

function hoyFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var hh = hoy.getHours();
    var min = hoy.getMinutes();
    var seg = hoy.getSeconds();

    dd = addZero(dd);
    mm = addZero(mm);
    hh = addZero(hh);
    min = addZero(min);
    seg = addZero(seg);

    return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min + ':' + seg

}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}


module.exports = {
    hoyFecha
}