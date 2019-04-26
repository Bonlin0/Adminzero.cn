# Pygame 使用笔记

## 安装

略。

## 使用

```
pygame.init() # You need do it every time when you start a game.

size = width, height = 1366, 768
black = 0, 0, 0 # a tuple used to clear the screen with `screen.fill(black)`
screen = pygame.display.set_mode(size)  # screen is a surface instance.

```