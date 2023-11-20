from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager


# Create your models here.
class CustomizedUserManager(UserManager):
    def get_or_create_user(self, user_data):
        user, created = self.get_or_create(
            google_id=user_data["sub"],
            given_name=user_data["given_name"],
            email=user_data["email"],
            picture=user_data["picture"],
        )
        return user, created


class User(AbstractBaseUser, PermissionsMixin):
    given_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    picture = models.CharField(max_length=300)
    google_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["given_name", "google_id"]

    objects = CustomizedUserManager()
