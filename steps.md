


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
