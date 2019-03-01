/*The calculator js file for AZgeek  by Hell05(Bonlin0)
 *
 */

function calculator_gcd(number1, number2) {
    var a = Math.max(number1, number2);
    var b = Math.min(number1, number2);
    if (number1 <= 0 || number2 <= 0)
        return 0;
    var c = a % b;
    while (c != 0) {
        a = b;
        b = c;
        c = a % b;
    }
    return b;
}

function calculator_gcd_main() {
    var number1 = Number(document.getElementById("number1").value);
    var number2 = Number(document.getElementById("number2").value);
    if (number1 == 0 || number2 == 0 || !(Number.isInteger(number1)) || !(Number.isInteger(number2))) {
        alert("请输入两个整数。")
        return;
    }
    var gcd = calculator_gcd(number1, number2);
    document.getElementById("show_gcd").innerHTML = "\nThe gcd of " + String(number1) + " and " + String(number2) + " is " + String(gcd) + "\n";
}

function calculator_lcm_main() {
    var number1 = Number(document.getElementById("number1").value);
    var number2 = Number(document.getElementById("number2").value);
    if (number1 == 0 || number2 == 0 || !(Number.isInteger(number1)) || !(Number.isInteger(number2))) {
        alert("请输入两个整数。")
        return;
    }
    var gcd = calculator_gcd(number1, number2);
    var lcm = (number1 * number2) / gcd;
    document.getElementById("show_lcm").innerHTML = "\nThe lcm of " + String(number1) + " and " + String(number2) + " is " + String(lcm) + "\n";
}

function calculator_gcd_detail_main() {
    var number1 = Number(document.getElementById("number1").value);
    var number2 = Number(document.getElementById("number2").value);
    if (number1 == 0 || number2 == 0 || !(Number.isInteger(number1)) || !(Number.isInteger(number2))) {
        alert("请输入两个整数。")
        return;
    }
    var gcd_process_detail = "";
    var a = Math.max(number1, number2);
    var b = Math.min(number1, number2);
    var q = Math.ceil(a / b);
    var c = a % b;
    gcd_process_detail = gcd_process_detail + a + " = " + b + " * " + q;
    while (c != 0) {
        gcd_process_detail += " + ";
        gcd_process_detail += c;
        gcd_process_detail += "<br/>";
        a = b;
        b = c;
        c = a % b;
        q = Math.floor(a / b);
        gcd_process_detail = gcd_process_detail + a + " = " + b + " * " + q;
    }
    gcd_process_detail += "<br/>";
    var gcd = b;
    document.getElementById("show_gcd").innerHTML = "<br/>The gcd of " + String(number1) + " and " + String(number2) + " is " + String(gcd) + "<br/>" + gcd_process_detail;
}

function calculator_Bezout_main() {
    var number1 = Number(document.getElementById("number1").value);
    var number2 = Number(document.getElementById("number2").value);
    if (number1 == 0 || number2 == 0 || !(Number.isInteger(number1)) || !(Number.isInteger(number2))) {
        alert("请输入两个整数。")
        return;
    }
    var a = Math.max(number1, number2);
    var b = Math.min(number1, number2);
    var Bezout_main_q = Math.floor(a / b);
    var r0 = a % b;
    var st_array = calculator_Bezout(1, 0, Bezout_main_q, b, 0, 1, r0);
    var gcd = calculator_gcd(number1, number2);
    if (st_array[0] < 0) {
        st_array[0] = "(" + String(st_array[0]) + ")";
    }
    if (st_array[1] < 0) {
        st_array[1] = "(" + String(st_array[1]) + ")";
    }
    st_str = "Bezout equation : " + gcd + " = " + st_array[0] + " * " + a + " + " + st_array[1] + " * " + b + "<br/>";
    document.getElementById("show_Bezout").innerHTML = st_str;
    return;
}

function calculator_Bezout(s0, t0, q, r0, s1, t1, r1) // a > b      s * a + t * b = (a,b)   t is 1 initially while s=0
{
    var s2 = s0 - q * s1;
    var t2 = t0 - q * t1;
    var q1 = Math.floor(r0 / r1);
    var r2 = r0 - q1 * r1;
    if (r2 == 0) {
        var st_array = new Array(s2, t2);
        return st_array;
    }
    return calculator_Bezout(s1, t1, q1, r1, s2, t2, r2)
}

function calculator_base_conversion() {
    var number = Number(document.getElementById("number3").value);
    if (!(Number.isInteger(number))) {
        alert("请输入整数。")
        return;
    }
    var bin = number.toString(2);
    var oct = number.toString(8);
    var dec = number.toString(10);
    var hex = number.toString(16);
    base_conversion_str = "Binary : "+bin+"<br/>Octal: "+oct+"<br/>Decimal: "+dec+"<br/>Hexadecimal: "+hex+"<br/>";
    document.getElementById("show_base_conversion").innerHTML = base_conversion_str;
    return;
}
