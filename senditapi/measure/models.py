from django.db import models

# Create your models here.

class userMeasures(models.Model):
    measurefield = models.JSONField("measurefield", default=dict)
