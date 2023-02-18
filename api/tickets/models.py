from django.db import models
from neko_commons.models import BaseModel, Attachment

class Ticket(BaseModel):
    subject = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    street_address = models.CharField(max_length=255, null=True, blank=True)
    purok = models.CharField(max_length=255, null=True, blank=True)
    barangay = models.CharField(max_length=255, null=True, blank=True)
    municipality = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey("neko_users.User", db_column="user_id", on_delete=models.CASCADE, default=None)
    @property
    def photos(self):
        return Attachment.objects.filter(type="ticket_images", identifier=self.id, is_active=True).all()

    class Meta:
        db_table = "tickets"
