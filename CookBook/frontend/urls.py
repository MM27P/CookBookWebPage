from django.urls import path
from .views import index

urlpatterns = [
	path('', index),
	path('login', index),
	path('register', index),
	path('myrecipes',index),
	path('createrecipe',index),
	path('mysettings',index)
]