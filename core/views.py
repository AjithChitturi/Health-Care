from rest_framework.decorators import action
from rest_framework.response import Response
from .user_profile import UserProfile
from rest_framework import status

from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .auth_serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

from rest_framework import viewsets, permissions
from .models import (
    PersonalInfo, Lifestyle, MedicalHistory, FamilyHistory, Measurements,
    Symptoms, PreventiveCare, HealthQuestionnaire
)
from .serializers import (
    PersonalInfoSerializer, LifestyleSerializer, MedicalHistorySerializer, FamilyHistorySerializer,
    MeasurementsSerializer, SymptomsSerializer, PreventiveCareSerializer, HealthQuestionnaireSerializer,
    CompleteQuestionnaireSerializer
)

class PersonalInfoViewSet(viewsets.ModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer
    permission_classes = [permissions.IsAuthenticated]

class LifestyleViewSet(viewsets.ModelViewSet):
    queryset = Lifestyle.objects.all()
    serializer_class = LifestyleSerializer
    permission_classes = [permissions.IsAuthenticated]

class MedicalHistoryViewSet(viewsets.ModelViewSet):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

class FamilyHistoryViewSet(viewsets.ModelViewSet):
    queryset = FamilyHistory.objects.all()
    serializer_class = FamilyHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

class MeasurementsViewSet(viewsets.ModelViewSet):
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializer
    permission_classes = [permissions.IsAuthenticated]

class SymptomsViewSet(viewsets.ModelViewSet):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer
    permission_classes = [permissions.IsAuthenticated]

class PreventiveCareViewSet(viewsets.ModelViewSet):
    queryset = PreventiveCare.objects.all()
    serializer_class = PreventiveCareSerializer
    permission_classes = [permissions.IsAuthenticated]

class HealthQuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = HealthQuestionnaire.objects.all()
    serializer_class = HealthQuestionnaireSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return HealthQuestionnaire.objects.none()
        if profile.role == 'admin':
            return HealthQuestionnaire.objects.all()
        return HealthQuestionnaire.objects.filter(user=user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def review(self, request, pk=None):
        questionnaire = self.get_object()
        feedback = request.data.get('admin_feedback', '')
        status = request.data.get('status', 'approved')
        questionnaire.admin_feedback = feedback
        questionnaire.status = status
        questionnaire.save()
        return Response({'status': 'updated', 'admin_feedback': feedback})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def pending(self, request):
        pending_qs = HealthQuestionnaire.objects.filter(status='pending')
        serializer = self.get_serializer(pending_qs, many=True)
        return Response(serializer.data)

    # NEW: Complete questionnaire submission endpoint
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def submit_complete(self, request):
        serializer = CompleteQuestionnaireSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            questionnaire = serializer.save()
            return Response({
                'message': 'Questionnaire submitted successfully',
                'id': questionnaire.id,
                'status': questionnaire.status
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)