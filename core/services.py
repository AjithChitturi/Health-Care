# core/services.py (Create this new file)

from .models import Recommendation, Suggestion

def generate_recommendations(questionnaire):
    """
    Analyzes a HealthQuestionnaire and generates automated recommendations and suggestions.
    This is the core rule-based engine of the platform.
    """
    # Clear any old recommendations to avoid duplicates on re-submission
    Recommendation.objects.filter(questionnaire=questionnaire).delete()
    Suggestion.objects.filter(questionnaire=questionnaire).delete()

    # --- Rule-Based Analysis ---

    # Rule 1: High BMI
    if questionnaire.measurements.bmi and questionnaire.measurements.bmi > 25:
        Suggestion.objects.create(
            questionnaire=questionnaire,
            suggestion_text="Your BMI is higher than the recommended range. Consider consulting a nutritionist for a personalized diet plan and increasing physical activity.",
            category='Lifestyle'
        )

    # Rule 2: Smoking and Age
    if questionnaire.personal_info.age > 45 and questionnaire.lifestyle.smoking_status == 'current':
        Recommendation.objects.create(
            questionnaire=questionnaire,
            test_name='Low-Dose CT Scan (Lung Cancer Screening)',
            reason=f"Based on your age ({questionnaire.personal_info.age}) and current smoking status, regular screening is advised for early detection.",
            category='Screening'
        )

    # Rule 3: Hypertension (Personal)
    if questionnaire.medical_history.hypertension or (questionnaire.measurements.blood_pressure and '140/' in questionnaire.measurements.blood_pressure):
        Recommendation.objects.create(
            questionnaire=questionnaire,
            test_name='Regular Blood Pressure Monitoring',
            reason="You have indicated hypertension. Regular monitoring is key to managing this condition.",
            category='Monitoring'
        )

    # Rule 4: Family History of Heart Disease
    if questionnaire.family_history.heart_disease:
        Recommendation.objects.create(
            questionnaire=questionnaire,
            test_name='Lipid Panel (Cholesterol Test)',
            reason="A family history of heart disease increases your risk. A lipid panel is recommended to assess your cholesterol levels.",
            category='Blood Test'
        )
        Suggestion.objects.create(
            questionnaire=questionnaire,
            suggestion_text="Due to a family history of heart disease, adopting a heart-healthy diet (low in saturated fats) and regular cardio exercise is strongly recommended.",
            category='Lifestyle'
        )

    # Rule 5: Diabetes (Personal or Family History)
    if questionnaire.medical_history.diabetes or questionnaire.family_history.diabetes:
         Recommendation.objects.create(
            questionnaire=questionnaire,
            test_name='HbA1c Test (Glycated Hemoglobin)',
            reason="Given your personal or family history of diabetes, an HbA1c test is the gold standard for monitoring long-term blood sugar levels.",
            category='Blood Test'
        )

    print(f"Generated recommendations for user {questionnaire.user.username}")