from pydantic import BaseModel, ValidationError
import pandas as pd
import joblib
from flask import Flask, request, jsonify

# Charger le modèle
modele = joblib.load('random_forest_model.pkl')

# Définition du schéma des données d'entrée
class DonneesEntree(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

app = Flask(__name__)

# Gestion manuelle des headers CORS
@app.after_request
def ajouter_headers_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"  # ton frontend
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Route racine
@app.route("/", methods=["GET"])
def accueil():
    return jsonify({"message": "Bienvenue sur l'API de prédiction pour le diagnostic du diabète"})

# Route prédiction
@app.route("/predire", methods=["POST", "OPTIONS"])
def predire():
    if request.method == "OPTIONS":
        # Répond à la préflight request
        return jsonify({"message": "Preflight OK"}), 200

    if not request.is_json:
        return jsonify({"erreur": "Le Content-Type doit être 'application/json'"}), 415

    try:
        donnees = DonneesEntree(**request.get_json())
        donnees_df = pd.DataFrame([donnees.dict()])

        predictions = modele.predict(donnees_df)
        probabilities = modele.predict_proba(donnees_df)[:, 1]

        resultats = {
            "Age": round(float(donnees.Age), 1),
            "BMI": round(float(donnees.BMI), 1),
            "BloodPressure": round(float(donnees.BloodPressure), 1),
            "DiabetesPedigreeFunction": round(float(donnees.DiabetesPedigreeFunction), 3),
            "Glucose": round(float(donnees.Glucose), 1),
            "Insulin": round(float(donnees.Insulin), 1),
            "Pregnancies": int(donnees.Pregnancies),
            "SkinThickness": round(float(donnees.SkinThickness), 1),
            "prediction": int(predictions[0]),
            "probabilite_diabete": round(float(probabilities[0]), 2)
        }

        return jsonify({"resultats": resultats})

    except ValidationError as e:
        return jsonify({"erreur": e.errors()}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
