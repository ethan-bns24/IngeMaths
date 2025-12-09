import { useState, useEffect } from 'react';
import '@/App.css';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, Users, Target, Clock, Award, Mail, Phone, MessageCircle, Star, Video, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadTestimonials();
    loadResources();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const loadResources = async () => {
    try {
      const response = await axios.get(`${API}/resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message envoyé avec succès!', {
        description: 'Je vous répondrai dans les plus brefs délais.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer ou me contacter directement.'
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const pricingPlans = [
    // 1. FORMULE EXCELLENCE ANNUELLE (Nouveau produit phare)
    {
      title: 'Formule Excellence Annuelle',
      price: '199€',
      duration: '/ mois (sur 10 mois)',
      features: [
        '1 Cours Collectif (Samedi) par semaine',
        '2 Stages Intensifs de 5 jours inclus (Toussaint & Février)',
        'Accès illimité à toutes les fiches et annales',
        'Bilan personnalisé trimestriel'
      ],
      popular: true // Pour le mettre en évidence
    },
    
    // 2. COURS HEBDOMADAIRES (Anciens cours individuels adaptés)
    {
      title: 'Soutien Hebdomadaire',
      price: '35€',
      duration: '/ heure',
      features: [
        'Cours personnalisé à domicile ou en visio',
        'Suivi individualisé des lacunes',
        'Support entre les cours',
        'Fiches de révision'
      ]
    },
    
    // 3. STAGES INTENSIFS (Nouveaux forfaits ponctuels)
    {
      title: 'Stage Intensif Vacances',
      price: '350€',
      duration: '/ stage de 5 jours',
      features: [
        '5 jours consécutifs de révision ciblée',
        'Préparation aux examens (Bac/Brevet)',
        'Méthodologie d\'examen',
        'Ouvert aux élèves extérieurs'
      ]
    },
    
    // 4. PACK D'HEURES (Gardé et adapté si nécessaire)
    {
      title: 'Pack 10 heures',
      price: '320€',
      duration: 'au lieu de 350€',
      features: [
        '10 heures de cours (Présentiel/Visio)',
        'Économie de 30€',
        'Validité 3 mois',
        'Idéal pour un rattrapage ciblé'
      ]
    }
  ];

  const methodSteps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Diagnostic Initial',
      description: 'Identification des lacunes et objectifs personnalisés pour chaque élève'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Explications Intuitives',
      description: 'Approche pédagogique adaptée avec des exemples concrets et visuels'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Exercices Ciblés',
      description: 'Pratique progressive avec des exercices adaptés au niveau et aux difficultés'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Suivi Régulier',
      description: 'Bilans fréquents et communication avec les parents sur les progrès'
    }
  ];

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`nav ${isNavScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-logo">
            <GraduationCap className="w-8 h-8" />
            <span className="nav-brand">Bassa Soufian</span>
          </div>
          <div className="nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#methode">Méthode</a>
            <a href="#tarifs">Tarifs</a>
            <a href="#temoignages">Témoignages</a>
            <a href="#ressources">Ressources</a>
            <Button onClick={scrollToContact} data-testid="nav-contact-btn" className="contact-btn">
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Award className="w-4 h-4" />
            <span>Professeur Expérimenté</span>
          </div>
          <h1 className="hero-title">
            Réussissezer en <span className="gradient-text">Maths & Physique</span>
          </h1>
          <p className="hero-subtitle">
            Cours particuliers du collège à la prépa • Pédagogie adaptée • Résultats garantis
          </p>
          <div className="hero-cta">
            <Button onClick={scrollToContact} size="lg" data-testid="hero-contact-btn" className="cta-primary">
              <MessageCircle className="w-5 h-5 mr-2" />
              Me Contacter
            </Button>
            <Button variant="outline" size="lg" data-testid="hero-method-btn" className="cta-secondary" onClick={() => document.getElementById('methode').scrollIntoView({ behavior: 'smooth' })}>
              Découvrir ma méthode
            </Button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">8+</div>
              <div className="stat-label">Années d'expérience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Élèves accompagnés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Taux de réussite</div>
            </div>
          </div>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <div className="about-image-placeholder">
                <GraduationCap className="w-24 h-24 text-blue-600" />
              </div>
            </div>
            <div className="about-text">
              <h2 className="section-title">Qui suis-je ?</h2>
              <p className="text-lg mb-4">
                Professeur particulier passionné par les mathématiques et la physique, je propose des cours du collège jusqu'aux classes préparatoires.
              </p>
              <p className="text-gray-600 mb-4">
                Mon objectif : rendre ces matières accessibles et passionnantes en adaptant ma pédagogie à chaque profil d'élève. J'accompagne mes élèves non seulement dans la compréhension des concepts, mais aussi dans le développement de méthodes de travail efficaces.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Diplômé en sciences</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Spécialiste collège → prépa</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Pédagogie personnalisée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="methode" className="method-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ma Méthode d'Enseignement</h2>
            <p className="section-description">
              Une approche structurée et personnalisée pour des résultats durables
            </p>
          </div>
          <div className="method-grid">
            {methodSteps.map((step, index) => (
              <Card key={index} className="method-card" data-testid={`method-card-${index}`}>
                <CardHeader>
                  <div className="method-icon">{step.icon}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Formules & Tarifs</h2>
            <p className="section-description">
              Des solutions adaptées à tous les besoins et budgets
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`} data-testid={`pricing-card-${index}`}>
                {plan.popular && <div className="popular-badge">Populaire</div>}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <div className="pricing-amount">
                    <span className="price">{plan.price}</span>
                    <span className="duration">{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="features-list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <CheckCircle className="w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button onClick={scrollToContact} className="w-full" data-testid={`pricing-reserve-btn-${index}`}>
                    Réserver
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ce que disent mes élèves</h2>
            <p className="section-description">
              Témoignages d'élèves et de parents satisfaits
            </p>
          </div>
          {testimonials.length > 0 ? (
            <Carousel className="testimonials-carousel" data-testid="testimonials-carousel">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="testimonial-card">
                      <CardHeader>
                        <div className="testimonial-stars">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="testimonial-content">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="testimonials-placeholder">
              <p className="text-gray-500">Aucun témoignage disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section id="ressources" className="resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Cours & Ressources</h2>
            <p className="section-description">
              Vidéos explicatives et documents pédagogiques à votre disposition
            </p>
          </div>
          <Tabs defaultValue="all" className="resources-tabs">
            <TabsList data-testid="resources-tabs">
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
              <TabsTrigger value="pdfs">Documents PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="resources-grid">
              {resources.length > 0 ? (
                resources.map((resource, index) => (
                  <Card key={resource.id} className="resource-card" data-testid={`resource-card-${index}`}>
                    <CardHeader>
                      <div className="resource-icon">
                        {resource.type === 'video' ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                      </div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.category} • {resource.level}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.open(resource.url, '_blank')} data-testid={`resource-view-btn-${index}`}>
                        {resource.type === 'video' ? 'Voir la vidéo' : 'Télécharger PDF'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Aucune ressource disponible pour le moment.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="videos" className="resources-grid">
              {resources.filter(r => r.type === 'video').length > 0 ? (
                resources.filter(r => r.type === 'video').map((resource, index) => (
                  <Card key={resource.id} className="resource-card">
                    <CardHeader>
                      <div className="resource-icon">
                        <Video className="w-6 h-6" />
                      </div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.category} • {resource.level}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.open(resource.url, '_blank')}>
                        Voir la vidéo
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Aucune vidéo disponible pour le moment.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="pdfs" className="resources-grid">
              {resources.filter(r => r.type === 'pdf').length > 0 ? (
                resources.filter(r => r.type === 'pdf').map((resource, index) => (
                  <Card key={resource.id} className="resource-card">
                    <CardHeader>
                      <div className="resource-icon">
                        <FileText className="w-6 h-6" />
                      </div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.category} • {resource.level}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.open(resource.url, '_blank')}>
                        Télécharger PDF
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Aucun document PDF disponible pour le moment.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Contactez-moi</h2>
              <p className="contact-description">
                Une question ? Besoin de renseignements ? N'hésitez pas à me contacter, je vous réponds rapidement.
              </p>
              <div className="contact-methods">
                <a href="mailto:soufian.bassa@gmail.com" className="contact-method" data-testid="contact-email-link">
                  <div className="contact-method-icon">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="contact-method-label">Email</div>
                    <div className="contact-method-value">soufian.bassa@gmail.com</div>
                  </div>
                </a>
                <a href="tel:0782219583" className="contact-method" data-testid="contact-phone-link">
                  <div className="contact-method-icon">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="contact-method-label">Téléphone</div>
                    <div className="contact-method-value">07 82 21 95 83</div>
                  </div>
                </a>
                <a href="https://wa.me/33782219583" target="_blank" rel="noopener noreferrer" className="contact-method" data-testid="contact-whatsapp-link">
                  <div className="contact-method-icon">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="contact-method-label">WhatsApp</div>
                    <div className="contact-method-value">Message direct</div>
                  </div>
                </a>
              </div>
            </div>
            <Card className="contact-form-card">
              <CardHeader>
                <CardTitle>Envoyez-moi un message</CardTitle>
                <CardDescription>Je vous répondrai dans les 24h</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      data-testid="contact-name-input"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="contact-email-input"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      data-testid="contact-phone-input"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      data-testid="contact-message-input"
                      placeholder="Décrivez votre besoin, votre niveau, vos objectifs..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="contact-submit-btn">
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <GraduationCap className="w-8 h-8" />
                <span>Bassa Soufian</span>
              </div>
              <p className="footer-tagline">
                Cours particuliers de Mathématiques & Physique
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h3>Navigation</h3>
                <a href="#accueil">Accueil</a>
                <a href="#methode">Méthode</a>
                <a href="#tarifs">Tarifs</a>
                <a href="#temoignages">Témoignages</a>
              </div>
              <div className="footer-column">
                <h3>Contact</h3>
                <a href="mailto:soufian.bassa@gmail.com">Email</a>
                <a href="tel:0782219583">Téléphone</a>
                <a href="https://wa.me/33782219583" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Bassa Soufian. Tous droits réservés.</p>
            <div className="footer-legal">
              <a href="#mentions">Mentions légales</a>
              <a href="#confidentialite">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;