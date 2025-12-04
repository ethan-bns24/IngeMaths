# Architecture du Site Bassa Soufian

## 📁 Structure du Projet

```
/app/
├── backend/                     # API FastAPI
│   ├── server.py               # Serveur principal avec routes API
│   ├── requirements.txt        # Dépendances Python
│   ├── .env                    # Variables d'environnement
│   └── uploads/                # Dossier pour les fichiers uploadés
│
├── frontend/                    # Application React
│   ├── src/
│   │   ├── App.js              # Composant principal
│   │   ├── App.css             # Styles personnalisés
│   │   ├── index.js            # Point d'entrée React
│   │   ├── index.css           # Styles globaux
│   │   └── components/ui/      # Composants Shadcn UI
│   ├── public/
│   ├── package.json            # Dépendances Node.js
│   └── .env                    # Variables d'environnement frontend
│
├── GUIDE_UTILISATION.md        # Guide pour ajouter du contenu
├── DATA_EXAMPLES.json          # Exemples de données
└── ARCHITECTURE.md             # Ce fichier
```

---

## 🔧 Stack Technique

### Backend
- **Framework :** FastAPI (Python)
- **Base de données :** MongoDB
- **ORM :** Motor (async MongoDB driver)
- **Validation :** Pydantic
- **Email :** aiosmtplib

### Frontend
- **Framework :** React 19
- **Routing :** React Router DOM v7
- **UI Components :** Shadcn UI + Radix UI
- **Styling :** Tailwind CSS + CSS personnalisé
- **Fonts :** Space Grotesk (titres) + Inter (texte)
- **Icons :** Lucide React
- **HTTP Client :** Axios
- **Notifications :** Sonner (toasts)

---

## 🗄️ Modèles de Données (MongoDB)

### Collection: `testimonials`
```javascript
{
  id: String (UUID),
  name: String,
  role: String,
  content: String,
  rating: Integer (1-5),
  timestamp: DateTime (ISO format)
}
```

### Collection: `resources`
```javascript
{
  id: String (UUID),
  title: String,
  description: String,
  type: String ("video" | "pdf"),
  url: String,
  category: String ("Mathématiques" | "Physique"),
  level: String ("Collège" | "Lycée" | "Prépa"),
  timestamp: DateTime (ISO format)
}
```

### Collection: `contact_messages`
```javascript
{
  id: String (UUID),
  name: String,
  email: String,
  phone: String,
  message: String,
  timestamp: DateTime (ISO format)
}
```

---

## 🛣️ Routes API

### Général
- `GET /api/` - Message de bienvenue de l'API

### Témoignages
- `POST /api/testimonials` - Créer un témoignage
- `GET /api/testimonials` - Récupérer tous les témoignages
- `DELETE /api/testimonials/{id}` - Supprimer un témoignage

### Ressources
- `POST /api/resources` - Créer une ressource
- `GET /api/resources` - Récupérer toutes les ressources
- `DELETE /api/resources/{id}` - Supprimer une ressource

### Upload
- `POST /api/upload` - Uploader un fichier PDF
- `GET /api/files/{filename}` - Télécharger un fichier

### Contact
- `POST /api/contact` - Envoyer un message de contact
- `GET /api/contact` - Récupérer tous les messages

---

## 🎨 Structure du Frontend

### Sections de la Page

1. **Navigation (Sticky)**
   - Logo + Nom
   - Liens de navigation
   - Bouton Contact

2. **Hero Section**
   - Titre principal avec gradient
   - Badge "Professeur Expérimenté"
   - Boutons CTA (Me Contacter + Découvrir)
   - Statistiques (années, élèves, taux de réussite)

3. **About Section**
   - Présentation du professeur
   - Photo/placeholder
   - Points forts

4. **Method Section**
   - 4 cartes expliquant la méthode
   - Icônes et descriptions

5. **Pricing Section**
   - 4 formules de tarifs
   - Badge "Populaire" sur l'offre phare
   - Boutons "Réserver"

6. **Testimonials Section**
   - Carousel de témoignages
   - Système d'étoiles
   - Navigation prev/next

7. **Resources Section**
   - Onglets : Tout / Vidéos / Documents PDF
   - Grille de ressources
   - Filtrage par type

8. **Contact Section**
   - Formulaire de contact
   - Liens Email / Téléphone / WhatsApp
   - Icônes colorées

9. **Footer**
   - Logo et tagline
   - Liens de navigation
   - Mentions légales
   - Copyright

---

## 🔐 Variables d'Environnement

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://tutoringsite.preview.emergentagent.com
WDS_SOCKET_PORT=443
```

---

## 🎨 Palette de Couleurs

```css
--primary: #2563eb (Bleu principal)
--primary-dark: #1e40af (Bleu foncé)
--primary-light: #3b82f6 (Bleu clair)
--accent: #0ea5e9 (Accent cyan)
--success: #10b981 (Vert succès)
--text-dark: #0f172a (Texte principal)
--text-gray: #64748b (Texte secondaire)
--border: #e2e8f0 (Bordures)
--background: #ffffff (Fond)
--secondary: #f8fafc (Fond secondaire)
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile :** < 768px
- **Tablet :** 768px - 1024px
- **Desktop :** > 1024px

### Adaptations mobiles
- Navigation simplifiée
- Grilles en 1 colonne
- Tailles de police réduites
- Stats empilées verticalement
- Formulaire pleine largeur

---

## 🚀 Déploiement

### Services Supervisor
- **Backend :** Port 8001 (uvicorn)
- **Frontend :** Port 3000 (React dev server)

### Commandes
```bash
# Redémarrer les services
sudo supervisorctl restart backend frontend

# Voir les logs
tail -f /var/log/supervisor/backend.err.log
tail -f /var/log/supervisor/frontend.err.log

# Statut des services
sudo supervisorctl status
```

---

## 🔄 Workflow de Développement

1. **Modification du backend**
   - Éditer `/app/backend/server.py`
   - Le hot reload est activé automatiquement
   - Ajouter nouvelles dépendances : `pip install XXX && pip freeze > requirements.txt`

2. **Modification du frontend**
   - Éditer `/app/frontend/src/App.js` ou `/app/frontend/src/App.css`
   - Le hot reload est activé automatiquement
   - Ajouter nouvelles dépendances : `cd /app/frontend && yarn add XXX`

3. **Modification des .env**
   - Toujours redémarrer les services après modification
   - `sudo supervisorctl restart backend frontend`

---

## 📦 Composants Réutilisables

### Shadcn UI Components utilisés
- `Button` - Boutons stylisés
- `Card` - Cartes pour contenu
- `Input` - Champs de formulaire
- `Textarea` - Zone de texte multi-lignes
- `Label` - Labels de formulaire
- `Tabs` - Onglets pour ressources
- `Carousel` - Carrousel de témoignages
- `Toaster` - Notifications toast

### Icônes Lucide React utilisées
- `GraduationCap` - Logo
- `BookOpen`, `Users`, `Target`, `Clock` - Méthode
- `Award` - Badge
- `MessageCircle` - WhatsApp
- `Mail`, `Phone` - Contact
- `Star` - Ratings
- `Video`, `FileText` - Ressources
- `CheckCircle` - Validation

---

## 🔒 Sécurité

### Backend
- CORS configuré
- Validation des données avec Pydantic
- Upload de fichiers limité aux PDF
- Email validation

### Frontend
- Variables d'environnement pour URLs
- Validation côté client des formulaires
- Protection XSS via React

---

## 📈 Améliorations Futures Possibles

1. **Authentification admin**
   - Espace admin pour gérer témoignages/ressources
   - Login sécurisé avec JWT

2. **Système de réservation**
   - Calendrier de disponibilité
   - Prise de RDV en ligne
   - Paiement intégré (Stripe)

3. **Blog**
   - Articles sur les maths/physique
   - Système de CMS

4. **Analytics**
   - Google Analytics
   - Suivi des conversions

5. **Multilangue**
   - Support FR/EN
   - i18n

6. **PWA**
   - Application installable
   - Mode offline

---

## 📞 Contact Technique

Pour toute question technique sur l'architecture ou le code, contactez votre développeur.
