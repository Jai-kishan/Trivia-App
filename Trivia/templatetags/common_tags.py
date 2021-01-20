from django import template
register = template.Library()

from Trivia.models import *
from django.utils.safestring import mark_safe


@register.simple_tag
def get_choices(ques):
	
	obj = Choice.objects.filter(question=ques,active=2)
	return obj


@register.simple_tag
def get_summary(ques_id, summary):
	ch= summary.config.get(str(ques_id))
	res = ""
	if ch:
		choice = Choice.objects.filter(id__in=ch)
		print(choice)
		for c in range(len(choice)):
			if len(choice) == 1:
				res = res + choice[c].text
			else:
				if c == (len(choice)-1):
					res = res + choice[c].text
				else:
					res = res + choice[c].text + "," 
	return res