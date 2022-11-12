from rest_framework.views import exception_handler
from http import HTTPStatus

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
