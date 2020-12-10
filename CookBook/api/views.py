from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import CreateUserSerializer, UserSerializer, RecipeSerializer
from .models import User, Recipe
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

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

class RecipeView(generics.ListAPIView):
	queryset = Recipe.objects.all()
	serializer_class = RecipeSerializer


class CreateRecipeView(APIView):
	serializer_class = RecipeSerializer

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
		print(request)
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request,username=username,password=password)
		if user is not None:
			login(request,user)
			return HttpResponse("You are logged in right now!")
		else:
			return HttpResponse("Sorry. Cannot login")
	else:
		return HttpResponse("Not available", status = status.HTTP_400_BAD_REQUEST)


def logout(request):
	logout(request)


@login_required(login_url='/api/')
def onlyForLoginUser(request):
	return HttpResponse("You are worthy!!")
	