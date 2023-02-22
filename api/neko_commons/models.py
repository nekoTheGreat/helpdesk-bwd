from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings

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
    file_name = models.CharField(max_length=255)
    unique_file_name = models.CharField(max_length=255)

    class Meta:
        db_table = "attachments"

    @property
    def url(self):
        # TODO cloud storage
        
        # default storage
        storage = FileSystemStorage(base_url=settings.APP_URL + settings.MEDIA_URL)
        storage.open(self.unique_file_name)
        return storage.url(self.unique_file_name)