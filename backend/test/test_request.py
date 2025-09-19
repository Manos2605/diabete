import requests

url = "https://Manos26052006.pythonanywhere.com/"

# Test du endpoint d'accueil
response = requests.get(f"{url}/")
print("Réponse du endpoint d'accueil:", response.text)

# Données d'exemple pour la prédiction
donnees_predire = {
    "Pregnancies": 2,
    "Glucose": 138,
    "BloodPressure": 62,
    "SkinThickness": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "DiabetesPedigreeFunction": 0.127,
    "Age": 47
}

# Test du endpoint de prédiction
response = requests.post(f"{url}/predire", json=donnees_predire)  # Removed the trailing slash
print("Réponse du endpoint de prédiction:", response.text)
