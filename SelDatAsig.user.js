// ==UserScript==
// @name         sel dat asign
// @namespace    http://tampermonkey.net/
// @version      0.1
// @icon         data:image/x-icon;base64,AAABAAEAICAEAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgAAAAACAAACAgACAAIAAgICAAMDAwAAA/wAA/wAAAP//AAAAAP8AAP//AP8A/wD///8AIiIiIiIiIiIiIiIiIiIiIiiIiIgru7u7u7u7u7u7u7IoiIiIgru7u7u7u7u7u7uyKIiIiIK7u7u7u7u7u7u7siiIiIiIK7u7u7u7u7u7u7IoiIiIiCu7u7u7u7u7u7uyKIiIiIiCu7u7u7u7u7u7siiIiIiIgru7u7u7u7u7u7IoiIiIiIgru7u7u7u7u7uyKIiIiIiIK7u7u7u7u7u7siiIiIiIiIK7u7u7u7u7u7IoiIiIiIiCu7u7u7u7u7uyKIiIiIiIiCu7u7u7u7u7siiIiIiIiIgru7u7u7u7u7IoiIiIiIiIgiIiIiIiIiIiKIiIiIiIiILd3d3d3d3d0iiIiIiIiIiILd3d3d3d3dIoiIiIiIiIiC3d3d3d3d3SIiIiIiIiIiIiIiIiIiIiIiiILd3d0t0t3d3S3S3dLdIoiC3d3dLdLd3d0t0t3S3SKIgt3d3S3S3d3dLdLd0t0iiIIiIiIiIiIiIiIiIiIiIoiCuy3dLdLd0rst0t3S3SKIgruy3S3S3Su7LdLd0t0iiIK7uy0t0tK7uy3S3dLdIoiCu7uyLdIru7st0t3S3SKIgru7uy3Su7u7IiItIiIiiIK7u7uyK7u7uyu7Iiu7IoiCu7u7u7u7u7u7u7K7uyKIgru7u7u7u7u7u7u7u7siIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D
// @description  Saber puertas de la bolsa de SEVASA
// @author       Ferrandis87
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        https://www.sevasa.org/Portal/Noray/ResultadoAsignacion.asp
// @match        http://www.sevasa.org/Portal/Noray/ResultadoAsignacion.asp
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.SUMAG {font: bold 12pt Courier New; text-align: center; color: red;}
.SUMA0 {font: bold 12pt Courier New; text-align: center; color: red;}
TH { font:12pt Verdana; background: gray; color: white; border: 2px solid #333; }
tr:nth-child(odd) { background-color: #dddddd;}
`);


$(document).ready(function(){
$('table:eq(1)').after("<br><table id='totales' border='1' cellpadding='0' cellspacing='0' width='70%'><tbody><tr><th align='center' valign='center' width='18%' nowrap=''>MANOS</th><th align='center' valign='center' width='18%' nowrap=''>CEROS(EBCT)</th></tr><tr><td id='GRUAS' align='center' valign='center' width='5%' nowrap=''></td><td id='CEROS' align='center' valign='center' width='5%' nowrap=''></td></tr></tbody></table>");
});

$("td:contains('GRUAS')").next().addClass("MANOS");
$("td:contains('ESPECIALISTA')").next().next().addClass("CEROS");
$("td:contains('CONDUCTOR 1Âª'),td:contains('CONDUCTOR 1ª')").next().next().addClass("CEROS");
$("td:contains('CONDUCTOR 2Âª'),td:contains('CONDUCTOR 2ª')").next().next().addClass("CEROS");
$("td:contains('TRINCADOR')").next().next().addClass("CEROS");

$(document).ready(function() {
var GRUAS=0;
$(".NUM.MANOS").each(function(){
GRUAS+=parseInt($(this).html()) || 0;
$('#GRUAS').html("<span class='SUMAG'>" + GRUAS + "</span>");
});
});

$(document).ready(function() {
var CEROS=0;
$(".NUM.CEROS").each(function(){
CEROS+=parseInt($(this).html()) || 0;
$('#CEROS').html("<span class='SUMA0'>" + CEROS + "</span>");
});
});

/* var totalDeuda=0;
$(".SUMA").each(function(){
	totalDeuda+=parseInt($(this).html()) || 0;
    $('#TOTAL').html("<span class='TOTAL'>" + totalDeuda + "</span>");
});
*/




