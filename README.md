# Terraform CDK Constructs

![NPN version](https://img.shields.io/npm/v/@strongishllama/terraform-cdk-constructs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/strongishllama/terraform-cdk-constructs/main/LICENSE)
[![Publish](https://github.com/strongishllama/terraform-cdk-constructs/actions/workflows/publish.yaml/badge.svg)](https://github.com/strongishllama/terraform-cdk-constructs/actions/workflows/publish.yaml)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/strongishllama/terraform-cdk-constructs)

## Introduction

A library for CDKTF constructs.

## Index

- [.github](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/.github) - GitHub actions and workflows for automation
- [build](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/build) - Dockerfiles
- [constructs/](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/constructs) - CDKTF constructs
  - [\_\_tests\_\_](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/constructs/__tests__) - (TODO) Tests for constructs
  - [aws](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/constructs/aws) - AWS constructs and core functionality
  - [examples](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/constructs/example) - (TODO) Example implementations of constructs
  - [google](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/constructs/google) - Google constructs and core functionality
- [magefiles](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/magefiles) - Mage targets to help with code generation
- [tools/](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/tools) - CLI tools
  - [cdktf-plus](https://github.com/strongishllama/terraform-cdk-constructs/tree/main/tools/cdktf-plus) - A CLI tool to help fill some gaps missing in the cdktf CLI (currently just used to generate backends)
