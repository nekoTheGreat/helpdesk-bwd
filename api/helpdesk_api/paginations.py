from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict
from rest_framework.response import Response

class SafePageNumberPagination(PageNumberPagination):
    def paginate_queryset(self, queryset, request, view=None):
        try:
            return super().paginate_queryset(queryset, request, view)
        except:
            return list()
        
    def get_paginated_response(self, data):
        if hasattr(self, 'page') and self.page is not None:
            return super().get_paginated_response(data)
        else:
            return Response(OrderedDict([
                ('count', 0),
                ('next', None),
                ('previous', None),
                ('results', [])
            ]))