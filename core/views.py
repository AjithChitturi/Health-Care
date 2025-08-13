from rest_framework.decorators import action
from rest_framework.response import Response
from .user_profile import UserProfile
from rest_framework import status

from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .auth_serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

from .services import generate_recommendations  
from django.core.mail import send_mail 
from django.shortcuts import get_object_or_404 
from django.template.loader import render_to_string 
from django.http import HttpResponse

# HARDCODED ADMIN CREDENTIALS
ADMIN_USERNAME = "healthadmin"  # Change this to your desired admin username
ADMIN_EMAIL = "admin@healthplatform.com"  # Change this to your desired admin email

def is_admin_user(user):
    """Check if user is the designated admin"""
    return user.username == ADMIN_USERNAME or user.email == ADMIN_EMAIL

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

# Custom permission class for admin
class IsHealthAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and is_admin_user(request.user)

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
        if is_admin_user(user):  # Use custom admin check
            return HealthQuestionnaire.objects.all()
        return HealthQuestionnaire.objects.filter(user=user)
        

    @action(detail=True, methods=['post'], permission_classes=[IsHealthAdmin])
    def review(self, request, pk=None):
        """Admin endpoint to review and provide feedback on questionnaires"""
        questionnaire = self.get_object()
        feedback = request.data.get('admin_feedback', '')
        status_val = request.data.get('status', 'reviewed') 

        # Update questionnaire with admin feedback
        questionnaire.admin_feedback = feedback
        questionnaire.status = status_val
        questionnaire.save()

        # EMAIL NOTIFICATION LOGIC
        if questionnaire.user.email:
            try:
                send_mail(
                    'Your Health Report has been Reviewed',
                    f'Hello {questionnaire.user.username},\n\nA doctor has reviewed your health submission and added feedback. Please log in to your dashboard to view the details.\n\nFeedback provided: "{feedback}"\n\nThank you,\nThe Proactive Health Platform',
                    'no-reply@healthplatform.com',
                    [questionnaire.user.email],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Failed to send email: {e}")
            
        return Response({
            'status': 'updated', 
            'admin_feedback': feedback,
            'questionnaire_status': status_val,
            'message': 'Feedback saved successfully'
        })

    @action(detail=False, methods=['get'], permission_classes=[IsHealthAdmin])
    def pending(self, request):
        """Get all pending questionnaires for admin review"""
        pending_qs = HealthQuestionnaire.objects.filter(status='pending').order_by('-submitted_at')
        serializer = self.get_serializer(pending_qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsHealthAdmin])
    def all_reviews(self, request):
        """Get all questionnaires (for admin dashboard)"""
        all_qs = HealthQuestionnaire.objects.all().order_by('-submitted_at')
        serializer = self.get_serializer(all_qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[IsHealthAdmin])
    def admin_detail(self, request, pk=None):
        """Get detailed questionnaire data for admin review"""
        questionnaire = self.get_object()
        serializer = self.get_serializer(questionnaire)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def submit_complete(self, request):
        """Submit complete questionnaire by user"""
        serializer = CompleteQuestionnaireSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            questionnaire = serializer.save()
            
            # Generate automated recommendations
            generate_recommendations(questionnaire)
            
            return Response({
                'message': 'Questionnaire submitted successfully',
                'id': questionnaire.id,
                'status': questionnaire.status
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def download_report_view(request, pk):
    """Download questionnaire report"""
    questionnaire = get_object_or_404(HealthQuestionnaire, pk=pk)
    
    # Check permissions: admin or questionnaire owner
    if not (is_admin_user(request.user) or request.user == questionnaire.user):
        return HttpResponse("Unauthorized", status=403)
        
    html_string = render_to_string('reports/report_template.html', {'q': questionnaire})
    return HttpResponse(html_string)