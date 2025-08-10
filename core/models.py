# Import UserProfile for migrations and admin
from .user_profile import UserProfile

from django.db import models
from django.contrib.auth.models import User

class PersonalInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    contact = models.CharField(max_length=100)

class Lifestyle(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    smoking_status = models.CharField(max_length=20, choices=[('never','Never'),('former','Former'),('current','Current')])
    alcohol_consumption = models.CharField(max_length=50)
    physical_activity = models.CharField(max_length=100)
    diet = models.CharField(max_length=200)

class MedicalHistory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    diabetes = models.BooleanField(default=False)
    hypertension = models.BooleanField(default=False)
    heart_disease = models.BooleanField(default=False)
    other_conditions = models.TextField(blank=True)
    medications = models.TextField(blank=True)
    allergies = models.TextField(blank=True)

class FamilyHistory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    diabetes = models.BooleanField(default=False)
    heart_disease = models.BooleanField(default=False)
    cancer = models.BooleanField(default=False)
    other = models.TextField(blank=True)

class Measurements(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height_cm = models.FloatField()
    weight_kg = models.FloatField()
    bmi = models.FloatField(blank=True, null=True)
    blood_pressure = models.CharField(max_length=20, blank=True)
    blood_sugar = models.CharField(max_length=20, blank=True)
    cholesterol = models.CharField(max_length=20, blank=True)

class Symptoms(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    chest_pain = models.BooleanField(default=False)
    breathlessness = models.BooleanField(default=False)
    fatigue = models.BooleanField(default=False)
    sleep_quality = models.CharField(max_length=50, blank=True)
    stress_level = models.CharField(max_length=50, blank=True)

class PreventiveCare(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    last_checkup = models.DateField(blank=True, null=True)
    vaccinations = models.TextField(blank=True)

class HealthQuestionnaire(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    personal_info = models.OneToOneField(PersonalInfo, on_delete=models.CASCADE)
    lifestyle = models.OneToOneField(Lifestyle, on_delete=models.CASCADE)
    medical_history = models.OneToOneField(MedicalHistory, on_delete=models.CASCADE)
    family_history = models.OneToOneField(FamilyHistory, on_delete=models.CASCADE)
    measurements = models.OneToOneField(Measurements, on_delete=models.CASCADE)
    symptoms = models.OneToOneField(Symptoms, on_delete=models.CASCADE)
    preventive_care = models.OneToOneField(PreventiveCare, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending','Pending Review'),('approved','Approved')], default='pending')
    admin_feedback = models.TextField(blank=True)


class Recommendation(models.Model):
    questionnaire = models.ForeignKey(HealthQuestionnaire, related_name='recommendations', on_delete=models.CASCADE)
    test_name = models.CharField(max_length=200)
    reason = models.TextField()
    category = models.CharField(max_length=50, default='Screening') 

    def __str__(self):
        return f"Recommendation for {self.questionnaire.user.username}: {self.test_name}"

class Suggestion(models.Model):
    questionnaire = models.ForeignKey(HealthQuestionnaire, related_name='suggestions', on_delete=models.CASCADE)
    suggestion_text = models.TextField()
    category = models.CharField(max_length=50, default='Lifestyle') 

    def __str__(self):
        return f"Suggestion for {self.questionnaire.user.username}"