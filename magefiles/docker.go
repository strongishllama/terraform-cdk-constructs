//go:build mage

package main

import (
	"context"
	"fmt"
	"os"

	"github.com/magefile/mage/sh"
)

func DockerBuild(ctx context.Context) error {
	fmt.Println("building docker images...")

	_, err := sh.Exec(nil, os.Stdout, os.Stderr, "docker", "build", "--tag", "ghcr.io/strongishllama/terraform-cdk-constructs-gitpod", "--file", "build/gitpod/Dockerfile", ".")
	if err != nil {
		return err
	}
	return nil
}
