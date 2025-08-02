from django.contrib import admin

# Register your models here.
from .user_profile import UserProfile
from django.contrib import admin
admin.site.register(UserProfile)
