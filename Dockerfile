FROM angular-base:v1.0.0

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./ 

COPY node_modules ./node_modules/ 

# Install dependencies
RUN npm install

# Install Angular CLI globally
#RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .


EXPOSE 4200

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0" , "--disable-host-check", "--proxy-config", "proxy.conf.json"]
