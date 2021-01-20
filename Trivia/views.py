from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

# Create your views here.

def get_user_name(request):
    if request.method == "POST":
        form = EnterUserName(request.POST)
        name           = request.POST.get('name')
        user = UserProfile.objects.create(name=name)
        request.session['user_profile_id']= user.id
        return redirect('welcome/{}/'.format(name))
    else:
        form = EnterUserName()
    return render(request, 'trivia/user_name.html', {'form': form})


def welcome_user(request,name):
    quest = Question.objects.all()
    index = request.POST.get('index',0)
    nextt = int(index)+1
    user_id = request.session.get('user_profile_id')
    user_profile = UserProfile.objects.get(id=user_id)
    
    if request.method == "POST":
        question_over = False
        if len(quest) == int(index):
            question_over = True

        else:
            ques = quest[int(index)]

        question    = request.POST.get('question')
        choice      = request.POST.getlist('choices')
        record,created      = GameReocrd.objects.get_or_create(name=user_profile)
        record.config.update({question:choice})
        record.save()

        if question_over == True:
            summary = GameReocrd.objects.get(name = user_profile)         
    else:
        ques = quest[int(index)]    
    return render(request, 'trivia/welcome_user.html', locals())