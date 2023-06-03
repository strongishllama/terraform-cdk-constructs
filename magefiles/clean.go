package main

import (
	"context"
	"fmt"
	"os"

	"github.com/magefile/mage/sh"
)

func Clean(ctx context.Context) error {
	fmt.Println("cleaning up...")

	fmt.Println("removing *.js and *.d.ts files...")

	_, err := sh.Exec(nil, os.Stdout, os.Stderr, "find", "./packages", "-type", "f", "-name", "*.js", "-delete")
	if err != nil {
		return err
	}
	_, err = sh.Exec(nil, os.Stdout, os.Stderr, "find", "./packages", "-type", "f", "-name", "*.d.ts", "-delete")
	if err != nil {
		return err
	}

	fmt.Println("*.js and *.d.ts files removed...")

	fmt.Println("cleaning up complete...")
	return nil
}
