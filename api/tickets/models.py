from django.db import models
from neko_commons.models import BaseModel

class Ticket(BaseModel):
    subject = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    street_address = models.CharField(max_length=255, null=True, blank=True)
    purok = models.CharField(max_length=255, null=True, blank=True)
    poblacion = models.CharField(max_length=255, null=True, blank=True)
    barangay = models.CharField(max_length=255, null=True, blank=True)
    municipality = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey("neko_users.User", db_column="user_id", on_delete=models.CASCADE, default=None)

    class Meta:
        db_table = "tickets"

class Attachment(BaseModel):
    type = models.CharField(max_length=30, db_index=True)
    identifier = models.BigIntegerField(db_index=True)
    disk_type = models.CharField(max_length=30)
    file_path = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "attachments"