# Interface Web - Statistiques Basket Féminin

## Description
Une interface web moderne et interactive pour gérer les statistiques d'une équipe de basket féminine de 11 joueuses.

## Fonctionnalités

### 📊 Statistiques des Joueuses
- Prénom et numéro de chaque joueuse
- Nombre de matchs joués
- Points totaux et moyenne par match
- Minutes totales et moyenne par match
- Interface de recherche par nom ou numéro

### 🏆 Statistiques d'Équipe
- Bilan général (victoires/défaites)
- Bilan à domicile
- Points marqués par match (moyenne)
- Points encaissés par match (moyenne)
- Pourcentage aux lancers francs
- Pourcentage de victoires
- Pourcentage de victoires à domicile

### 🏀 Gestion des Matchs
- Ajout de nouveaux matchs via formulaire interactif
- **Modification** des matchs existants (correction d'erreurs)
- **Suppression** des matchs avec recalcul automatique des statistiques
- Saisie des statistiques individuelles pour chaque joueuse
- Historique complet des matchs
- Calcul automatique des statistiques

## 💾 Stockage des Données

### Persistance Automatique
- **Stockage Local** : Toutes les données sont automatiquement sauvegardées dans le stockage local du navigateur (localStorage)
- **Sauvegarde Automatique** : Chaque ajout de match déclenche une sauvegarde automatique
- **Persistance** : Les données restent disponibles même après fermeture du navigateur

### Gestion des Données
- **Export** : Téléchargez vos données au format JSON pour sauvegarde externe
- **Import** : Importez des données depuis un fichier JSON
- **Effacement** : Bouton pour supprimer toutes les données (avec confirmation)

### Sécurité
- Les données restent uniquement sur votre ordinateur
- Aucune transmission vers des serveurs externes
- Contrôle total de vos informations

## Utilisation

### Pour ouvrir l'application :

#### 🎯 **Méthode Simple (Recommandée) :**
1. **Double-cliquez** sur le fichier `index.html`
2. L'application s'ouvre automatiquement dans votre navigateur par défaut

#### 🖱️ **Autres méthodes :**
- **Clic droit** sur `index.html` → "Ouvrir avec" → Choisir votre navigateur
- **Glisser-déposer** le fichier dans une fenêtre de navigateur
- **Dans le navigateur :** Ctrl+O → Sélectionner `index.html`

#### 💡 **Serveur local (optionnel) :**
Un serveur local n'est **pas nécessaire** - l'application fonctionne parfaitement en ouvrant directement le fichier HTML.

### Ajouter un match :
1. Cliquez sur le bouton "Ajouter un match"
2. Remplissez les informations du match (adversaire, date, lieu, score, etc.)
3. Saisissez les statistiques de chaque joueuse
4. Validez pour enregistrer

### Modifier un match :
1. Dans l'onglet "Matchs", cliquez sur l'icône ✏️ (crayon) du match à modifier
2. Le formulaire se pré-remplit avec les données existantes
3. Modifiez les informations nécessaires
4. Validez pour sauvegarder les changements

### Supprimer un match :
1. Dans l'onglet "Matchs", cliquez sur l'icône 🗑️ (poubelle) du match à supprimer
2. Confirmez la suppression
3. Les statistiques sont automatiquement recalculées

### Navigation :
- **Onglet Joueuses** : Voir les statistiques individuelles
- **Onglet Équipe** : Voir les statistiques globales
- **Onglet Matchs** : Consulter l'historique des rencontres

## Structure du Projet

```
├── index.html          # Structure principale de l'interface
├── styles.css          # Styles modernes et responsive
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## Caractéristiques Techniques

- **Design** : Interface moderne avec dégradés et animations
- **Responsive** : Adapté aux écrans mobiles et desktop
- **Interactive** : Animations fluides et effets visuels
- **Données** : Stockage local dans le navigateur
- **Performance** : Code optimisé et léger

## Données d'Exemple
L'application inclut 3 matchs d'exemple pour démontrer les fonctionnalités :
- Match contre Lyon Basket Féminin (Victoire 68-62 à domicile)
- Match contre Marseille BC (Défaite 55-61 à l'extérieur)
- Match contre Toulouse Basket (Victoire 72-58 à domicile)

## Joueuses de l'Équipe
1. Noémie (#4)
2. Ludivine (#5)
3. Marina (#6)
4. Emma (#7)
5. Lou-Ann (#8)
6. Julie C. (#9)
7. Sonia (#11)
8. Julie L. (#12)
9. Charlène (#13)
10. Clémence (#14)
11. Constance (#15)

## Fonctionnalités Avancées

### Gestion des Données
- **Sauvegarde Automatique** : Stockage local dans le navigateur
- **Export/Import** : Sauvegarde et restauration des données au format JSON
- **Effacement Sécurisé** : Suppression de toutes les données avec confirmation
- **Modification/Suppression** : Édition et suppression des matchs avec recalcul automatique

### Recherche
- Recherche en temps réel par nom ou numéro de joueuse

### Notifications
- Confirmations visuelles lors de l'ajout de matchs
- Messages d'erreur en cas de problème
- Notifications de succès pour les opérations

### Animations
- Transitions fluides entre les onglets
- Animations d'apparition des cartes
- Effets de survol interactifs

## Navigateurs Supportés
- Chrome (recommandé)
- Firefox
- Safari
- Edge

## Améliorations Futures Possibles
- Sauvegarde des données dans une base de données
- Export/Import des statistiques
- Graphiques et visualisations avancées
- Comparaisons entre saisons
- Statistiques défensives avancées
- Gestion des remplacements
- Calendrier des matchs

## Support
Pour toute question ou amélioration, n'hésitez pas à me contacter.