from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=70)
    desc = models.CharField(max_length=375)
    year = models.IntegerField()

class Diary(models.Model):
    title = models.CharField(max_length=70)
    desc = models.CharField(max_length=475)
    date = models.DateTimeField()