from django import forms


class RegisterForm(forms.Form):
    username_f = forms.CharField(max_length=50, label='Username')
    password_f = forms.CharField(max_length=50, label='Password')