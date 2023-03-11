FROM gitpod/workspace-go:2023-03-06-18-43-51

USER root

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# hadolint ignore=DL3008
RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg software-properties-common && \
    wget --progress=dot:giga -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | tee /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
    gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint && \
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends terraform && \
    rm -rf /var/lib/apt/lists/*

USER gitpod

RUN wget --progress=dot:giga https://go.dev/dl/go1.20.2.linux-amd64.tar.gz && \
    rm -rf /home/gitpod/go && \
    tar -C /home/gitpod -xzf go1.20.2.linux-amd64.tar.gz && \
    rm go1.20.2.linux-amd64.tar.gz && \
    mkdir /home/gitpod/.local/bin && \
    go install github.com/magefile/mage@v1.14.0 && \
    wget --progress=dot:giga --output-document /home/gitpod/.local/bin/hadolint https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-Linux-x86_64 && \
    chmod +x /home/gitpod/.local/bin/hadolint && \
    wget --progress=dot:giga -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash && \
    nvm install v18 && \
    nvm use v18 && \
    npm install --global cdktf-cli@latest
