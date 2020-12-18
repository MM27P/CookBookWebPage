from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate 
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import CreateUserSerializer, UserSerializer, UpdateUserPasswordSerializer, UpdateUserSerializer, RecipeSerializer, CreateRecipeSerializer
from .models import User, Recipe
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
import json

# Create your views here.

def index(request):
	return HttpResponse("You are now seeing index of API.")

class UserView(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class CreateUserView(APIView):
	serializer_class = CreateUserSerializer

	def post(self, request, format = None):
		serializer = self.serializer_class(data = request.data)
		if serializer.is_valid():
			username = serializer.data.get('username')
			password = serializer.data.get('password')
			name = serializer.data.get('name')
			surname = serializer.data.get('surname')
			email = serializer.data.get('email')
			queryset = User.objects.filter(username = username)
			if queryset.exists():
				return Response("Username already in use", status = status.HTTP_400_BAD_REQUEST)
			else:
				user = User(username = username, password = password, name = name, surname = surname, email = email)
				user.save()
			return Response(UserSerializer(user).data, status = status.HTTP_200_OK)

class UpdateUserView(generics.UpdateAPIView):
	serializer_class = UpdateUserSerializer
	queryset = User.objects.all()
	lookup_field = "username"
	# permission_classes = (permissions.IsAuthenticated,)

	def update(self, request, *args, **kwargs):
		user = self.get_object()
		user.name = request.data.get("name")
		user.surname = request.data.get("surname")
		user.password = request.data.get("password")
		user.email = request.data.get("email")
		user.save()

		serializer = self.get_serializer(user)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		return Response(serializer.data)

# class UpdateUserPasswordView(APIView):
# 	serializer_class = UpdateUserPasswordSerializer

# 	def post(self,request,format = None):
# 		serializer = self.serializer_class(data = request.data)
# 		if serializer.is_valid():
# 			username = serializer.data.get('username')
# 			password = password.data.get('password')
# 			user = User.objects.filter(username = username)
# 			if user.exists():
# 				user.password = password
# 				user.save()
# 			else:
# 				return Response("Username cannot be found", status = status.HTTP_400_BAD_REQUEST)

class RecipeView(generics.ListAPIView):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer

class OneRecipeView(generics.ListAPIView):
	serializer_class = RecipeSerializer
	recipe_id_kwarg = "recipe_id"

	def get_queryset(self):
		recipe_id = self.kwargs.get(self.recipe_id_kwarg)
		recipe = Recipe.objects.filter(id = recipe_id)
		return recipe
	

class UserRecipeView(generics.ListAPIView):
	serializer_class = RecipeSerializer
	user_id_kwarg = "user_id"

	def get_queryset(self):
		user_id = self.kwargs.get(self.user_id_kwarg)
		recipies = Recipe.objects.filter(creator = user_id)
		return recipies

	

class CreateRecipeView(APIView):
	serializer_class = CreateRecipeSerializer

	def post(self, request, format = None):
		serializer = self.serializer_class(data = request.data)
		user_id_for_recipe = self.request.data.get('creator')
		user_instance = User.objects.filter(id = user_id_for_recipe).first()
		if serializer.is_valid():
			data = serializer.validated_data
			serializer.save(creator = user_instance)
			return Response(serializer.data, status = status.HTTP_200_OK)

		return Response('{"Error": "Something Wrong with Recipe"}', status = status.HTTP_400_BAD_REQUEST)


def login(request):
	if request.method == "POST":
		request.data = json.loads(request.body)
		username = request.data['username']
		password = request.data['password']
		print (request.user)
		print (request.user.is_authenticated)
		if not request.user.is_authenticated:
			user = authenticate(request,username=username,password=password)
			if user is not None:
				auth_login(request,user)
				return HttpResponse("You are logged in right now!", status = status.HTTP_200_OK)
			else:
				return HttpResponse("Sorry. Cannot login", status = status.HTTP_400_BAD_REQUEST)
		else:
			return HttpResponse("Already Authenticated", status = status.HTTP_200_OK)


@login_required
def logout(request):
	if request.user.is_authenticated:
		auth_logout(request)
	return HttpResponse("Logged out", status = status.HTTP_200_OK)



@login_required(login_url='/api/')
def onlyForLoginUser(request):
	return HttpResponse("You are worthy!!")
	