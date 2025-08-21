from .models import Recommendation, Suggestion
from datetime import datetime

def generate_recommendations(questionnaire):
    """
    Analyzes a HealthQuestionnaire and generates automated recommendations and suggestions
    based on user inputs for medical conditions, lifestyle, age, BMI, and activity level.
    All recommendations and suggestions are saved to the database.
    """
    # Clear any old recommendations/suggestions to avoid duplicates on re-submission
    Recommendation.objects.filter(questionnaire=questionnaire).delete()
    Suggestion.objects.filter(questionnaire=questionnaire).delete()

    # Helper function to create Recommendation
    def add_recommendation(test_name, reason, category="Screening"):
        Recommendation.objects.create(
            questionnaire=questionnaire,
            test_name=test_name,
            reason=reason,
            category=category
        )

    # Helper function to create Suggestion
    def add_suggestion(suggestion_text, category="Lifestyle"):
        Suggestion.objects.create(
            questionnaire=questionnaire,
            suggestion_text=suggestion_text,
            category=category
        )

    # --- Rule-Based Analysis ---

    # 1. Arthritis
    if questionnaire.medical_history.other_conditions and "arthritis" in questionnaire.medical_history.other_conditions.lower():
        add_recommendation(
            "S. Creatinine & eGFR",
            "To assess kidney function, which can be affected by arthritis medications or systemic inflammation.",
            "Blood Test"
        )
        add_recommendation(
            "B. Urea",
            "To evaluate kidney function in the context of arthritis-related inflammation or treatment.",
            "Blood Test"
        )
        add_recommendation(
            "Uric Acid",
            "To screen for gout, a common form of arthritis.",
            "Blood Test"
        )
        add_suggestion(
            "Consult a rheumatologist for comprehensive arthritis management and consider physical therapy.",
            "Medical Consultation"
        )

    # 2. Liver Problems
    if questionnaire.medical_history.other_conditions and "liver" in questionnaire.medical_history.other_conditions.lower():
        tests = [
            ("LFT (Liver Function Test)", "To assess liver health and detect any liver dysfunction.", "Blood Test"),
            ("S. Creatinine & eGFR", "To evaluate kidney function, as liver issues can impact renal health.", "Blood Test"),
            ("S. Electrolytes", "To check for imbalances that may accompany liver disease.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk, which may be elevated with liver dysfunction.", "Blood Test"),
            ("ECG", "To evaluate heart function, as liver disease can have systemic effects.", "Cardiac Test"),
            ("2D ECHO", "To assess heart structure and function in the context of liver disease.", "Cardiac Test"),
            ("PT INR", "To evaluate blood clotting function, which is often impaired in liver disease.", "Blood Test"),
            ("USG (Abdomen) – Liver Structure", "To visualize liver structure for signs of cirrhosis or fatty liver.", "Imaging"),
            ("CBP", "To check for anemia or infection, which may complicate liver disease.", "Blood Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        if "hematemesis" in questionnaire.medical_history.other_conditions.lower() or "melena" in questionnaire.medical_history.other_conditions.lower():
            add_recommendation(
                "Endoscopy",
                "To investigate gastrointestinal bleeding (hematemesis or melena) potentially related to liver disease.",
                "Diagnostic Procedure"
            )
        add_suggestion(
            "Avoid alcohol and consult a hepatologist for specialized liver care.",
            "Medical Consultation"
        )

    # 3. Stroke / CVA
    if questionnaire.medical_history.other_conditions and "stroke" in questionnaire.medical_history.other_conditions.lower():
        add_recommendation(
            "Lipid Profile",
            "To assess cholesterol levels, a key risk factor for stroke.",
            "Blood Test"
        )
        add_recommendation(
            "ECG",
            "To evaluate heart rhythm and detect abnormalities that may contribute to stroke risk.",
            "Cardiac Test"
        )
        add_suggestion(
            "Consult a neurologist and consider lifestyle changes to manage stroke risk factors.",
            "Medical Consultation"
        )

    # 4. High Cholesterol
    if questionnaire.measurements.cholesterol and float(questionnaire.measurements.cholesterol.split()[0]) > 5.2:  # Assuming mmol/L
        tests = [
            ("Lipid Profile (Repeat)", "To confirm and monitor high cholesterol levels.", "Blood Test"),
            ("LFT", "To assess liver function, as statins for cholesterol may affect the liver.", "Blood Test"),
            ("FBS", "To screen for diabetes, which often coexists with high cholesterol.", "Blood Test"),
            ("HbA1c", "To assess long-term blood sugar control in relation to cholesterol management.", "Blood Test"),
            ("S. Creatinine & eGFR", "To evaluate kidney function, as cholesterol medications may impact kidneys.", "Blood Test"),
            ("ECG", "To assess heart rhythm in the context of high cholesterol.", "Cardiac Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Adopt a low-cholesterol diet and increase physical activity to manage cholesterol levels.",
            "Lifestyle"
        )

    # 5. Heart-Related Problems
    if questionnaire.medical_history.heart_disease or questionnaire.family_history.heart_disease or questionnaire.symptoms.chest_pain:
        tests = [
            ("S. Creatinine & eGFR", "To assess kidney function, as heart disease can impact renal health.", "Blood Test"),
            ("Lipid Profile", "To evaluate cholesterol levels, a key risk factor for heart disease.", "Blood Test"),
            ("ECG", "To assess heart rhythm and detect abnormalities.", "Cardiac Test"),
            ("2D ECHO", "To evaluate heart structure and function.", "Cardiac Test"),
            ("CBP", "To check for anemia or infection that may affect heart health.", "Blood Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Consult a cardiologist and adopt a heart-healthy diet low in saturated fats.",
            "Medical Consultation"
        )

    # 6. Kidney Problems
    if questionnaire.medical_history.other_conditions and "kidney" in questionnaire.medical_history.other_conditions.lower():
        tests = [
            ("S. Creatinine & eGFR", "To assess kidney function and monitor renal health.", "Blood Test"),
            ("ECG", "To evaluate heart rhythm, as kidney disease can affect cardiac function.", "Cardiac Test"),
            ("CBP", "To check for anemia or infection related to kidney dysfunction.", "Blood Test"),
            ("Urine for Albumin & Creatinine Ratio", "To detect early signs of kidney damage.", "Urine Test"),
            ("S. Electrolytes", "To check for imbalances due to kidney dysfunction.", "Blood Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Consult a nephrologist for specialized kidney care and monitor fluid intake.",
            "Medical Consultation"
        )

    # 7. Asthma / COPD
    if questionnaire.medical_history.other_conditions and ("asthma" in questionnaire.medical_history.other_conditions.lower() or "copd" in questionnaire.medical_history.other_conditions.lower()):
        add_suggestion(
            "Consult a pulmonologist for pulmonary function tests and asthma/COPD management.",
            "Medical Consultation"
        )

    # 8. Thyroid Problems
    if questionnaire.medical_history.other_conditions and "thyroid" in questionnaire.medical_history.other_conditions.lower():
        tests = [
            ("ECG", "To rule out tachycardia, atrial fibrillation, or arrhythmias due to thyroid dysfunction.", "Cardiac Test"),
            ("2D ECHO", "To assess heart structure in the context of thyroid disease.", "Cardiac Test"),
            ("Bone Mineral Density", "To screen for osteoporosis, as thyroid dysfunction accelerates bone loss.", "Imaging"),
            ("TSH, T3, T4", "To evaluate thyroid function and confirm hypo/hyperthyroidism.", "Blood Test"),
            ("USG (Thyroid)", "To detect nodules, cysts, or masses in the thyroid gland.", "Imaging"),
            ("Lipid Profile", "To assess cholesterol levels, which can be affected by thyroid dysfunction.", "Blood Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Perform regular thyroid palpation and consult an endocrinologist for thyroid management.",
            "Medical Consultation"
        )

    # 9. Hypertension
    if questionnaire.medical_history.hypertension or (questionnaire.measurements.blood_pressure and '140/' in questionnaire.measurements.blood_pressure):
        tests = [
            ("S. Creatinine & eGFR", "To assess kidney function, as hypertension can damage kidneys.", "Blood Test"),
            ("S. Electrolytes", "To check for imbalances due to hypertension or medications.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk associated with hypertension.", "Blood Test"),
            ("FBS", "To screen for diabetes, a common comorbidity with hypertension.", "Blood Test"),
            ("Urine Dipstick Test", "To detect proteinuria or other kidney-related issues.", "Urine Test"),
            ("ECG", "To rule out atrial fibrillation, left ventricular hypertrophy, or ischemic heart disease.", "Cardiac Test"),
            ("2D ECHO", "To assess heart structure and function in hypertension.", "Cardiac Test"),
            ("Fundoscopy", "To check for hypertensive retinopathy.", "Diagnostic Procedure")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Monitor blood pressure regularly and adopt a low-sodium diet to manage hypertension.",
            "Lifestyle"
        )

    # 10. Diabetes
    if questionnaire.medical_history.diabetes or questionnaire.family_history.diabetes:
        tests = [
            ("HbA1c", "To monitor long-term blood sugar control.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk, which is elevated in diabetes.", "Blood Test"),
            ("LFT", "To evaluate liver function, as diabetes can lead to fatty liver.", "Blood Test"),
            ("Spot Urine Albumin to Creatinine Ratio", "To detect early kidney damage due to diabetes.", "Urine Test"),
            ("S. Creatinine & eGFR", "To monitor kidney function in diabetes.", "Blood Test"),
            ("TSH", "To screen for thyroid dysfunction, a common comorbidity in diabetes.", "Blood Test"),
            ("CBP", "To check for anemia or infection in diabetes.", "Blood Test"),
            ("Vitamin B12", "To monitor levels if taking Metformin, which can cause deficiency.", "Blood Test"),
            ("S. Potassium", "To check for imbalances, especially with diabetes medications.", "Blood Test"),
            ("Calcium, Vit D, Phosphorus", "To assess bone health in diabetes.", "Blood Test"),
            ("USG (Abdomen + Pelvis)", "To rule out liver dysfunction or other complications.", "Imaging"),
            ("ECG", "To assess heart rhythm in diabetes.", "Cardiac Test"),
            ("2D ECHO", "To evaluate heart structure and function in diabetes.", "Cardiac Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Schedule yearly fundoscopy, thyroid palpation, and foot evaluation (pedal pulses, deformity, vibration, temperature sensation, pin prick, 10g monofilament test).",
            "Medical Consultation"
        )

    # 11. Smoking History
    if questionnaire.lifestyle.smoking_status == 'current':
        tests = [
            ("CBP", "To check for anemia or infection related to smoking.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk, which is elevated in smokers.", "Blood Test"),
            ("FBS", "To screen for diabetes, a risk factor exacerbated by smoking.", "Blood Test"),
            ("ECG", "To evaluate heart rhythm in smokers.", "Cardiac Test"),
            ("Low Dose CT Chest", "Recommended every 2 years for lung cancer screening in smokers.", "Imaging")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Complete a respiratory (COPD) questionnaire and consult a pulmonologist for smoking cessation support.",
            "Medical Consultation"
        )

    # 12. Alcohol (Regular)
    if questionnaire.lifestyle.alcohol_consumption and "regular" in questionnaire.lifestyle.alcohol_consumption.lower():
        tests = [
            ("CBP", "To check for anemia or infection related to alcohol use.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk associated with alcohol consumption.", "Blood Test"),
            ("B. Urea", "To evaluate kidney function in the context of alcohol use.", "Blood Test"),
            ("S. Creatinine & eGFR", "To monitor kidney function, as alcohol can affect renal health.", "Blood Test"),
            ("FBS, HbA1c", "To screen for diabetes, a risk factor with regular alcohol use.", "Blood Test"),
            ("LFT", "To assess liver function, as alcohol can cause liver damage.", "Blood Test"),
            ("USG (Abdomen + Pelvis)", "To rule out liver dysfunction due to alcohol consumption.", "Imaging")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Reduce alcohol intake and consult a hepatologist if signs of liver issues are present.",
            "Lifestyle"
        )

    # 13. Age-Based Screening
    age = questionnaire.personal_info.age
    if age:
        if 20 <= age <= 30:
            tests = [
                ("CBP", "Routine complete blood profile for general health screening.", "Blood Test"),
                ("S. Creatinine & eGFR", "To assess kidney function.", "Blood Test"),
                ("B. Urea", "To evaluate kidney function.", "Blood Test"),
                ("Serum Electrolytes", "To check for electrolyte imbalances.", "Blood Test"),
                ("Lipid Profile", "To assess cardiovascular risk.", "Blood Test"),
                ("FBS", "To screen for early signs of diabetes.", "Blood Test")
            ]
            if questionnaire.personal_info.gender.lower() == 'female':
                tests.append(("Pap Smear", "Recommended every 3 years for cervical cancer screening.", "Screening"))
            for test_name, reason, category in tests:
                add_recommendation(test_name, reason, category)

        elif 30 < age <= 40:
            tests = [
                ("CBP", "Routine complete blood profile for general health screening.", "Blood Test"),
                ("S. Creatinine & eGFR", "To assess kidney function.", "Blood Test"),
                ("B. Urea", "To evaluate kidney function.", "Blood Test"),
                ("Serum Electrolytes", "To check for electrolyte imbalances.", "Blood Test"),
                ("LFT", "To assess liver function.", "Blood Test"),
                ("Lipid Profile", "To assess cardiovascular risk.", "Blood Test"),
                ("FBS", "To screen for diabetes.", "Blood Test")
            ]
            if age > 35:
                tests.append(("HbA1c", "To assess long-term blood sugar control.", "Blood Test"))
            if questionnaire.personal_info.gender.lower() == 'female':
                tests.append(("Pap Smear", "Recommended every 3 years for cervical cancer screening.", "Screening"))
            for test_name, reason, category in tests:
                add_recommendation(test_name, reason, category)

        elif 40 < age <= 45:
            tests = [
                ("CBP", "Routine complete blood profile for general health screening.", "Blood Test"),
                ("S. Creatinine & eGFR", "To assess kidney function.", "Blood Test"),
                ("B. Urea", "To evaluate kidney function.", "Blood Test"),
                ("Serum Electrolytes", "To check for electrolyte imbalances.", "Blood Test"),
                ("Lipid Profile", "To assess cardiovascular risk.", "Blood Test"),
                ("FBS, PLBS, HbA1c, Insulin Level", "Comprehensive diabetes screening.", "Blood Test"),
                ("USG (Abdomen + Pelvis)", "To rule out liver or prostate issues.", "Imaging"),
                ("ECG", "To assess heart rhythm.", "Cardiac Test")
            ]
            if questionnaire.personal_info.gender.lower() == 'female':
                tests.append(("Pap Smear & HR HPV", "Recommended every 5 years for cervical cancer screening.", "Screening"))
                tests.append(("Mammography", "Recommended every 2 years for breast cancer screening.", "Screening"))
            for test_name, reason, category in tests:
                add_recommendation(test_name, reason, category)

        elif 45 < age <= 60:
            tests = [
                ("CBP", "Routine complete blood profile for general health screening.", "Blood Test"),
                ("S. Creatinine & eGFR", "To assess kidney function.", "Blood Test"),
                ("Blood Urea", "To evaluate kidney function.", "Blood Test"),
                ("Serum Electrolytes", "To check for electrolyte imbalances.", "Blood Test"),
                ("Lipid Profile", "To assess cardiovascular risk.", "Blood Test"),
                ("FBS, PLBS, HbA1c, Fasting Insulin", "Comprehensive diabetes screening.", "Blood Test"),
                ("ECG", "Recommended yearly to monitor heart health.", "Cardiac Test"),
                ("High Sensitivity Fecal Immunochemical Test", "Yearly colorectal cancer screening.", "Screening"),
                ("High Sensitivity Guaiac Fecal Occult Blood Test", "Yearly colorectal cancer screening.", "Screening"),
                ("Multi-target Stool DNA Test", "Recommended every 3 years for colorectal cancer screening.", "Screening"),
                ("Osteoporosis Screening – Bone Mineral Density", "To screen for bone health issues.", "Imaging")
            ]
            if questionnaire.personal_info.gender.lower() == 'female':
                tests.append(("Pap Smear & HR HPV", "Recommended every 5 years for cervical cancer screening.", "Screening"))
                tests.append(("Mammography", "Recommended yearly for breast cancer screening.", "Screening"))
            for test_name, reason, category in tests:
                add_recommendation(test_name, reason, category)

    # 14. Obesity / BMI
    if questionnaire.measurements.bmi:
        if questionnaire.measurements.bmi > 30:
            tests = [
                ("CBP", "To check for anemia or infection related to obesity.", "Blood Test"),
                ("S. Creatinine & eGFR", "To assess kidney function in obesity.", "Blood Test"),
                ("Blood Urea", "To evaluate kidney function.", "Blood Test"),
                ("Lipid Profile", "To assess cardiovascular risk due to obesity.", "Blood Test"),
                ("HbA1c", "To screen for diabetes, a common comorbidity in obesity.", "Blood Test"),
                ("FBS", "To screen for diabetes.", "Blood Test"),
                ("ECG", "To assess heart rhythm in obesity.", "Cardiac Test"),
                ("LFT", "To evaluate liver function, as obesity can lead to fatty liver.", "Blood Test")
            ]
            if questionnaire.measurements.bmi > 35:
                tests.append(("USG (Abdomen + Pelvis)", "To rule out liver disorders due to obesity.", "Imaging"))
            for test_name, reason, category in tests:
                add_recommendation(test_name, reason, category)
            add_suggestion(
                "Consult a nutritionist for a personalized diet plan and increase physical activity to manage BMI.",
                "Lifestyle"
            )

    # 15. Activity Level & Stress Level
    if questionnaire.lifestyle.physical_activity and ("sedentary" in questionnaire.lifestyle.physical_activity.lower() or "mild" in questionnaire.lifestyle.physical_activity.lower()):
        tests = [
            ("CBP", "To check for anemia or infection in sedentary individuals.", "Blood Test"),
            ("S. Creatinine & eGFR", "To assess kidney function.", "Blood Test"),
            ("Blood Urea", "To evaluate kidney function.", "Blood Test"),
            ("Lipid Profile", "To assess cardiovascular risk due to low activity.", "Blood Test"),
            ("HbA1c", "To screen for diabetes, a risk factor in sedentary lifestyles.", "Blood Test"),
            ("FBS", "To screen for diabetes.", "Blood Test"),
            ("ECG", "To assess heart rhythm in sedentary individuals.", "Cardiac Test"),
            ("LFT", "To evaluate liver function.", "Blood Test")
        ]
        for test_name, reason, category in tests:
            add_recommendation(test_name, reason, category)
        add_suggestion(
            "Increase physical activity to at least 150 minutes of moderate exercise per week to improve health.",
            "Lifestyle"
        )

    if questionnaire.symptoms.stress_level and "high" in questionnaire.symptoms.stress_level.lower():
        add_suggestion(
            "Consider stress management techniques such as mindfulness, yoga, or consulting a mental health professional.",
            "Mental Health"
        )

    print(f"Generated recommendations for user {questionnaire.user.username}")