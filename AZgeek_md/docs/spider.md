# Python3 Web 爬虫学习

## 安装

以下是Windows环境下的安装流程。

1.  python 安装
2.  Chrome 安装
3.  Firefox 安装
4.  pip3 install requests
5.  pip3 install selenium
6.  https://chromedriver.chromium.org/ 进入网站后下载Chrome对应的ChromeDriver。
7.  将 ChromeDriver 添加至path，或者将其直接拖入Python根目录的Scripts文件夹。
8.  下载 GeckoDriver https://github.com/mozilla/geckodriver/releases
9.  将 GeckoDriver 添加至path，或者将其直接拖入Python根目录的Scripts文件夹。
10. pip3 install aiohttp cchardet aiodns lxml beautifulsoup4 pyquery
11. 下载安装 tesseract https://digi.bib.uni-mannheim.de/tesseract/
12. 安装 tesserocr https://www.cnblogs.com/Jimc/p/9772930.html
13. 如果第12步出现问题，可能是安装了Anaconda所致， 直接进入该网站 https://github.com/simonflueckiger/tesserocr-windows_build/releases ， 下载对应版本whl文件，将该文件移至 `path` 中的任意目录后， 使用类似 pip3 install tesserocr-2.4.0-cp37-cp37m-win_amd64.whl 的命令安装。
14. 试用 tesserocr , https://www.cnblogs.com/Jimc/p/9772930.html , 切记配置好path， 
15. 安装 MySQL
16. pip3 install pymsql
17. 安装 Redis https://github.com/microsoftarchive/redis/releases
18. 