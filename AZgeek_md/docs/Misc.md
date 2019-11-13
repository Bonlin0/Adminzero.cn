# 杂项

一些暂时不足以建立单独分类的内容。可能与所学课程有关。

### 理解傅里叶变换

最近通信原理课程让我想起一篇很久以前看到的教程，简单易懂。[https://zhuanlan.zhihu.com/p/19763358](https://zhuanlan.zhihu.com/p/19763358)

### C中复杂声明

一篇解读C语言中复杂声明的博客。其实一般情况下看上去比较让人一头雾水的声明基本都是函数指针的声明。[https://blog.csdn.net/hshl1214/article/details/5647591](https://blog.csdn.net/hshl1214/article/details/5647591)

### VirutalBox6.0 安装 CentOS7 鼠标不显示问题

[https://www.jianshu.com/p/16c03bfbef29](https://www.jianshu.com/p/16c03bfbef29) 这篇文章可以解决问题。但是明显感觉鼠标移动卡顿且呈跳跃性移动。但是总比没有鼠标要强。

### Oracle NUMBER类型

类型：NUMBER （ precision， scale）

* precision表示数字中的有效位;如果没有指定precision的话，Oracle将使用38作为精度。如果scale大于零，表示数字精确到小数点右边的位数；scale默认设置为0；如果scale小于零，Oracle将把该数字取舍到小数点左边的指定位数。
* Precision的取值范围为【1---38】；Scale的取值范围为【-84---127】。

例如NUMBER(38,3)中总位数是38，小数点后精确到3位，

参考网址 [https://www.cnblogs.com/oumyye/p/4448656.html](https://www.cnblogs.com/oumyye/p/4448656.html)

## Java

泛型不可以是原始类型（ int, char, double... ），需要在泛型中使用原始类型需要使用其包装类型。

|基本类型|包装类|
|-|-|
|boolean|Boolean|
|byte|Byte|
|short|Short|
|int|Integer|
|long|Long|
|float|Float|
|double|Double|
|char|Character|

Java Random类的nextInt(x)是前闭后开，即可能会返回0，但最大为x-1 。


## 安卓部分

### Gradle 下载依赖不稳定、Gradle Sync project failed 解决方案

`File` - `Settings` ， 搜索 `Remote Jar Repositories` ， 点击右方 `Add` 按钮，将以下两个 URL 依次加入。

http://maven.oschina.net/content/groups/public/

http://maven.aliyun.com/nexus/content/groups/public

点击 `OK` 确认，下载速度就可以提高几个量级！感谢开源中国与阿里云的镜像服务！

### 活动生命周期

|方法|何时调用|下一个方法|
|-|-|-|
|onCreate()|活动第一次创建时调用这个方法。用于正常的静态设置，如创建视图。它还可以传递一个Bundle，其中包含之前保存的活动状态。|onStart()|
|onRestart()|活动停止并再次启动之前会调用这个方法。|onStart()|
|onStart()|活动变得可见时调用这个方法。如果活动进入前台，接下来会调用onResume(),如果活动变得不可见，接下来会调用onStop()。|onResume()或onStop()|
|onResume()|活动在前台时调用这个方法。|onPause()|
|onPause()|由于另一个活动恢复运行而导致这个活动不再在前台时调用这个方法。在这个方法完成之前，不会恢复继续运行时下一个活动。所以这个方法中的所有代码需要很快地运行。如果活动返回到前台，接下来会调用onResume()方法，如果活动变得不可见，接下来会调用onStop()。|onResume()或onStop()|
|onStop()|活动不再可见时调用这个方法。这可能是因为拎一个活动把它盖住了，或者是因为这个活动被撤销，接下来会调用onRestart(),或者如果活动将被撤销，接下来将会调用onDestroy()。|onRestart()或onDestroy()|
|onDestroy()|活动将被撤销或者活动将要完成时会调用这个方法。|无|

### 安卓网络编程

1.  安卓主线程不能用Socket！
2.  安卓只能用主线程更新视图！
3.  安卓的服务如果直接使用Socket也会得到主线程不能使用Socket的异常！
4.  直接使用Handler处理网络也会得到主线程不能使用Socket的异常！

### 安卓图标大小及更换

安卓图标位于`src\main\res\`下，有对应表格如下

|文件夹|图标尺寸|
|-|-|
|mipmap-mdpi|48*48|
|mipmap-hdpi|72*72|
|mipmap-xhdpi|96*96|
|mipmap-xxhdpi|144*144|
|mipmap-xxxhdpi|192*192|

### 安卓字符串中的and符号

遇到报错信息`Unescaped & or nonterminated character/entity reference`, `&`需要改写为`&amp;`。

### 安卓自动填充服务

[https://developer.android.google.cn/guide/topics/text/autofill.html#custom_views_with_standard_view_structure](https://developer.android.google.cn/guide/topics/text/autofill.html#custom_views_with_standard_view_structure)

[https://developer.android.google.cn/guide/topics/text/autofill-services](https://developer.android.google.cn/guide/topics/text/autofill-services)

以下内容翻译自第二个网址。

要实现自动填充服务，必须声明并实现该服务。你的manifest文件中必须要有`<service>`元素，且该元素要包括以下属性。

* `android:name` 实现了`AutofillService`的子类.
* `android:permission` 需要声明 `BIND_AUTOFILL_SERVICE`
* `intent-filter`元素包括强制`<action>`赋值`android.service.autofill.AutofillService`
  
  以下为示例代码

```
    <service
        android:name=".MyAutofillService"
        android:label="My Autofill Service"
        android:permission="android.permission.BIND_AUTOFILL_SERVICE">
        <intent-filter>
            <action android:name="android.service.autofill.AutofillService" />
        </intent-filter>
        <meta-data
            android:name="android.autofill"
            android:resource="@xml/service_configuration" />
    </service>
```

### 安卓的图像资源： drawable 和 mipmap

    mipmapxxx/下放置APP启动图标，以及需要高质量缩放动画的图片。

    其他图片资源放在drawablexxx/下。

### Android Material Icon

Android Material Icon 是一套很好看的ICON集合。要使用其实不需要下载，直接在 Android Studio 中 New-》Vector Asset，进行进一步配置即可使用。

注意还需要在app模块下的build文件中添加如下代码：

```
android {  
   defaultConfig {  
     vectorDrawables.useSupportLibrary = true  
    }  
 }
```

### 关于字体 fonts and fontFamily

自从安卓8.0之后，安卓开始鼓励使用Downloadable Font，即不在APK中绑定字体资源文件，而是直接标记，在实际应用使用中，各应用发现自己需要使用字体时向手机中的Font provider请求。这样可以减少各应用共同字体的冗余提高效率，并且使得APK更加轻量化。但是我在使用过程中发现，国内的手机因为无法访问fonts.google.com，所以无法正常加载字体。故只能下载ttf文件并放置于fonts文件夹，以离线方式加载。不过一个英语字体文件大小在40K上下不算很占用空间。

### button 和 onclick

由于这一部分的代码经常用然而每次使用又经常记不起来，所以还是贴在这里。

```
// 该方法必须是public，返回值void，同时有一个View类型的参数
public void onClickChooseWordsBookButton(View view)
{
    //TODO type your code here.
}
```

### ViewPager, BottomNavigationView, Fragment 整合

参考下面的链接，主要的工作是设置一个 Adaptor。

[https://blog.csdn.net/qq_33198758/article/details/82753062](https://blog.csdn.net/qq_33198758/article/details/82753062)


---

## 操作系统实验

### $ and $$

NASM 编译的汇编语言中，$是当前行的地址，$$是当前段的段首地址。

### 汇编 CLD 与 STD

二者均是用来操作方向标志位DF（Direction Flag）。cld使DF 复位，即是让DF=0，std使DF置位，即DF=1.这两个指令用于串操作指令中。通过执行cld或std指令可以控制方向标志DF，决定内存地址是增大（DF=0，向高地址增加）还是减小（DF=1，向地地址减小）。

PS ： LODSB and LODSW

这是块装入指令,把SI指向的存储单元读入累加器,LODSB就读入AL,LODSW就读入AX中,然后SI自动增加或减小1或2.

$$x=y^2$$

## Some notes

### PHP

PHP int overflow: 如果给定的一个数超出了 integer 的范围，将会被解释为 float。同样如果执行的运算结果超出了 integer 范围，也会返回 float。  
PHP float to int:向下取整。

PHP 7.0.0 起，NaN 和 Infinity 在转换成 integer 时，不再是 undefined 或者依赖于平台，而是都会变成零。  

发现url中有?file=字样时可以修改后面为?file=php://filter/convert.base64-encode/resource=xxx.php来查看对应文件源码。  

### Javascript

Javascript中NaN这个特殊的Number与所有其他值都不相等，包括它自己。

### Probability and Mathematical Statistic

<img src="../img/useful_power_series.png" alt="useful_power_series">

### Chinese Copywriting Guidelines 中文排版指北

[Chinese Copywriting Guidelines 中文排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines) ， 一个关于中文文档内容书写的规范，努力达成！

### Docker 官网镜像

[https://hub.docker.com/search/?type=image&image_filter=official](https://hub.docker.com/search/?type=image&image_filter=official)

### Web Extension

Mozilla Web 扩展教程： [你的第一个 Web Extension](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)

---

# 杂谈

## 区块链？

我尝试去用尽可能好理解的文字让大家能够对区块链有一个非常基本的概念。

### 预备知识

计算机世界是以二进制数为基础的。也就是说你看到这段文字实际上也是0和1的某种组合传到你的电脑或手机上的。

比特 bit：一个二进制位，只有可能是0或者1.一般用小写b表示。

字节 bytes：8个二进制位或者说8个比特。一般用大写B表示。

密码学有一种东西叫做哈希函数 然后哈希函数能够针对任何数字信息生成一定长度的 哈希（hash） 这个东西也是一个二进制数字串 然后hash的特性就是你输入的信息发生一点变化 再次生成的hash就会变得很不一样 所以我们可以为一些不能变动的东西计算哈希，并且单独保存，如果有一天坏人修改了你的不能变动的东西，你再次计算哈希，就会发现结果与之前不一样，就说明有人动了这个东西，你要警觉了，一般的做法就会把这个被动过的东西扔掉了报警.

要体验哈希函数可以直接百度“在线哈希”，就可以感性的感受一下什么是哈希了。而且哈希函数的设计要求之一是 你很难通过一个哈希值 逆推出一个正确的输入。就是拿着result理论上是有很多种输入能够算出这个result的 但是这个过程是计算困难的 这个就是哈希函数设计安全性的问题了。你也可以看到输出基本上都是乱码 随机数。具体哈希的设计和实现是很复杂的 但是理解他的设计思路还是很简单的。

### 正文

区块链就是广泛使用哈希函数。区块其实就是一个结构，里面包括了一些东西，最典型的就是一些交易信息，张三给李四付了1个比特币这样，然后我们会给这个区块计算哈希，这样以后如果有人篡改区块，我们检查哈希就知道了这个区块是不是正确的，而区块链呢，就是我们每一个区块都要存储上一个区块的哈希信息，所以区块就是串成一串的形式。并且你没法篡改之前的交易信息，因为已经被哈希绑死了。

而现在广泛应用的区块链去中心化什么的，就是说我们每个人每个参与区块链的人都要拷贝一份从始至今的区块链，然后并且互相沟通确保区块链保持最新，这就是所谓的Pto(2)P。而相对的，目前还在大规模使用的架构CS架构，是指一个中心服务器存储所有信息，而用户向服务器请求服务这个样子,如果服务器改了一些东西，所有的用户都没有办法。

然后呢区块链有个要求 就是区块里面有一个部分本身是没有任何信息的（叫nonce） 你要从区块链上加一个区块也没呢么容易 你需要让你的区块的哈希满足一个条件 比如前n位是00000这样子 而哈希本身的输出几乎是随机数 所以你要在区块的信息构建好之后 给他这个没有任何信息的部分取随机数 测试整合起来的区块的哈希是不是满足条件 如果足够幸运就能试出来一个满足条件的nonce 能够使整个区块的哈希满足一个特定条件 测试这个nocne的过程就叫挖矿。

然后测试到一个正确nonce 生成区块以后 你就要向区块链世界的其他人发广播告诉别人这个新的区块的相关信息 别人就知道了 哦区块链上多了一块。然后由于计算一个合法区块是很难的 所以挖矿比较困难 具体区块链运营还有很多细节的东西 保证区块链能够正常运行。

然后具体运行大概就是 交易信息 张三给李四100块钱 李四给王五20块钱 这样的信息被写入区块 然后矿工为这个区块计算哈希 并且测试满足条件的nonce 是的哈希达到要求 然后找到以后把这个新区块广播给别人 这笔交易就算是被全世界公认了 并且没有人能够反悔 或者篡改 因为这个信息已经被写入到全世界的账本里了。而矿工也会得到相应的挖矿奖励 就是计算nonce的奖励。同时还有一些共识算法 就是如果你恶意伪造交易信息 区块链世界也有办法应对。
