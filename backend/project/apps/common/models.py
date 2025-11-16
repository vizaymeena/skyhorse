from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.utils import timezone
# Create your models here.

class ServiceProvider(models.Model):
    service_choices = [("flight","FLIGHT"),("cab","CAB"),("hotel","HOTEL")]
    service_type = models.CharField(max_length=20,choices=service_choices ,verbose_name="Service Type")
    email = models.EmailField(max_length=100,unique=True,blank=False,null=False,verbose_name="Email")
    contact = models.PositiveIntegerField(verbose_name="Contact")
    gstin_number = models.CharField(max_length=15,unique=True,blank=False,null=False,verbose_name="GSTN NO.")
    address = models.CharField(max_length=100 ,blank=True,null=True)

    is_active = models.BooleanField(default=True,verbose_name="Active Status")
    is_restricted = models.BooleanField(default=False,verbose_name="Restricted Provider Status")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_service_type_display()})" # get_<field_name>_display() for choice field
    

from django.contrib.auth.hashers import make_password, check_password
class User(models.Model):
    gender_choices=[("male","M"),("female","F"),("others","O")]
    email = models.CharField(max_length=100,unique=True,blank=False,null=False)
    username = models.CharField(max_length=50)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    contact=models.PositiveIntegerField()
    gender=models.CharField(max_length=10,choices=gender_choices)
    address=models.CharField(max_length=100)
    password=models.CharField(max_length=10)
    
    def save(self,*args,**kwargs):
        # set username default if not provided 
        if not self.username:
            self.username = f"{self.first_name}{self.last_name}".lower()

        # hash the password before saving into the database
        if self.pk is None:
            self.password = make_password(self.password)
        
        # if the user is old
        else:
            old=User.objects.filter(pk=self.pk).first()
            if old and old.password != self.password:
                old.password = make_password(self.password)
        
        super.save(self,*args,**kwargs)

    def __str__(self):
        return self.username