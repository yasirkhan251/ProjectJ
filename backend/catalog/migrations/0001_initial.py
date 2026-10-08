from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("category", models.CharField(max_length=100)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("seller", models.CharField(max_length=150)),
                ("location", models.CharField(max_length=100)),
                ("material", models.CharField(max_length=100)),
                ("rating", models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ("image", models.URLField(max_length=1000)),
                ("badge", models.CharField(blank=True, max_length=50)),
            ],
        ),
    ]
