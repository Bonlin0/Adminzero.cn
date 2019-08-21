# Linux 的学习笔记

## Vim 练级攻略

[https://coolshell.cn/articles/5426.html](https://coolshell.cn/articles/5426.html)

## tar相关

`tar` 是 tape archive 的缩写，最早是用于将多个文件打包为单一文件以方便录入磁带中。单一的tar后缀名表示未经过压缩的tar文件，一般会见到以tar.xz、tar.gz结尾的文件，则是以相应的压缩算法压缩后的文件。

### tar语法

语法：tar [主选项+辅选项] 文件或目录

使用该命令时，主选项必须有，它告诉tar要做什么事情，辅选项是辅助使用的，可以选用。

主选项：【一条命令以下5个参数只能有一个】

- -c: --create 新建一个压缩文档，即打包

- -x: --extract,--get解压文件

- -t: --list,查看压缩文档里的所有内容

- -r:--append 向压缩文档里追加文件

- -u:--update 更新原压缩包中的文件

辅助选项：

- -z:是否同时具有gzip的属性？即是否需要用gzip压缩或解压？一般格式为xxx.tar.gz或xx.tgz

- -j：是否同时具有bzip2的属性？即是否需要用bzip2压缩或解压？一般格式为xx.tar.bz2

- -v:显示操作过程！这个参数很常用

- -f：使用文档名，注意，在f之后要立即接文档名，不要再加其他参数！

- -C:切换到指定目录

- --exclude FILE:在压缩过程中，不要将FILE打包

### tar.xz 解压方法

对于`xz`指令有

```
xz -z filename   #压缩
```

```
xz -d filename   #解压
```

故分两步先使用 `xz -d filename.tar.xz` ，再使用 `tar -xvf filename.tar`。

也可以直接使用 `tar -jxvf filename.tar.xz` 一步解压两层。

## 查看文件权限

在对应文件夹下打开终端，输入`ls -l`即可查看当前目录下所有文件的详细信息，其中最左栏第一列为文件类型，第2-10列为权限信息。

### Linux 七种文件类型

- 普通文件类型：Linux中最多的一种文件类型, 包括 纯文本文件(ASCII)；二进制文件(binary)；数据格式的文件(data);各种压缩文件.第一个属性为 [-]。

- 目录文件，就是目录`directory`。第一个属性为 [d]。

- 块设备文件`block` ： 就是存储数据以供系统存取的接口设备，第一个属性为 [b]。

- 字符设备文件`character`：一般置于/dev目录下，一次传输一个字节的设备被称为字符设备，如键盘、字符终端等，传输数据的最小单位为一个字节。第一个属性为 [c]。

- 套接字文件`socket`： 这类文件通常用在网络数据连接。可以启动一个程序来监听客户端的要求，客户端就可以通过套接字来进行数据通信。第一个属性为 [s]，最常在 /var/run目录中看到这种文件类型。

- 管道文件`pipe`： FIFO也是一种特殊的文件类型，它主要的目的是，解决多个程序同时存取一个文件所造成的错误。FIFO是first-in-first-out(先进先出)的缩写。第一个属性为 [p]。

- 链接文件`link` ： 类似Windows下面的快捷方式。第一个属性为 [l]。

### 权限信息

权限信息中，每三列一组，依次为所有者权限，组织权限，其他人权限。

---

## 编译Linux kernel， 添加系统调用

[Linux编译内核及添加系统调用 By 会飞的马](https://blog.csdn.net/u010371710/article/details/80382968)

[Linux系统添加系统调用 By nsnvainva](https://blog.csdn.net/weixin_39924920/article/details/80413571)

**修改内核源码中与系统调用有关的文件信息，以下三个文件**

/arch/x86/entry/syscalls/syscall_64.tbl      //设置系统调用号，如果是32位就用syscall_32.tbl

/include/linux/syscalls.h                     //系统调用的头文件

/kernel/sys.c                                 //定义系统调用函数

**安装`gcc` , `make` , `ncurses` , `bison` , `flex` , `libssl-dev`**

```
sudo make mrproper

sudo make clean

sudo make menuconfig

sudo make -j4   #j4是4线程

```

```
sudo make modules_install  

sudo make install
```



## 杂项

`Win键`即Linux下的`super键`。

重启命令 `sudo reboot`

关机命令 `sudo poweroff`