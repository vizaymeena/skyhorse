from apps.common.models import *
from rest_framework import serializers


class ServiceProviderSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = ServiceProvider
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at","is_restricted","is_active"]

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email cannot be empty.")
        return value

    def validate_gstin_number(self, value):
        if len(value) != 15:
            raise serializers.ValidationError("GSTIN number must be 15 characters.")
        return value

    def validate_contact(self, value):
        if len(str(value)) != 10:
            raise serializers.ValidationError("Contact number must be 10 digits.")
        return value

    def create(self, validated_data):
        # Hash password before saving
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Only hash password if user sends it in PATCH/PUT
        password = validated_data.pop("password", None)
        if password:
            instance.password = make_password(password)

        return super().update(instance, validated_data)
        
    
    