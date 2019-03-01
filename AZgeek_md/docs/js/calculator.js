/*The calculator js file for AZgeek  by Hell05(Bonlin0)
 *
 */

function calculator_gcd(number1, number2)
{
    var a = Math.max(number1, number2);
    var b = Math.min(number1, number2);
    var c = a % b;
    while(c!=0)
    {
        a=b;
        b=c;
        c=a%b;
    }
    return b;
}

function calculator_gcd_main()
{
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    var gcd = calculator_gcd(number1,number2);
    document.getElementById("show_gcd").innerHTML="\nThe gcd of "+String(number1)+" and "+String(number2)+" is "+String(gcd)+"\n";
}

function calculator_lcm_main()
{
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    var gcd = calculator_gcd(number1,number2);
    var lcm = (number1*number2)/gcd;
    document.getElementById("show_lcm").innerHTML="\nThe lcm of "+String(number1)+" and "+String(number2)+" is "+String(lcm)+"\n";
}

function calculator_gcd_detail_main()
{
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    var process_detail = "";
    var a = Math.max(number1, number2);
    var b = Math.min(number1, number2);
    var q = Math.ceil(a/b);
    var c = a % b;
    process_detail = process_detail+ a + " = "+ b +" * " + q;
    while(c!=0)
    {
        process_detail+= " + ";
        process_detail+= c;
        process_detail+= "<br/>";
        a=b;
        b=c;
        c=a%b;
        q=Math.floor(a/b);
        process_detail = process_detail+ a + " = "+ b +" * " + q;
    }
    process_detail+= "<br/>";
    var gcd = b;
    document.getElementById("show_gcd").innerHTML="<br/>The gcd of "+String(number1)+" and "+String(number2)+" is "+String(gcd)+"<br/>" + process_detail;
}
