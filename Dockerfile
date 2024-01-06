# Use a basic Nginx image as a base
FROM nginx:alpine

# Copy the project files to the default Nginx web server directory
COPY . /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80
