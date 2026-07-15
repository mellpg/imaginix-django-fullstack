from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path("admin/", admin.site.admin_view),
    path("", views.home, name="home"),  # Rota principal
    path("api/brinquedos/", views.listar_brinquedos, name="listar_brinquedos"),
    path("api/cadastrar/", views.cadastrar_brinquedo, name="cadastrar_brinquedo"),
    path(
        "api/comprar/<int:brinquedo_id>/",
        views.comprar_brinquedo,
        name="comprar_brinquedo",
    ),
    path("api/agendar/", views.agendar_servico, name="agendar_servico"),
]
