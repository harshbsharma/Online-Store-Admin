# Use the official Node.js image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma files
COPY prisma /app/prisma

# Run Prisma generate
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# ENV NODE_ENV=production

# RUN npm run build  

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
