"""
URL configuration for Hybrid_IDS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from detection.views import protocol_report_view
from analytics.views import dashboard
from ips.views import ips

urlpatterns = [
    path('admin/', admin.site.urls),
    path('protocol-report/',protocol_report_view, name='protocols'),
    path('dashboard/', dashboard,  name='dashboard'),
    path('ips/', ips,  name='ip')
]


