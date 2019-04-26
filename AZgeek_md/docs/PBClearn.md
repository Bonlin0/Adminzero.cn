# PBC 学习使用笔记

一些关于PBC（paring based crptography）库学习使用的笔记，以方便日后查阅。

## 引言

[PBC库](https://crypto.stanford.edu/pbc/download.html)是一位斯坦福大学的密码学家Ben Lynn所开发维护的一个C语言库。该库需要使用GMP支持。

## PBC的配置和安装

要使用PBC，首先需要配置好PBC。

目前唯一调通的教程。 [https://blog.csdn.net/u013699902/article/details/58319928](https://blog.csdn.net/u013699902/article/details/58319928)

## Openssl配置安装

### PLAN A

在使用VS的时候发现没有openssl库，Visual studio自动给了提示如下。

<img src="../img/vcpkg_openssl_tips.png" alt="vcpkg_openssl_tips"> 

vcpkg是一个包管理工具。于是根据详细的教程下载安装成功。但是接下来使用该工具下载库时却因为从Github上下载极其不稳定屡次失败。

于是按照教程，先使用浏览器下载。[https://github.com/Kitware/CMake/releases/download/v3.14.0/cmake-3.14.0-win32-x86.zip](https://github.com/Kitware/CMake/releases/download/v3.14.0/cmake-3.14.0-win32-x86.zip)下载成功后将其放到vcpkg的安装目录的downloads文件夹下，重新下载新的库。

### PLAN B

因为PLAN　A　太慢了，又找到了其他安装 OPENSSL 的方法。参考下面的网站，第一个为教程，第二个为下载地址。

* [https://www.jb51.net/article/119025.htm](https://www.jb51.net/article/119025.htm)
* [https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html)


## 经验之谈

今日和老师讨论，讲述了自己在windows环境下配置PBC、openssl的“艰苦历程”，老师讲到，其实很多时候不需要去mingw这样的平台尝试去用windows仿真linux，既然在Windows编程，就去使用VS就可以。Visual Studio已经是如今行业规范，所以很多库都会为方便Visual Studio有各种各样的便捷通路。之后在Windows上从事这类开发，可以直接搜索如何将相关库整合至VS上即可。可以省区很多无用之功，少走一些弯路。当然，老师用Linux。（笑

---

施工中 以下为未整理信息 请无视

首先下载源代码

安装mingw

使用msys

切换到对应文件夹

$ ./configure -disable-static -enable-shared

make

make install

先安装gmp 在安装pbc 然后openssl

安装结束后在C:\MinGW\msys\1.0\local 中将对应文件拷贝至 C:\MinGW 对应文件夹中

openssl：bin/openssl.exe  include/openssl/* lib/openssl/* 


Linux:
flex   openssl  gcc  make  libssl-dev libgmp-dev bison

