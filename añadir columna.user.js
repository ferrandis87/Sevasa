// ==UserScript==
// @name         añadir columna
// @namespace    http://tampermonkey.net/
// @version      0.6
// @icon         data:image/x-icon;base64,AAABAAEAICAEAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgAAAAACAAACAgACAAIAAgICAAMDAwAAA/wAA/wAAAP//AAAAAP8AAP//AP8A/wD///8AIiIiIiIiIiIiIiIiIiIiIiiIiIgru7u7u7u7u7u7u7IoiIiIgru7u7u7u7u7u7uyKIiIiIK7u7u7u7u7u7u7siiIiIiIK7u7u7u7u7u7u7IoiIiIiCu7u7u7u7u7u7uyKIiIiIiCu7u7u7u7u7u7siiIiIiIgru7u7u7u7u7u7IoiIiIiIgru7u7u7u7u7uyKIiIiIiIK7u7u7u7u7u7siiIiIiIiIK7u7u7u7u7u7IoiIiIiIiCu7u7u7u7u7uyKIiIiIiIiCu7u7u7u7u7siiIiIiIiIgru7u7u7u7u7IoiIiIiIiIgiIiIiIiIiIiKIiIiIiIiILd3d3d3d3d0iiIiIiIiIiILd3d3d3d3dIoiIiIiIiIiC3d3d3d3d3SIiIiIiIiIiIiIiIiIiIiIiiILd3d0t0t3d3S3S3dLdIoiC3d3dLdLd3d0t0t3S3SKIgt3d3S3S3d3dLdLd0t0iiIIiIiIiIiIiIiIiIiIiIoiCuy3dLdLd0rst0t3S3SKIgruy3S3S3Su7LdLd0t0iiIK7uy0t0tK7uy3S3dLdIoiCu7uyLdIru7st0t3S3SKIgru7uy3Su7u7IiItIiIiiIK7u7uyK7u7uyu7Iiu7IoiCu7u7u7u7u7u7u7K7uyKIgru7u7u7u7u7u7u7u7siIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D
// @updateURL    https://github.com/ferrandis87/Sevasa/raw/master/a%C3%B1adir%20columna.user.js
// @description  Saber puertas de la bolsa de SEVASA
// @author       Ferrandis87
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        http://www.sevasa.org/Noray/TablonBolsa.asp
// @match        https://www.sevasa.org/Noray/TablonBolsa.asp
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      docs.google.com
// @connect      googleusercontent.com
// ==/UserScript==

GM_addStyle(`
.CENSO {font: bold 12pt Courier New; text-align: center; color: #ff2700;}
.CENSOB {font: bold 12pt Courier New; background-color: #F2FF74;}
.BOLSA {font: bold 12pt Courier New; text-align: center;}
.SUMA {font: bold 12pt Courier New; text-align: center; vertical-align: middle; color: blue;}
.SUMA2 {font: bold 12pt Courier New; text-align: center; vertical-align: middle; color: blue;}
.TOTAL {font: bold 12pt Courier New; text-align: center; color: red;}
.TOTAL2 {font: bold 12pt Courier New; text-align: center; color: red;}
TH { font:12pt Verdana; background: gray; color: white; border: 2px solid #333; }
tr:nth-child(even) { background-color: #dddddd; border: 2px solid #333;}
table tbody:last-child:after { height: 20; }
`);

// ---------- Censo: chapa -> censo (hoja publicada de Google Sheets) ----------
var CENSO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrMuapybwZUEGPR1vsP9p1_nlWvznyl0sPD4xWsNJ7HdXCj1ABY1EpU1um538HHZQyJtoAe5Niwrxq/pub?gid=841547354&single=true&output=csv';
var CACHE_KEY = 'censoChapaJSON';
var CACHE_FECHA_KEY = 'censoChapaFecha';
var CHAPAS_RESALTADAS = ['849', '824'];   // filas que se resaltaban en la versión anterior
var SIN_CENSO = 1e9;                       // filas sin censo: siempre al final al ordenar
var MIN_CHAPAS_VALIDAS = 100;              // si la descarga trae menos, no se guarda
var censoPorChapa = {};
var ordenCen = 1;                          // 1 = ascendente, -1 = descendente

// PARSER-START
// Lector de CSV que respeta campos entre comillas (incluidos saltos de línea).
function parseCSV(texto) {
  var filas = [], fila = [], campo = '', enComillas = false;
  for (var i = 0; i < texto.length; i++) {
    var c = texto.charAt(i);
    if (enComillas) {
      if (c === '"') {
        if (texto.charAt(i + 1) === '"') { campo += '"'; i++; }
        else enComillas = false;
      } else {
        campo += c;
      }
    } else if (c === '"') {
      enComillas = true;
    } else if (c === ',') {
      fila.push(campo); campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto.charAt(i + 1) === '\n') i++;
      fila.push(campo); filas.push(fila); fila = []; campo = '';
    } else {
      campo += c;
    }
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila); }
  return filas;
}

// Cada bloque de la hoja son 3 celdas: censo, chapa, disponibilidad (esta última no se usa).
function construirMapa(csvTexto) {
  var mapa = {};
  parseCSV(csvTexto.replace(/^﻿/, '')).forEach(function (fila) {
    for (var i = 0; i + 1 < fila.length; i += 3) {
      var censo = fila[i].trim(), chapa = fila[i + 1].trim();
      if (/^\d+$/.test(censo) && /^\d{3}$/.test(chapa)) {   // las chapas son de 3 cifras
        mapa[chapa] = parseInt(censo, 10);
      }
    }
  });
  return mapa;
}
// PARSER-END

function leerCache() {
  try {
    var txt = GM_getValue(CACHE_KEY, '');
    var obj = txt ? JSON.parse(txt) : null;
    return (obj && typeof obj === 'object' && Object.keys(obj).length) ? obj : null;
  } catch (e) { return null; }
}

function guardarCache(mapa) {
  try {
    GM_setValue(CACHE_KEY, JSON.stringify(mapa));
    GM_setValue(CACHE_FECHA_KEY, new Date().toISOString());
  } catch (e) { /* sin almacenamiento: se usará la descarga de esta carga */ }
}

function fechaCache() {
  try {
    var f = GM_getValue(CACHE_FECHA_KEY, '');
    return f ? new Date(f).toLocaleString('es-ES') : '';
  } catch (e) { return ''; }
}

function descargarCenso(onOk, onError) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: CENSO_URL,
    timeout: 15000,
    onload: function (r) {
      if (r.status !== 200 || !r.responseText) return onError('HTTP ' + r.status);
      var mapa = construirMapa(r.responseText);
      if (Object.keys(mapa).length < MIN_CHAPAS_VALIDAS) return onError('respuesta no válida');
      onOk(mapa);
    },
    onerror: function () { onError('sin conexión'); },
    ontimeout: function () { onError('tiempo agotado'); }
  });
}

function mostrarEstado(texto) {
  $('#censoEstado').text(texto);
}

// ---------- Tabla: columna CEN y orden ----------
function ordenarPorCen() {
  var $tbody = $('table:eq(1)').find('tbody').first();
  var filas = $('table:eq(1)').find('tbody > tr:has(td)').get();
  filas.sort(function (a, b) {
    var x = $(a).children('td.CENCELL').data('censo') || SIN_CENSO;
    var y = $(b).children('td.CENCELL').data('censo') || SIN_CENSO;
    if (x === y) return 0;
    if (x === SIN_CENSO) return 1;
    if (y === SIN_CENSO) return -1;
    return (x - y) * ordenCen;
  });
  $.each(filas, function (i, fila) { $tbody.append(fila); });
}

// Se puede llamar varias veces: quita lo anterior y vuelve a pintar con el censo actual.
function pintarTodo() {
  var $tabla = $('table:eq(1)');
  $tabla.find('.CENSOB').removeClass('CENSOB');
  $tabla.find('td.CENCELL').remove();
  $('th.CENHEAD').remove();

  $('th:eq(1)').before('<th class="CENHEAD" align="left" valign="center" width="25%" nowrap="" style="cursor:pointer" title="Pulsa para ordenar">&nbsp;CEN&nbsp;</th>');

  $tabla.find('tbody > tr:has(td)').each(function () {
    var $bolsa = $(this).find('.BOLSA').first();
    if (!$bolsa.length || $bolsa.prop('tagName') !== 'TD') return;
    var chapa = $bolsa.text().replace(/\s/g, '');
    var censo = censoPorChapa[chapa];
    var $celda = $('<td class="CENCELL" align="center" nowrap=""></td>')
      .append($('<span class="CENSO"></span>').text(censo ? String(censo).padStart(3, '0') : ''));
    $celda.data('censo', censo || SIN_CENSO);
    $bolsa.before($celda);
    if (CHAPAS_RESALTADAS.indexOf(chapa) !== -1) $(this).children().addClass('CENSOB');
  });

  ordenarPorCen();
}

$(document).ready(function () {
  $('table:eq(1)').before('<div id="censoEstado" style="font:10pt Verdana;margin:4px 0;"></div>');
  $(document).on('click', 'th.CENHEAD', function () { ordenCen = -ordenCen; ordenarPorCen(); });

  // 1) Pintar al instante con lo guardado; 2) actualizar desde la hoja en segundo plano.
  var cache = leerCache();
  censoPorChapa = cache || {};
  pintarTodo();
  mostrarEstado(cache
    ? 'Censo guardado del ' + fechaCache() + ' · comprobando actualización...'
    : 'Censo: descargando por primera vez...');

  descargarCenso(function (mapa) {
    censoPorChapa = mapa;
    guardarCache(mapa);
    pintarTodo();
    mostrarEstado('Censo actualizado ' + new Date().toLocaleString('es-ES') + ' (' + Object.keys(mapa).length + ' chapas)');
  }, function (motivo) {
    mostrarEstado(cache
      ? 'Censo guardado del ' + fechaCache() + ' (no se pudo actualizar: ' + motivo + ')'
      : 'Sin censo: no se pudo descargar (' + motivo + ')');
  });
});

$(document).ready(function(){
$('table:eq(1)').after("<br><br><table id='totales' border='1' cellpadding='0' cellspacing='0' width='67%'><tbody><tr><th align='center' valign='center' width='18%' nowrap=''>ESPECIALISTA</th><th align='center' valign='center' width='18%' nowrap=''>CONDUCTOR 1ª</th><th align='center' valign='center' width='18%' nowrap=''>CONDUCTOR 2ª</th><th align='center' valign='center' width='18%' nowrap=''>TRINCA COCHES</th><th align='center' valign='center' width='18%' nowrap=''>TRINCADOR</th><th align='center' valign='center' width='18%' nowrap=''>TOTAL</th></tr><tr><td id='ESPECIALISTA' align='center' valign='center' width='5%' nowrap=''></td><td id='C1' align='center' valign='center' width='5%' nowrap=''><td id='C2' align='center' valign='center' width='5%' nowrap=''><td id='TC2' align='center' valign='center' width='5%' nowrap=''><td id='T' align='center' valign='center' width='5%' nowrap=''><td id='TOTAL' align='center' valign='center' width='5%' nowrap=''></tr></tbody></table>");
});

$(document).ready(function() {
$('#ESPECIALISTA').html("<span class='SUMA'>" + $(".DATOS:contains('ESPECIALISTA')").length + "</span>");
$('#C1').html("<span class='SUMA'>" + $(".DATOS:contains('CONDUCTOR 1ª'),.DATOS:contains('CONDUCTOR 1Âª')").length + "</span>");
$('#C2').html("<span class='SUMA'>" + $(".DATOS:contains('CONDUCTOR 2ª'),.DATOS:contains('CONDUCTOR 2Âª')").length + "</span>");
$('#TC2').html("<span class='SUMA'>" + $(".DATOS:contains('TRINCA COCHES')").length + "</span>");
$('#T').html("<span class='SUMA'>" + $(".DATOS:contains('TRINCADOR')").length + "</span>");

var totalDeuda=0;
$(".SUMA").each(function(){
	totalDeuda+=parseInt($(this).html()) || 0;
    $('#TOTAL').html("<span class='TOTAL'>" + totalDeuda + "</span>");
});
});

