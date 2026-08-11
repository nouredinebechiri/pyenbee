"""
blog/forms.py
"""

from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        label="Nom", max_length=100,
        widget=forms.TextInput(attrs={"placeholder": "Votre nom"}),
    )
    email = forms.EmailField(
        label="E-mail",
        widget=forms.EmailInput(attrs={"placeholder": "votre@email.com"}),
    )
    subject = forms.CharField(
        label="Sujet", max_length=150,
        widget=forms.TextInput(attrs={"placeholder": "Sujet du message"}),
    )
    message = forms.CharField(
        label="Message",
        widget=forms.Textarea(attrs={"placeholder": "Votre message...", "rows": 6}),
    )