# 信息安全数学基础工具

## 最大公因数和最小公倍数

<form>
第一个数字:<br>
<input type="text" name="number01" value="" id="number1">
<br>
第二个数字:<br>
<input type="text" name="number02" value="" id="number2">
<br><br>
</form> 
<button onclick="calculator_gcd_detail_main()">点击计算最大公因数</button>
<br/>
<button onclick="calculator_lcm_main()">点击计算最小公倍数</button>
<br/>
<button onclick="calculator_Bezout_main()">点击求Bezout等式</button>
<br/>
<p id="show_gcd"></p>
<p id="show_lcm"></p>
<p id="show_Bezout"></p>

## 进制转换

输入二进制请以0b开头，使用八进制请以0开头，使用十六进制请以0x开头，使用十进制不需要前缀。

<input type="text" name="number03" value="" id="number3">
<br/>
<button onclick="calculator_base_conversion()">进制转换</button>
<br/>
<p id="show_base_conversion"></p>

## 求以二为底的对数

请输入正数。

<input type="text" name="number04" value="" id="number4">
<br/>
<button onclick="calculator_base_conversion()">进制转换</button>
<br/>
<p id="show_base_conversion"></p>