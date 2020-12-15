from rest_framework import serializers
from .models import User, Recipe

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','email','name','surname','created_at')


class CreateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username','email','password','name','surname')


class RecipeSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only=True)

	class Meta:
		model = Recipe
		fields = ('id','name','creator','ingridients','description','created_at','user')


class CreateRecipeSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only=True)

	class Meta:
		model = Recipe
		fields = ('name','creator','ingridients','description','created_at','user')
