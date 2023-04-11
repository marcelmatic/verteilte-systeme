# verteilte-systeme
Create Single Page Application

Open a terminal in your project root and run the following command to build the Docker image:
docker build -t my-app .
Replace my-app with the desired name for your application's image




After the image is built, run the following command to start a Docker container using the image:
docker run -p 3000:3000 -p 4000:4000 --name my-container my-app
Replace my-container with the desired name for your container and my-app with the image name used in the previous step.

Now, your application should be running inside a Docker container, and you can access the frontend at http://localhost:4000 and the backend at http://localhost:3000.