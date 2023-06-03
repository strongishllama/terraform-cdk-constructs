# Terraform CDK Constructs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/strongishllama/terraform-cdk-constructs/main/LICENSE)
[![Publish](https://github.com/strongishllama/terraform-cdk-constructs/actions/workflows/publish.yaml/badge.svg)](https://github.com/strongishllama/terraform-cdk-constructs/actions/workflows/publish.yaml)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/strongishllama/terraform-cdk-constructs)

## Introduction

A library for CDKTF constructs.

## Index

- [\_\_tests\_\_](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/__tests__) - (TODO) Tests for constructs
- [.github](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/.github) - GitHub actions and workflows for automation
- [build](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/build) - Dockerfiles
- [magefiles](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/magefiles) - Mage targets to help with code generation
- [packages/](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages) - CDKTF construct packages
  - [aws](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/aws) - AWS construct packages
    - [aws-iam](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/aws/iam)
  - [google](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google) - Google construct packages
    - [google-cloud-dns](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/cloud-dns)
    - [google-cloud-kms](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/cloud-kms)
    - [google-cloud-storage](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/cloud-storage)
    - [google-compute-engine](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/compute-engine)
    - [google-iam](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/iam)
    - [google-cloud-project](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/packages/google/project)
- [tools/](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/tools) - CLI tools
  - [cdktf-plus](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/tools/cdktf-plus) - A CLI tool to help fill some gaps missing in the cdktf CLI (currently just used to generate backends)
