from rest_framework import routers
from .views import (
    PersonalInfoViewSet, LifestyleViewSet, MedicalHistoryViewSet, FamilyHistoryViewSet,
    MeasurementsViewSet, SymptomsViewSet, PreventiveCareViewSet, HealthQuestionnaireViewSet,
    RegisterView, CustomTokenObtainPairView
)
from django.urls import path

router = routers.DefaultRouter()
router.register(r'personal-info', PersonalInfoViewSet)
router.register(r'lifestyle', LifestyleViewSet)
router.register(r'medical-history', MedicalHistoryViewSet)
router.register(r'family-history', FamilyHistoryViewSet)
router.register(r'measurements', MeasurementsViewSet)
router.register(r'symptoms', SymptomsViewSet)
router.register(r'preventive-care', PreventiveCareViewSet)
router.register(r'questionnaire', HealthQuestionnaireViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('questionnaire/<int:pk>/download/', download_report_view, name='download_report'),

]
urlpatterns += router.urls
