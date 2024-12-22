from django.db import models

class ProductURLData(models.Model):
    prod_ID = models.CharField(max_length=20, unique=True)
    prod_URL = models.URLField(max_length=200)
    site = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.prod_ID} - {self.site}"


class PriceHistData(models.Model):
    product = models.ForeignKey(ProductURLData, on_delete=models.CASCADE, related_name="price_history")
    date = models.DateField()
    price = models.FloatField()

    class Meta:
        unique_together = ('product', 'date')

    def __str__(self):
        return f"{self.product.prod_ID} - {self.date}: {self.price}"
