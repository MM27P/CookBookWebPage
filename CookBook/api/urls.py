from django.urls import path
from .views import index, UserView, CreateUserView, RecipeView, CreateRecipeView, login, logout, onlyForLoginUser

urlpatterns = [
    path('', index, name="apiIndex"),
    path('login', login, name="apiLogin"),
    path('logout', logout, name="apiLogout"),
    path('onlyforloginuser', onlyForLoginUser, name="apiOnlyForLoginUser"),
    path('users', UserView.as_view()),
    path('createuser', CreateUserView.as_view()),
    path('recipes', RecipeView.as_view()),
    path('createrecipe', CreateRecipeView.as_view()),
]