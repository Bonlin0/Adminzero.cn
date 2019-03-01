/*The calculator js file for AZgeek  by Hell05(Bonlin0)
 *
 */

function calculator_gcd(number1,number2)
{
    var a = Math.max(number1,number2);
    var b = Math.min(number1,number2);
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
    //alert(number1);
    var number2 = document.getElementById("number2").value;
    //alert(number2);
    var gcd = calculator_gcd(number1,number2);
    //alert(gcd);
    document.getElementById("show_gcd").innerHTML="\nThe gcd of "+String(number1)+" and "+String(number2)+" is "+String(gcd)+"\n";
}