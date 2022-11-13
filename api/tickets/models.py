from django.db import models


class Ticket(models.Model):
    subject = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    street_address = models.CharField(max_length=255, null=True, blank=True)
    purok = models.CharField(max_length=255, null=True, blank=True)
    poblacion = models.CharField(max_length=255, null=True, blank=True)
    barangay = models.CharField(max_length=255, null=True, blank=True)
    municipality = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField('date published')
    created_by = models.CharField(max_length=255)
    user = models.ForeignKey("neko_users.User", on_delete=models.CASCADE, default=None)

    class Meta:
        db_table = "tickets"
