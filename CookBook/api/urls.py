from django.urls import path
from .views import index, UserView, OneUserView, CreateUserView, UpdateUserView, UpdateUserPasswordView, RecipeView, OneRecipeView, UserRecipeView, CreateRecipeView, login, checkloginstatus, logout, onlyForLoginUser, RemoveRecipeView, UpdateRecipeView, getrecipesbynamepart

urlpatterns = [
    path('', index, name="apiIndex"),
    path('login', login, name="apiLogin"),
    path('logout', logout, name="apiLogout"),
    path('checkloginstatus', checkloginstatus),
    path('onlyforloginuser', onlyForLoginUser, name="apiOnlyForLoginUser"),
    path('users', UserView.as_view()),
    path('users/<int:user_id>', OneUserView.as_view()),
    path('updateuser/<int:id>', UpdateUserView.as_view()),
    path('updateuserpassword/<int:id>', UpdateUserPasswordView.as_view()),
    path('createuser', CreateUserView.as_view()),
    path('recipes', RecipeView.as_view()),
    path('recipes/<int:recipe_id>', OneRecipeView.as_view()),
    path('searchrecipes', getrecipesbynamepart),
    path('createrecipe', CreateRecipeView.as_view()),
    path('recipes/user/<int:user_id>', UserRecipeView.as_view()),
    path('removerecipe/<int:id>', RemoveRecipeView.as_view()),
    path('updaterecipe/<int:id>', UpdateRecipeView.as_view())
]