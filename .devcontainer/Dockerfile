FROM debian:10-slim

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive
# define wakatime folder to collect times
ENV WAKATIME_HOME=/devhero/wakatime
# default non-root user
ARG USERNAME=devhero
# default nodejs version
ARG NODE_VERSION=12.14.1

# Configure apt and install packages
RUN apt-get update \
    #
    # fix java installation error on debian:10-slim
    && mkdir -p /usr/share/man/man1 \
    #
    # install utilities
    && apt-get install -y --no-install-recommends \
    apt-utils \
    git \
    procps \
    zip \
    unzip \
    iproute2 \
    # allow secure use of curl
    ca-certificates \
    # to easily download other applications
    curl \
    # to easily download other applications
    wget \
    # visual task manager to help check cpu and memmory usage
    htop \
    # jdk: is required to run dynamodb-locally
    default-jdk \
    #
    # install specific nodejs version
    && curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    #
    # Install nodejs global dependencies
    && npm install -g \
    # to update dependencies in package.json with command 'ncu'
    npm-check-updates \
    # to access dynamo client
    dynamodb-admin \
    # to serve dist folder as a web application
    serve \
    #
    # Add add sudo support for non-root user
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=