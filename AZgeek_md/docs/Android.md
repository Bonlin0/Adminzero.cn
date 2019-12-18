# Android 开发笔记

## Gradle 下载依赖不稳定、Gradle Sync project failed 解决方案

`File` - `Settings` ， 搜索 `Remote Jar Repositories` ， 点击右方 `Add` 按钮，将以下两个 URL 依次加入。

http://maven.oschina.net/content/groups/public/

http://maven.aliyun.com/nexus/content/groups/public

点击 `OK` 确认，下载速度就可以提高几个量级！感谢开源中国与阿里云的镜像服务！

## 活动生命周期

|方法|何时调用|下一个方法|
|-|-|-|
|onCreate()|活动第一次创建时调用这个方法。用于正常的静态设置，如创建视图。它还可以传递一个Bundle，其中包含之前保存的活动状态。|onStart()|
|onRestart()|活动停止并再次启动之前会调用这个方法。|onStart()|
|onStart()|活动变得可见时调用这个方法。如果活动进入前台，接下来会调用onResume(),如果活动变得不可见，接下来会调用onStop()。|onResume()或onStop()|
|onResume()|活动在前台时调用这个方法。|onPause()|
|onPause()|由于另一个活动恢复运行而导致这个活动不再在前台时调用这个方法。在这个方法完成之前，不会恢复继续运行时下一个活动。所以这个方法中的所有代码需要很快地运行。如果活动返回到前台，接下来会调用onResume()方法，如果活动变得不可见，接下来会调用onStop()。|onResume()或onStop()|
|onStop()|活动不再可见时调用这个方法。这可能是因为拎一个活动把它盖住了，或者是因为这个活动被撤销，接下来会调用onRestart(),或者如果活动将被撤销，接下来将会调用onDestroy()。|onRestart()或onDestroy()|
|onDestroy()|活动将被撤销或者活动将要完成时会调用这个方法。|无|

## 安卓网络编程

1.  安卓主线程不能用Socket！
2.  安卓只能用主线程更新视图！
3.  安卓的服务如果直接使用Socket也会得到主线程不能使用Socket的异常！
4.  直接使用Handler处理网络也会得到主线程不能使用Socket的异常！

## 安卓图标大小及更换

安卓图标位于`src\main\res\`下，有对应表格如下

|文件夹|图标尺寸|
|-|-|
|mipmap-mdpi|48*48|
|mipmap-hdpi|72*72|
|mipmap-xhdpi|96*96|
|mipmap-xxhdpi|144*144|
|mipmap-xxxhdpi|192*192|

## 安卓字符串中的and符号

遇到报错信息`Unescaped & or nonterminated character/entity reference`, `&`需要改写为`&amp;`。

## 安卓自动填充服务

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

## 安卓的图像资源： drawable 和 mipmap

    mipmapxxx/下放置APP启动图标，以及需要高质量缩放动画的图片。

    其他图片资源放在drawablexxx/下。

## Android Material Icon

Android Material Icon 是一套很好看的ICON集合。要使用其实不需要下载，直接在 Android Studio 中 New-》Vector Asset，进行进一步配置即可使用。

注意还需要在app模块下的build文件中添加如下代码：

```
android {  
   defaultConfig {  
     vectorDrawables.useSupportLibrary = true  
    }  
 }
```

## 关于字体 fonts and fontFamily

自从安卓8.0之后，安卓开始鼓励使用Downloadable Font，即不在APK中绑定字体资源文件，而是直接标记，在实际应用使用中，各应用发现自己需要使用字体时向手机中的Font provider请求。这样可以减少各应用共同字体的冗余提高效率，并且使得APK更加轻量化。但是我在使用过程中发现，国内的手机因为无法访问fonts.google.com，所以无法正常加载字体。故只能下载ttf文件并放置于fonts文件夹，以离线方式加载。不过一个英语字体文件大小在40K上下不算很占用空间。

## button 和 onclick

由于这一部分的代码经常用然而每次使用又经常记不起来，所以还是贴在这里。

```
// 该方法必须是public，返回值void，同时有一个View类型的参数
public void onClickChooseWordsBookButton(View view)
{
    //TODO type your code here.
}
```

## ViewPager, BottomNavigationView, Fragment 整合

参考下面的链接，主要的工作是设置一个 Adaptor。

[https://blog.csdn.net/qq_33198758/article/details/82753062](https://blog.csdn.net/qq_33198758/article/details/82753062)

## ListView 的 OnItemClickListener 不响应

这个问题困扰了许久，在网络上也搜索了许多资料大多都没有什么意义。起初是怀疑在Fragment中的缘故。导致屡屡搜索不到正确的缘由。

[https://www.cnblogs.com/xilinch/archive/2012/11/07/2759265.html](https://www.cnblogs.com/xilinch/archive/2012/11/07/2759265.html)

[https://www.cnblogs.com/yilongm/p/4742775.html](https://www.cnblogs.com/yilongm/p/4742775.html)

上面的链接才真正解决了我的困惑，原来是因为ListView的条目中有Button,所以抢占了OnClick的响应和焦点。


---

