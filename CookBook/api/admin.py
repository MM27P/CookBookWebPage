from django.contrib import admin
from .models import User, Recipe, Like

# Register your models here.

admin.site.register(User)
admin.site.register(Recipe)
admin.site.register(Like)