from xml.etree.ElementInclude import include
from django.contrib import admin
from django.urls import path, include
from RecName.views import NameList
from FinalReport.views import GetReport
from LoadingLabeling.views import Labeling
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rec/', include('RecName.urls')),
    path('report/<str:name>/<int:birth>', GetReport.as_view()),

    path('loading/',Labeling.as_view())
]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]