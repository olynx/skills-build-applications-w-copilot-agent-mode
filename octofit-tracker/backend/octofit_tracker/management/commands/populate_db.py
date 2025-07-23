from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from datetime import timedelta

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):

        # Clear existing data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users
        users = [
            User(username='thundergod', email='thundergod@mhigh.edu', password='thundergodpassword'),
            User(username='metalgeek', email='metalgeek@mhigh.edu', password='metalgeekpassword'),
            User(username='zerocool', email='zerocool@mhigh.edu', password='zerocoolpassword'),
            User(username='crashoverride', email='crashoverride@hmhigh.edu', password='crashoverridepassword'),
            User(username='sleeptoken', email='sleeptoken@mhigh.edu', password='sleeptokenpassword'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        team1 = Team(name='Blue Team')
        team2 = Team(name='Gold Team')
        team1.save()
        team2.save()
        for user in User.objects.all():
            team1.members.add(user)
            team2.members.add(user)

        # Create activities
        activities = [
            Activity(user=User.objects.get(username='thundergod'), activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(user=User.objects.get(username='metalgeek'), activity_type='Crossfit', duration=timedelta(hours=2)),
            Activity(user=User.objects.get(username='zerocool'), activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(user=User.objects.get(username='crashoverride'), activity_type='Strength', duration=timedelta(minutes=30)),
            Activity(user=User.objects.get(username='sleeptoken'), activity_type='Swimming', duration=timedelta(hours=1, minutes=15)),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(user=User.objects.get(username='thundergod'), score=100),
            Leaderboard(user=User.objects.get(username='metalgeek'), score=90),
            Leaderboard(user=User.objects.get(username='zerocool'), score=95),
            Leaderboard(user=User.objects.get(username='crashoverride'), score=85),
            Leaderboard(user=User.objects.get(username='sleeptoken'), score=80),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(name='Cycling Training', description='Training for a road cycling event'),
            Workout(name='Crossfit', description='Training for a crossfit competition'),
            Workout(name='Running Training', description='Training for a marathon'),
            Workout(name='Strength Training', description='Training for strength'),
            Workout(name='Swimming Training', description='Training for a swimming competition'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
