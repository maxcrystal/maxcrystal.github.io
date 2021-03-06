---
layout: single
excerpt: "По умолчанию в *Domoticz* дашборд представляет собой список упорядоченных по категориям виджетов устройств, отмеченных пользователем, как избранные. Однако намного удобнее и нагляднее, если все необходимые выключатели и информеры нанесены на план дома. Для этого в общих настройках необходимо включить представление дашборда как <<Floorplan>>."
title: Как сделать план дома для дашборда *Domoticz*
header:
  teaser: "/assets/posts/domoticz_floorplan/plan.png"
categories:
  - Умный дом
tags:
  - умный дом
  - domoticz
  - floorplanner
comments: true
share: true
related: true
toc: true
toc_sticky: true
gallery1:
  - image_path: /assets/posts/domoticz_floorplan/step_1.png
    url: /assets/posts/domoticz_floorplan/step_1.png
    alt: "Страница настройки планов"
  - image_path: /assets/posts/domoticz_floorplan/step_2.png 
    url: /assets/posts/domoticz_floorplan/step_2.png
    alt: "Добваление плана" 
  - image_path: /assets/posts/domoticz_floorplan/step_3.png 
    url: /assets/posts/domoticz_floorplan/step_3.png
    alt: "Размещение устройств"
gallery2:
  - image_path: /assets/posts/domoticz_floorplan/floorplanner_3d.jpg
    url: /assets/posts/domoticz_floorplan/floorplanner_3d.jpg
    alt: "Интерфейс моделирования"
  - image_path: /assets/posts/domoticz_floorplan/floorplanner_render.jpg
    url: /assets/posts/domoticz_floorplan/floorplanner_render.jpg
    alt: "3D рендер" 
  - image_path: /assets/posts/domoticz_floorplan/floorplanner_real.jpg 
    url: /assets/posts/domoticz_floorplan/floorplanner_real.jpg
    alt: "Фото"
date: 2019-08-25 15:00 +0300
---

## Введение

По умолчанию в *Domoticz* дашборд представляет собой список упорядоченных по категориям виджетов устройств, отмеченных пользователем, как избранные. Однако намного удобнее и нагляднее, если все необходимые выключатели и информеры нанесены на план дома. Для этого в общих настройках необходимо включить представление дашборда как <<Floorplan>>.

![Floorplan Dashboard](/assets/posts/domoticz_floorplan/domoticz_settings.png)

## Добавление плана

Конечно, прежде надо план или несколько планов добавить в *Domoticz*. Сами планы представляют собой просто картинки, содержание которых полностью зависит от вашей фантазии: можно просто от руки набросать схему или взять фотографии комнат. 

Процесс добавления планов вполне интуитивен. Сначала надо зайти на страницу настроек планов `Settings > More Options > Plans > Floorplans`, далее добавить план, нажав на кнопку `Add` . В появившемся окне выбора файла также можно дать плану название и выбрать масштаб иконок устройств (их размер изначально задан в пикселях, поэтому может меняться в масштабе относительно изображения плана, в зависимости от его размера в пикселях). Затем необходимо разместить на плане устройства, а также можно задать области отдельных комнат при нажатии на которые, план будет приближаться.

{% include gallery id="gallery1" caption="Добавление плана и размещение на нем устройств" %}

## Редактирование плана

Если что-то из параметров плана надо поправить, то это можно сделать на той же странице настроек плана, но есть одно *но* --- нельзя заменить само изображение плана. Несмотря на то, что *Domoticz* продолжает активно развиваться и, например, буквально несколько дней назад обновления статусов устройств, отображаемых на плане, перевели на *WebSockets* вместо опроса статусов по таймеру, что, конечно, улучшило его интерактивность, возможность  замены изображения плана через пользовательский интерфейс пока никто не реализовал. Если вы уже разместили на плане более 50 устройств, то, конечно, не хочется проделывать всю эту кропотливую работу повторно, когда надо, например, новую лампу на план добавить. Однако есть решение. Все пользовательские данные, включая изображения планов, *Domoticz* хранит в *SQLite* базе данных в файле `domoticz.db`. Поэтому можно заменить файл в базе данных, либо используя любую программу редактирования баз данных *SQLite*, либо, что еще проще, через интерфейс командной строки `sqlite3`.

Как это сделать? Для начала лучше остановить *Domoticz*, чтобы избежать конфликтных ситуаций при обращении к базе данных. Затем надо запустить `sqlite3` и открыть файл с базой данных, используя служебную команду `.open`:

```bash
$ sudo systemctl stop domoticz
$ sqlite3
  > SQLite version 3.24.0 2018-06-04 14:10:15
  > Enter ".help" for usage hints.
  > Connected to a transient in-memory database.
  > Use ".open FILENAME" to reopen on a persistent database.
sqlite> .open domoticz.db
```

Если вывести на экран данные, хранимые в таблице `Floorplans`, то можно увидеть знаки `????` в поле `Image`, --- здесь хранится бинарный массив данных, составляющих изображение нашего плана: 

```bash
sqlite> .headers on
sqlite> SELECT * FROM Floorplans;
  > ID|Name|Image|ScaleFactor|Order
  > 1|My_floor_plan|????|2.6|1
```

Дальше просто заменяем эти данные на данные из файла с исправленным планом (`new_floor_plan.jpg` в примере ниже), в строке таблицы с соответсвующим `ID`. Для этого в `sqlite3` есть специальная команда `readfile`. И заново запускаем *Domoticz*:

```bash
sqlite> UPDATE Floorplans SET Image=readfile('new_floor_plan.jpg') WHERE ID=1;
sqlite> .quit
$ sudo systemctl start domoticz
```

Предварительно надо убедиться, что размер нового плана в пикселях совпадает с предыдущим, иначе уже размещенные до этого на плане устройства не окажутся в нужных местах, т.к. их коордитнаты определены в пикселях от края изображения.

## Как нарисовать красивый план

Все зависит от ваших способностей и фантазии. Поскольку у меня с художественными навыками не очень, то я воспользовался сервисом [Floorplanner.com](https://floorplanner.com), который обладает интуитивно понятным интерфейсом и достаточно большой базой моделей мебели.

{% include gallery id="gallery2" caption="Интерфейс Floorplanner.com: режим моделирования (слева), 3D рендер (по центру) и реальное фото (справа)" %}

Что касается размера файла изображения плана, то он не будет сильно влиять на скорость загрузки интерфейса *Domoticz*, т.к. если все правильно настроено, то все статические страницы, включая изображения плана, будут храниться в кэше приложения в вашем браузере и загружаться оттуда.