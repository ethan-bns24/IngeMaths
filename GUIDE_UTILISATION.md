# Guide d'Utilisation - Site Bassa Soufian

## 📚 Comment ajouter du contenu

### 1. Ajouter des Témoignages

Pour ajouter un nouveau témoignage, utilisez cette commande curl :

```bash
curl -X POST https://tutoringsite.preview.emergentagent.com/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nom de l'\''élève ou parent",
    "role": "Élève en Terminale S (ou autre)",
    "content": "Le témoignage complet ici...",
    "rating": 5
  }'
```

**Exemples de rôles :**
- Élève en Terminale S
- Parent d'élève
- Étudiant en prépa
- Élève en 3ème
- etc.

**Rating :** Nombre d'étoiles de 1 à 5

---

### 2. Ajouter des Ressources (Vidéos et PDF)

#### Pour ajouter une vidéo YouTube/Vimeo :

```bash
curl -X POST https://tutoringsite.preview.emergentagent.com/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre de la vidéo",
    "description": "Description de la vidéo",
    "type": "video",
    "url": "https://www.youtube.com/watch?v=VOTRE_VIDEO_ID",
    "category": "Mathématiques",
    "level": "Lycée"
  }'
```

#### Pour ajouter un document PDF :

```bash
curl -X POST https://tutoringsite.preview.emergentagent.com/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre du document",
    "description": "Description du document",
    "type": "pdf",
    "url": "URL_DU_PDF_ou_#",
    "category": "Physique",
    "level": "Collège"
  }'
```

**Catégories disponibles :** 
- Mathématiques
- Physique

**Niveaux disponibles :**
- Collège
- Lycée
- Prépa

---

### 3. Supprimer un Témoignage ou une Ressource

Pour supprimer, vous aurez besoin de l'ID de l'élément.

#### Supprimer un témoignage :
```bash
curl -X DELETE https://tutoringsite.preview.emergentagent.com/api/testimonials/ID_DU_TEMOIGNAGE
```

#### Supprimer une ressource :
```bash
curl -X DELETE https://tutoringsite.preview.emergentagent.com/api/resources/ID_DE_LA_RESSOURCE
```

Pour obtenir les IDs, consultez la base de données ou contactez votre administrateur technique.

---

### 4. Voir tous les messages de contact reçus

```bash
curl https://tutoringsite.preview.emergentagent.com/api/contact
```

---

## 📧 Configuration des emails

Pour recevoir les notifications par email lorsqu'un visiteur remplit le formulaire de contact :

1. Ouvrez le fichier `/app/backend/.env`
2. Ajoutez les lignes suivantes (avec vos vraies informations) :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_application
```

**Note pour Gmail :** 
- Vous devez activer l'authentification à deux facteurs
- Puis créer un "Mot de passe d'application" depuis les paramètres Google
- Utilisez ce mot de passe d'application dans SMTP_PASSWORD

3. Redémarrez le backend :
```bash
sudo supervisorctl restart backend
```

---

## 🎨 Personnalisation du contenu

### Modifier les tarifs

Les tarifs sont définis dans `/app/frontend/src/App.js` à la ligne ~88 dans la variable `pricingPlans`.

Exemple :
```javascript
{
  title: 'Cours Individuel',
  price: '35€',
  duration: '/ heure',
  features: [
    'Cours personnalisé à domicile',
    'Suivi individualisé',
    ...
  ]
}
```

### Modifier les statistiques du Hero

Dans `/app/frontend/src/App.js` à la ligne ~189, modifiez :
```javascript
<div className="stat-number">8+</div>
<div className="stat-label">Années d'expérience</div>
```

### Modifier la section "Qui suis-je"

Éditez le texte dans la section `about-section` du fichier `/app/frontend/src/App.js` (ligne ~214).

---

## 🔧 Commandes utiles

### Redémarrer les services
```bash
sudo supervisorctl restart backend frontend
```

### Voir les logs du backend
```bash
tail -f /var/log/supervisor/backend.err.log
```

### Voir les logs du frontend
```bash
tail -f /var/log/supervisor/frontend.err.log
```

### Vérifier que les services sont actifs
```bash
sudo supervisorctl status
```

---

## 📱 Liens sociaux

Les liens actuels dans le site :
- **Email :** soufian.bassa@gmail.com
- **Téléphone :** 0782219583
- **WhatsApp :** Clique directement sur le lien WhatsApp dans la section contact

Pour ajouter Instagram ou autres réseaux sociaux, modifiez le footer dans `/app/frontend/src/App.js`.

---

## 🚀 Optimisation SEO

Le site est déjà optimisé pour le SEO avec :
- Structure sémantique HTML5
- Titres hiérarchisés (h1, h2, h3)
- Meta descriptions (à ajouter dans `/app/frontend/public/index.html`)
- URLs propres avec sections
- Temps de chargement rapide

Pour améliorer encore le SEO, ajoutez dans `/app/frontend/public/index.html` :

```html
<meta name="description" content="Cours particuliers de Mathématiques et Physique du collège à la prépa. Professeur expérimenté avec méthode personnalisée et résultats garantis.">
<meta name="keywords" content="cours particuliers, mathématiques, physique, prépa, lycée, collège, Bassa Soufian">
```

---

## 📊 Base de données MongoDB

Les données sont stockées dans MongoDB avec 3 collections :
1. **testimonials** : Les témoignages
2. **resources** : Les ressources (vidéos et PDF)
3. **contact_messages** : Les messages de contact

Pour accéder à la base de données :
```bash
mongosh mongodb://localhost:27017/test_database
```

---

## 🎯 Prochaines étapes recommandées

1. ✅ Remplacer l'image placeholder par votre vraie photo de profil
2. ✅ Ajouter vos vraies vidéos YouTube
3. ✅ Uploader vos PDF de cours
4. ✅ Configurer l'envoi d'emails
5. ✅ Ajouter des vraies captures d'écran ou images
6. ✅ Personnaliser les tarifs selon vos besoins
7. ✅ Ajouter un compte Instagram dans le footer

---

## 📞 Support

Si vous avez besoin d'aide ou de modifications, contactez votre développeur.

**Site actuel :** https://tutoringsite.preview.emergentagent.com
