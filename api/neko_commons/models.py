from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Attachment(BaseModel):
    type = models.CharField(max_length=30, db_index=True)
    identifier = models.BigIntegerField(db_index=True)
    disk_type = models.CharField(max_length=30)
    file_path = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "attachments"