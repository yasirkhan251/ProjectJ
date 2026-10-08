from django.core.management.base import BaseCommand
from catalog.seed import run


class Command(BaseCommand):
    help = "Seed ProjectJ's initial marketplace products"

    def handle(self, *args, **options):
        run()
