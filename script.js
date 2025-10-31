// Données globales
let players = [];
let matches = [];
let currentTab = 'players';
let editingMatchId = null; // ID du match en cours d'édition

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application en cours de chargement...');
    loadDataFromStorage();
    initializeEventListeners();
    renderPlayers();
    renderTeamStats();
    renderMatches();
    console.log('Application chargée avec succès !');
});

// Gestion du stockage local
function saveDataToStorage() {
    const data = {
        players: players,
        matches: matches,
        lastUpdated: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('basketStats', JSON.stringify(data));
        console.log('Données sauvegardées dans le stockage local');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        showNotification('Erreur lors de la sauvegarde des données', 'error');
    }
}

function loadDataFromStorage() {
    try {
        const savedData = localStorage.getItem('basketStats');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            players = data.players || [];
            matches = data.matches || [];
            
            console.log('Données chargées depuis le stockage local');
            showNotification('Données chargées avec succès !', 'success');
        } else {
            // Première utilisation - charger les données d'exemple
            initializePlayers();
            initializeSampleData();
            saveDataToStorage();
            showNotification('Bienvenue ! Données d\'exemple chargées.', 'info');
        }
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        // En cas d'erreur, initialiser avec les données par défaut
        initializePlayers();
        initializeSampleData();
        showNotification('Erreur de chargement - données par défaut utilisées', 'error');
    }
}

function clearAllData() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.')) {
        localStorage.removeItem('basketStats');
        players = [];
        matches = [];
        initializePlayers();
        
        renderPlayers();
        renderTeamStats();
        renderMatches();
        
        showNotification('Toutes les données ont été supprimées', 'success');
    }
}

// Initialisation des joueuses (avec vos vraies joueuses)
function initializePlayers() {
    players = [
        { id: 1, prenom: 'Noémie', numero: 4, matches: 0, points: 0, minutes: 0 },
        { id: 2, prenom: 'Ludivine', numero: 5, matches: 0, points: 0, minutes: 0 },
        { id: 3, prenom: 'Marina', numero: 6, matches: 0, points: 0, minutes: 0 },
        { id: 4, prenom: 'Emma', numero: 7, matches: 0, points: 0, minutes: 0 },
        { id: 5, prenom: 'Lou-Ann', numero: 8, matches: 0, points: 0, minutes: 0 },
        { id: 6, prenom: 'Julie C.', numero: 9, matches: 0, points: 0, minutes: 0 },
        { id: 7, prenom: 'Sonia', numero: 11, matches: 0, points: 0, minutes: 0 },
        { id: 8, prenom: 'Julie L.', numero: 12, matches: 0, points: 0, minutes: 0 },
        { id: 9, prenom: 'Charlène', numero: 13, matches: 0, points: 0, minutes: 0 },
        { id: 10, prenom: 'Clémence', numero: 14, matches: 0, points: 0, minutes: 0 },
        { id: 11, prenom: 'Constance', numero: 15, matches: 0, points: 0, minutes: 0 }
    ];
}

// Initialisation des données d'exemple
function initializeSampleData() {
    // Quelques matchs d'exemple
    const sampleMatches = [
        {
            id: 1,
            opponent: 'Lyon Basket Féminin',
            date: '2024-10-20',
            location: 'domicile',
            result: 'victoire',
            ourScore: 68,
            opponentScore: 62,
            freeThrowsMade: 12,
            freeThrowsAttempted: 16,
            ranking: 5,
            attackRanking: 3,
            defenseRanking: 7,
            playerStats: {
                1: { points: 14, minutes: 32, played: true },
                2: { points: 8, minutes: 28, played: true },
                3: { points: 12, minutes: 30, played: true },
                4: { points: 6, minutes: 25, played: true },
                5: { points: 10, minutes: 22, played: true },
                6: { points: 4, minutes: 18, played: true },
                7: { points: 8, minutes: 20, played: true },
                8: { points: 6, minutes: 15, played: true },
                9: { points: 0, minutes: 10, played: true },
                10: { points: 0, minutes: 0, played: false },
                11: { points: 0, minutes: 0, played: false }
            }
        },
        {
            id: 2,
            opponent: 'Marseille BC',
            date: '2024-10-15',
            location: 'exterieur',
            result: 'defaite',
            ourScore: 55,
            opponentScore: 61,
            freeThrowsMade: 8,
            freeThrowsAttempted: 12,
            ranking: 6,
            attackRanking: 4,
            defenseRanking: 8,
            playerStats: {
                1: { points: 12, minutes: 35, played: true },
                2: { points: 10, minutes: 32, played: true },
                3: { points: 8, minutes: 28, played: true },
                4: { points: 9, minutes: 30, played: true },
                5: { points: 6, minutes: 25, played: true },
                6: { points: 4, minutes: 20, played: true },
                7: { points: 6, minutes: 18, played: true },
                8: { points: 0, minutes: 12, played: true },
                9: { points: 0, minutes: 0, played: false },
                10: { points: 0, minutes: 0, played: false },
                11: { points: 0, minutes: 0, played: false }
            }
        },
        {
            id: 3,
            opponent: 'Toulouse Basket',
            date: '2024-10-08',
            location: 'domicile',
            result: 'victoire',
            ourScore: 72,
            opponentScore: 58,
            freeThrowsMade: 15,
            freeThrowsAttempted: 18,
            ranking: 4,
            attackRanking: 2,
            defenseRanking: 6,
            playerStats: {
                1: { points: 16, minutes: 30, played: true },
                2: { points: 12, minutes: 28, played: true },
                3: { points: 14, minutes: 32, played: true },
                4: { points: 8, minutes: 26, played: true },
                5: { points: 8, minutes: 24, played: true },
                6: { points: 6, minutes: 22, played: true },
                7: { points: 4, minutes: 18, played: true },
                8: { points: 4, minutes: 16, played: true },
                9: { points: 0, minutes: 4, played: true },
                10: { points: 0, minutes: 0, played: false },
                11: { points: 0, minutes: 0, played: false }
            }
        }
    ];

    // Ajouter les matchs d'exemple
    matches = sampleMatches;

    // Calculer les statistiques des joueuses basées sur les matchs
    players.forEach(player => {
        player.matches = 0;
        player.points = 0;
        player.minutes = 0;
        player.fouls = 0;

        matches.forEach(match => {
            const stats = match.playerStats[player.id];
            if (stats && stats.played) {
                player.matches += 1;
            }
            if (stats) {
                player.points += stats.points;
                player.minutes += stats.minutes;
                player.fouls += stats.fouls || 0;
            }
        });
    });
}

// Initialisation des événements
function initializeEventListeners() {
    console.log('Initialisation des événements...');
    
    // Navigation entre onglets
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Bouton d'ajout de match
    const addMatchBtn = document.getElementById('addMatchBtn');
    if (addMatchBtn) {
        addMatchBtn.addEventListener('click', openMatchModal);
        console.log('Bouton "Ajouter un match" configuré');
    }
    
    // Boutons de gestion des données
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
        console.log('Bouton "Exporter" configuré');
    }
    
    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', importData);
        console.log('Bouton "Importer" configuré');
    }
    
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', clearAllData);
        console.log('Bouton "Effacer" configuré');
    }
    
    // Modal
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', closeMatchModal);
    }
    
    const cancelMatch = document.getElementById('cancelMatch');
    if (cancelMatch) {
        cancelMatch.addEventListener('click', closeMatchModal);
    }
    
    // Fermeture modal par clic à l'extérieur
    const modal = document.getElementById('addMatchModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeMatchModal();
        });
    }

    // Formulaire de match
    const matchForm = document.getElementById('matchForm');
    if (matchForm) {
        matchForm.addEventListener('submit', handleMatchSubmit);
    }

    // Recherche de joueuses
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', handlePlayerSearch);
    }
    
    // Initialisation des graphiques
    initializeCharts();
    initializePlayerCharts();
    
    console.log('Tous les événements ont été configurés');
}

// Gestion des onglets
function switchTab(tab) {
    currentTab = tab;
    
    // Mise à jour des boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Mise à jour du contenu
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tab);
    });
    
    // Mettre à jour les graphiques selon l'onglet
    if (tab === 'dashboard') {
        setTimeout(() => renderDashboard(), 100);
    } else if (tab === 'comparison') {
        setTimeout(() => initializeComparison(), 100);
    } else if (tab === 'team') {
        setTimeout(() => updateChart(), 100);
    } else if (tab === 'players') {
        setTimeout(() => {
            populatePlayerSelect();
            updatePlayerChart();
        }, 100);
    }
}

// Variables globales pour le dashboard
let dashboardChart = null;
let comparisonRadarChart = null;
let selectedPlayers = [];

// Rendu du tableau de bord
function renderDashboard() {
    updateDashboardSummary();
    updateRecentMatches();
    updatePerformanceHighlights();
    updateDashboardChart();
    updateCurrentDate();
}

// Mise à jour de la date actuelle
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateElement.textContent = now.toLocaleDateString('fr-FR', options);
    }
}

// Mise à jour du résumé
function updateDashboardSummary() {
    const totalMatches = matches.length;
    const victories = matches.filter(m => m.result === 'victoire').length;
    const defeats = totalMatches - victories;
    
    const totalPointsScored = matches.reduce((sum, m) => sum + m.ourScore, 0);
    const avgPointsScored = totalMatches > 0 ? (totalPointsScored / totalMatches).toFixed(1) : '0.0';
    
    // Trouver la top scoreuse (moyenne par match)
    let topPlayer = '-';
    if (players.length > 0 && totalMatches > 0) {
        let bestAverage = 0;
        let bestPlayer = null;
        
        players.forEach(player => {
            let matchesPlayed = 0;
            let totalPoints = 0;
            
            matches.forEach(match => {
                const playerStats = match.playerStats[player.id];
                if (playerStats && playerStats.played) {
                    matchesPlayed++;
                    totalPoints += playerStats.points || 0;
                }
            });
            
            if (matchesPlayed > 0) {
                const average = totalPoints / matchesPlayed;
                if (average > bestAverage) {
                    bestAverage = average;
                    bestPlayer = player;
                }
            }
        });
        
        if (bestPlayer && bestAverage > 0) {
            topPlayer = `${bestPlayer.prenom} (${bestAverage.toFixed(1)}pts/match)`;
        }
    }
    
    // Mettre à jour les éléments
    const elements = {
        'dashboardRecord': `${victories}-${defeats}`,
        'dashboardMatches': totalMatches.toString(),
        'dashboardAvgPoints': avgPointsScored,
        'dashboardTopPlayer': topPlayer
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// Mise à jour des derniers matchs
function updateRecentMatches() {
    const recentMatchesContainer = document.getElementById('recentMatches');
    if (!recentMatchesContainer) return;
    
    if (matches.length === 0) {
        recentMatchesContainer.innerHTML = `
            <div class="empty-state">
                <p>Aucun match joué pour le moment</p>
            </div>
        `;
        return;
    }
    
    // Prendre les 5 derniers matchs
    const recentMatches = [...matches]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    recentMatchesContainer.innerHTML = recentMatches.map(match => {
        const date = new Date(match.date);
        const formattedDate = date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'short' 
        });
        
        return `
            <div class="recent-match ${match.result}">
                <div class="recent-match-info">
                    <div class="recent-match-opponent">${match.opponent}</div>
                    <div class="recent-match-date">${formattedDate} - ${match.location === 'domicile' ? 'Domicile' : 'Extérieur'}</div>
                </div>
                <div class="recent-match-score">${match.ourScore}-${match.opponentScore}</div>
            </div>
        `;
    }).join('');
}

// Mise à jour des performances récentes
function updatePerformanceHighlights() {
    const performanceContainer = document.getElementById('performanceHighlights');
    if (!performanceContainer) return;
    
    if (matches.length === 0) {
        performanceContainer.innerHTML = `
            <div class="empty-state">
                <p>Aucune donnée de performance disponible</p>
            </div>
        `;
        return;
    }
    
    const highlights = [];
    
    // Meilleur match récent (points)
    if (matches.length > 0) {
        const bestMatch = matches.reduce((max, match) => 
            match.ourScore > max.ourScore ? match : max
        );
        highlights.push({
            player: 'Équipe',
            stat: `${bestMatch.ourScore} points`,
            description: `Meilleur score vs ${bestMatch.opponent}`
        });
    }
    
    // Meilleure joueuse des 3 derniers matchs
    if (matches.length >= 3 && players.length > 0) {
        const lastThreeMatches = [...matches]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        let bestRecentPlayer = null;
        let bestRecentPoints = 0;
        
        players.forEach(player => {
            let recentPoints = 0;
            lastThreeMatches.forEach(match => {
                const playerStats = match.playerStats[player.id];
                if (playerStats && playerStats.played) {
                    recentPoints += playerStats.points || 0;
                }
            });
            
            if (recentPoints > bestRecentPoints) {
                bestRecentPoints = recentPoints;
                bestRecentPlayer = player;
            }
        });
        
        if (bestRecentPlayer && bestRecentPoints > 0) {
            highlights.push({
                player: bestRecentPlayer.prenom,
                stat: `${bestRecentPoints} points`,
                description: `Sur les 3 derniers matchs`
            });
        }
    }
    
    // Série actuelle
    if (matches.length > 0) {
        const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
        let currentStreak = 0;
        let streakType = '';
        
        for (const match of sortedMatches) {
            if (currentStreak === 0) {
                streakType = match.result;
                currentStreak = 1;
            } else if (match.result === streakType) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        if (currentStreak > 1) {
            highlights.push({
                player: 'Équipe',
                stat: `${currentStreak} ${streakType === 'victoire' ? 'victoires' : 'défaites'}`,
                description: 'Série en cours'
            });
        }
    }
    
    if (highlights.length === 0) {
        performanceContainer.innerHTML = `
            <div class="empty-state">
                <p>Jouez quelques matchs pour voir les performances !</p>
            </div>
        `;
        return;
    }
    
    performanceContainer.innerHTML = highlights.map(highlight => `
        <div class="performance-item">
            <div class="performance-player">${highlight.player}</div>
            <div class="performance-stat">${highlight.stat}</div>
            <div class="performance-description">${highlight.description}</div>
        </div>
    `).join('');
}

// Mise à jour du graphique rapide
function updateDashboardChart() {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;
    
    if (dashboardChart) {
        dashboardChart.destroy();
    }
    
    if (matches.length === 0) {
        return;
    }
    
    const sortedMatches = [...matches].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = sortedMatches.map(match => {
        const date = new Date(match.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    });
    
    const pointsData = sortedMatches.map(match => match.ourScore);
    const resultColors = sortedMatches.map(match => 
        match.result === 'victoire' ? '#22c55e' : '#ef4444'
    );
    
    dashboardChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Points marqués',
                data: pointsData,
                borderColor: '#c53030',
                backgroundColor: 'rgba(197, 48, 48, 0.1)',
                tension: 0.4,
                pointBackgroundColor: resultColors,
                pointBorderColor: resultColors,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Évolution des points marqués',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const match = sortedMatches[context.dataIndex];
                            return [
                                `vs ${match.opponent}`,
                                `Résultat: ${match.result === 'victoire' ? 'Victoire' : 'Défaite'}`,
                                `Score: ${match.ourScore}-${match.opponentScore}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Points'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Matchs'
                    }
                }
            }
        }
    });
}

// ===== FONCTIONS DE COMPARAISON =====

// Initialisation de la section comparaison
function initializeComparison() {
    console.log('DEBUG: Initialisation de la comparaison');
    console.log('DEBUG: Nombre de joueuses disponibles:', players.length);
    
    populateComparisonSelects();
    setupComparisonEventListeners();
    updateComparisonDisplay();
    
    console.log('DEBUG: Comparaison initialisée');
}

// Remplir les sélecteurs de comparaison
function populateComparisonSelects() {
    const selects = ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">-- Sélectionner --</option>';
            
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = `${player.prenom} (#${player.numero})`;
                select.appendChild(option);
            });
            
            // Restaurer la valeur si elle existe encore
            if (currentValue && players.find(p => p.id === currentValue)) {
                select.value = currentValue;
            }
        }
    });
}

// Configuration des événements pour la comparaison
function setupComparisonEventListeners() {
    console.log('DEBUG: Configuration des événements de comparaison');
    
    // Événements sur les sélecteurs
    ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            console.log('DEBUG: Ajout événement sur', selectId);
            select.addEventListener('change', handlePlayerSelection);
        } else {
            console.error('DEBUG: Élément non trouvé:', selectId);
        }
    });
    
    // Bouton de réinitialisation
    const resetBtn = document.getElementById('resetComparison');
    if (resetBtn) {
        console.log('DEBUG: Bouton reset trouvé');
        resetBtn.addEventListener('click', resetComparison);
    } else {
        console.error('DEBUG: Bouton reset non trouvé');
    }
}

// Gestion de la sélection d'une joueuse
function handlePlayerSelection(event) {
    console.log('DEBUG: Sélection changée:', event.target.id, '=', event.target.value);
    updateSelectedPlayers();
    updateComparisonDisplay();
}

// Mettre à jour la liste des joueuses sélectionnées
function updateSelectedPlayers() {
    console.log('DEBUG: Mise à jour des joueuses sélectionnées');
    selectedPlayers = [];
    
    ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select && select.value) {
            console.log('DEBUG: Sélecteur', selectId, 'a la valeur:', select.value, 'type:', typeof select.value);
            
            // Essayer de trouver la joueuse par ID (string et number)
            let player = players.find(p => p.id === select.value);
            if (!player) {
                // Essayer avec conversion en number
                player = players.find(p => p.id == select.value);
            }
            if (!player) {
                // Essayer avec conversion string
                player = players.find(p => p.id.toString() === select.value);
            }
            
            if (player) {
                console.log('DEBUG: Joueuse trouvée:', player.prenom, 'ID:', player.id, 'type:', typeof player.id);
                selectedPlayers.push(player);
            } else {
                console.error('DEBUG: Joueuse non trouvée pour ID:', select.value);
                console.log('DEBUG: IDs disponibles:', players.map(p => ({ id: p.id, type: typeof p.id, prenom: p.prenom })));
            }
        }
    });
    
    console.log('DEBUG: Joueuses sélectionnées:', selectedPlayers.length, selectedPlayers.map(p => p.prenom));
    
    // Empêcher la sélection de la même joueuse plusieurs fois
    validatePlayerSelection();
}

// Valider que chaque joueuse n'est sélectionnée qu'une fois
function validatePlayerSelection() {
    const selects = ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'];
    const selectedIds = selects.map(id => document.getElementById(id)?.value).filter(v => v);
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            Array.from(select.options).forEach(option => {
                if (option.value && option.value !== select.value) {
                    option.disabled = selectedIds.includes(option.value);
                }
            });
        }
    });
}

// Réinitialiser la comparaison
function resetComparison() {
    ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.value = '';
            select.classList.remove('selected');
        }
    });
    
    selectedPlayers = [];
    updateComparisonDisplay();
}

// Mettre à jour l'affichage de la comparaison
function updateComparisonDisplay() {
    console.log('DEBUG: Mise à jour affichage comparaison, joueuses:', selectedPlayers.length);
    
    const messageElement = document.getElementById('comparisonMessage');
    const radarSection = document.getElementById('comparisonRadarSection');
    const tableSection = document.getElementById('comparisonTableSection');
    
    console.log('DEBUG: Éléments trouvés:', {
        message: !!messageElement,
        radar: !!radarSection,
        table: !!tableSection
    });
    
    // Mettre à jour les classes des sélecteurs
    ['comparePlayer1', 'comparePlayer2', 'comparePlayer3'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            if (select.value) {
                select.classList.add('selected');
            } else {
                select.classList.remove('selected');
            }
        }
    });
    
    if (selectedPlayers.length < 2) {
        // Pas assez de joueuses sélectionnées
        console.log('DEBUG: Pas assez de joueuses, affichage du message');
        if (messageElement) {
            messageElement.innerHTML = '<i class="fas fa-info-circle"></i> Sélectionnez au moins 2 joueuses pour commencer la comparaison';
            messageElement.className = 'comparison-message';
        }
        if (radarSection) radarSection.style.display = 'none';
        if (tableSection) tableSection.style.display = 'none';
    } else {
        // Comparaison possible
        console.log('DEBUG: Comparaison possible, génération des graphiques');
        if (messageElement) {
            messageElement.innerHTML = `<i class="fas fa-check-circle"></i> Comparaison de ${selectedPlayers.length} joueuses : ${selectedPlayers.map(p => p.prenom).join(', ')}`;
            messageElement.className = 'comparison-message success';
        }
        if (radarSection) radarSection.style.display = 'block';
        if (tableSection) tableSection.style.display = 'block';
        
        // Générer les graphiques et tableaux
        updateComparisonRadar();
        updateComparisonTable();
    }
}

// Mettre à jour le graphique radar de comparaison
function updateComparisonRadar() {
    const ctx = document.getElementById('comparisonRadarChart');
    if (!ctx || selectedPlayers.length < 2) return;
    
    if (comparisonRadarChart) {
        comparisonRadarChart.destroy();
    }
    
    // Définir les métriques à comparer
    const metrics = [
        { label: 'Matchs joués', key: 'matches' },
        { label: 'Points/match', key: 'pointsPerMatch' },
        { label: 'Minutes/match', key: 'minutesPerMatch' },
        { label: 'Points/minute', key: 'pointsPerMinute' },
        { label: 'Points totaux', key: 'points' },
        { label: 'Minutes totales', key: 'minutes' },
        { label: 'Fautes/match', key: 'foulsPerMatch' }
    ];
    
    // Calculer les valeurs normalisées pour chaque joueuse
    const datasets = selectedPlayers.map((player, index) => {
        const values = metrics.map(metric => {
            let value = 0;
            switch (metric.key) {
                case 'matches':
                    value = player.matches || 0;
                    break;
                case 'pointsPerMatch':
                    value = (player.matches > 0) ? (player.points || 0) / player.matches : 0;
                    break;
                case 'minutesPerMatch':
                    value = (player.matches > 0) ? (player.minutes || 0) / player.matches : 0;
                    break;
                case 'pointsPerMinute':
                    value = (player.minutes > 0) ? (player.points || 0) / player.minutes : 0;
                    break;
                case 'points':
                    value = player.points || 0;
                    break;
                case 'minutes':
                    value = player.minutes || 0;
                    break;
                case 'foulsPerMatch':
                    value = (player.matches > 0) ? (player.fouls || 0) / player.matches : 0;
                    break;
            }
            return value;
        });
        
        // Normaliser les valeurs (0-100 basé sur le max de toutes les joueuses)
        const normalizedValues = values.map((value, metricIndex) => {
            const allValues = selectedPlayers.map(p => {
                switch (metrics[metricIndex].key) {
                    case 'matches':
                        return p.matches || 0;
                    case 'pointsPerMatch':
                        return (p.matches > 0) ? (p.points || 0) / p.matches : 0;
                    case 'minutesPerMatch':
                        return (p.matches > 0) ? (p.minutes || 0) / p.matches : 0;
                    case 'pointsPerMinute':
                        return (p.minutes > 0) ? (p.points || 0) / p.minutes : 0;
                    case 'points':
                        return p.points || 0;
                    case 'minutes':
                        return p.minutes || 0;
                    case 'foulsPerMatch':
                        return (p.matches > 0) ? (p.fouls || 0) / p.matches : 0;
                    default:
                        return 0;
                }
            });
            const maxValue = Math.max(...allValues);
            // Pour les fautes, on inverse la logique (moins de fautes = meilleur)
            if (metrics[metricIndex].key === 'foulsPerMatch') {
                return maxValue > 0 ? Math.max(0, 100 - (value / maxValue) * 100) : 100;
            }
            return maxValue > 0 ? (value / maxValue) * 100 : 0;
        });
        
        const colors = ['#c53030', '#3182ce', '#38a169'];
        
        return {
            label: player.prenom,
            data: normalizedValues,
            borderColor: colors[index],
            backgroundColor: colors[index] + '20',
            pointBackgroundColor: colors[index],
            pointBorderColor: colors[index],
            pointBorderWidth: 2,
            pointRadius: 4
        };
    });
    
    comparisonRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: metrics.map(m => m.label),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparaison des performances (normalisées)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Mettre à jour le tableau de comparaison
function updateComparisonTable() {
    const table = document.getElementById('comparisonTable');
    if (!table || selectedPlayers.length < 2) return;
    
    // Définir les statistiques à afficher
    const stats = [
        { label: 'Prénom', key: 'prenom', format: 'text' },
        { label: 'Numéro', key: 'numero', format: 'number' },
        { label: 'Matchs joués', key: 'matches', format: 'number', highlight: true },
        { label: 'Minutes totales', key: 'minutes', format: 'number', highlight: true },
        { label: 'Points totaux', key: 'points', format: 'number', highlight: true },
        { label: 'Fautes totales', key: 'fouls', format: 'number', highlight: true, inverted: true },
        { label: 'Minutes/match', key: 'minutesPerMatch', format: 'decimal1', highlight: true },
        { label: 'Points/match', key: 'pointsPerMatch', format: 'decimal1', highlight: true },
        { label: 'Fautes/match', key: 'foulsPerMatch', format: 'decimal1', highlight: true, inverted: true },
        { label: 'Points/minute', key: 'pointsPerMinute', format: 'decimal2', highlight: true }
    ];
    
    // Créer l'en-tête
    let html = '<thead><tr><th class="stat-label">Statistique</th>';
    selectedPlayers.forEach((player, index) => {
        html += `<th class="player-column player-${index + 1}">${player.prenom}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    // Créer les lignes de données
    stats.forEach(stat => {
        html += '<tr>';
        html += `<td class="stat-label">${stat.label}</td>`;
        
        // Calculer les valeurs pour chaque joueuse
        const values = selectedPlayers.map(player => {
            let value;
            switch (stat.key) {
                case 'prenom':
                    return player.prenom;
                case 'numero':
                    return player.numero;
                case 'matches':
                    return player.matches || 0;
                case 'minutes':
                    return player.minutes || 0;
                case 'points':
                    return player.points || 0;
                case 'fouls':
                    return player.fouls || 0;
                case 'minutesPerMatch':
                    return (player.matches > 0) ? (player.minutes || 0) / player.matches : 0;
                case 'pointsPerMatch':
                    return (player.matches > 0) ? (player.points || 0) / player.matches : 0;
                case 'foulsPerMatch':
                    return (player.matches > 0) ? (player.fouls || 0) / player.matches : 0;
                case 'pointsPerMinute':
                    return (player.minutes > 0) ? (player.points || 0) / player.minutes : 0;
                default:
                    return 0;
            }
        });
        
        // Déterminer la meilleure et la pire valeur (si applicable)
        let bestIndex = -1;
        let worstIndex = -1;
        
        if (stat.highlight && stat.format !== 'text') {
            const numericValues = values.map(v => typeof v === 'number' ? v : 0);
            const maxValue = Math.max(...numericValues);
            const minValue = Math.min(...numericValues);
            
            if (maxValue !== minValue) {
                // Pour les statistiques inversées (comme les fautes), le minimum est le meilleur
                if (stat.inverted) {
                    bestIndex = numericValues.indexOf(minValue);
                    worstIndex = numericValues.indexOf(maxValue);
                } else {
                    bestIndex = numericValues.indexOf(maxValue);
                    worstIndex = numericValues.indexOf(minValue);
                }
            }
        }
        
        // Ajouter les cellules
        values.forEach((value, index) => {
            let formattedValue;
            switch (stat.format) {
                case 'decimal1':
                    formattedValue = typeof value === 'number' ? value.toFixed(1) : value;
                    break;
                case 'decimal2':
                    formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
                    break;
                case 'number':
                    formattedValue = typeof value === 'number' ? value.toString() : value;
                    break;
                default:
                    formattedValue = value;
            }
            
            let cellClass = `player-${index + 1}`;
            if (index === bestIndex) {
                cellClass += ' best-value';
            } else if (index === worstIndex && selectedPlayers.length > 2) {
                cellClass += ' worst-value';
            }
            
            html += `<td class="${cellClass}">${formattedValue}</td>`;
        });
        
        html += '</tr>';
    });
    
    html += '</tbody>';
    table.innerHTML = html;
}

// Fonction pour calculer les statistiques précédentes d'un joueur
function calculatePlayerPreviousStats(playerId) {
    if (matches.length <= 1) {
        return { 
            previousPointsPerMatch: null, 
            previousMinutesPerMatch: null,
            previousPointsPerMinute: null
        };
    }
    
    // Trier les matchs par date (du plus récent au plus ancien)
    const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Exclure le dernier match pour calculer les stats précédentes
    const previousMatches = sortedMatches.slice(1);
    
    let totalPreviousPoints = 0;
    let totalPreviousMinutes = 0;
    let previousMatchesPlayed = 0;
    
    previousMatches.forEach(match => {
        const playerStats = match.playerStats[playerId];
        if (playerStats && playerStats.played) {
            totalPreviousPoints += playerStats.points || 0;
            totalPreviousMinutes += playerStats.minutes || 0;
            previousMatchesPlayed++;
        }
    });
    
    const previousPointsPerMatch = previousMatchesPlayed > 0 ? (totalPreviousPoints / previousMatchesPlayed) : null;
    const previousMinutesPerMatch = previousMatchesPlayed > 0 ? (totalPreviousMinutes / previousMatchesPlayed) : null;
    const previousPointsPerMinute = totalPreviousMinutes > 0 ? (totalPreviousPoints / totalPreviousMinutes) : null;
    
    return {
        previousPointsPerMatch,
        previousMinutesPerMatch,
        previousPointsPerMinute
    };
}

// Fonction pour calculer les leaders de chaque statistique (podium complet)
function calculateStatLeaders() {
    if (players.length === 0) {
        return {};
    }
    
    const leaders = {};
    
    // Fonction helper pour calculer le podium d'une statistique
    function calculatePodium(values, playerIds, isDescending = true) {
        if (values.length === 0) return { gold: [], silver: [], bronze: [], last: [] };
        
        // Créer des paires [valeur, playerId] et trier
        const pairs = values.map((value, index) => [value, playerIds[index]]);
        pairs.sort((a, b) => isDescending ? b[0] - a[0] : a[0] - b[0]);
        
        const podium = { gold: [], silver: [], bronze: [], last: [] };
        
        // Première place (or)
        const firstValue = pairs[0][0];
        let currentIndex = 0;
        
        // Toutes les joueuses avec la même valeur que la première
        while (currentIndex < pairs.length && Math.abs(pairs[currentIndex][0] - firstValue) < 0.001) {
            podium.gold.push(pairs[currentIndex][1]);
            currentIndex++;
        }
        
        // Deuxième place (argent) - seulement s'il n'y a pas d'égalité en première place
        if (podium.gold.length === 1 && currentIndex < pairs.length) {
            const secondValue = pairs[currentIndex][0];
            while (currentIndex < pairs.length && Math.abs(pairs[currentIndex][0] - secondValue) < 0.001) {
                podium.silver.push(pairs[currentIndex][1]);
                currentIndex++;
            }
        }
        
        // Troisième place (bronze) - seulement s'il n'y a pas d'égalité en première et deuxième place
        if (podium.gold.length === 1 && podium.silver.length === 1 && currentIndex < pairs.length) {
            const thirdValue = pairs[currentIndex][0];
            while (currentIndex < pairs.length && Math.abs(pairs[currentIndex][0] - thirdValue) < 0.001) {
                podium.bronze.push(pairs[currentIndex][1]);
                currentIndex++;
            }
        }
        
        // Dernière place (bleu) - toutes les joueuses avec la valeur la plus faible
        if (pairs.length > 1) { // Au moins 2 joueuses pour avoir une dernière place
            const lastValue = pairs[pairs.length - 1][0];
            for (let i = pairs.length - 1; i >= 0; i--) {
                if (Math.abs(pairs[i][0] - lastValue) < 0.001) {
                    podium.last.push(pairs[i][1]);
                } else {
                    break;
                }
            }
        }
        
        return podium;
    }
    
    // Podium des matchs joués
    const matchesValues = players.map(p => p.matches || 0);
    const matchesIds = players.map(p => p.id);
    const matchesPodium = calculatePodium(matchesValues, matchesIds);
    leaders.matches = matchesPodium.gold;
    leaders.matchesSilver = matchesPodium.silver;
    leaders.matchesBronze = matchesPodium.bronze;
    leaders.matchesLast = matchesPodium.last;
    
    // Podium des minutes totales
    const minutesValues = players.map(p => p.minutes || 0);
    const minutesIds = players.map(p => p.id);
    const minutesPodium = calculatePodium(minutesValues, minutesIds);
    leaders.minutes = minutesPodium.gold;
    leaders.minutesSilver = minutesPodium.silver;
    leaders.minutesBronze = minutesPodium.bronze;
    leaders.minutesLast = minutesPodium.last;
    
    // Podium des points totaux
    const pointsValues = players.map(p => p.points || 0);
    const pointsIds = players.map(p => p.id);
    const pointsPodium = calculatePodium(pointsValues, pointsIds);
    leaders.points = pointsPodium.gold;
    leaders.pointsSilver = pointsPodium.silver;
    leaders.pointsBronze = pointsPodium.bronze;
    leaders.pointsLast = pointsPodium.last;
    
    // Podium des minutes par match (joueuses ayant joué au moins 1 match)
    const eligiblePlayersMinutes = players.filter(p => (p.matches || 0) > 0);
    if (eligiblePlayersMinutes.length > 0) {
        const minutesPerMatchValues = eligiblePlayersMinutes.map(p => (p.minutes || 0) / (p.matches || 1));
        const minutesPerMatchIds = eligiblePlayersMinutes.map(p => p.id);
        const minutesPerMatchPodium = calculatePodium(minutesPerMatchValues, minutesPerMatchIds);
        leaders.minutesPerMatch = minutesPerMatchPodium.gold;
        leaders.minutesPerMatchSilver = minutesPerMatchPodium.silver;
        leaders.minutesPerMatchBronze = minutesPerMatchPodium.bronze;
        leaders.minutesPerMatchLast = minutesPerMatchPodium.last;
    } else {
        leaders.minutesPerMatch = [];
        leaders.minutesPerMatchSilver = [];
        leaders.minutesPerMatchBronze = [];
        leaders.minutesPerMatchLast = [];
    }
    
    // Podium des points par match (joueuses ayant joué au moins 1 match)
    const eligiblePlayersPoints = players.filter(p => (p.matches || 0) > 0);
    if (eligiblePlayersPoints.length > 0) {
        const pointsPerMatchValues = eligiblePlayersPoints.map(p => (p.points || 0) / (p.matches || 1));
        const pointsPerMatchIds = eligiblePlayersPoints.map(p => p.id);
        const pointsPerMatchPodium = calculatePodium(pointsPerMatchValues, pointsPerMatchIds);
        leaders.pointsPerMatch = pointsPerMatchPodium.gold;
        leaders.pointsPerMatchSilver = pointsPerMatchPodium.silver;
        leaders.pointsPerMatchBronze = pointsPerMatchPodium.bronze;
        leaders.pointsPerMatchLast = pointsPerMatchPodium.last;
    } else {
        leaders.pointsPerMatch = [];
        leaders.pointsPerMatchSilver = [];
        leaders.pointsPerMatchBronze = [];
        leaders.pointsPerMatchLast = [];
    }
    
    // Podium des points par minute (joueuses ayant joué au moins 1 minute)
    const eligiblePlayersEfficiency = players.filter(p => (p.minutes || 0) > 0);
    if (eligiblePlayersEfficiency.length > 0) {
        const pointsPerMinuteValues = eligiblePlayersEfficiency.map(p => (p.points || 0) / (p.minutes || 1));
        const pointsPerMinuteIds = eligiblePlayersEfficiency.map(p => p.id);
        const pointsPerMinutePodium = calculatePodium(pointsPerMinuteValues, pointsPerMinuteIds);
        leaders.pointsPerMinute = pointsPerMinutePodium.gold;
        leaders.pointsPerMinuteSilver = pointsPerMinutePodium.silver;
        leaders.pointsPerMinuteBronze = pointsPerMinutePodium.bronze;
        leaders.pointsPerMinuteLast = pointsPerMinutePodium.last;
    } else {
        leaders.pointsPerMinute = [];
        leaders.pointsPerMinuteSilver = [];
        leaders.pointsPerMinuteBronze = [];
        leaders.pointsPerMinuteLast = [];
    }
    
    // Podium des fautes par match (logique inversée - moins de fautes = mieux)
    const eligiblePlayersFouls = players.filter(p => (p.matches || 0) > 0);
    if (eligiblePlayersFouls.length > 0) {
        const foulsPerMatchValues = eligiblePlayersFouls.map(p => (p.fouls || 0) / (p.matches || 1));
        const foulsPerMatchIds = eligiblePlayersFouls.map(p => p.id);
        const foulsPodium = calculatePodium(foulsPerMatchValues, foulsPerMatchIds, false); // false = tri ascendant
        leaders.fouls = foulsPodium.gold;
        leaders.foulsSilver = foulsPodium.silver;
        leaders.foulsBronze = foulsPodium.bronze;
        leaders.foulsLast = foulsPodium.last;
    } else {
        leaders.fouls = [];
        leaders.foulsSilver = [];
        leaders.foulsBronze = [];
        leaders.foulsLast = [];
    }
    
    return leaders;
}

// Fonction helper pour déterminer la classe de podium
function getPodiumClass(playerId, leaders, statName) {
    if (leaders[statName]?.includes(playerId)) return 'leader';
    if (leaders[statName + 'Silver']?.includes(playerId)) return 'silver';
    if (leaders[statName + 'Bronze']?.includes(playerId)) return 'bronze';
    if (leaders[statName + 'Last']?.includes(playerId)) return 'last';
    return '';
}

// Rendu des joueuses
function renderPlayers() {
    console.log('DEBUG: renderPlayers called');
    const playersGrid = document.getElementById('playersGrid');
    
    if (!playersGrid) {
        console.error('Element playersGrid introuvable');
        return;
    }
    
    if (players.length === 0) {
        playersGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>Aucune joueuse</h3>
                <p>Les joueuses apparaîtront ici une fois configurées.</p>
            </div>
        `;
        return;
    }
    
    console.log('DEBUG: Creating player cards for', players.length, 'players');
    
    // Calculer les leaders pour chaque statistique
    const leaders = calculateStatLeaders();
    
    playersGrid.innerHTML = players.map(player => {
        const currentPointsPerMatch = player.matches > 0 ? (player.points / player.matches) : 0;
        const currentMinutesPerMatch = player.matches > 0 ? (player.minutes / player.matches) : 0;
        const currentPointsPerMinute = player.minutes > 0 ? (player.points / player.minutes) : 0;
        
        const { previousPointsPerMatch, previousMinutesPerMatch, previousPointsPerMinute } = calculatePlayerPreviousStats(player.id);
        
        return `
            <div class="player-card" data-player-id="${player.id}">
                <div class="player-header">
                    <div class="player-name">${player.prenom}</div>
                    <div class="player-number">${player.numero}</div>
                </div>
                <div class="player-stats">
                    <div class="stat-item stat-wide ${getPodiumClass(player.id, leaders, 'matches')}">
                        <span class="stat-value">${player.matches || 0}</span>
                        <div class="stat-label">Matchs joués</div>
                    </div>
                    <div class="stat-item ${getPodiumClass(player.id, leaders, 'minutes')}">
                        <span class="stat-value">${player.minutes || 0}</span>
                        <div class="stat-label">Minutes</div>
                    </div>
                    <div class="stat-item ${getPodiumClass(player.id, leaders, 'points')}">
                        <span class="stat-value">${player.points || 0}</span>
                        <div class="stat-label">Points</div>
                    </div>
                    <div class="stat-item ${getPodiumClass(player.id, leaders, 'minutesPerMatch')}">
                        <span class="stat-value">
                            ${currentMinutesPerMatch.toFixed(1)}
                            ${calculateTrend(currentMinutesPerMatch, previousMinutesPerMatch)}
                        </span>
                        <div class="stat-label">Minutes/match</div>
                    </div>
                    <div class="stat-item ${getPodiumClass(player.id, leaders, 'pointsPerMatch')}">
                        <span class="stat-value">
                            ${currentPointsPerMatch.toFixed(1)}
                            ${calculateTrend(currentPointsPerMatch, previousPointsPerMatch)}
                        </span>
                        <div class="stat-label">Points/match</div>
                    </div>
                    <div class="stat-item stat-wide ${getPodiumClass(player.id, leaders, 'pointsPerMinute')}">
                        <span class="stat-value">
                            ${currentPointsPerMinute.toFixed(2)}
                            ${calculateTrend(currentPointsPerMinute, previousPointsPerMinute)}
                        </span>
                        <div class="stat-label">Points/minute</div>
                    </div>
                    <div class="stat-item stat-wide ${getPodiumClass(player.id, leaders, 'fouls')}">
                        <span class="stat-value">${player.matches > 0 ? ((player.fouls || 0) / player.matches).toFixed(1) : '0.0'}</span>
                        <div class="stat-label">Fautes/match</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Mettre à jour la liste des joueuses dans le graphique si on est sur l'onglet players
    if (currentTab === 'players') {
        setTimeout(() => {
            populatePlayerSelect();
            updatePlayerChart();
        }, 100);
    }
}

// Fonction pour calculer les tendances
function calculateTrend(currentValue, previousValue, isLowerBetter = false) {
    if (previousValue === null || previousValue === undefined || currentValue === previousValue) {
        return ''; // Pas de tendance si pas de données précédentes ou valeurs identiques
    }
    
    const isImproving = isLowerBetter ? currentValue < previousValue : currentValue > previousValue;
    
    if (isImproving) {
        return '<i class="fas fa-caret-up trend-up"></i>';
    } else {
        return '<i class="fas fa-caret-down trend-down"></i>';
    }
}

// Rendu des statistiques d'équipe
function renderTeamStats() {
    const teamStats = document.getElementById('teamStats');
    
    if (!teamStats) {
        console.error('Element teamStats introuvable');
        return;
    }
    
    const totalMatches = matches.length;
    const victories = matches.filter(m => m.result === 'victoire').length;
    const defeats = totalMatches - victories;
    const homeMatches = matches.filter(m => m.location === 'domicile');
    const homeVictories = homeMatches.filter(m => m.result === 'victoire').length;
    
    const totalPointsScored = matches.reduce((sum, m) => sum + m.ourScore, 0);
    const totalPointsConceded = matches.reduce((sum, m) => sum + m.opponentScore, 0);
    const avgPointsScored = totalMatches > 0 ? (totalPointsScored / totalMatches).toFixed(1) : '0.0';
    const avgPointsConceded = totalMatches > 0 ? (totalPointsConceded / totalMatches).toFixed(1) : '0.0';
    
    const totalFreeThrowsMade = matches.reduce((sum, m) => sum + (m.freeThrowsMade || 0), 0);
    const totalFreeThrowsAttempted = matches.reduce((sum, m) => sum + (m.freeThrowsAttempted || 0), 0);
    const freeThrowPercentage = totalFreeThrowsAttempted > 0 ? ((totalFreeThrowsMade / totalFreeThrowsAttempted) * 100).toFixed(1) : '0.0';
    
    const winPercentage = totalMatches > 0 ? ((victories / totalMatches) * 100).toFixed(1) : '0.0';
    const homeWinPercentage = homeMatches.length > 0 ? ((homeVictories / homeMatches.length) * 100).toFixed(1) : '0.0';
    
    // Récupérer les classements les plus récents (du dernier match avec ces informations)
    let latestRanking = '-';
    let latestAttackRanking = '-';
    let latestDefenseRanking = '-';
    
    // Parcourir les matchs du plus récent au plus ancien pour trouver les derniers classements
    const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const match of sortedMatches) {
        if (match.ranking && latestRanking === '-') {
            latestRanking = match.ranking;
        }
        if (match.attackRanking && latestAttackRanking === '-') {
            latestAttackRanking = match.attackRanking;
        }
        if (match.defenseRanking && latestDefenseRanking === '-') {
            latestDefenseRanking = match.defenseRanking;
        }
        // Si on a trouvé tous les classements, on peut arrêter
        if (latestRanking !== '-' && latestAttackRanking !== '-' && latestDefenseRanking !== '-') {
            break;
        }
    }
    
    // Calcul des tendances - comparer avec les valeurs précédentes
    let previousAvgPointsScored = null;
    let previousAvgPointsConceded = null;
    let previousFreeThrowPercentage = null;
    let previousRanking = null;
    let previousAttackRanking = null;
    let previousDefenseRanking = null;
    
    if (totalMatches > 1) {
        // Calculer les moyennes sur tous les matchs sauf le dernier
        const previousMatches = sortedMatches.slice(1);
        if (previousMatches.length > 0) {
            const prevTotalPointsScored = previousMatches.reduce((sum, m) => sum + m.ourScore, 0);
            const prevTotalPointsConceded = previousMatches.reduce((sum, m) => sum + m.opponentScore, 0);
            previousAvgPointsScored = (prevTotalPointsScored / previousMatches.length).toFixed(1);
            previousAvgPointsConceded = (prevTotalPointsConceded / previousMatches.length).toFixed(1);
            
            const prevTotalFreeThrowsMade = previousMatches.reduce((sum, m) => sum + (m.freeThrowsMade || 0), 0);
            const prevTotalFreeThrowsAttempted = previousMatches.reduce((sum, m) => sum + (m.freeThrowsAttempted || 0), 0);
            previousFreeThrowPercentage = prevTotalFreeThrowsAttempted > 0 ? 
                ((prevTotalFreeThrowsMade / prevTotalFreeThrowsAttempted) * 100).toFixed(1) : null;
        }
        
        // Pour les classements, comparer avec l'avant-dernier match qui a ces données
        let foundPrevious = { ranking: false, attack: false, defense: false };
        for (let i = 1; i < sortedMatches.length; i++) {
            const match = sortedMatches[i];
            if (match.ranking && !foundPrevious.ranking) {
                previousRanking = match.ranking;
                foundPrevious.ranking = true;
            }
            if (match.attackRanking && !foundPrevious.attack) {
                previousAttackRanking = match.attackRanking;
                foundPrevious.attack = true;
            }
            if (match.defenseRanking && !foundPrevious.defense) {
                previousDefenseRanking = match.defenseRanking;
                foundPrevious.defense = true;
            }
            if (foundPrevious.ranking && foundPrevious.attack && foundPrevious.defense) {
                break;
            }
        }
    }
    
    teamStats.innerHTML = `
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-trophy"></i></div>
            <div class="team-stat-value">${victories}-${defeats}</div>
            <div class="team-stat-label">Bilan (V-D)</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-home"></i></div>
            <div class="team-stat-value">${homeVictories}-${homeMatches.length - homeVictories}</div>
            <div class="team-stat-label">Bilan à domicile</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-bullseye"></i></div>
            <div class="team-stat-value">
                ${avgPointsScored}
                ${calculateTrend(parseFloat(avgPointsScored), previousAvgPointsScored ? parseFloat(previousAvgPointsScored) : null)}
            </div>
            <div class="team-stat-label">Points/match</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="team-stat-value">
                ${avgPointsConceded}
                ${calculateTrend(parseFloat(avgPointsConceded), previousAvgPointsConceded ? parseFloat(previousAvgPointsConceded) : null, true)}
            </div>
            <div class="team-stat-label">Points encaissés/match</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-medal"></i></div>
            <div class="team-stat-value">
                ${latestRanking}
                ${latestRanking !== '-' ? calculateTrend(parseInt(latestRanking), previousRanking, true) : ''}
            </div>
            <div class="team-stat-label">Classement</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-percentage"></i></div>
            <div class="team-stat-value">
                ${freeThrowPercentage}%
                ${calculateTrend(parseFloat(freeThrowPercentage), previousFreeThrowPercentage ? parseFloat(previousFreeThrowPercentage) : null)}
            </div>
            <div class="team-stat-label">% Lancers francs</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-crosshairs"></i></div>
            <div class="team-stat-value">
                ${latestAttackRanking}
                ${latestAttackRanking !== '-' ? calculateTrend(parseInt(latestAttackRanking), previousAttackRanking, true) : ''}
            </div>
            <div class="team-stat-label">Classement attaque</div>
        </div>
        <div class="team-stat-card">
            <div class="team-stat-icon"><i class="fas fa-shield"></i></div>
            <div class="team-stat-value">
                ${latestDefenseRanking}
                ${latestDefenseRanking !== '-' ? calculateTrend(parseInt(latestDefenseRanking), previousDefenseRanking, true) : ''}
            </div>
            <div class="team-stat-label">Classement défense</div>
        </div>
    `;
    
    // Mettre à jour les graphiques si on est sur l'onglet équipe
    if (currentTab === 'team') {
        setTimeout(() => updateChart(), 100);
    }
}

// Rendu des matchs
function renderMatches() {
    const matchesList = document.getElementById('matchesList');
    
    if (!matchesList) {
        console.error('Element matchesList introuvable');
        return;
    }
    
    if (matches.length === 0) {
        matchesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar"></i>
                <h3>Aucun match enregistré</h3>
                <p>Ajoutez votre premier match pour commencer à suivre les statistiques de l'équipe.</p>
            </div>
        `;
        return;
    }
    
    const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    matchesList.innerHTML = sortedMatches.map(match => `
        <div class="match-card">
            <div class="match-header">
                <div class="match-opponent">
                    <i class="fas fa-vs"></i> ${match.opponent}
                </div>
                <div class="match-actions">
                    <button class="btn-icon btn-edit" onclick="editMatch(${match.id})" title="Modifier le match">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteMatch(${match.id})" title="Supprimer le match">
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="match-result ${match.result}">${match.result.toUpperCase()}</div>
                </div>
            </div>
            <div class="match-details">
                <div class="match-detail">
                    <div class="match-detail-value">${formatDate(match.date)}</div>
                    <div class="match-detail-label">Date</div>
                </div>
                <div class="match-detail">
                    <div class="match-detail-value">${match.location === 'domicile' ? 'Domicile' : 'Extérieur'}</div>
                    <div class="match-detail-label">Lieu</div>
                </div>
                <div class="match-detail">
                    <div class="match-detail-value">${match.ourScore} - ${match.opponentScore}</div>
                    <div class="match-detail-label">Score</div>
                </div>
                <div class="match-detail">
                    <div class="match-detail-value">${match.freeThrowsMade || 0}/${match.freeThrowsAttempted || 0}</div>
                    <div class="match-detail-label">Lancers francs</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Ouverture de la modal d'ajout de match
function openMatchModal() {
    console.log('Ouverture de la modal d\'ajout de match');
    const modal = document.getElementById('addMatchModal');
    if (!modal) {
        console.error('Modal introuvable');
        return;
    }
    
    generatePlayerStatsForm();
    
    // Date par défaut = aujourd'hui
    const matchDate = document.getElementById('matchDate');
    if (matchDate) {
        matchDate.value = new Date().toISOString().split('T')[0];
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Fermeture de la modal
function closeMatchModal() {
    console.log('Fermeture de la modal');
    const modal = document.getElementById('addMatchModal');
    if (modal) {
        modal.classList.remove('show');
    }
    document.body.style.overflow = '';
    
    const form = document.getElementById('matchForm');
    if (form) {
        form.reset();
    }
    
    // Réinitialiser le mode édition
    editingMatchId = null;
    document.getElementById('modalTitle').textContent = 'Ajouter un nouveau match';
    document.getElementById('submitMatchBtn').textContent = 'Enregistrer le match';
}

// Génération du formulaire des statistiques par joueuse
function generatePlayerStatsForm() {
    const container = document.getElementById('playersStatsForm');
    if (!container) {
        console.error('Container playersStatsForm introuvable');
        return;
    }
    
    container.innerHTML = players.map(player => `
        <div class="player-stat-row">
            <div class="player-stat-header">
                <div class="player-stat-number">${player.numero}</div>
                <div class="player-stat-name">${player.prenom}</div>
            </div>
            <div class="player-stat-fields">
                <div class="form-group">
                    <label>Minutes</label>
                    <input type="number" name="minutes_${player.id}" min="0" value="0">
                </div>
                <div class="form-group">
                    <label>Points</label>
                    <input type="number" name="points_${player.id}" min="0" value="0">
                </div>
                <div class="form-group">
                    <label>Fautes</label>
                    <input type="number" name="fouls_${player.id}" min="0" max="5" value="0">
                </div>
                <div class="form-group">
                    <label>A joué</label>
                    <select name="played_${player.id}">
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                    </select>
                </div>
            </div>
        </div>
    `).join('');
}

// Gestion de la soumission du formulaire de match
function handleMatchSubmit(e) {
    e.preventDefault();
    console.log('Soumission du formulaire de match');
    
    const formData = new FormData(e.target);
    
    // Données du match
    const matchData = {
        id: editingMatchId || Date.now(), // Utiliser l'ID existant si en mode édition
        opponent: formData.get('opponent'),
        date: formData.get('matchDate'),
        location: formData.get('location'),
        result: formData.get('result'),
        ourScore: parseInt(formData.get('ourScore')),
        opponentScore: parseInt(formData.get('opponentScore')),
        freeThrowsMade: parseInt(formData.get('freeThrowsMade')) || 0,
        freeThrowsAttempted: parseInt(formData.get('freeThrowsAttempted')) || 0,
        ranking: parseInt(formData.get('ranking')) || null,
        attackRanking: parseInt(formData.get('attackRanking')) || null,
        defenseRanking: parseInt(formData.get('defenseRanking')) || null,
        playerStats: {}
    };
    
    // Si on est en mode édition, récupérer les anciennes statistiques pour les soustraire
    let oldPlayerStats = {};
    if (editingMatchId) {
        const oldMatch = matches.find(m => m.id === editingMatchId);
        if (oldMatch) {
            oldPlayerStats = oldMatch.playerStats;
            
            // Soustraire les anciennes statistiques
            players.forEach(player => {
                const oldStats = oldPlayerStats[player.id];
                if (oldStats) {
                    if (oldStats.played) {
                        player.matches = Math.max(0, player.matches - 1);
                    }
                    player.points = Math.max(0, player.points - (oldStats.points || 0));
                    player.minutes = Math.max(0, player.minutes - (oldStats.minutes || 0));
                    player.fouls = Math.max(0, (player.fouls || 0) - (oldStats.fouls || 0));
                }
            });
        }
    }
    
    // Ajouter les nouvelles statistiques des joueuses
    players.forEach(player => {
        const points = parseInt(formData.get(`points_${player.id}`)) || 0;
        const minutes = parseInt(formData.get(`minutes_${player.id}`)) || 0;
        const fouls = parseInt(formData.get(`fouls_${player.id}`)) || 0;
        const played = parseInt(formData.get(`played_${player.id}`)) || 0;
        
        if (played) {
            player.matches += 1;
        }
        player.points += points;
        player.minutes += minutes;
        player.fouls = (player.fouls || 0) + fouls;
        
        matchData.playerStats[player.id] = {
            points,
            minutes,
            fouls,
            played: Boolean(played)
        };
    });
    
    if (editingMatchId) {
        // Modifier le match existant
        const matchIndex = matches.findIndex(m => m.id === editingMatchId);
        if (matchIndex !== -1) {
            matches[matchIndex] = matchData;
        }
        showNotification('Match modifié avec succès !', 'success');
    } else {
        // Ajouter un nouveau match
        matches.push(matchData);
        showNotification('Match ajouté avec succès !', 'success');
    }
    
    // Sauvegarde automatique des données
    saveDataToStorage();
    
    // Mise à jour de l'interface
    renderPlayers();
    renderTeamStats();
    renderMatches();
    
    // Fermeture de la modal
    closeMatchModal();
}

// Recherche de joueuses
function handlePlayerSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        const playerName = card.querySelector('.player-name').textContent.toLowerCase();
        const playerNumber = card.querySelector('.player-number').textContent;
        
        const matches = playerName.includes(searchTerm) || playerNumber.includes(searchTerm);
        card.style.display = matches ? 'block' : 'none';
    });
}

// Utilitaires
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Icônes selon le type
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle', 
        info: 'info-circle'
    };
    
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter les styles de notification si pas déjà présents
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            }
            .notification-success {
                border-left: 4px solid #48bb78;
                color: #22543d;
            }
            .notification-success i {
                color: #48bb78;
            }
            .notification-error {
                border-left: 4px solid #f56565;
                color: #742a2a;
            }
            .notification-error i {
                color: #f56565;
            }
            .notification-info {
                border-left: 4px solid #c53030;
                color: #742a2a;
            }
            .notification-info i {
                color: #c53030;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Fonction pour exporter les données
function exportData() {
    console.log('Export des données');
    const data = {
        players,
        matches,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `basket-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    showNotification('Données exportées avec succès !', 'success');
}

// Fonction pour importer des données
function importData(event) {
    console.log('Import des données');
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.players && data.matches) {
                if (confirm('Voulez-vous remplacer toutes les données actuelles par les données importées ?')) {
                    players = data.players;
                    matches = data.matches;
                    
                    // Sauvegarder dans le stockage local
                    saveDataToStorage();
                    
                    renderPlayers();
                    renderTeamStats();
                    renderMatches();
                    
                    showNotification('Données importées avec succès !', 'success');
                }
            } else {
                throw new Error('Format de fichier invalide');
            }
        } catch (error) {
            console.error('Erreur d\'import:', error);
            showNotification('Erreur lors de l\'importation des données', 'error');
        }
        
        // Reset du champ file
        event.target.value = '';
    };
    reader.readAsText(file);
}

// Fonction pour modifier un match
function editMatch(matchId) {
    console.log('Modification du match:', matchId);
    
    const match = matches.find(m => m.id === matchId);
    if (!match) {
        showNotification('Match introuvable', 'error');
        return;
    }
    
    // Mettre en mode édition
    editingMatchId = matchId;
    
    // Changer le titre de la modal
    document.getElementById('modalTitle').textContent = 'Modifier le match';
    document.getElementById('submitMatchBtn').textContent = 'Modifier le match';
    
    // Pré-remplir le formulaire
    document.getElementById('opponent').value = match.opponent;
    document.getElementById('matchDate').value = match.date;
    document.getElementById('location').value = match.location;
    document.getElementById('result').value = match.result;
    document.getElementById('ourScore').value = match.ourScore;
    document.getElementById('opponentScore').value = match.opponentScore;
    document.getElementById('freeThrowsMade').value = match.freeThrowsMade || 0;
    document.getElementById('freeThrowsAttempted').value = match.freeThrowsAttempted || 0;
    document.getElementById('ranking').value = match.ranking || '';
    document.getElementById('attackRanking').value = match.attackRanking || '';
    document.getElementById('defenseRanking').value = match.defenseRanking || '';
    
    // Générer le formulaire des statistiques et pré-remplir
    generatePlayerStatsForm();
    
    // Pré-remplir les statistiques des joueuses
    players.forEach(player => {
        const stats = match.playerStats[player.id];
        if (stats) {
            const pointsField = document.querySelector(`input[name="points_${player.id}"]`);
            const minutesField = document.querySelector(`input[name="minutes_${player.id}"]`);
            const playedField = document.querySelector(`select[name="played_${player.id}"]`);
            
            if (pointsField) pointsField.value = stats.points || 0;
            if (minutesField) minutesField.value = stats.minutes || 0;
            if (playedField) playedField.value = stats.played ? 1 : 0;
        }
    });
    
    // Ouvrir la modal
    const modal = document.getElementById('addMatchModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Fonction pour supprimer un match
function deleteMatch(matchId) {
    console.log('Suppression du match:', matchId);
    
    const match = matches.find(m => m.id === matchId);
    if (!match) {
        showNotification('Match introuvable', 'error');
        return;
    }
    
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer le match contre ${match.opponent} du ${formatDate(match.date)} ?\n\nCette action recalculera automatiquement les statistiques des joueuses.`;
    
    if (confirm(confirmMessage)) {
        // Récupérer les anciennes statistiques du match pour les soustraire
        const oldStats = match.playerStats;
        
        // Mettre à jour les statistiques des joueuses
        players.forEach(player => {
            const stats = oldStats[player.id];
            if (stats) {
                if (stats.played) {
                    player.matches = Math.max(0, player.matches - 1);
                }
                player.points = Math.max(0, player.points - (stats.points || 0));
                player.minutes = Math.max(0, player.minutes - (stats.minutes || 0));
                player.fouls = Math.max(0, (player.fouls || 0) - (stats.fouls || 0));
            }
        });
        
        // Supprimer le match de la liste
        matches = matches.filter(m => m.id !== matchId);
        
        // Sauvegarder et mettre à jour l'interface
        saveDataToStorage();
        renderPlayers();
        renderTeamStats();
        renderMatches();
        
        showNotification('Match supprimé avec succès !', 'success');
    }
}

// Fonction pour recalculer toutes les statistiques (utile en cas d'incohérence)
function recalculateAllStats() {
    // Réinitialiser toutes les statistiques
    players.forEach(player => {
        player.matches = 0;
        player.points = 0;
        player.minutes = 0;
        player.fouls = 0;
    });
    
    // Recalculer basé sur tous les matchs
    matches.forEach(match => {
        players.forEach(player => {
            const stats = match.playerStats[player.id];
            if (stats) {
                if (stats.played) {
                    player.matches += 1;
                }
                player.points += stats.points || 0;
                player.minutes += stats.minutes || 0;
                player.fouls += stats.fouls || 0;
            }
        });
    });
    
    console.log('Statistiques recalculées');
}

// Variables globales pour les graphiques
let performanceChart = null;
let playerPerformanceChart = null;

// Configuration des couleurs pour chaque métrique
const chartColors = {
    'points-scored': '#3b82f6',
    'points-conceded': '#ef4444', 
    'free-throws': '#22c55e',
    'ranking': '#f59e0b',
    'attack-ranking': '#8b5cf6',
    'defense-ranking': '#06b6d4'
};

// Couleurs pour les graphiques individuels
const playerChartColors = {
    'points': '#c53030',
    'minutes': '#3b82f6'
};

// Initialisation des graphiques
function initializeCharts() {
    const checkboxes = document.querySelectorAll('.chart-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });
    
    updateChart();
}

// Calcul des données pour les graphiques
function calculateChartData() {
    const sortedMatches = [...matches].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = sortedMatches.map(match => {
        const date = new Date(match.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    });
    
    const datasets = [];
    
    // Déterminer quels types de données sont sélectionnés pour assigner les bons axes
    const hasPoints = document.getElementById('chart-points-scored').checked || 
                     document.getElementById('chart-points-conceded').checked;
    const hasPercentage = document.getElementById('chart-free-throws').checked;
    const hasRanking = document.getElementById('chart-ranking').checked || 
                      document.getElementById('chart-attack-ranking').checked || 
                      document.getElementById('chart-defense-ranking').checked;
    
    // Points marqués par match
    if (document.getElementById('chart-points-scored').checked) {
        datasets.push({
            label: 'Points marqués/match',
            data: sortedMatches.map(match => match.ourScore),
            borderColor: chartColors['points-scored'],
            backgroundColor: chartColors['points-scored'] + '20',
            tension: 0.4,
            yAxisID: 'y'
        });
    }
    
    // Points encaissés par match
    if (document.getElementById('chart-points-conceded').checked) {
        datasets.push({
            label: 'Points encaissés/match',
            data: sortedMatches.map(match => match.opponentScore),
            borderColor: chartColors['points-conceded'],
            backgroundColor: chartColors['points-conceded'] + '20',
            tension: 0.4,
            yAxisID: 'y'
        });
    }
    
    // % Lancers francs
    if (document.getElementById('chart-free-throws').checked) {
        let yAxis = 'y';
        if (hasPoints || hasRanking) {
            yAxis = 'y1'; // Axe secondaire si on a d'autres données
        }
        
        datasets.push({
            label: '% Lancers francs',
            data: sortedMatches.map(match => {
                if (match.freeThrowsAttempted > 0) {
                    return ((match.freeThrowsMade / match.freeThrowsAttempted) * 100).toFixed(1);
                }
                return 0;
            }),
            borderColor: chartColors['free-throws'],
            backgroundColor: chartColors['free-throws'] + '20',
            tension: 0.4,
            yAxisID: yAxis
        });
    }
    
    // Classements (axe inversé car plus petit = mieux)
    if (document.getElementById('chart-ranking').checked) {
        const rankingData = sortedMatches.map(match => match.ranking).filter(r => r !== null && r !== undefined);
        if (rankingData.length > 0) {
            let yAxis = 'y';
            if (hasPoints && !hasPercentage) {
                yAxis = 'y1'; // Axe secondaire
            } else if (hasPoints && hasPercentage) {
                yAxis = 'y2'; // Axe tertiaire (caché)
            }
            
            datasets.push({
                label: 'Classement général',
                data: sortedMatches.map(match => match.ranking || null),
                borderColor: chartColors['ranking'],
                backgroundColor: chartColors['ranking'] + '20',
                tension: 0.4,
                yAxisID: yAxis
            });
        }
    }
    
    if (document.getElementById('chart-attack-ranking').checked) {
        const attackData = sortedMatches.map(match => match.attackRanking).filter(r => r !== null && r !== undefined);
        if (attackData.length > 0) {
            let yAxis = 'y';
            if (hasPoints && !hasPercentage) {
                yAxis = 'y1';
            } else if (hasPoints && hasPercentage) {
                yAxis = 'y2';
            }
            
            datasets.push({
                label: 'Classement attaque',
                data: sortedMatches.map(match => match.attackRanking || null),
                borderColor: chartColors['attack-ranking'],
                backgroundColor: chartColors['attack-ranking'] + '20',
                tension: 0.4,
                yAxisID: yAxis
            });
        }
    }
    
    if (document.getElementById('chart-defense-ranking').checked) {
        const defenseData = sortedMatches.map(match => match.defenseRanking).filter(r => r !== null && r !== undefined);
        if (defenseData.length > 0) {
            let yAxis = 'y';
            if (hasPoints && !hasPercentage) {
                yAxis = 'y1';
            } else if (hasPoints && hasPercentage) {
                yAxis = 'y2';
            }
            
            datasets.push({
                label: 'Classement défense',
                data: sortedMatches.map(match => match.defenseRanking || null),
                borderColor: chartColors['defense-ranking'],
                backgroundColor: chartColors['defense-ranking'] + '20',
                tension: 0.4,
                yAxisID: yAxis
            });
        }
    }
    
    return { labels, datasets };
}

// Mise à jour du graphique
function updateChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    const { labels, datasets } = calculateChartData();
    
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    // Déterminer quels types de données sont sélectionnés
    const hasPointsData = datasets.some(d => d.label.includes('Points'));
    const hasPercentageData = datasets.some(d => d.label.includes('%'));
    const hasRankingData = datasets.some(d => d.label.includes('Classement'));
    
    // Configuration dynamique des axes
    const scales = {
        x: {
            title: {
                display: true,
                text: 'Matchs'
            }
        }
    };
    
    // Axe principal (gauche) - Points ou premier type de donnée
    if (hasPointsData) {
        scales.y = {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Points'
            },
            grid: {
                color: 'rgba(0, 0, 0, 0.1)'
            }
        };
    } else if (hasPercentageData && !hasRankingData) {
        // Si seulement des pourcentages, les mettre sur l'axe principal
        scales.y = {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Pourcentage (%)'
            },
            min: 0,
            max: 100,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)'
            }
        };
    } else if (hasRankingData && !hasPercentageData) {
        // Si seulement des classements, les mettre sur l'axe principal
        scales.y = {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Classement'
            },
            reverse: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)'
            }
        };
    }
    
    // Axe secondaire (droite) - Pourcentages
    if (hasPercentageData && (hasPointsData || hasRankingData)) {
        scales.y1 = {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Pourcentage (%)'
            },
            min: 0,
            max: 100,
            grid: {
                drawOnChartArea: false,
            }
        };
    }
    
    // Axe tertiaire pour les classements (si on a déjà points + pourcentages)
    if (hasRankingData && hasPointsData && hasPercentageData) {
        scales.y2 = {
            type: 'linear',
            display: false, // Caché mais utilisé pour l'échelle
            reverse: true,
            title: {
                display: true,
                text: 'Classement'
            }
        };
    } else if (hasRankingData && hasPointsData && !hasPercentageData) {
        // Si points + classements sans pourcentages, classements sur axe droit
        scales.y1 = {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Classement'
            },
            reverse: true,
            grid: {
                drawOnChartArea: false,
            }
        };
    }
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Évolution des performances par match',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: scales,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 8
                }
            }
        }
    });
}

// Initialisation des graphiques de joueuses
function initializePlayerCharts() {
    populatePlayerSelect();
    
    const playerSelect = document.getElementById('playerSelect');
    if (playerSelect) {
        playerSelect.addEventListener('change', updatePlayerChart);
    }
    
    const showHistograms = document.getElementById('showHistograms');
    if (showHistograms) {
        showHistograms.addEventListener('change', updatePlayerChart);
    }
    
    updatePlayerChart();
}

// Remplir la liste déroulante avec les joueuses
function populatePlayerSelect() {
    const playerSelect = document.getElementById('playerSelect');
    if (!playerSelect) return;
    
    // Garder la première option "-- Choisir une joueuse --"
    playerSelect.innerHTML = '<option value="">-- Choisir une joueuse --</option>';
    
    // Ajouter toutes les joueuses
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `#${player.numero} ${player.prenom}`;
        playerSelect.appendChild(option);
    });
}

// Calcul des données pour le graphique d'une joueuse
function calculatePlayerChartData(playerId) {
    if (!playerId) return { labels: [], datasets: [] };
    
    const sortedMatches = [...matches].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = sortedMatches.map(match => {
        const date = new Date(match.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    });
    
    const pointsData = [];
    const minutesData = [];
    const pointsPerMatchData = [];
    const minutesPerMatchData = [];
    
    let cumulativePoints = 0;
    let cumulativeMinutes = 0;
    let matchesPlayed = 0;
    
    sortedMatches.forEach(match => {
        const playerStats = match.playerStats[playerId];
        
        if (playerStats && playerStats.played) {
            const points = playerStats.points || 0;
            const minutes = playerStats.minutes || 0;
            
            cumulativePoints += points;
            cumulativeMinutes += minutes;
            matchesPlayed++;
            
            pointsData.push(points);
            minutesData.push(minutes);
            pointsPerMatchData.push(cumulativePoints / matchesPlayed);
            minutesPerMatchData.push(cumulativeMinutes / matchesPlayed);
        } else {
            // Si n'a pas joué
            pointsData.push(0);
            minutesData.push(0);
            pointsPerMatchData.push(matchesPlayed > 0 ? cumulativePoints / matchesPlayed : 0);
            minutesPerMatchData.push(matchesPlayed > 0 ? cumulativeMinutes / matchesPlayed : 0);
        }
    });
    
    const showHistograms = document.getElementById('showHistograms');
    const shouldShowHistograms = showHistograms ? showHistograms.checked : true;
    
    const datasets = [];
    
    // Ajouter les histogrammes seulement si la checkbox est cochée
    if (shouldShowHistograms) {
        // Histogramme - Points par match
        datasets.push({
            label: 'Points dans le match',
            data: pointsData,
            backgroundColor: playerChartColors.points + '50',
            borderColor: playerChartColors.points,
            borderWidth: 2,
            type: 'bar',
            yAxisID: 'y'
        });
        
        // Histogramme - Minutes par match
        datasets.push({
            label: 'Minutes dans le match',
            data: minutesData,
            backgroundColor: playerChartColors.minutes + '50',
            borderColor: playerChartColors.minutes,
            borderWidth: 2,
            type: 'bar',
            yAxisID: 'y1'
        });
    }
    
    // Toujours ajouter les courbes de moyennes
    // Courbe - Moyenne points par match
    datasets.push({
        label: 'Moyenne points/match',
        data: pointsPerMatchData,
        borderColor: playerChartColors.points,
        backgroundColor: 'transparent',
        tension: 0.4,
        type: 'line',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: playerChartColors.points,
        yAxisID: 'y'
    });
    
    // Courbe - Moyenne minutes par match
    datasets.push({
        label: 'Moyenne minutes/match',
        data: minutesPerMatchData,
        borderColor: playerChartColors.minutes,
        backgroundColor: 'transparent',
        tension: 0.4,
        type: 'line',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: playerChartColors.minutes,
        yAxisID: 'y1'
    });
    
    return { labels, datasets };
}

// Mise à jour du graphique de joueuse
function updatePlayerChart() {
    const ctx = document.getElementById('playerPerformanceChart');
    if (!ctx) return;
    
    const playerSelect = document.getElementById('playerSelect');
    const selectedPlayerId = playerSelect ? playerSelect.value : '';
    
    if (playerPerformanceChart) {
        playerPerformanceChart.destroy();
    }
    
    if (!selectedPlayerId) {
        // Afficher un message si aucune joueuse sélectionnée
        ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        return;
    }
    
    const { labels, datasets } = calculatePlayerChartData(parseInt(selectedPlayerId));
    const selectedPlayer = players.find(p => p.id === parseInt(selectedPlayerId));
    
    playerPerformanceChart = new Chart(ctx, {
        type: 'bar', // Type principal, mais on mixe avec des lignes
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Performance de ${selectedPlayer?.prenom} (#${selectedPlayer?.numero})`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Matchs'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Points',
                        color: playerChartColors.points
                    },
                    grid: {
                        color: 'rgba(197, 48, 48, 0.1)'
                    },
                    ticks: {
                        color: playerChartColors.points
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Minutes',
                        color: playerChartColors.minutes
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: playerChartColors.minutes
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation de l\'application...');
    
    // Charger les données depuis le localStorage
    loadDataFromStorage();
    console.log('Données chargées:', { players: players.length, matches: matches.length });
    
    // Initialiser les composants
    populatePlayerSelect();
    populateComparisonSelects();
    renderMatches();
    renderPlayers();
    
    // Initialiser le dashboard par défaut
    switchTab('dashboard');
    console.log('Application initialisée avec succès');
});