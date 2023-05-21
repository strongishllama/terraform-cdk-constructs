package backend

import (
	"context"

	"cloud.google.com/go/storage"
)

func (c client) NewGoogleCloudStorageBackend(ctx context.Context, projectID, location, name string) error {
	if err := c.cloudStorageClient.Bucket(name).Create(ctx, projectID, &storage.BucketAttrs{
		Location:          location,
		VersioningEnabled: true,
	}); err != nil {
		return err
	}
	return nil
}
