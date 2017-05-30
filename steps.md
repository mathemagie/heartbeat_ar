TOC

Introduction to the workshop 

The team

Introduction to Arduino

Introduction to the HeartBeat AR

Review your kit

Make it blink (LED blink) pour se faire la main sur l'IDE arduino, push du code, console de debug 

add pulse sensor (test sketch.ino) debug de la valeur dans la console

intro webAR

HeartBeat AR

To go further

# Workshop Heart

```
+--------------+        +---------+        +-----------+
|              |        |         |        |           |
| Heart Sensor +--------+ Arduino +--------+    PC     |
|              |        |         |        |     +     |
+--------------+        +---------+        |     |     |
                                           |     +     |
                                           |   NodeJS  |
                                           |     +     |
                                           |     |     |
                                           |     +     |
                                           |  Browser  |
                                           |           |
                                           +-----------+
```

## Prerequisisites

 - Arduino editor
 - Node + npm

## Connexion hardware

Arduino + heart

## Code Arduino

Tester avec sketch.ino et la console série que tout est OK

### Firmata

Uploader firmware StandardFirmataPlus

## Code NodejS

serveur express + socket.io

copier le code et vérifier que cela tourne avec la page de test

## Page web test desktop

S'assurer avec la page de test que le sensor fonctionne bien

Expliquer le code html, css, js coté client

#### génération du barcode

générer et afficher le barcode pour accéder à l'url facilement

### Add a-frame

Ajouter une scene a-frame

#### Add marker

Ajouter AR.js et un marker de test

#### Add heart model

Créer le modèle avec MagicaVoxel

Loader le model heart

#### Animer le heart avec le pulse sensor

Et voila!


#### Conclusion 

visionner court métrage hyper réality 

slides évolution de l'informatique => Desktop =>  mobile => wearable => AR + screenchot lunettes full AR de Faceook 

exemples réalité diminuée, altérée, augmentée, mixte, révélée 

cyborg design 

référénce de livre de SF 
 
