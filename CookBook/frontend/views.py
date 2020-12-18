from django.shortcuts import render;
from django.views.decorators.csrf import ensure_csrf_cookie;
from django.template.context_processors import csrf

# Create your views here.
@ensure_csrf_cookie
def index(request):
	context = {}
	context.update(csrf(request))
	return render(request, 'frontend/index.html', context)