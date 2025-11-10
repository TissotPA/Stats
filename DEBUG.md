# Guide de test pour l'onglet Évolution

## Problème rapporté
- Aucun match affiché dans l'historique
- Encadré blanc vide quand on sélectionne une statistique

## Étapes de test

### 1. Ouvrir l'application
- Ouvrir `index.html` dans le navigateur
- Ouvrir la console (F12 → Console)

### 2. Vérifier le chargement des données
- Regarder dans la console les messages :
  - `Données chargées: { players: X, matches: Y }`
  - `Exemple de match: {...}`

### 3. Aller dans l'onglet Évolution
- Cliquer sur l'onglet "Évolution" 
- Vérifier le message : `Populating evolution player select with X players`

### 4. Sélectionner une joueuse
- Choisir une joueuse dans le menu déroulant
- Vérifier le message : `Evolution player changed: [ID]`

### 5. Vérifier l'historique des matchs
- Regarder si le tableau se remplit
- Vérifier les messages :
  - `Updating matches table for player: [ID]`
  - `Available matches: X`
  - `Match [adversaire]: {...}`

### 6. Sélectionner une statistique
- Cocher une case (ex: Points/match)
- Vérifier si le graphique s'affiche

## Debug avancé

Si ça ne fonctionne pas, copier-coller le contenu de `debug-evolution.js` dans la console.

## Corrections possibles identifiées

1. **Structure des données** : Les `playerStats` utilisent des clés string ("1", "2"...) ✅ Corrigé
2. **Accès aux données** : Utilisation de `match.playerStats[playerId]` au lieu de `.find()` ✅ Corrigé
3. **Type de données** : Conversion `playerId.toString()` ✅ Corrigé

## Si le problème persiste

Vérifier :
- Le fichier JSON est-il chargé correctement ?
- Les fonctions sont-elles appelées dans le bon ordre ?
- Y a-t-il des erreurs JavaScript dans la console ?