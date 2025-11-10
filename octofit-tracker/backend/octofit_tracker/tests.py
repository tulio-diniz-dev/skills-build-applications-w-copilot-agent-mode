from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name='Marvel', description='Marvel Team')
        user = User.objects.create(name='Tony Stark', email='tony@stark.com', team=team)
        self.assertEqual(user.name, 'Tony Stark')
        self.assertEqual(user.team.name, 'Marvel')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='DC', description='DC Team')
        self.assertEqual(team.name, 'DC')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name='Marvel', description='Marvel Team')
        user = User.objects.create(name='Peter Parker', email='peter@parker.com', team=team)
        activity = Activity.objects.create(user=user, type='Running', duration=30, calories=200, date='2025-11-10')
        self.assertEqual(activity.type, 'Running')
        self.assertEqual(activity.user.name, 'Peter Parker')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Push Ups', description='Upper body', difficulty='Medium')
        self.assertEqual(workout.name, 'Push Ups')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard_entry(self):
        team = Team.objects.create(name='Marvel', description='Marvel Team')
        user = User.objects.create(name='Steve Rogers', email='steve@rogers.com', team=team)
        entry = Leaderboard.objects.create(user=user, points=100, rank=1)
        self.assertEqual(entry.user.name, 'Steve Rogers')
        self.assertEqual(entry.points, 100)
