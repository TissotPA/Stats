# 🏀 Système de dépliage des matchs

## 🎯 Nouvelle fonctionnalité ajoutée

L'onglet **Matchs** dispose maintenant d'un système de **dépliage interactif** pour afficher les statistiques individuelles de chaque joueuse par match.

## 📋 Fonctionnalités

### ✨ **Interaction principale**
- **Clic sur un match** → Déplie/replie les statistiques individuelles
- **Animation fluide** avec icône qui pivote (chevron)
- **Effet visuel** : surbrillance au survol

### 👥 **Affichage des statistiques**

#### **Joueuses ayant participé**
- **Carte détaillée** pour chaque joueuse
- **Numéro et nom** bien visibles
- **4 statistiques** affichées :
  - 📊 Points
  - ⏱️ Minutes  
  - ⚠️ Fautes
  - 🎯 Points/minute

#### **Joueuses n'ayant pas participé** 
- **Cartes simplifiées** avec numéro grisé
- **Regroupement séparé** pour la clarté

## 🎨 Design et UX

### **États visuels**
- 🔽 **Replié** : Chevron vers le bas
- 🔼 **Déplié** : Chevron vers le haut + classe "expanded"
- ✨ **Hover** : Léger effet de survol sur l'en-tête

### **Responsive**
- 📱 **Mobile** : Cartes en une colonne
- 💻 **Desktop** : Grille adaptative multi-colonnes
- 📊 **Statistiques** : Disposition optimisée par taille d'écran

### **Couleurs cohérentes**
- 🔴 **Rouge PRF** pour les éléments actifs
- ⚪ **Fond blanc** pour les cartes de joueuses
- 🔘 **Gris** pour les joueuses non-participantes

## 🔧 Comportement technique

### **Clics intelligents**
- ✅ Clic sur l'en-tête → Déplie/replie
- ❌ Clic sur les boutons d'action → N'interfère pas avec le dépliage
- 🛡️ Protection contre la propagation d'événements

### **Performance**
- 🚀 **HTML généré** à la création (pas de recalcul)
- 💨 **Animations CSS** fluides et optimisées
- 🎯 **Affichage conditionnel** (display: none/block)

## 📋 Tests recommandés

### 1. **Test de base**
- ✅ Aller dans l'onglet "Matchs"
- ✅ Cliquer sur un match
- ✅ Vérifier l'affichage des statistiques
- ✅ Re-cliquer pour replier

### 2. **Test des actions**
- ✅ Cliquer sur "Modifier" → Ne déplie pas
- ✅ Cliquer sur "Supprimer" → Ne déplie pas  
- ✅ Cliquer sur l'en-tête → Déplie normalement

### 3. **Test responsive**
- 📱 Tester sur mobile/tablette
- 💻 Vérifier l'affichage desktop
- 📏 Redimensionner la fenêtre

### 4. **Test avec différents matchs**
- 👥 Match avec toutes les joueuses
- 🔄 Match avec joueuses partielles
- ❌ Match sans statistiques

## 🎉 Avantages

- **🔍 Consultation rapide** des performances individuelles
- **📊 Vue d'ensemble** et détail dans la même interface  
- **🎯 Navigation intuitive** avec feedback visuel
- **📱 Expérience optimale** sur tous les écrans
- **⚡ Performance** : pas de rechargement de données