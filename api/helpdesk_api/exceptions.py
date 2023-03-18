from rest_framework.views import exception_handler
from http import HTTPStatus
from django.http import JsonResponse

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        http_code_to_message = {v.value: v.description for v in HTTPStatus}
        payload = {
            "status_code": response.status_code,
            "message": http_code_to_message[response.status_code],
            "errors": response.data,
        }
        response.data = payload
    return response

status_code_messages = {
    "400": "Bad request",
    "403": "Access denied",
    "404": "Resource not found",
    "500": "Server error",
}

def error400(request, exception=None):
    return JsonResponse({"status_code": 400, "message": status_code_messages["400"]}, status=400)

def error403(request, exception=None):
    return JsonResponse({"status_code": 403, "message": status_code_messages["403"]}, status=403)

def error404(request, exception=None):
    return JsonResponse({"status_code": 404, "message": status_code_messages["404"]}, status=404)

def error500(request, exception=None):
    return JsonResponse({"status_code": 500, "message": status_code_messages["500"]}, status=500)