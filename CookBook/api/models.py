from django.db import models

# Create your models here.
class User(models.Model):
	username = models.CharField(max_length = 50, unique = True)
	password = models.CharField(max_length = 50)
	name = models.CharField(max_length = 20)
	surname = models.CharField(max_length = 50)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.username


class Recipe(models.Model):
	name = models.CharField(max_length = 200)
	creator = models.ForeignKey(User, on_delete = models.CASCADE)
	ingridients = models.CharField(max_length = 500)
	description = models.CharField(max_length = 2000)
	created_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
	recipe_id = models.ForeignKey(Recipe, on_delete = models.CASCADE)
	user_id = models.ForeignKey(User, on_delete = models.CASCADE)