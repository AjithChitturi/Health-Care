from rest_framework import serializers
from .models import (
    PersonalInfo, Lifestyle, MedicalHistory, FamilyHistory, Measurements,
    Symptoms, PreventiveCare, HealthQuestionnaire
)

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        exclude = ('user',)

class LifestyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lifestyle
        exclude = ('user',)

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        exclude = ('user',)

class FamilyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyHistory
        exclude = ('user',)

class MeasurementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurements
        exclude = ('user',)

class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptoms
        exclude = ('user',)

class PreventiveCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreventiveCare
        exclude = ('user',)

# NEW: Complete questionnaire serializer
class CompleteQuestionnaireSerializer(serializers.Serializer):
    # Personal Info
    age = serializers.IntegerField(required=False)
    gender = serializers.CharField(max_length=10, required=False)
    contact = serializers.CharField(max_length=100, required=False)
    
    # Lifestyle
    smoking_status = serializers.CharField(max_length=20, required=False)
    alcohol_consumption = serializers.CharField(max_length=50, required=False)
    physical_activity = serializers.CharField(max_length=100, required=False)
    diet = serializers.CharField(max_length=200, required=False)
    
    # Medical History
    diabetes_medical = serializers.BooleanField(required=False)
    hypertension = serializers.BooleanField(required=False)
    heart_disease_medical = serializers.BooleanField(required=False)
    other_conditions = serializers.CharField(max_length=500, required=False, allow_blank=True)
    medications = serializers.CharField(max_length=500, required=False, allow_blank=True)
    allergies = serializers.CharField(max_length=500, required=False, allow_blank=True)
    
    # Family History
    diabetes_family = serializers.BooleanField(required=False)
    heart_disease_family = serializers.BooleanField(required=False)
    cancer_family = serializers.BooleanField(required=False)
    other_family = serializers.CharField(max_length=500, required=False, allow_blank=True)
    
    # Measurements
    height_cm = serializers.FloatField(required=False)
    weight_kg = serializers.FloatField(required=False)
    bmi = serializers.FloatField(required=False)
    blood_pressure = serializers.CharField(max_length=20, required=False, allow_blank=True)
    blood_sugar = serializers.CharField(max_length=20, required=False, allow_blank=True)
    cholesterol = serializers.CharField(max_length=20, required=False, allow_blank=True)
    
    # Symptoms
    chest_pain = serializers.BooleanField(required=False)
    breathlessness = serializers.BooleanField(required=False)
    fatigue = serializers.BooleanField(required=False)
    sleep_quality = serializers.CharField(max_length=50, required=False, allow_blank=True)
    stress_level = serializers.CharField(max_length=50, required=False, allow_blank=True)
    
    # Preventive Care
    last_checkup = serializers.DateField(required=False)
    vaccinations = serializers.CharField(max_length=500, required=False, allow_blank=True)

    def create(self, validated_data):
        user = self.context['request'].user
        
        # Extract data for each model
        personal_data = {
            'age': validated_data.get('age'),
            'gender': validated_data.get('gender', ''),
            'contact': validated_data.get('contact', ''),
        }
        # Remove None values
        personal_data = {k: v for k, v in personal_data.items() if v is not None}
        
        lifestyle_data = {
            'smoking_status': validated_data.get('smoking_status', ''),
            'alcohol_consumption': validated_data.get('alcohol_consumption', ''),
            'physical_activity': validated_data.get('physical_activity', ''),
            'diet': validated_data.get('diet', ''),
        }
        lifestyle_data = {k: v for k, v in lifestyle_data.items() if v is not None}
        
        medical_data = {
            'diabetes': validated_data.get('diabetes_medical', False),
            'hypertension': validated_data.get('hypertension', False),
            'heart_disease': validated_data.get('heart_disease_medical', False),
            'other_conditions': validated_data.get('other_conditions', ''),
            'medications': validated_data.get('medications', ''),
            'allergies': validated_data.get('allergies', ''),
        }
        medical_data = {k: v for k, v in medical_data.items() if v is not None}
        
        family_data = {
            'diabetes': validated_data.get('diabetes_family', False),
            'heart_disease': validated_data.get('heart_disease_family', False),
            'cancer': validated_data.get('cancer_family', False),
            'other': validated_data.get('other_family', ''),
        }
        family_data = {k: v for k, v in family_data.items() if v is not None}
        
        measurements_data = {
            'height_cm': validated_data.get('height_cm'),
            'weight_kg': validated_data.get('weight_kg'),
            'bmi': validated_data.get('bmi'),
            'blood_pressure': validated_data.get('blood_pressure', ''),
            'blood_sugar': validated_data.get('blood_sugar', ''),
            'cholesterol': validated_data.get('cholesterol', ''),
        }
        measurements_data = {k: v for k, v in measurements_data.items() if v is not None}
        
        symptoms_data = {
            'chest_pain': validated_data.get('chest_pain', False),
            'breathlessness': validated_data.get('breathlessness', False),
            'fatigue': validated_data.get('fatigue', False),
            'sleep_quality': validated_data.get('sleep_quality', ''),
            'stress_level': validated_data.get('stress_level', ''),
        }
        symptoms_data = {k: v for k, v in symptoms_data.items() if v is not None}
        
        preventive_data = {
            'last_checkup': validated_data.get('last_checkup'),
            'vaccinations': validated_data.get('vaccinations', ''),
        }
        preventive_data = {k: v for k, v in preventive_data.items() if v is not None}
        
        # Create or update each model
        personal_info, _ = PersonalInfo.objects.get_or_create(user=user, defaults=personal_data)
        if not _:
            for attr, value in personal_data.items():
                setattr(personal_info, attr, value)
            personal_info.save()
        
        lifestyle, _ = Lifestyle.objects.get_or_create(user=user, defaults=lifestyle_data)
        if not _:
            for attr, value in lifestyle_data.items():
                setattr(lifestyle, attr, value)
            lifestyle.save()
        
        medical_history, _ = MedicalHistory.objects.get_or_create(user=user, defaults=medical_data)
        if not _:
            for attr, value in medical_data.items():
                setattr(medical_history, attr, value)
            medical_history.save()
        
        family_history, _ = FamilyHistory.objects.get_or_create(user=user, defaults=family_data)
        if not _:
            for attr, value in family_data.items():
                setattr(family_history, attr, value)
            family_history.save()
        
        measurements, _ = Measurements.objects.get_or_create(user=user, defaults=measurements_data)
        if not _:
            for attr, value in measurements_data.items():
                setattr(measurements, attr, value)
            measurements.save()
        
        symptoms, _ = Symptoms.objects.get_or_create(user=user, defaults=symptoms_data)
        if not _:
            for attr, value in symptoms_data.items():
                setattr(symptoms, attr, value)
            symptoms.save()
        
        preventive_care, _ = PreventiveCare.objects.get_or_create(user=user, defaults=preventive_data)
        if not _:
            for attr, value in preventive_data.items():
                setattr(preventive_care, attr, value)
            preventive_care.save()
        
        # Create or update main questionnaire
        questionnaire, created = HealthQuestionnaire.objects.get_or_create(
            user=user,
            defaults={
                'personal_info': personal_info,
                'lifestyle': lifestyle,
                'medical_history': medical_history,
                'family_history': family_history,
                'measurements': measurements,
                'symptoms': symptoms,
                'preventive_care': preventive_care,
                'status': 'pending'
            }
        )
        
        if not created:
            questionnaire.personal_info = personal_info
            questionnaire.lifestyle = lifestyle
            questionnaire.medical_history = medical_history
            questionnaire.family_history = family_history
            questionnaire.measurements = measurements
            questionnaire.symptoms = symptoms
            questionnaire.preventive_care = preventive_care
            questionnaire.status = 'pending'
            questionnaire.save()
        
        return questionnaire

class HealthQuestionnaireSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()
    lifestyle = LifestyleSerializer()
    medical_history = MedicalHistorySerializer()
    family_history = FamilyHistorySerializer()
    measurements = MeasurementsSerializer()
    symptoms = SymptomsSerializer()
    preventive_care = PreventiveCareSerializer()

    class Meta:
        model = HealthQuestionnaire
        fields = '__all__'