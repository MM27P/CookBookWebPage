from rest_framework import serializers
from .models import User, Recipe, Like
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','email','name','surname','created_at')


class CreateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username','email','password','name','surname')


class UpdateUserPasswordSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','password')

		def to_representation(self,obj):
			return {
				"id": obj.id,
				"username": obj.username,
				"password": make_password(obj.password)
			}


class UpdateUserSerializer(serializers.ModelSerializer):
	lookup_field = "username"
	class Meta:
		model = User
		fields = ('id','username','email','name','surname','created_at')

class RecipeSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only=True)

	class Meta:
		model = Recipe
		fields = ('id','name','creator','ingridients','description','created_at','image_url','user')


class CreateRecipeSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only=True)

	class Meta:
		model = Recipe
		fields = ('name','creator','ingridients','description','created_at','image_url','user')

class Like(serializers.ModelSerializer):
	class Meta:
		model = Like
		fields = ('recipe_id','user_id')
