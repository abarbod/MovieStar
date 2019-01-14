from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import MovieSerializer, MovieMiniSerializer, DiarySerializer, DiaryMiniSerializer
from .models import Movie, Diary
from rest_framework.response import Response


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def list(self, request, *args, **kwargs):
        diaries = Diary.objects.all()
        serializer = DiaryMiniSerializer(diaries, many=True)
        return Response(serializer.data)
