from django.db import models
from django.utils.translation import ugettext_lazy as _
# from django.contrib.postgres.fields import JSONField
from jsonfield import JSONField

from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

# Create your models here.

QTYPE_CHOICES = (
         ('R', 'Radio List'),
        ('C', 'Checkbox List'), 
        )


class BaseContent(models.Model):
    # ---------comments-----------------------------------------------------#
    # BaseContent is the abstract base model for all
    # the models in the project
    # This contains created and modified to track the
    # history of a row in any table
    # This also contains switch method to deactivate one row if it is active
    # and vice versa
    # ------------------------ends here---------------------------------------------#

    ACTIVE_CHOICES  = ((0, 'Inactive'), (2, 'Active'),)
    active          = models.PositiveIntegerField(choices=ACTIVE_CHOICES,default=2)
    created         = models.DateTimeField(auto_now_add=True)
    modified        = models.DateTimeField(auto_now=True)

    #                                        BaseContent
    class Meta:
        #-----------------------------------------#
        # Don't create a table in database
        # This table is abstract
        #--------------------ends here--------------------#
        abstract = True

    #                                        BaseContent
    def switch(self):   
        # Deactivate a model if it is active
        # Activate a model if it is inactive
        self.active = {2: 0, 0: 2}[self.active]
        self.save()



class Question(BaseContent):
    # ---------comments-----------------------------------------------------#
    # 
    # ------------------------ends here-------------------------------------#
    text = models.CharField(_('question text'), max_length=500)
    qtype = models.CharField(_('question type'), max_length=2, choices=QTYPE_CHOICES)

    def __str__(self):
        return "%s" % (self.text)


class Choice(BaseContent):
    # ---------comments-----------------------------------------------------#
    # 
    # ------------------------ends here-------------------------------------#
    question = models.ForeignKey(Question, 
                                  on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(_('choice text'), max_length=500)   
    
    def __str__(self):
        return "%s" % (self.text)


class UserProfile(BaseContent):
    # ---------comments-----------------------------------------------------#
    # 
    # ------------------------ends here-------------------------------------#
    name            = models.CharField(max_length=100)
    def __str__(self):
        return str(self.name)


class GameReocrd(BaseContent):
    # ---------comments-----------------------------------------------------#
    # 
    # ------------------------ends here-------------------------------------#

    name = models.ForeignKey(UserProfile, blank=True, null=True, on_delete=models.CASCADE)
    config = JSONField(default={})

    def __str__(self):
        return str(self.name)

