from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Recipe, Like
from .serializers import CreateUserSerializer, UserSerializer

# Register your models here.

class CustomUserAdmin(UserAdmin):
	add_serializer = CreateUserSerializer
	serializer = UserSerializer
	model = User
	list_display = ['username','email','name','surname',]


admin.site.register(User, CustomUserAdmin)
admin.site.register(Recipe)
admin.site.register(Like)