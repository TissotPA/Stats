// Script de debug pour l'onglet Évolution
// Coller ce code dans la console du navigateur après avoir ouvert l'application

console.log("=== DEBUG ÉVOLUTION ===");

// Vérifier les données globales
console.log("1. Données globales:");
console.log("  - Players:", typeof players !== 'undefined' ? players.length : 'NON DÉFINI');
console.log("  - Matches:", typeof matches !== 'undefined' ? matches.length : 'NON DÉFINI');

if (typeof matches !== 'undefined' && matches.length > 0) {
    console.log("  - Premier match:", matches[0]);
    console.log("  - Structure playerStats du premier match:", Object.keys(matches[0].playerStats || {}));
}

// Vérifier les éléments DOM
console.log("\n2. Éléments DOM:");
const evolutionPlayerSelect = document.getElementById('evolutionPlayerSelect');
const statsSelector = document.getElementById('statsSelector');
const evolutionChartContainer = document.getElementById('evolutionChartContainer');
const evolutionMatches = document.getElementById('evolutionMatches');
const evolutionMatchesBody = document.getElementById('evolutionMatchesBody');

console.log("  - evolutionPlayerSelect:", !!evolutionPlayerSelect);
console.log("  - statsSelector:", !!statsSelector);
console.log("  - evolutionChartContainer:", !!evolutionChartContainer);
console.log("  - evolutionMatches:", !!evolutionMatches);
console.log("  - evolutionMatchesBody:", !!evolutionMatchesBody);

// Vérifier si la joueuse sélectionnée a des données
if (evolutionPlayerSelect && evolutionPlayerSelect.value) {
    const selectedPlayerId = evolutionPlayerSelect.value;
    console.log("\n3. Joueuse sélectionnée:", selectedPlayerId);
    
    if (typeof matches !== 'undefined') {
        const playerMatches = matches.filter(match => {
            const playerStats = match.playerStats[selectedPlayerId];
            return playerStats && playerStats.played;
        });
        console.log("  - Matchs trouvés pour cette joueuse:", playerMatches.length);
        
        if (playerMatches.length > 0) {
            console.log("  - Premier match de cette joueuse:", {
                opponent: playerMatches[0].opponent,
                date: playerMatches[0].date,
                stats: playerMatches[0].playerStats[selectedPlayerId]
            });
        }
    }
}

// Tester manuellement la fonction de mise à jour
console.log("\n4. Test des fonctions:");
console.log("Pour tester manuellement, vous pouvez exécuter:");
console.log("  updateEvolutionMatchesTable()");
console.log("  populateEvolutionPlayerSelect()");

console.log("\n=== FIN DEBUG ===");