# ---- Etapa 1: compilar el jar con Maven (JDK 21) ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copiamos primero el wrapper y el pom para cachear las dependencias
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline || true

# Ahora el codigo y empaquetamos (sin tests para acelerar el deploy)
COPY src ./src
RUN ./mvnw -B clean package -DskipTests

# ---- Etapa 2: imagen final ligera (solo JRE 21) ----
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Koyeb inyecta PORT; Spring lo lee via server.port=${PORT:8080}
EXPOSE 8080
# Ajuste de memoria para caber en los 512 MB del plan free de Koyeb:
# el heap usa ~70% del contenedor y GC serial (menos overhead).
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=70.0", "-XX:+UseSerialGC", "-jar", "app.jar"]
