package main

import (
	"context"
	"os"

	"github.com/magefile/mage/sh"
)

func BuildDocker(ctx context.Context) error {
	_, err := sh.Exec(nil, os.Stdout, os.Stderr, "docker", "build", "--tag", "ghcr.io/strongishllama/terraform-cdk-constructs-gitpod", "--file", "build/gitpod/Dockerfile", ".")
	if err != nil {
		return err
	}
	return nil
}
