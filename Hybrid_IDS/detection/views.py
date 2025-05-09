from django.shortcuts import render
import requests
from django.http import JsonResponse

# Create your views here.


def protocol_report_view(request):
    url = 'https://7623-34-106-173-226.ngrok-free.app'
    try:
        response = requests.get(url)
        response.raise_for_status()
        result_data = response.json().get('result', [])

        network_data = [
            {'protocol': item['protocol'], 'status': item['result']}
            for item in result_data
        ]

        

    except requests.exceptions.RequestException as e:
        network_data = []
    return render(request, 
    'attacked_protocols.html', 
    {'network_data': network_data})