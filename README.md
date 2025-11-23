<h1>Gestion des notes de frais</h1>

## Aperçu
Ce projet consiste à développer une application de gestion des notes de frais, dans laquelle l’employé peut créer et soumettre ses dépenses tandis que le manager peut les approuver, les rejeter ou les payer. L’application facilite et automatise entièrement le processus de traitement des notes de frais, afin d’améliorer le suivi et la gestion financière au sein de l’entreprise.

## Technologies utilisées
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS / Shadcn UI
- react-icons
  
## Structure du projet
```bash
app/
 ├── api/
 │    ├── auth/
 │    └── notes/
 │
 ├── expenses/
 │
 ├── login/
 │
 ├── manager/
 │
 └── seed/
      ├── expenses.json
      └── users.json
 │
 ├── globals.css
 └── layout.tsx
 └── page.tsx

components/
 └── ui/
lib/
public/

```

### Scripts disponibles
```bash
- `npm install` : installation des dépendances
- `npm run dev` : lance l’application en mode développement
- `npm run build` : build du projet
- `npm run start` : démarre la version buildée
```

## commencer

Clonez d’abord le dépôt GitHub :
```bash
# Avec HTTPS
git clone https://github.com/aalaliayoub/v1.0depot.git

# Avec SSH
git clone git@github.com:aalaliayoub/v1.0depot.git

# Avec GitHub CLI
gh repo clone aalaliayoub/v1.0depot

```
Ensuite, lancez l’application : 
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour afficher l’application.

## Fonctionnalités
#### Authentification
 - Connexion à l’application via une adresse e-mail et un mot de passe.
### Employé
- Créer une note de frais
- Modifier une note
- Soumettre une note
- Filtrer et paginer la liste

### Manager
- Voir toutes les dépenses
- Approuver ou rejeter
- Marquer comme payée
- Exporter les dépenses en CSV
