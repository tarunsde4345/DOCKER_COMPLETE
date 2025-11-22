docker file explaination
FROM node 
    tells docker which base image to start from.
    node -> Docker Hub (docer.io/library/node:latest)
    this image alreayd has linux OS, node.js pre intalled, npm pre installed
WORKDIR /app
    sets the working directory for followed instructions in Dockerfile.
    /app directory is automatically creted, if not present.
COPY . /app
    standard copy command copy [sorce (during image building)] [destination (inside container)]
    [src] = . -> all files from current directory except the DockerFile
    [dest] = /app -> to app directory on the container
    abides .dockerignore file, to avoide unwanted files (too many files make the build huge and slow)
RUN npm install
    execute shell command "npm install" inside image during build phase.
    this way dependencies are installed during the image build phase
EXPOSE 80
    only a convertion/meta data, doesn't open port on the container by default.
    opening ports in containers is done by -p flag on docker run command when container is built

CMD ["node", "server.js"]
    defines the default command that runs when the container starts.


-------
docker build .
    Hey Docker, please build me an image using the Dockerfile in this folder, and all files in this folder as build context.
    "docker" keywork run the docker CLI (client).
    parses the command, sends a build reqeust to Docker daemon (does the heavy lifting)
    [src]=. -> docker sends all files in build context recursively (all files in the folde specified)
        .dockerignore is good to have to avoide sending all excess files node_modules gitignore .git etc
    Docker looks for DockerFile named file by default and excutes each instruction sequentially.
    each command creates a new image built on top of image created from previous image.
    docker caches layers logically when possible to speed up rebuild

-------
issues faced and debugging

1.
Taruns-MacBook-Air:2_node_js_app tarunraj$ docker build .
ERROR: Cannot connect to the Docker daemon at unix:///Users/tarunraj/.docker/run/docker.sock. Is the docker daemon running?
Resolution: the docker daemon needs to be running for docker commands to work.
    Linux:  the docker daemon runs my default and in supported natively.
    MAC/ windows: has to configued to be run on system launch.

    docker info : returns basic information, work only why docker desktop is running.

-------
TODO
    in detail diffrent between RUN and CMD (under the hood)
    understand Docker layer caching
    why to only copy the package.json. and run npm install and the copy the source code.
        if there is no change in the package.json so does not need to create a new build of post package.json run, i.e. with depedency added.
        effectively if package.json has no change, the cached intermediate image is picked up. without actually running the instruction.