#!/bin/bash

# Vérifier si un message de commit a été fourni
if [ -z "$1" ]; then
  echo "Erreur: Veuillez fournir un message de commit."
  echo "Usage: ./deploy.sh \"Votre message de commit\""
  exit 1
fi

echo "🚀 Démarrage du déploiement..."

# Ajouter tous les changements
echo "📦 Ajout des fichiers (git add)..."
git add .

# Commit avec le message fourni
echo "💾 Commit des changements..."
git commit -m "$1"

# Push vers la branche main
echo "⬆️  Push vers GitHub (origin main)..."
git push origin main

# Déclencher le déploiement Vercel via le hook
echo "🚀 Déclenchement du build Vercel..."
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_caPAgMoU192yGj8bOyYGeKGwgbxk/H017RvzeLk

echo ""
echo "✅ Terminé ! Les changements sont sur GitHub et le déploiement Vercel a été lancé."
