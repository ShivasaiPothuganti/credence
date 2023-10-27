FROM openjdk:17-alpine
VOLUME /temp
EXPOSE 8080
COPY target/*.jar app.jar
CMD ["java", "-jar", "/app.jar"]