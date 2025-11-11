from djongo import models


from djongo import models

class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    class Meta:
        db_table = 'teams'
    def __str__(self):
        return self.name

class User(models.Model):
    id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members', to_field='id', db_column='team_id')
    class Meta:
        db_table = 'users'
    def __str__(self):
        return self.name

class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities', to_field='id', db_column='user_id')
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # minutos
    calories = models.IntegerField()
    date = models.DateField()
    class Meta:
        db_table = 'activities'
    def __str__(self):
        return f"{self.type} - {self.user.name}"

class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries', to_field='id', db_column='user_id')
    points = models.IntegerField()
    rank = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'
    def __str__(self):
        return f"{self.user.name} - {self.points} pts"
