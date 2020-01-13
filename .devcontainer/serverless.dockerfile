FROM node:12.14.0

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# non root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# install apt essentials
RUN apt-get update \
    && apt-get install -y -q --no-install-recommends \
    apt-utils \
    build-essential \
    libssl-dev \
    ca-certificates \
    curl \
    git \
    sudo \
    procps

# install java
RUN apt-get install -y -q --no-install-recommends default-jre

# clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Configure non root user - https://aka.ms/vscode-remote/containers/non-root-user.
RUN if [ "$USER_GID" != "1000" ]; then groupmod node --gid $USER_GID; fi \
    && if [ "$USER_UID" != "1000" ]; then usermod --uid $USER_UID node; fi \
    #
    && mkdir -p /home/$USERNAME/.vscode-server /home/$USERNAME/.vscode-server-insiders \
    && chown ${USER_UID}:${USER_GID} /home/$USERNAME/.vscode-server* \
    #
    # [Optional] Add sudo support for non-root users
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# install nodejs dependencies
RUN npm install -g npm-check-updates
RUN npm install -g serverless
RUN npm install -g dynamodb-admin

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=