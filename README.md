# 🎓 Site Web Bassa Soufian - Cours Particuliers

Site web professionnel pour cours particuliers de Mathématiques et Physique.

## 🌐 Accès au site

**URL :** https://tutoringsite.preview.emergentagent.com

---

## ✨ Fonctionnalités

### Pages et Sections
- ✅ **Hero Section** : Titre accrocheur avec statistiques et CTA
- ✅ **Présentation** : Qui suis-je et points forts
- ✅ **Ma Méthode** : 4 étapes d'enseignement
- ✅ **Formules & Tarifs** : 4 offres de cours avec prix
- ✅ **Témoignages** : Carousel d'avis élèves/parents avec système d'étoiles
- ✅ **Cours & Ressources** : Bibliothèque de vidéos et PDF avec filtres
- ✅ **Contact** : Formulaire + liens directs (Email, Téléphone, WhatsApp)
- ✅ **Footer** : Navigation et mentions légales

### Fonctionnalités Backend
- ✅ API REST complète (FastAPI)
- ✅ Base de données MongoDB
- ✅ Gestion des témoignages (CRUD)
- ✅ Gestion des ressources (vidéos/PDF)
- ✅ Formulaire de contact avec envoi d'email
- ✅ Upload de fichiers PDF
- ✅ Stockage des messages de contact

### Design
- ✅ Design moderne et professionnel
- ✅ Couleurs bleues sobres (#2563eb)
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Navigation sticky
- ✅ Animations et transitions fluides
- ✅ Composants Shadcn UI
- ✅ Optimisé SEO

---

## 📋 Informations de Contact

- **Nom :** Bassa Soufian
- **Email :** soufian.bassa@gmail.com
- **Téléphone :** 07 82 21 95 83
- **WhatsApp :** https://wa.me/33782219583

---

## 📚 Documentation

### Pour ajouter du contenu
📖 **[GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md)**
- Comment ajouter des témoignages
- Comment ajouter des vidéos et PDF
- Configuration des emails
- Personnalisation du contenu

### Architecture technique
🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)**
- Stack technique complet
- Modèles de données
- Routes API
- Structure du code
- Déploiement

### Exemples de données
💾 **[DATA_EXAMPLES.json](./DATA_EXAMPLES.json)**
- Exemples de témoignages
- Exemples de ressources
- Commandes API prêtes à l'emploi

---

## 🚀 Démarrage Rapide

### Accéder au site
Visitez simplement : https://tutoringsite.preview.emergentagent.com

### Ajouter un témoignage (exemple)
```bash
curl -X POST https://tutoringsite.preview.emergentagent.com/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marie Dupont",
    "role": "Élève en 1ère S",
    "content": "Excellents cours, j'\''ai progressé rapidement !",
    "rating": 5
  }'
```

### Ajouter une vidéo YouTube (exemple)
```bash
curl -X POST https://tutoringsite.preview.emergentagent.com/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Théorème de Pythagore expliqué",
    "description": "Comprendre et appliquer le théorème",
    "type": "video",
    "url": "https://www.youtube.com/watch?v=VOTRE_VIDEO_ID",
    "category": "Mathématiques",
    "level": "Collège"
  }'
```

---

## 🛠️ Stack Technique

### Backend
- FastAPI (Python)
- MongoDB
- Motor (async driver)
- Pydantic
- aiosmtplib (emails)

### Frontend
- React 19
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- Axios
- React Router
- Sonner (notifications)

---

## 📊 Données de Démonstration

Le site contient déjà :
- ✅ 4 témoignages d'exemple
- ✅ 6 ressources d'exemple (3 vidéos + 3 PDF)
- ✅ Toutes les sections complètes

Vous pouvez les modifier ou supprimer et ajouter vos propres contenus.

---

## 🔧 Commandes Utiles

### Redémarrer les services
```bash
sudo supervisorctl restart backend frontend
```

### Voir les logs
```bash
# Backend
tail -f /var/log/supervisor/backend.err.log

# Frontend
tail -f /var/log/supervisor/frontend.err.log
```

### Statut des services
```bash
sudo supervisorctl status
```

---

## 📧 Configuration Email

Pour recevoir les notifications de contact par email, éditez `/app/backend/.env` :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_application
```

Puis redémarrez : `sudo supervisorctl restart backend`

---

## 🎨 Personnalisation

### Modifier les tarifs
Fichier : `/app/frontend/src/App.js` (ligne ~88)

### Modifier la présentation
Fichier : `/app/frontend/src/App.js` (section about)

### Modifier les couleurs
Fichier : `/app/frontend/src/App.css` (variables CSS)

---

## 📱 Responsive

Le site s'adapte automatiquement à tous les écrans :
- 📱 Mobile (< 768px)
- 💻 Tablette (768px - 1024px)
- 🖥️ Desktop (> 1024px)

---

## 🎯 Prochaines Étapes Recommandées

1. ✅ Ajouter votre vraie photo de profil
2. ✅ Remplacer les vidéos d'exemple par vos vraies vidéos YouTube
3. ✅ Uploader vos PDF de cours
4. ✅ Configurer l'envoi d'emails
5. ✅ Personnaliser les tarifs
6. ✅ Ajouter vos vrais témoignages
7. ✅ Ajouter un lien Instagram dans le footer

---

## 📞 Support

Pour toute question ou modification, consultez :
- 📖 [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md)
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md)
- 💾 [DATA_EXAMPLES.json](./DATA_EXAMPLES.json)

Ou contactez votre développeur.

---

## 📄 Licence

© 2025 Bassa Soufian. Tous droits réservés
