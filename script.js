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

        matches.forEach(match => {
            const stats = match.playerStats[player.id];
            if (stats && stats.played) {
                player.matches += 1;
            }
            if (stats) {
                player.points += stats.points;
                player.minutes += stats.minutes;
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
    if (tab === 'team') {
        setTimeout(() => updateChart(), 100);
    } else if (tab === 'players') {
        setTimeout(() => {
            populatePlayerSelect();
            updatePlayerChart();
        }, 100);
    }
}

// Fonction pour calculer les statistiques précédentes d'un joueur
function calculatePlayerPreviousStats(playerId) {
    if (matches.length <= 1) {
        return { previousPointsPerMatch: null, previousMinutesPerMatch: null };
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
    
    return {
        previousPointsPerMatch: previousMatchesPlayed > 0 ? (totalPreviousPoints / previousMatchesPlayed) : null,
        previousMinutesPerMatch: previousMatchesPlayed > 0 ? (totalPreviousMinutes / previousMatchesPlayed) : null
    };
}

// Rendu des joueuses
function renderPlayers() {
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
    
    playersGrid.innerHTML = players.map(player => {
        const currentPointsPerMatch = player.matches > 0 ? (player.points / player.matches) : 0;
        const currentMinutesPerMatch = player.matches > 0 ? (player.minutes / player.matches) : 0;
        
        const { previousPointsPerMatch, previousMinutesPerMatch } = calculatePlayerPreviousStats(player.id);
        
        return `
            <div class="player-card" data-player-id="${player.id}">
                <div class="player-header">
                    <div class="player-name">${player.prenom}</div>
                    <div class="player-number">${player.numero}</div>
                </div>
                <div class="player-stats">
                    <div class="stat-item stat-wide">
                        <span class="stat-value">${player.matches}</span>
                        <div class="stat-label">Matchs</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${player.minutes}</span>
                        <div class="stat-label">Minutes</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${player.points}</span>
                        <div class="stat-label">Points</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">
                            ${currentMinutesPerMatch.toFixed(1)}
                            ${calculateTrend(currentMinutesPerMatch, previousMinutesPerMatch)}
                        </span>
                        <div class="stat-label">Minutes/match</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">
                            ${currentPointsPerMatch.toFixed(1)}
                            ${calculateTrend(currentPointsPerMatch, previousPointsPerMatch)}
                        </span>
                        <div class="stat-label">Points/match</div>
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
                }
            });
        }
    }
    
    // Ajouter les nouvelles statistiques des joueuses
    players.forEach(player => {
        const points = parseInt(formData.get(`points_${player.id}`)) || 0;
        const minutes = parseInt(formData.get(`minutes_${player.id}`)) || 0;
        const played = parseInt(formData.get(`played_${player.id}`)) || 0;
        
        if (played) {
            player.matches += 1;
        }
        player.points += points;
        player.minutes += minutes;
        
        matchData.playerStats[player.id] = {
            points,
            minutes,
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