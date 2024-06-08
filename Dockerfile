FROM node

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8000
EXPOSE 8000

# Default command to be executed upon start
CMD ["sh", "-c", "npm run build && npm run app"]
