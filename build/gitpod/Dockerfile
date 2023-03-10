FROM gitpod/workspace-go:2023-03-06-18-43-51

USER root

# Install root dependencies.

USER gitpod

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN wget --progress=dot:giga https://go.dev/dl/go1.20.2.linux-amd64.tar.gz && \
    rm -rf /home/gitpod/go && \
    tar -C /home/gitpod -xzf go1.20.2.linux-amd64.tar.gz && \
    rm go1.20.2.linux-amd64.tar.gz && \
    mkdir /home/gitpod/.local/bin && \
    go install github.com/magefile/mage@v1.14.0 && \
    wget --progress=dot:giga --output-document /home/gitpod/.local/bin/hadolint https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-Linux-x86_64 && \
    chmod +x /home/gitpod/.local/bin/hadolint && \
