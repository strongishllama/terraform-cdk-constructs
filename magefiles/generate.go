package main

import (
	"context"

	"golang.org/x/sync/errgroup"
)

func Generate(ctx context.Context) error {
	group, ctx := errgroup.WithContext(ctx)
	group.Go(func() error {
		return AWSGenerate(ctx)
	})
	group.Go(func() error {
		return GoogleGenerate(ctx)
	})
	return group.Wait()
}
