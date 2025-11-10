# Serveur HTTP simple pour tester l'application Basketball Stats
# Utilise la commande Python http.server
Write-Host "Démarrage du serveur HTTP sur le port 8000..." -ForegroundColor Green

# Aller dans le répertoire de l'application
Set-Location "c:\Users\pierreantoine.tissot\OneDrive - TELEFLOW\99_Perso\Basket\Stats"

# Vérifier que les fichiers sont présents
if (Test-Path "index.html") {
    Write-Host "✅ index.html trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ index.html manquant" -ForegroundColor Red
    exit 1
}

if (Test-Path "script.js") {
    Write-Host "✅ script.js trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ script.js manquant" -ForegroundColor Red
    exit 1
}

if (Test-Path "styles.css") {
    Write-Host "✅ styles.css trouvé" -ForegroundColor Green
} else {
    Write-Host "❌ styles.css manquant" -ForegroundColor Red
    exit 1
}

Write-Host "`nDémarrage du serveur..." -ForegroundColor Yellow
Write-Host "URL: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Test: http://localhost:8000/test.html" -ForegroundColor Cyan
Write-Host "`nAppuyez sur Ctrl+C pour arrêter le serveur`n" -ForegroundColor Yellow

# Démarrer le serveur Python HTTP
python -m http.server 8000