from django import forms
from django.contrib.auth.models import User
from .models import *

class EnterUserName(forms.Form):
    # ---------comments-----------------------------------------------------#
    #  Useing this from we are getting the User name
    # ------------------------ends here-------------------------------------#

    name      = forms.RegexField(label="Name*",     max_length=30,regex=r'^[a-zA-Z ]+$',widget=forms.TextInput(attrs={'class' : 'form-control'}),required=True)
