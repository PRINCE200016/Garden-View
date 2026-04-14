# ============================================
# Garden View Resort - Backend Dockerfile for Hugging Face Spaces
# ============================================
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
RUN apk add --no-cache maven
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN mkdir -p /data
COPY --from=build /app/target/app.jar app.jar
EXPOSE 7860
ENTRYPOINT ["java", "-Dspring.profiles.active=huggingface", "-jar", "app.jar"]

