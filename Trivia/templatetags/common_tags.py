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
	ans= []
	if ch:
		choice = Choice.objects.filter(id__in=ch)
		correct_ans = Choice.objects.filter(question__id = ques_id, is_correct=True)

		for cr in correct_ans:
			ans.append(cr.text)

		for c in range(len(choice)):
			if len(choice) == 1:
				res = res + choice[c].text
				
			else:
				if c == (len(choice)-1):
					res = res + choice[c].text

				else:
					res = res + choice[c].text + ",  "
	return res,ans


@register.simple_tag
def get_user_history(res):
	data= []
	for ques_id,ch_id in res.config.items():
		res = Choice.objects.filter(question__id =ques_id,id__in=ch_id)
		for i in res:
			data.append(i.question)
			data.append(i.text)
	return data