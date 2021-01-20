# Trivia-App

{%for res in records %}
                        {% get_user_history res as data %}
                            Game1 : {{ res.created|date:"dS F f a" }} <br>
							Name : {{res.name}}							
                            
                             <br> <br>

                    {%endfor%}