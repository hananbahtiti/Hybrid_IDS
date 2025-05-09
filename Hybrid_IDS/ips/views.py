from django.shortcuts import render

# Create your views here.
def ips(request):
    return render(request, 'blocked_ips.html')