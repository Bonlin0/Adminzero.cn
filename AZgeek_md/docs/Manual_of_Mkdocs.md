# MkDocs 配置 使用指南

使用 MkDocs 的记录，以避免之后每次使用都要重新浏览MkDocs的主页。更新于11：30 2019/2/24。 BY hell05

---
## 安装与配置（Windows）

**安装python**

首先应检查是否已经安装已兼容版本的 python，在书写本文时（2/24/2019），MkDocs supports Python versions 2.7, 3.4, 3.5, 3.6, 3.7 and pypy. 详见[Mkdocs官网](https://www.mkdocs.org/)。安装python的过程不再详述（[python官网](http:www.python.org))。

**安装python的包管理工具(package manager): pip**

一般来说在安装python后已经会安装有pip，但是你可能需要将其升级至最新版本。

```
pip install --upgrade pip
```

PS：有可能会被提示使用其他的指令，这时请按照提示的指令更新即可。

**安装Mkdocs**

使用pip来安装Mkdocs。

```
pip install mkdocs
```

安装完毕后可以使用`mkdocs --version`来确认是否安装成功以及安装的版本。

## 学习基本使用

Mkdocs很容易使用。在命令行窗口下输入如下指令，将会在你当前目录新建一个对应的项目文件夹，并做好了基本配置。

```
mkdocs new my-project
cd my-project
```

文件夹中可以看到自动生成的配置文件 `mkdocs.yml` 和 文件夹`docs` ，在文件夹中有一个markdown文件 `index.md` 。现在可以开始测试了，确保你的命令行窗口当前所在目录为生成的项目文件夹，输入指令 `mkdocs serve` 。这时你应该会看到如下的输出。

```
INFO    -  Building documentation...
INFO    -  Cleaning site directory
[I 190224 09:47:25 server:298] Serving on http://127.0.0.1:8000
[I 190224 09:47:25 handlers:59] Start watching changes
[I 190224 09:47:25 handlers:61] Start detecting changes
```

好了，现在打开浏览器，在地址栏中输入`127.0.0.1:8000`（即本机的8000端口），那么你应该可以看到自动生成的网页了。这个服务器会自动检测你的每次文件更改，所以每当你保存文件后，浏览器中的页面会自动更新。接下来你可以打开`index.md`做一些小更改，并自己检查会在浏览器中的界面中造成哪些改变。你也可以在`docs`文件夹中新建一个md文件，并仿照index.md文件进行编辑，保存后打开浏览器看看发生了什么更改。如果你不熟悉Markdown语法，可以搜索一下相关的教程，这里附上一个[简书上的markdown教程](https://www.jianshu.com/p/191d1e21f7ed)。

接下来你需要认识mkdocs中的配置文件`mkdocs.yml`，打开它，对`site_name`后面的值进行更改，你将会发现浏览器中网站名发生了改变。

要改变页面的导航栏，需要在`site_name`一行下，加入数行代码，最终`mkdocs.yml`文件内容可能会像下面这样：

```
site_name: Mysite
nav:
    - Home: index.md
    - About: newfile.md
```

保存后你就可以看到导航栏出现了变化。此外Mkdocs提供了不错的搜索功能，可以检查一下。

**更改主题**

在配置文件的末尾再添一行代码`theme: readthedocs`可以实现主题的更改。

```
site_name: Mysite
nav:
    - Home: index.md
    - About: newfile.md
theme: readthedocs
```

**更换图标**

你可以通过在`doc`文件夹下创建`img`文件夹，并在其中添加你自己的`favicon.ico`文件来自定义你的图标。

**生成网站文件夹(site/)**

只需一行指令，就会在项目文件夹下自动生成你的网站文件夹`site`。

```
mkdocs build
```

**Help**

通过help指令来寻求帮助。

```
mkdocs --help
```

除此之外，对于特定的指令你也可以使用这种方式寻求帮助。举个栗子。当你不熟悉build指令时，你可以这样做。

```
mkdocs build --help
```

当你有更多的问题时，极力推荐参考[Mkdocs官网](https://www.mkdocs.org)，本文只是简单翻译了官网文档并将对于笔者来说最基本最重要的部分予以保留。

---
## MkDocs User Guide

## 文件布局

你的源文件都应该被放在默认的`Docs`文件夹下，你可以将你的markdown源文件放在`Docs`下的文件夹下。比如下面这样。

```
docs/
    index.md
    user-guide/getting-started.md
    user-guide/configuration-options.md
    license.md
```

嵌套的文件夹下的文件会生成对应的URL如下：

```
/
/user-guide/getting-started/
/user-guide/configuration-options/
/license/
```

### index 文件

由于部分网站repository会在根目录放置README.md，你可以不使用`index.md`，而使用`README.md`，mkdocs会自动将其生成为`index.html`，当`index.md`和`README.md`同时存在时，只有`index.md`会被生成为`index.html`，而`README.md`会被忽略。

### 调节Navigation（导航栏）

一般的导航栏书写格式如下：

```
nav:
- Home: 'index.md'
- About: 'about.md'
```

而导航栏中的题目也可以进行分块，如下：

```
nav:
- Home: 'index.md'
- User Guide:
    - 'Writing your docs': 'writing-your-docs.md'
    - 'Styling your docs': 'styling-your-docs.md'
- About:
    - 'License': 'license.md'
    - 'Release Notes': 'release-notes.md'
```

分块可以嵌套，理论上你可以嵌套任意多层。注意分块本身（如`User Guide`）是不能链接文档的。只有他下层的页面可以链接文档。

你没有书写在导航栏里的文档也会被导入`site`文件夹但是他不会出现在任何导航栏中，也不能通过next和previous链接进入。*这样的页面除非你直接链接否则将是不可见的。*

## 使用markdown书写

mkdocs使用[Python-Markdown](https://python-markdown.github.io/)实现，基本完全与[参考实现](https://daringfireball.net/projects/markdown/)相同，除了一些[细微差距](https://python-markdown.github.io/#differences)。Mkdocs对Python-Markdown extensions提供支持。可以查看[https://www.mkdocs.org/user-guide/configuration/#markdown_extensions](https://www.mkdocs.org/user-guide/configuration/#markdown_extensions)来调试如何打开这些功能。

### 内部link

你的图片应当放在`docs`下的`img`文件夹下。

大多数的官方提示的语法都可以在百度中找到并基本全部适用。

## Theme： Material for MkDocs

Date: 2019/11/15

最近在看 [CTF-wiki](https://ctf-wiki.github.io/ctf-wiki/) 时感觉主题真的好看，于是找了一下官方文档将网站也升级使用了这个主题。

[点击这里查看 Material for MkDocs 的主页](https://squidfunk.github.io/mkdocs-material/)

### 安装使用

使用十分简单，尤其是在已经使用`MkDocs`建好的文档可以简单快速的切换主题。

```bash
pip install mkdocs-material
```

使用上面的命令安装主题。然后打开`mkdocs.yml`文件，进行修改如下。

```
theme:
  name: 'material'
```

重新build就可以看到新的文档主题了。

### Expansions！

主题好看是一方面，另一方面是在这个主题中找到了一些之前一直需要的插件。

[PyMdown](https://squidfunk.github.io/mkdocs-material/extensions/pymdown/)可以支持很多MarkDown的扩展。

比如 数学公式的解析 [Arithmatex](https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/)。 
还有 Emoji :smile:，高亮等等。具体可以在上面给的链接中查看。




