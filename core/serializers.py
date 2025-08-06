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
        obj, created = PersonalInfo.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class LifestyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lifestyle
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = Lifestyle.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = MedicalHistory.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class FamilyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyHistory
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = FamilyHistory.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class MeasurementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurements
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = Measurements.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptoms
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = Symptoms.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

class PreventiveCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreventiveCare
        exclude = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = PreventiveCare.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(obj, attr, value)
            obj.save()
        return obj

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