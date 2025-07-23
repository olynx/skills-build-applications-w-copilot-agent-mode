
import os
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from .models import User, Team, Activity, Leaderboard, Workout

@api_view(['GET', 'POST'])
def api_root(request, format=None):
    if request.method == 'POST':
        return Response({"message": "POST request received"}, status=status.HTTP_201_CREATED)
    # Detect codespace environment from HTTP_HOST or environment variable
    host = request.get_host() if hasattr(request, 'get_host') else 'localhost:8000'
    if 'curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev' in host:
        base_url = f'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/'
        api_suffix = '?codespace=1'
    else:
        base_url = 'http://127.0.0.1:8000/'
        api_suffix = ''
    return Response({
        'users': base_url + 'api/users/' + api_suffix,
        'teams': base_url + 'api/teams/' + api_suffix,
        'activities': base_url + 'api/activities/' + api_suffix,
        'leaderboard': base_url + 'api/leaderboard/' + api_suffix,
        'workouts': base_url + 'api/workouts/' + api_suffix
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
