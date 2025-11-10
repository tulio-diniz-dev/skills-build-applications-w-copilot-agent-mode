"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import (
    UserViewSet,
    TeamViewSet,
    ActivityViewSet,
    WorkoutViewSet,
    LeaderboardViewSet,
)


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
import os
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

from django.http import JsonResponse

def api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = "http://localhost:8000"
    return JsonResponse({
        'activities': f"{base_url}/api/activities/",
        'teams': f"{base_url}/api/teams/",
        'workouts': f"{base_url}/api/workouts/",
        'leaderboard': f"{base_url}/api/leaderboard/"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    # Os endpoints da API REST seguem o padrão /api/[component]/
    path('api/', include((router.urls, 'api'), namespace='api')),
    path('api/', api_root, name='api-root'),
]
