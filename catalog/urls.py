from django.conf.urls import patterns, include, url
from .api import ProductResource, CategoryResource


product_resource = ProductResource()
category_resource = CategoryResource()


urlpatterns = patterns('',
    url(r'^', include(product_resource.urls)),
    url(r'^', include(category_resource.urls)),
)
