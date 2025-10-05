# Use Maven with OpenJDK 21
FROM maven:3.9.9 AS BUILD

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies (better caching)
RUN mvn dependency:resolve

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Run the Spring Boot application with DevTools enabled
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"]