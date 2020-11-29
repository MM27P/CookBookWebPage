from django.urls import path
from .views import index, UserView, CreateUserView, RecipeView, CreateRecipeView

urlpatterns = [
    path('', index, name="apiIndex"),
    path('users', UserView.as_view()),
    path('createuser', CreateUserView.as_view()),
    path('recipes', RecipeView.as_view()),
    path('createrecipe', CreateRecipeView.as_view()),
]