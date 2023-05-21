package backend

import (
	"context"
	"fmt"

	"cloud.google.com/go/storage"
)

func (c client) NewGoogleCloudStorageBackend(ctx context.Context, projectID, location, name string) error {
	if c.cloudStorageClient == nil {
		return fmt.Errorf("no google authentication provided, authentication can be set via the gcloud cli")
	}

	if err := c.cloudStorageClient.Bucket(name).Create(ctx, projectID, &storage.BucketAttrs{
		Location:          location,
		VersioningEnabled: true,
	}); err != nil {
		return err
	}
	return nil
}
