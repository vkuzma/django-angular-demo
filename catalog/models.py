from django.db import models


class Category(models.Model):
    name = models.CharField(u'Name', max_length=100)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Category'
        verbose_name_plural = u'Categories'


class Product(models.Model):
    name = models.CharField(u'Name', max_length=100)
    price = models.FloatField(u'Price', default=0.00)
    stock = models.IntegerField(u'Stock', default=0)
    category = models.ForeignKey(Category)


    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Product'
        verbose_name_plural = u'Products'