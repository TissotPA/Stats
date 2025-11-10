# 🎯 Nouvelle répartition équilibrée des échelles

## Problème résolu
**AVANT** : 1 échelle à gauche, toutes les autres à droite
**APRÈS** : Répartition alternée équilibrée gauche/droite

## 📊 Nouvelle logique de répartition

Les échelles sont maintenant réparties de manière **alternée** selon l'ordre de sélection :

### Règle simple
- **1ère statistique sélectionnée** → Gauche
- **2ème statistique sélectionnée** → Droite  
- **3ème statistique sélectionnée** → Gauche
- **4ème statistique sélectionnée** → Droite

## 🎨 Exemples de répartition

### 1 statistique sélectionnée
- ✅ **Points seuls** → Gauche
- ✅ **Minutes seules** → Gauche  
- ✅ **Fautes seules** → Gauche

### 2 statistiques sélectionnées
- ✅ **Points + Minutes** → Points(Gauche) + Minutes(Droite)
- ✅ **Points + Fautes** → Points(Gauche) + Fautes(Droite)
- ✅ **Minutes + Points** → Minutes(Gauche) + Points(Droite)

### 3 statistiques sélectionnées  
- ✅ **Points + Minutes + Fautes** → Points(G) + Minutes(D) + Fautes(G)
- ✅ **Minutes + Fautes + Points** → Minutes(G) + Fautes(D) + Points(G)

### 4 statistiques sélectionnées
- ✅ **Toutes** → 1ère(G) + 2ème(D) + 3ème(G) + 4ème(D)

## 🔧 Améliorations apportées

### Grille principale intelligente
Seule la **première échelle de gauche** affiche sa grille sur toute la zone de graphique :
- ✅ Évite la superposition de grilles
- ✅ Garde une référence visuelle claire
- ✅ Couleur de grille cohérente avec l'axe

### Positionnement équilibré
- ✅ **Répartition 50/50** au lieu de 1 vs tous
- ✅ **Lisibilité améliorée** des deux côtés
- ✅ **Espace optimisé** pour chaque échelle

### Ordre préservé
L'ordre de sélection des checkboxes détermine la priorité de positionnement

## 📋 Test recommandé

1. **Sélectionner Points** → Gauche ✓
2. **Ajouter Minutes** → Minutes à droite ✓  
3. **Ajouter Fautes** → Fautes à gauche ✓
4. **Ajouter Points/min** → Points/min à droite ✓

**Résultat attendu** : Points et Fautes à gauche, Minutes et Points/min à droite