# Test des échelles différenciées

## Modifications apportées

Le graphique d'évolution utilise maintenant des échelles Y différentes pour chaque type de statistique :

### 📊 **Points par match**
- **Échelle** : 0 à (max points + 2)
- **Couleur** : Bleu (#3b82f6)
- **Position** : Gauche (priorité)
- **Pas** : Automatique selon le maximum

### ⏱️ **Minutes par match** 
- **Échelle** : 0 à 40 minutes
- **Couleur** : Rouge (#ef4444)
- **Position** : Droite si points sélectionnés, sinon gauche
- **Pas** : 5 minutes

### ⚠️ **Fautes par match**
- **Échelle** : 0 à 5 fautes
- **Couleur** : Orange (#f59e0b)
- **Position** : Droite
- **Pas** : 1 faute

### 🎯 **Points par minute**
- **Échelle** : 0 à (max points/minute + 0.1)
- **Couleur** : Vert (#22c55e)
- **Position** : Droite
- **Pas** : 0.1, affiché avec 1 décimale

## Tests à effectuer

### 1. Test avec une seule statistique
- ✅ Points seuls → échelle gauche 0 à max+2
- ✅ Minutes seules → échelle gauche 0 à 40
- ✅ Fautes seules → échelle gauche 0 à 5
- ✅ Points/minute seuls → échelle gauche 0 à max+0.1

### 2. Test avec deux statistiques
- ✅ Points + Minutes → Points à gauche, Minutes à droite
- ✅ Points + Fautes → Points à gauche, Fautes à droite
- ✅ Minutes + Fautes → Minutes à gauche, Fautes à droite

### 3. Test avec trois statistiques
- ✅ Points + Minutes + Fautes → Toutes visibles avec couleurs distinctes

### 4. Test avec toutes les statistiques
- ✅ Les 4 statistiques affichées simultanément

## Comportement attendu

- **Échelles adaptées** : Chaque métrique a son échelle appropriée
- **Couleurs cohérentes** : Les couleurs des axes correspondent aux courbes
- **Lisibilité** : Les valeurs sont bien espacées et lisibles
- **Performance** : Pas de ralentissement notable

## Commandes de debug

Dans la console du navigateur :

```javascript
// Vérifier les données calculées
console.log(calculateEvolutionData(1, ['points', 'minutes', 'fouls', 'pointsPerMinute']));

// Tester l'affichage du graphique
updateEvolutionChart();
```