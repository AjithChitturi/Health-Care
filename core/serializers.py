from rest_framework import serializers
from .models import (
    PersonalInfo, Lifestyle, MedicalHistory, FamilyHistory, Measurements,
    Symptoms, PreventiveCare, HealthQuestionnaire
)

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return PersonalInfo.objects.create(user=user, **validated_data)

class LifestyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lifestyle
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return Lifestyle.objects.create(user=user, **validated_data)

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return MedicalHistory.objects.create(user=user, **validated_data)

class FamilyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyHistory
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return FamilyHistory.objects.create(user=user, **validated_data)

class MeasurementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurements
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return Measurements.objects.create(user=user, **validated_data)

class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptoms
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return Symptoms.objects.create(user=user, **validated_data)

class PreventiveCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreventiveCare
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return PreventiveCare.objects.create(user=user, **validated_data)

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
