from django.urls import path

from analyzer import views

urlpatterns = [
    path("", views.health),
    path("analyze", views.analyze),
]
