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
    file_name = models.CharField(max_length=255)
    unique_file_name = models.CharField(max_length=255)

    class Meta:
        db_table = "attachments"

    @property
    def url(self):
        if self.disk_type == 'local':
            return 'https://google.com/{}'.format(self.unique_file_name)
        return 'https://any-cloud.com/{}'.format(self.unique_file_name)