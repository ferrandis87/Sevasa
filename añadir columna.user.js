// ==UserScript==
// @name         añadir columna
// @namespace    http://tampermonkey.net/
// @version      0.3
// @icon         data:image/x-icon;base64,AAABAAEAICAEAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgAAAAACAAACAgACAAIAAgICAAMDAwAAA/wAA/wAAAP//AAAAAP8AAP//AP8A/wD///8AIiIiIiIiIiIiIiIiIiIiIiiIiIgru7u7u7u7u7u7u7IoiIiIgru7u7u7u7u7u7uyKIiIiIK7u7u7u7u7u7u7siiIiIiIK7u7u7u7u7u7u7IoiIiIiCu7u7u7u7u7u7uyKIiIiIiCu7u7u7u7u7u7siiIiIiIgru7u7u7u7u7u7IoiIiIiIgru7u7u7u7u7uyKIiIiIiIK7u7u7u7u7u7siiIiIiIiIK7u7u7u7u7u7IoiIiIiIiCu7u7u7u7u7uyKIiIiIiIiCu7u7u7u7u7siiIiIiIiIgru7u7u7u7u7IoiIiIiIiIgiIiIiIiIiIiKIiIiIiIiILd3d3d3d3d0iiIiIiIiIiILd3d3d3d3dIoiIiIiIiIiC3d3d3d3d3SIiIiIiIiIiIiIiIiIiIiIiiILd3d0t0t3d3S3S3dLdIoiC3d3dLdLd3d0t0t3S3SKIgt3d3S3S3d3dLdLd0t0iiIIiIiIiIiIiIiIiIiIiIoiCuy3dLdLd0rst0t3S3SKIgruy3S3S3Su7LdLd0t0iiIK7uy0t0tK7uy3S3dLdIoiCu7uyLdIru7st0t3S3SKIgru7uy3Su7u7IiItIiIiiIK7u7uyK7u7uyu7Iiu7IoiCu7u7u7u7u7u7u7K7uyKIgru7u7u7u7u7u7u7u7siIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D
// @description  Saber puertas de la bolsa de SEVASA
// @author       Ferrandis87
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        http://www.sevasa.org/Noray/TablonBolsa.asp
// @match        https://www.sevasa.org/Noray/TablonBolsa.asp
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.CENSOB {font: bold 12pt Courier New; text-align: center; color: #ff2700; background-color: #DDFF33;}
.CENSO {font: bold 12pt Courier New; text-align: center; color: #ff2700;}
.BOLSA {font: bold 12pt Courier New; text-align: center;}
.SUMA {font: bold 12pt Courier New; text-align: center; vertical-align: middle; color: blue;}
.SUMA2 {font: bold 12pt Courier New; text-align: center; vertical-align: middle; color: blue;}
.TOTAL {font: bold 12pt Courier New; text-align: center; color: red;}
.TOTAL2 {font: bold 12pt Courier New; text-align: center; color: red;}
TH { font:12pt Verdana; background: gray; color: white; border: 2px solid #333; }
tr:nth-child(even) { background-color: #dddddd; border: 2px solid #333;}
table tbody:last-child:after { height: 20; }
`);

$(document).ready(function() {
        $('th:eq(1)').each(function(col) {
        $(this).addClass('asc1');
        sortOrder = 1;

      var arrData = $('table:eq(1)').find('tbody > tr:has(td)').get();
      arrData.sort(function(a, b) {
        var val1 = $(a).children('td:eq(1)').eq(col).text().toUpperCase();
        var val2 = $(b).children('td:eq(1)').eq(col).text().toUpperCase();
        if($.isNumeric(val1) && $.isNumeric(val2))
        return sortOrder == 1 ? val1-val2 : val2-val1;
        else
           return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
      });
      $.each(arrData, function(index, row) {
        $('table:eq(1)').append(row);
    });
  });
});

$('th:eq(1)').before('<th align="left" valign="center" width="25%" nowrap="">&nbsp;CEN&nbsp;</th>');
$('table:eq(1)').each(function () {
$(this).find(".BOLSA:contains('491')").before('<td align="center" nowrap=""><span class="CENSO">001</span></td>');
$(this).find(".BOLSA:contains('255')").before('<td align="center" nowrap=""><span class="CENSO">002</span></td>');
$(this).find(".BOLSA:contains('551')").before('<td align="center" nowrap=""><span class="CENSO">003</span></td>');
$(this).find(".BOLSA:contains('702')").before('<td align="center" nowrap=""><span class="CENSO">004</span></td>');
$(this).find(".BOLSA:contains('600')").before('<td align="center" nowrap=""><span class="CENSO">005</span></td>');
$(this).find(".BOLSA:contains('703')").before('<td align="center" nowrap=""><span class="CENSO">006</span></td>');
$(this).find(".BOLSA:contains('705')").before('<td align="center" nowrap=""><span class="CENSO">007</span></td>');
$(this).find(".BOLSA:contains('711')").before('<td align="center" nowrap=""><span class="CENSO">008</span></td>');
$(this).find(".BOLSA:contains('715')").before('<td align="center" nowrap=""><span class="CENSO">009</span></td>');
$(this).find(".BOLSA:contains('713')").before('<td align="center" nowrap=""><span class="CENSO">010</span></td>');
$(this).find(".BOLSA:contains('563')").before('<td align="center" nowrap=""><span class="CENSO">011</span></td>');
$(this).find(".BOLSA:contains('731')").before('<td align="center" nowrap=""><span class="CENSO">012</span></td>');
$(this).find(".BOLSA:contains('714')").before('<td align="center" nowrap=""><span class="CENSO">013</span></td>');
$(this).find(".BOLSA:contains('918')").before('<td align="center" nowrap=""><span class="CENSO">014</span></td>');
$(this).find(".BOLSA:contains('484')").before('<td align="center" nowrap=""><span class="CENSO">015</span></td>');
$(this).find(".BOLSA:contains('486')").before('<td align="center" nowrap=""><span class="CENSO">016</span></td>');
$(this).find(".BOLSA:contains('373')").before('<td align="center" nowrap=""><span class="CENSO">017</span></td>');
$(this).find(".BOLSA:contains('709')").before('<td align="center" nowrap=""><span class="CENSO">018</span></td>');
$(this).find(".BOLSA:contains('469')").before('<td align="center" nowrap=""><span class="CENSO">019</span></td>');
$(this).find(".BOLSA:contains('133')").before('<td align="center" nowrap=""><span class="CENSO">020</span></td>');
$(this).find(".BOLSA:contains('262')").before('<td align="center" nowrap=""><span class="CENSO">021</span></td>');
$(this).find(".BOLSA:contains('134')").before('<td align="center" nowrap=""><span class="CENSO">022</span></td>');
$(this).find(".BOLSA:contains('512')").before('<td align="center" nowrap=""><span class="CENSO">023</span></td>');
$(this).find(".BOLSA:contains('716')").before('<td align="center" nowrap=""><span class="CENSO">024</span></td>');
$(this).find(".BOLSA:contains('719')").before('<td align="center" nowrap=""><span class="CENSO">025</span></td>');
$(this).find(".BOLSA:contains('407')").before('<td align="center" nowrap=""><span class="CENSO">026</span></td>');
$(this).find(".BOLSA:contains('106')").before('<td align="center" nowrap=""><span class="CENSO">027</span></td>');
$(this).find(".BOLSA:contains('718')").before('<td align="center" nowrap=""><span class="CENSO">028</span></td>');
$(this).find(".BOLSA:contains('722')").before('<td align="center" nowrap=""><span class="CENSO">029</span></td>');
$(this).find(".BOLSA:contains('755')").before('<td align="center" nowrap=""><span class="CENSO">030</span></td>');
$(this).find(".BOLSA:contains('725')").before('<td align="center" nowrap=""><span class="CENSO">031</span></td>');
$(this).find(".BOLSA:contains('743')").before('<td align="center" nowrap=""><span class="CENSO">032</span></td>');
$(this).find(".BOLSA:contains('957')").before('<td align="center" nowrap=""><span class="CENSO">033</span></td>');
$(this).find(".BOLSA:contains('533')").before('<td align="center" nowrap=""><span class="CENSO">034</span></td>');
$(this).find(".BOLSA:contains('537')").before('<td align="center" nowrap=""><span class="CENSO">035</span></td>');
$(this).find(".BOLSA:contains('979')").before('<td align="center" nowrap=""><span class="CENSO">036</span></td>');
$(this).find(".BOLSA:contains('534')").before('<td align="center" nowrap=""><span class="CENSO">037</span></td>');
$(this).find(".BOLSA:contains('531')").before('<td align="center" nowrap=""><span class="CENSO">038</span></td>');
$(this).find(".BOLSA:contains('969')").before('<td align="center" nowrap=""><span class="CENSO">039</span></td>');
$(this).find(".BOLSA:contains('530')").before('<td align="center" nowrap=""><span class="CENSO">040</span></td>');
$(this).find(".BOLSA:contains('536')").before('<td align="center" nowrap=""><span class="CENSO">041</span></td>');
$(this).find(".BOLSA:contains('989')").before('<td align="center" nowrap=""><span class="CENSO">042</span></td>');
$(this).find(".BOLSA:contains('417')").before('<td align="center" nowrap=""><span class="CENSO">043</span></td>');
$(this).find(".BOLSA:contains('708')").before('<td align="center" nowrap=""><span class="CENSO">044</span></td>');
$(this).find(".BOLSA:contains('977')").before('<td align="center" nowrap=""><span class="CENSO">045</span></td>');
$(this).find(".BOLSA:contains('353')").before('<td align="center" nowrap=""><span class="CENSO">046</span></td>');
$(this).find(".BOLSA:contains('109')").before('<td align="center" nowrap=""><span class="CENSO">047</span></td>');
$(this).find(".BOLSA:contains('398')").before('<td align="center" nowrap=""><span class="CENSO">048</span></td>');
$(this).find(".BOLSA:contains('466')").before('<td align="center" nowrap=""><span class="CENSO">049</span></td>');
$(this).find(".BOLSA:contains('468')").before('<td align="center" nowrap=""><span class="CENSO">050</span></td>');
$(this).find(".BOLSA:contains('211')").before('<td align="center" nowrap=""><span class="CENSO">051</span></td>');
$(this).find(".BOLSA:contains('253')").before('<td align="center" nowrap=""><span class="CENSO">052</span></td>');
$(this).find(".BOLSA:contains('358')").before('<td align="center" nowrap=""><span class="CENSO">053</span></td>');
$(this).find(".BOLSA:contains('400')").before('<td align="center" nowrap=""><span class="CENSO">054</span></td>');
$(this).find(".BOLSA:contains('399')").before('<td align="center" nowrap=""><span class="CENSO">055</span></td>');
$(this).find(".BOLSA:contains('355')").before('<td align="center" nowrap=""><span class="CENSO">056</span></td>');
$(this).find(".BOLSA:contains('967')").before('<td align="center" nowrap=""><span class="CENSO">057</span></td>');
$(this).find(".BOLSA:contains('968')").before('<td align="center" nowrap=""><span class="CENSO">058</span></td>');
$(this).find(".BOLSA:contains('728')").before('<td align="center" nowrap=""><span class="CENSO">059</span></td>');
$(this).find(".BOLSA:contains('756')").before('<td align="center" nowrap=""><span class="CENSO">060</span></td>');
$(this).find(".BOLSA:contains('733')").before('<td align="center" nowrap=""><span class="CENSO">061</span></td>');
$(this).find(".BOLSA:contains('954')").before('<td align="center" nowrap=""><span class="CENSO">062</span></td>');
$(this).find(".BOLSA:contains('737')").before('<td align="center" nowrap=""><span class="CENSO">063</span></td>');
$(this).find(".BOLSA:contains('736')").before('<td align="center" nowrap=""><span class="CENSO">064</span></td>');
$(this).find(".BOLSA:contains('723')").before('<td align="center" nowrap=""><span class="CENSO">065</span></td>');
$(this).find(".BOLSA:contains('720')").before('<td align="center" nowrap=""><span class="CENSO">066</span></td>');
$(this).find(".BOLSA:contains('739')").before('<td align="center" nowrap=""><span class="CENSO">067</span></td>');
$(this).find(".BOLSA:contains('724')").before('<td align="center" nowrap=""><span class="CENSO">068</span></td>');
$(this).find(".BOLSA:contains('730')").before('<td align="center" nowrap=""><span class="CENSO">069</span></td>');
$(this).find(".BOLSA:contains('932')").before('<td align="center" nowrap=""><span class="CENSO">070</span></td>');
$(this).find(".BOLSA:contains('818')").before('<td align="center" nowrap=""><span class="CENSO">071</span></td>');
$(this).find(".BOLSA:contains('757')").before('<td align="center" nowrap=""><span class="CENSO">072</span></td>');
$(this).find(".BOLSA:contains('128')").before('<td align="center" nowrap=""><span class="CENSO">073</span></td>');
$(this).find(".BOLSA:contains('740')").before('<td align="center" nowrap=""><span class="CENSO">074</span></td>');
$(this).find(".BOLSA:contains('618')").before('<td align="center" nowrap=""><span class="CENSO">075</span></td>');
$(this).find(".BOLSA:contains('742')").before('<td align="center" nowrap=""><span class="CENSO">076</span></td>');
$(this).find(".BOLSA:contains('247')").before('<td align="center" nowrap=""><span class="CENSO">077</span></td>');
$(this).find(".BOLSA:contains('281')").before('<td align="center" nowrap=""><span class="CENSO">078</span></td>');
$(this).find(".BOLSA:contains('625')").before('<td align="center" nowrap=""><span class="CENSO">079</span></td>');
$(this).find(".BOLSA:contains('543')").before('<td align="center" nowrap=""><span class="CENSO">080</span></td>');
$(this).find(".BOLSA:contains('738')").before('<td align="center" nowrap=""><span class="CENSO">081</span></td>');
$(this).find(".BOLSA:contains('761')").before('<td align="center" nowrap=""><span class="CENSO">082</span></td>');
$(this).find(".BOLSA:contains('749')").before('<td align="center" nowrap=""><span class="CENSO">083</span></td>');
$(this).find(".BOLSA:contains('922')").before('<td align="center" nowrap=""><span class="CENSO">084</span></td>');
$(this).find(".BOLSA:contains('706')").before('<td align="center" nowrap=""><span class="CENSO">085</span></td>');
$(this).find(".BOLSA:contains('893')").before('<td align="center" nowrap=""><span class="CENSO">086</span></td>');
$(this).find(".BOLSA:contains('712')").before('<td align="center" nowrap=""><span class="CENSO">087</span></td>');
$(this).find(".BOLSA:contains('704')").before('<td align="center" nowrap=""><span class="CENSO">088</span></td>');
$(this).find(".BOLSA:contains('771')").before('<td align="center" nowrap=""><span class="CENSO">089</span></td>');
$(this).find(".BOLSA:contains('492')").before('<td align="center" nowrap=""><span class="CENSO">090</span></td>');
$(this).find(".BOLSA:contains('803')").before('<td align="center" nowrap=""><span class="CENSO">091</span></td>');
$(this).find(".BOLSA:contains('746')").before('<td align="center" nowrap=""><span class="CENSO">092</span></td>');
$(this).find(".BOLSA:contains('747')").before('<td align="center" nowrap=""><span class="CENSO">093</span></td>');
$(this).find(".BOLSA:contains('751')").before('<td align="center" nowrap=""><span class="CENSO">094</span></td>');
$(this).find(".BOLSA:contains('794')").before('<td align="center" nowrap=""><span class="CENSO">095</span></td>');
$(this).find(".BOLSA:contains('763')").before('<td align="center" nowrap=""><span class="CENSO">096</span></td>');
$(this).find(".BOLSA:contains('727')").before('<td align="center" nowrap=""><span class="CENSO">097</span></td>');
$(this).find(".BOLSA:contains('734')").before('<td align="center" nowrap=""><span class="CENSO">098</span></td>');
$(this).find(".BOLSA:contains('775')").before('<td align="center" nowrap=""><span class="CENSO">099</span></td>');
$(this).find(".BOLSA:contains('744')").before('<td align="center" nowrap=""><span class="CENSO">100</span></td>');
$(this).find(".BOLSA:contains('748')").before('<td align="center" nowrap=""><span class="CENSO">101</span></td>');
$(this).find(".BOLSA:contains('884')").before('<td align="center" nowrap=""><span class="CENSO">102</span></td>');
$(this).find(".BOLSA:contains('935')").before('<td align="center" nowrap=""><span class="CENSO">103</span></td>');
$(this).find(".BOLSA:contains('760')").before('<td align="center" nowrap=""><span class="CENSO">104</span></td>');
$(this).find(".BOLSA:contains('804')").before('<td align="center" nowrap=""><span class="CENSO">105</span></td>');
$(this).find(".BOLSA:contains('966')").before('<td align="center" nowrap=""><span class="CENSO">106</span></td>');
$(this).find(".BOLSA:contains('988')").before('<td align="center" nowrap=""><span class="CENSO">107</span></td>');
$(this).find(".BOLSA:contains('788')").before('<td align="center" nowrap=""><span class="CENSO">108</span></td>');
$(this).find(".BOLSA:contains('829')").before('<td align="center" nowrap=""><span class="CENSO">109</span></td>');
$(this).find(".BOLSA:contains('984')").before('<td align="center" nowrap=""><span class="CENSO">110</span></td>');
$(this).find(".BOLSA:contains('758')").before('<td align="center" nowrap=""><span class="CENSO">111</span></td>');
$(this).find(".BOLSA:contains('745')").before('<td align="center" nowrap=""><span class="CENSO">112</span></td>');
$(this).find(".BOLSA:contains('615')").before('<td align="center" nowrap=""><span class="CENSO">113</span></td>');
$(this).find(".BOLSA:contains('356')").before('<td align="center" nowrap=""><span class="CENSO">114</span></td>');
$(this).find(".BOLSA:contains('230')").before('<td align="center" nowrap=""><span class="CENSO">115</span></td>');
$(this).find(".BOLSA:contains('797')").before('<td align="center" nowrap=""><span class="CENSO">116</span></td>');
$(this).find(".BOLSA:contains('762')").before('<td align="center" nowrap=""><span class="CENSO">117</span></td>');
$(this).find(".BOLSA:contains('764')").before('<td align="center" nowrap=""><span class="CENSO">118</span></td>');
$(this).find(".BOLSA:contains('765')").before('<td align="center" nowrap=""><span class="CENSO">119</span></td>');
$(this).find(".BOLSA:contains('552')").before('<td align="center" nowrap=""><span class="CENSO">120</span></td>');
$(this).find(".BOLSA:contains('990')").before('<td align="center" nowrap=""><span class="CENSO">121</span></td>');
$(this).find(".BOLSA:contains('261')").before('<td align="center" nowrap=""><span class="CENSO">122</span></td>');
$(this).find(".BOLSA:contains('359')").before('<td align="center" nowrap=""><span class="CENSO">123</span></td>');
$(this).find(".BOLSA:contains('360')").before('<td align="center" nowrap=""><span class="CENSO">124</span></td>');
$(this).find(".BOLSA:contains('127')").before('<td align="center" nowrap=""><span class="CENSO">125</span></td>');
$(this).find(".BOLSA:contains('362')").before('<td align="center" nowrap=""><span class="CENSO">126</span></td>');
$(this).find(".BOLSA:contains('368')").before('<td align="center" nowrap=""><span class="CENSO">127</span></td>');
$(this).find(".BOLSA:contains('363')").before('<td align="center" nowrap=""><span class="CENSO">128</span></td>');
$(this).find(".BOLSA:contains('628')").before('<td align="center" nowrap=""><span class="CENSO">129</span></td>');
$(this).find(".BOLSA:contains('772')").before('<td align="center" nowrap=""><span class="CENSO">130</span></td>');
$(this).find(".BOLSA:contains('567')").before('<td align="center" nowrap=""><span class="CENSO">131</span></td>');
$(this).find(".BOLSA:contains('776')").before('<td align="center" nowrap=""><span class="CENSO">132</span></td>');
$(this).find(".BOLSA:contains('630')").before('<td align="center" nowrap=""><span class="CENSO">133</span></td>');
$(this).find(".BOLSA:contains('955')").before('<td align="center" nowrap=""><span class="CENSO">134</span></td>');
$(this).find(".BOLSA:contains('766')").before('<td align="center" nowrap=""><span class="CENSO">135</span></td>');
$(this).find(".BOLSA:contains('774')").before('<td align="center" nowrap=""><span class="CENSO">136</span></td>');
$(this).find(".BOLSA:contains('259')").before('<td align="center" nowrap=""><span class="CENSO">137</span></td>');
$(this).find(".BOLSA:contains('975')").before('<td align="center" nowrap=""><span class="CENSO">138</span></td>');
$(this).find(".BOLSA:contains('778')").before('<td align="center" nowrap=""><span class="CENSO">139</span></td>');
$(this).find(".BOLSA:contains('752')").before('<td align="center" nowrap=""><span class="CENSO">140</span></td>');
$(this).find(".BOLSA:contains('789')").before('<td align="center" nowrap=""><span class="CENSO">141</span></td>');
$(this).find(".BOLSA:contains('132')").before('<td align="center" nowrap=""><span class="CENSO">142</span></td>');
$(this).find(".BOLSA:contains('972')").before('<td align="center" nowrap=""><span class="CENSO">143</span></td>');
$(this).find(".BOLSA:contains('135')").before('<td align="center" nowrap=""><span class="CENSO">144</span></td>');
$(this).find(".BOLSA:contains('129')").before('<td align="center" nowrap=""><span class="CENSO">145</span></td>');
$(this).find(".BOLSA:contains('378')").before('<td align="center" nowrap=""><span class="CENSO">146</span></td>');
$(this).find(".BOLSA:contains('790')").before('<td align="center" nowrap=""><span class="CENSO">147</span></td>');
$(this).find(".BOLSA:contains('782')").before('<td align="center" nowrap=""><span class="CENSO">148</span></td>');
$(this).find(".BOLSA:contains('949')").before('<td align="center" nowrap=""><span class="CENSO">149</span></td>');
$(this).find(".BOLSA:contains('791')").before('<td align="center" nowrap=""><span class="CENSO">150</span></td>');
$(this).find(".BOLSA:contains('544')").before('<td align="center" nowrap=""><span class="CENSO">151</span></td>');
$(this).find(".BOLSA:contains('793')").before('<td align="center" nowrap=""><span class="CENSO">152</span></td>');
$(this).find(".BOLSA:contains('785')").before('<td align="center" nowrap=""><span class="CENSO">153</span></td>');
$(this).find(".BOLSA:contains('930')").before('<td align="center" nowrap=""><span class="CENSO">154</span></td>');
$(this).find(".BOLSA:contains('934')").before('<td align="center" nowrap=""><span class="CENSO">155</span></td>');
$(this).find(".BOLSA:contains('802')").before('<td align="center" nowrap=""><span class="CENSO">156</span></td>');
$(this).find(".BOLSA:contains('805')").before('<td align="center" nowrap=""><span class="CENSO">157</span></td>');
$(this).find(".BOLSA:contains('560')").before('<td align="center" nowrap=""><span class="CENSO">158</span></td>');
$(this).find(".BOLSA:contains('787')").before('<td align="center" nowrap=""><span class="CENSO">159</span></td>');
$(this).find(".BOLSA:contains('384')").before('<td align="center" nowrap=""><span class="CENSO">160</span></td>');
$(this).find(".BOLSA:contains('385')").before('<td align="center" nowrap=""><span class="CENSO">161</span></td>');
$(this).find(".BOLSA:contains('266')").before('<td align="center" nowrap=""><span class="CENSO">162</span></td>');
$(this).find(".BOLSA:contains('139')").before('<td align="center" nowrap=""><span class="CENSO">163</span></td>');
$(this).find(".BOLSA:contains('379')").before('<td align="center" nowrap=""><span class="CENSO">164</span></td>');
$(this).find(".BOLSA:contains('759')").before('<td align="center" nowrap=""><span class="CENSO">165</span></td>');
$(this).find(".BOLSA:contains('413')").before('<td align="center" nowrap=""><span class="CENSO">166</span></td>');
$(this).find(".BOLSA:contains('383')").before('<td align="center" nowrap=""><span class="CENSO">167</span></td>');
$(this).find(".BOLSA:contains('142')").before('<td align="center" nowrap=""><span class="CENSO">168</span></td>');
$(this).find(".BOLSA:contains('800')").before('<td align="center" nowrap=""><span class="CENSO">169</span></td>');
$(this).find(".BOLSA:contains('386')").before('<td align="center" nowrap=""><span class="CENSO">170</span></td>');
$(this).find(".BOLSA:contains('798')").before('<td align="center" nowrap=""><span class="CENSO">171</span></td>');
$(this).find(".BOLSA:contains('741')").before('<td align="center" nowrap=""><span class="CENSO">172</span></td>');
$(this).find(".BOLSA:contains('125')").before('<td align="center" nowrap=""><span class="CENSO">173</span></td>');
$(this).find(".BOLSA:contains('126')").before('<td align="center" nowrap=""><span class="CENSO">174</span></td>');
$(this).find(".BOLSA:contains('104')").before('<td align="center" nowrap=""><span class="CENSO">175</span></td>');
$(this).find(".BOLSA:contains('973')").before('<td align="center" nowrap=""><span class="CENSO">176</span></td>');
$(this).find(".BOLSA:contains('101')").before('<td align="center" nowrap=""><span class="CENSO">177</span></td>');
$(this).find(".BOLSA:contains('349')").before('<td align="center" nowrap=""><span class="CENSO">178</span></td>');
