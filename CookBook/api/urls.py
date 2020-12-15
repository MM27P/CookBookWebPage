from django.urls import path
from .views import index, UserView, CreateUserView, RecipeView, OneRecipeView, UserRecipeView, CreateRecipeView, login, logout, onlyForLoginUser

urlpatterns = [
    path('', index, name="apiIndex"),
    path('login', login, name="apiLogin"),
    path('logout', logout, name="apiLogout"),
    path('onlyforloginuser', onlyForLoginUser, name="apiOnlyForLoginUser"),
    path('users', UserView.as_view()),
    path('createuser', CreateUserView.as_view()),
    path('recipes', RecipeView.as_view()),
    path('recipes/<int:recipe_id>', OneRecipeView.as_view()),
    path('createrecipe', CreateRecipeView.as_view()),
    path('recipes/user/<int:user_id>', UserRecipeView.as_view()),
]