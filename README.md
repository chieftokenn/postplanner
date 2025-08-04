# PostPlanner - Application SaaS de Planification de Posts

PostPlanner est une application SaaS moderne qui permet aux utilisateurs de planifier et publier automatiquement leurs posts sur LinkedIn et Twitter. L'application propose des horaires optimisés et une interface intuitive pour gérer votre présence sur les réseaux sociaux.

## 🚀 Fonctionnalités

### Fonctionnalités Principales
- **Planification intelligente** : Créez vos posts à l'avance et programmez-les aux moments optimaux
- **Horaires optimisés** : Algorithme qui analyse les meilleurs moments pour publier selon votre audience
- **Publication automatique** : Publiez automatiquement sur LinkedIn et Twitter sans intervention manuelle
- **Multi-plateformes** : Support de LinkedIn et Twitter depuis une seule interface
- **Analytics avancés** : Suivez les performances de vos posts et optimisez votre stratégie
- **Interface moderne** : Design fluide et professionnel avec shadcn/ui et Framer Motion

### Authentification
- OAuth2 avec LinkedIn et Twitter
- Authentification classique par email/mot de passe
- Gestion des sessions sécurisée

### Monétisation
- Abonnement unique : $10/mois
- Intégration Stripe pour les paiements
- Gestion des abonnements

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 avec App Router
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : NextAuth.js + Supabase Auth
- **Paiements** : Stripe
- **APIs** : LinkedIn Marketing API, Twitter API v2
- **Langage** : TypeScript
- **Déploiement** : Vercel (recommandé)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase
- Compte Stripe
- Applications LinkedIn et Twitter Developer

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/postplanner.git
cd postplanner
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

Copiez le fichier d'exemple et configurez vos variables :

```bash
cp env.example .env.local
```

Remplissez les variables dans `.env.local` :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# LinkedIn API Configuration
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback

# Twitter API Configuration
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_REDIRECT_URI=http://localhost:3000/api/auth/twitter/callback

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Configuration de Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Créez les tables suivantes dans votre base de données :

#### Table `posts`
```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('draft', 'scheduled', 'published', 'failed')) DEFAULT 'draft',
  platform TEXT CHECK (platform IN ('linkedin', 'twitter')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `user_connections`
```sql
CREATE TABLE user_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('linkedin', 'twitter')) NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);
```

### 5. Configuration de Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API dans le dashboard
3. Configurez les webhooks pour gérer les événements d'abonnement

### 6. Configuration des APIs LinkedIn et Twitter

#### LinkedIn
1. Créez une application sur [LinkedIn Developers](https://developer.linkedin.com)
2. Configurez les permissions : `r_liteprofile`, `w_member_social`
3. Récupérez votre Client ID et Client Secret

#### Twitter
1. Créez une application sur [Twitter Developer Portal](https://developer.twitter.com)
2. Configurez les permissions : `tweet.read`, `tweet.write`
3. Récupérez votre Client ID et Client Secret

### 7. Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📁 Structure du Projet

```
postplanner/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── api/               # APIs
│   │   ├── auth/              # Pages d'authentification
│   │   ├── dashboard/         # Dashboard utilisateur
│   │   └── page.tsx           # Landing page
│   ├── components/            # Composants React
│   │   └── ui/               # Composants shadcn/ui
│   └── lib/                  # Utilitaires et configurations
├── public/                   # Assets statiques
├── env.example              # Variables d'environnement
└── README.md               # Documentation
```

## 🔧 Configuration Avancée

### Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement

### Configuration de la Base de Données

Pour la production, assurez-vous de :
- Configurer les RLS (Row Level Security) sur Supabase
- Créer les politiques de sécurité appropriées
- Configurer les backups automatiques

### Sécurité

- Utilisez HTTPS en production
- Configurez les CORS appropriés
- Validez toutes les entrées utilisateur
- Utilisez des tokens JWT sécurisés

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que toutes les variables d'environnement sont configurées
2. Assurez-vous que les APIs LinkedIn et Twitter sont correctement configurées
3. Vérifiez les logs de l'application
4. Ouvrez une issue sur GitHub

## 🚀 Roadmap

- [ ] Support d'autres plateformes (Instagram, Facebook)
- [ ] Analytics avancés avec graphiques
- [ ] Templates de posts prédéfinis
- [ ] Collaboration d'équipe
- [ ] API publique pour les développeurs
- [ ] Application mobile

---

**PostPlanner** - Optimisez votre présence sur les réseaux sociaux 🚀
