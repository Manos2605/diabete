# Diabetes Predictor API

Une application web pour prédire le risque de diabète à partir de données cliniques. Le projet comprend un **backend Flask** pour gérer les prédictions et un **frontend React** pour saisir les données et afficher les résultats.  

---

## Fonctionnalités

- Prédiction du diabète à partir de :
  - Nombre de grossesses (`Pregnancies`)  
  - Glycémie (`Glucose`)  
  - Pression artérielle (`BloodPressure`)  
  - Épaisseur du pli cutané (`SkinThickness`)  
  - Insuline (`Insulin`)  
  - Indice de masse corporelle (`BMI`)  
  - Fonction héréditaire du diabète (`DiabetesPedigreeFunction`)  
  - Âge (`Age`)  
- API REST sécurisée avec **CORS** configuré pour React frontend.  
- Modèle machine learning : **Random Forest** entraîné sur le dataset Pima Indians Diabetes.  
- Déployé sur **PythonAnywhere** (backend) et **Vercel** (frontend).  

---

## Technologies utilisées

- **Backend** :
  - Python 3.13  
  - Flask  
  - Pandas  
  - Pydantic (validation des données)  
  - Joblib (pour charger le modèle ML)  
- **Frontend** :
  - React.js (Vite)  
  - Fetch API pour les requêtes HTTP  
- **Machine Learning** :
  - scikit-learn RandomForestClassifier  

---

## Installation et exécution locale

### Backend Flask

1. Cloner le dépôt :  
```bash
git clone https://github.com/tonusername/diabetes-predictor.git
cd diabetes-predictor/backend
````
2. Test rapide

Tester l’API via navigateur ou Postman :
```bash
GET https://manos26052006.pythonanywhere.com/
```

Tester la prédiction :
```bash
POST https://manos26052006.pythonanywhere.com/predire
```
avec un JSON valide comme ci-dessus.
```bash
{
  "resultats": {
    "Age": 45.0,
    "BMI": 33.6,
    "BloodPressure": 62.0,
    "DiabetesPedigreeFunction": 0.127,
    "Glucose": 138.0,
    "Insulin": 0.0,
    "Pregnancies": 2,
    "SkinThickness": 35.0,
    "prediction": 1,
    "probabilite_diabete": 0.85
  }
}
```
