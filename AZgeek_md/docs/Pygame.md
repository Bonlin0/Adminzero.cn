# Pygame 使用笔记

## 安装

略。

## 使用

[Pymunk API](http://www.pymunk.org/en/master/pymunk.html)
[Pygame Doc](https://www.pygame.org/docs/)

```python
pygame.init() # You need do it every time when you start a game.

size = width, height = 1366, 768
black = 0, 0, 0 # a tuple used to clear the screen with `screen.fill(black)`
screen = pygame.display.set_mode(size)  # screen is a surface instance.

```

## 光影效果

[https://ncase.me/sight-and-light/](https://ncase.me/sight-and-light/)一个关于光影效果的教程。
[https://www.redblobgames.com/articles/visibility/](https://www.redblobgames.com/articles/visibility/)一个关于光影效果的教程。

[http://www.pygame.org/project-Overhead+Shooter-2233-.html](http://www.pygame.org/project-Overhead+Shooter-2233-.html) 在这个网站中可以看到以下advice:

```
- Your angle issues might be helped by using the Vec2d implementation from pymunk http://code.google.com/p/pymun.... This implements a number of useful geometric functions and in particular does all the right kind of things for angle manipulation, which can be a bit tricky.
- For AI it looks like you considered going with an underlying grid. This worked well for me and allowed me to use the networkx (http://networkx.lanl.gov/ library for pathfinding. This is fast and flexible. 
- For shooting based on line-of-sight, the Vec2d library above is useful because you can easily use get_angle_between and get_distance to work out if your enemies can see the player and then decide on which angle to shoot at. The API reference is here http://pymunk.googlecode.com/s...
- In your blog posts you mentioned more general physics for particle simulation. The pymunk library is very powerful. http://code.google.com/p/pymun...
```


```python
 ''' 
 SIGHT & LIGHT by ncase (https://github.com/ncase/sight-and-light) 
 Ported to Python/PyGame by Marcus Møller (https://github.com/marcusmoller) 
 '''
import pygame
import pygame.gfxdraw
import math


class SightAndLight():

    def __init__(self):
        # initialize pygame
        pygame.init()
        # Screen size
        self.screen_width = 1366
        self.screen_height = 768
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height))
        pygame.display.set_caption(" Simple shoot game-by whl")
        # mouse position
        self.mouse_pos = (0, 0)
        # general
        self.fps_clock = pygame.time.Clock()
        self.running = True
        self.update_shadows = True  # only call update on mouse movement
        # segments
        self.segments = [
            # Border
            {" a ": {" x ": 0, " y ": 0}, " b ": {" x ": 640, " y ": 0}},
            {" a ": {" x ": 640, " y ": 0}, " b ": {" x ": 640, " y ": 360}},
            {" a ": {" x ": 640, " y ": 360}, " b ": {" x ": 0, " y ": 360}},
            {" a ": {" x ": 0, " y ": 360}, " b ": {" x ": 0, " y ": 0}},
            # Polygon #1
            {" a ": {" x ": 100, " y ": 150}, " b ": {" x ": 120, " y ": 50}},
            {" a ": {" x ": 120, " y ": 50}, " b ": {" x ": 200, " y ": 80}},
            {" a ": {" x ": 200, " y ": 80}, " b ": {" x ": 140, " y ": 210}},
            {" a ": {" x ": 140, " y ": 210}, " b ": {" x ": 100, " y ": 150}},
            # Polygon #2
            {" a ": {" x ": 100, " y ": 200}, " b ": {" x ": 120, " y ": 250}},
            {" a ": {" x ": 120, " y ": 250}, " b ": {" x ": 60, " y ": 300}},
            {" a ": {" x ": 60, " y ": 300}, " b ": {" x ": 100, " y ": 200}},
            # Polygon #3
            {" a ": {" x ": 200, " y ": 260}, " b ": {" x ": 220, " y ": 150}},
            {" a ": {" x ": 220, " y ": 150}, " b ": {" x ": 300, " y ": 200}},
            {" a ": {" x ": 300, " y ": 200}, " b ": {" x ": 350, " y ": 320}},
            {" a ": {" x ": 350, " y ": 320}, " b ": {" x ": 200, " y ": 260}},
            # Polygon #4
            {" a ": {" x ": 340, " y ": 60}, " b ": {" x ": 360, " y ": 40}},
            {" a ": {" x ": 360, " y ": 40}, " b ": {" x ": 370, " y ": 70}},
            {" a ": {" x ": 370, " y ": 70}, " b ": {" x ": 340, " y ": 60}},
            # Polygon #5
            {" a ": {" x ": 450, " y ": 190}, " b ": {" x ": 560, " y ": 170}},
            {" a ": {" x ": 560, " y ": 170}, " b ": {" x ": 540, " y ": 270}},
            {" a ": {" x ": 540, " y ": 270}, " b ": {" x ": 430, " y ": 290}},
            {" a ": {" x ": 430, " y ": 290}, " b ": {" x ": 450, " y ": 190}},
            # Polygon #6
            {" a ": {" x ": 400, " y ": 95}, " b ": {" x ": 580, " y ": 50}},
            {" a ": {" x ": 580, " y ": 50}, " b ": {" x ": 480, " y ": 150}},
            {" a ": {" x ": 480, " y ": 150}, " b ": {" x ": 400, " y ": 95}}
        ]
        # Intersects
        self.intersects = []
        # Points
        self.points = []

    def run(self):
        while self.running:
            self.main_loop()

    def main_loop(self):
        self.handle_input()
        if self.update_shadows:
            self.update()
        self.update_shadows = False
        self.render_frame()

    def update(self):
        # Clear old points
        self.points = []
        # Get all unique points
        for segment in self.segments:
            self.points.append((segment[' a '], segment[' b ']))
        unique_points = []
        for point in self.points:
            if point not in unique_points:
                unique_points.append(point)
        # Get all angles
        unique_angles = []
        for point in unique_points:
            angle = math.atan2(point[0][" y "] - self.mouse_pos[1], point[0][" x "] - self.mouse_pos[0])
            point[0][" angle "] = angle
            unique_angles.append(angle - 0.00001)
            unique_angles.append(angle)
            unique_angles.append(angle + 0.00001)
        # RAYS IN ALL DIRECTIONS
        self.intersects = []
        for angle in unique_angles:
            # Calculate dx & dy from angle
            dx = math.cos(angle)
            dy = math.sin(angle)
            # Ray from center of screen to mouse
            ray = {
                " a ": {" x ": self.mouse_pos[0], " y ": self.mouse_pos[1]},
                " b ": {" x ": self.mouse_pos[0] + dx, " y ": self.mouse_pos[1] + dy}
            }
            # Find CLOSEST intersection
            closest_intersect = None
            for segment in self.segments:
                intersect = self.get_intersection(ray, segment)
                if not intersect: continue
                if not closest_intersect or intersect[" param "] < closest_intersect[" param "]:
                    closest_intersect = intersect
            # Intersect angle
            if not closest_intersect: continue
            closest_intersect[" angle "] = angle
            # Add to list of intersects
            self.intersects.append(closest_intersect)
        # Sort intersects by angle
        self.intersects = sorted(self.intersects, key=lambda k: k[' angle '])

    def render_frame(self):
        self.screen.fill((255, 255, 255))
        # draw segments
        for segment in self.segments:
            pygame.draw.aaline(self.screen, (153, 153, 153), (segment[' a '][' x '], segment[' a '][' y ']),
                               (segment[' b '][' x '], segment[' b '][' y ']))
        self.draw_polygon(self.intersects, (221, 56, 56))
        # draw debug lines
        for intersect in self.intersects:
            pygame.draw.aaline(self.screen, (255, 85, 85), self.mouse_pos, (intersect[' x '], intersect[' y ']))
        # limit fps
        self.fps_clock.tick(60)
        # update screen
        pygame.display.update()

    def handle_input(self):
        pygame.event.pump()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False
                print(" quit ")
                break
            # KEYBOARD
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE or event.key == pygame.K_q:
                    self.running = False
            # MOUSE
            elif event.type == pygame.MOUSEMOTION:
                self.mouse_pos = event.pos
            self.update_shadows = True

    def get_intersection(self, ray, segment):
        ''' Find intersection of RAY & SEGMENT '''

        # RAY in parametric: Point + Direction*T1
        r_px = ray[' a '][' x ']
        r_py = ray[' a '][' y ']
        r_dx = ray[' b '][' x '] - ray[' a '][' x ']
        r_dy = ray[' b '][' y '] - ray[' a '][' y ']
        # SEGMENT in parametric: Point + Direction*T2
        s_px = segment[' a '][' x ']
        s_py = segment[' a '][' y ']
        s_dx = segment[' b '][' x '] - segment[' a '][' x ']
        s_dy = segment[' b '][' y '] - segment[' a '][' y ']
        # Are they parallel?  If so, no intersect
        r_mag = math.sqrt(r_dx * r_dx + r_dy * r_dy)
        s_mag = math.sqrt(s_dx * s_dx + s_dy * s_dy)
        if r_dx / r_mag == s_dx / s_mag and r_dy / r_mag == s_dy / s_mag:
            return None
        # SOLVE FOR T1 & T2
        # r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
        # ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
        # ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
        # ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
        # todo: fix zerodivision error handling
        try:
            T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx)
        except ZeroDivisionError:
            T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx - 0.01)
        try:
            T1 = (s_px + s_dx * T2 - r_px) / r_dx
        except ZeroDivisionError:
            T1 = (s_px + s_dx * T2 - r_px) / (r_dx - 0.01)
        # Must be within parametic whatevers for RAY/SEGMENT
        if T1 < 0: return None
        if T2 < 0 or T2 > 1: return None
        # Return the POINT OF INTERSECTION
        return {
            " x ": r_px + r_dx * T1,
            " y ": r_py + r_dy * T1,
            " param ": T1
        }

    def draw_polygon(self, polygon, color):
        # collect coordinates for a giant polygon
        points = []
        for intersect in polygon:
            points.append((intersect[' x '], intersect[' y ']))
        # draw as a giant polygon
        pygame.gfxdraw.aapolygon(self.screen, points, color)
        pygame.gfxdraw.filled_polygon(self.screen, points, color)



demo = SightAndLight()
demo.run() 
```

## 志哥的 war of aircraft

### 主文件

```python
import pygame
from AircraftBattle_sprites import *


class AircraftGame(object):
    def __init__(self):
        print('~~游戏初始化~~')
        # pygame.init()
        self.screen = pygame.display.set_mode(SEREEN_RECT.size) #该方法返回的是surface对象
        self.__create_sprites()
        self.clock = pygame.time.Clock()
        pygame.time.set_timer(CREAT_ENEMY_EVENT,1000)
        pygame.time.set_timer(MYAIRCRAFT_FIRE,500)

    def start_game(self):
        print('开始游戏')
        while True:
            self.clock.tick(FRAME_PER_SECOND)
            self.__event_listen()
            self.__collide_detect()
            self.__update_sprites()
            pygame.display.update()

    def __create_sprites(self):
        bg1 = Background()
        bg2 = Background(True)
        self.bg_group = pygame.sprite.Group(bg1, bg2)
        self.enemy_group = pygame.sprite.Group()
        self.myAircraft = MyAircraft()
        self.myAircraft_group = pygame.sprite.Group(self.myAircraft)

    def __collide_detect(self):
        pygame.sprite.groupcollide(self.enemy_group, self.myAircraft.bullet_group, True, True)
        enemy_list = pygame.sprite.spritecollide(self.myAircraft, self.enemy_group, True)
        if len(enemy_list):
            self.myAircraft.kill()
            self.__game_over()

    def __event_listen(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.__game_over()
            elif event.type == CREAT_ENEMY_EVENT:
                enemy = Enemy()
                self.enemy_group.add(enemy)
            elif event.type == MYAIRCRAFT_FIRE:
                self.myAircraft.fire()
        event_list = pygame.key.get_pressed()
        if event_list[pygame.K_RIGHT]:
            self.myAircraft.speedx = 3
        elif event_list[pygame.K_LEFT]:
            self.myAircraft.speedx = -3
        elif event_list[pygame.K_UP]:
            self.myAircraft.speedy = -3
        elif event_list[pygame.K_DOWN]:
            self.myAircraft.speedy = 3
        else:
            self.myAircraft.speedx = 0
            self.myAircraft.speedy = 0

    def __update_sprites(self):
        self.bg_group.update()
        self.bg_group.draw(self.screen)
        self.enemy_group.update()
        self.enemy_group.draw(self.screen)
        self.myAircraft_group.update()
        self.myAircraft_group.draw(self.screen)
        self.myAircraft.bullet_group.update()
        self.myAircraft.bullet_group.draw(self.screen)

    @staticmethod
    def __game_over():
        print('游戏结束')
        pygame.quit()
        exit()


if __name__ == '__main__':
    aircraftGame = AircraftGame()
    aircraftGame.start_game()
```

### 类文件
```python
'''游戏精灵类'''
import random
import pygame

FRAME_PER_SECOND = 60
SEREEN_RECT = pygame.Rect(0, 0, 480, 600)
CREAT_ENEMY_EVENT = pygame.USEREVENT
MYAIRCRAFT_FIRE = pygame.USEREVENT + 1


class GameSprites(pygame.sprite.Sprite):
    '''所有精灵父级'''
    def __init__(self, image_src, speed=0):
        super().__init__()
        self.image = pygame.image.load(image_src)
        self.rect = self.image.get_rect()
        self.speed = speed

    def update(self, *args):
        self.rect.y += self.speed


class Background(GameSprites):
    '''背景精灵'''
    def __init__(self, is_alt=False):
        super().__init__('./images/background.png',2)
        if is_alt:
            self.rect.bottom = 0

    def update(self):
        super().update()
        if self.rect.top >= SEREEN_RECT.height:
            self.rect.bottom = 0


class Enemy(GameSprites):
    '''敌机精灵'''
    def __init__(self):
        super().__init__('./images/enemy1.png')
        self.speed = random.randint(1,4)
        self.rect.x = random.randrange(0 ,SEREEN_RECT.right-self.rect.width)
        self.rect.y = -self.rect.height

    def update(self, *args):
        super().update()
        if self.rect.top >= SEREEN_RECT.height:
            self.kill()

    def __del__(self):
        print('enemy is destroyed')


class MyAircraft(GameSprites):
    def __init__(self, speedx=0, speedy=0):
        super().__init__('./images/me1.png')
        self.rect.centerx = SEREEN_RECT.centerx
        self.rect.bottom = SEREEN_RECT.height - 60
        self.speedx = speedx
        self.speedy = speedy
        self.bullet_group = pygame.sprite.Group()

    def update(self, *args):
        self.rect.x += self.speedx
        self.rect.y += self.speedy
        if self.rect.x <= 0:
            self.rect.x = 0
        elif self.rect.right >= SEREEN_RECT.right:
            self.rect.right = SEREEN_RECT.right

    def fire(self):
        for i in range(3):
            bullet = Bullet()
            self.bullet_group.add(bullet)
            bullet.rect.centerx = self.rect.centerx
            bullet.rect.bottom = self.rect.top-20*i


class Bullet(GameSprites):
    def __init__(self):
        super().__init__('./images/bullet1.png', speed=-2)

    def update(self, *args):
        super().update()
        if self.rect.bottom <= 0:
            self.kill()
```

