from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Limpando dados antigos...')
        for obj in Leaderboard.objects.all():
            if obj.id:
                obj.delete()
        for obj in Activity.objects.all():
            if obj.id:
                obj.delete()
        for obj in User.objects.all():
            if obj.id:
                obj.delete()
        for obj in Team.objects.all():
            if obj.id:
                obj.delete()
        for obj in Workout.objects.all():
            if obj.id:
                obj.delete()

        self.stdout.write('Criando times...')
        marvel = Team.objects.create(name='Marvel', description='Equipe Marvel')
        dc = Team.objects.create(name='DC', description='Equipe DC')

        self.stdout.write('Criando usuários...')
        tony = User.objects.create(name='Tony Stark', email='tony@stark.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@rogers.com', team=marvel)
        peter = User.objects.create(name='Peter Parker', email='peter@parker.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@wayne.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@kent.com', team=dc)
        diana = User.objects.create(name='Diana Prince', email='diana@prince.com', team=dc)

        self.stdout.write('Criando atividades...')
        Activity.objects.create(user=tony, type='Corrida', duration=30, calories=300, date='2025-11-10')
        Activity.objects.create(user=steve, type='Natação', duration=45, calories=400, date='2025-11-09')
        Activity.objects.create(user=peter, type='Ciclismo', duration=60, calories=500, date='2025-11-08')
        Activity.objects.create(user=bruce, type='Treino de força', duration=50, calories=350, date='2025-11-07')
        Activity.objects.create(user=clark, type='Corrida', duration=40, calories=320, date='2025-11-06')
        Activity.objects.create(user=diana, type='Yoga', duration=30, calories=150, date='2025-11-05')

        self.stdout.write('Criando treinos...')
        Workout.objects.create(name='Push Ups', description='Treino de força para parte superior', difficulty='Médio')
        Workout.objects.create(name='Cardio Blast', description='Treino intenso de cardio', difficulty='Difícil')
        Workout.objects.create(name='Yoga Relax', description='Sessão de yoga para relaxamento', difficulty='Fácil')

        self.stdout.write('Criando leaderboard...')
        Leaderboard.objects.create(user=tony, points=1200, rank=1)
        Leaderboard.objects.create(user=steve, points=1100, rank=2)
        Leaderboard.objects.create(user=peter, points=900, rank=3)
        Leaderboard.objects.create(user=bruce, points=950, rank=4)
        Leaderboard.objects.create(user=clark, points=800, rank=5)
        Leaderboard.objects.create(user=diana, points=700, rank=6)

        self.stdout.write(self.style.SUCCESS('Banco populado com dados de super-heróis Marvel e DC!'))

        # Garante índice único para email
        with connection.cursor() as cursor:
            cursor.execute('db.users.createIndex({ "email": 1 }, { "unique": true })')
