package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/magefile/mage/sh"
)

func GoogleBootstrapBackend(ctx context.Context, projectID string, location string, bucketName string) error {
	fmt.Println("bootstrapping google backend...")

	client, err := storage.NewClient(ctx)
	if err != nil {
		return err
	}
	defer client.Close()

	if err := client.Bucket(bucketName).Create(ctx, projectID, &storage.BucketAttrs{
		Location:          location,
		VersioningEnabled: true,
	}); err != nil {
		return err
	}

	fmt.Println("google backend bootstrapped...")
	return nil
}

func GoogleGenerate(ctx context.Context) error {
	fmt.Println("running google generation...")

	if err := googleGenerateCompute(ctx); err != nil {
		return err
	}
	if err := googleGenerateCloudKMS(ctx); err != nil {
		return err
	}

	fmt.Println("google generation completed...")
	return nil
}

func googleGenerateCloudKMS(ctx context.Context) error {
	stdout := &bytes.Buffer{}
	_, err := sh.Exec(nil, stdout, os.Stderr, "gcloud", "kms", "locations", "list", "--format=json")
	if err != nil {
		return err
	}

	type Location struct {
		LocationID string `json:"locationId"`
		Metadata   struct {
			EKMAvailable bool `json:"ekmAvailable"`
			HSMAvailable bool `json:"hsmAvailable"`
		} `json:"metadata"`
	}

	locations := []Location{}
	if err := json.Unmarshal(stdout.Bytes(), &locations); err != nil {
		return err
	}

	locationsOutput := bytes.Buffer{}
	locationsOutput.WriteString("// THIS FILE IS GENERATED VIA MAGE. DO NOT EDIT MANUALLY!\n\nexport enum Location {\n")
	for _, l := range locations {
		comment := fmt.Sprintf("  // EKM Available: %v\n  // HSM Available: %v", l.Metadata.EKMAvailable, l.Metadata.HSMAvailable)
		key := strings.ToUpper(strings.ReplaceAll(l.LocationID, "-", "_"))
		line := fmt.Sprintf("%s\n  %s = \"%s\",\n", comment, key, l.LocationID)
		locationsOutput.WriteString(line)
	}
	locationsOutput.WriteString("}\n")

	if err := os.WriteFile("./constructs/google/core/cloud-kms/location/index.ts", locationsOutput.Bytes(), 0o744); err != nil {
		return err
	}

	return nil
}

func googleGenerateCompute(ctx context.Context) error {
	stdout := &bytes.Buffer{}
	_, err := sh.Exec(nil, stdout, os.Stderr, "gcloud", "compute", "regions", "list", "--format=json")
	if err != nil {
		return err
	}

	type Region struct {
		Name  string   `json:"name"`
		Zones []string `json:"zones"`
	}

	regions := []Region{}
	if err := json.Unmarshal(stdout.Bytes(), &regions); err != nil {
		return err
	}

	regionsOutput := bytes.Buffer{}
	regionsOutput.WriteString("// THIS FILE IS GENERATED VIA MAGE. DO NOT EDIT MANUALLY!\n\nexport enum Region {\n")
	for _, r := range regions {
		key := strings.ToUpper(strings.ReplaceAll(r.Name, "-", "_"))
		line := fmt.Sprintf("  %s = \"%s\",\n", key, r.Name)
		regionsOutput.WriteString(line)
	}
	regionsOutput.WriteString("}\n")

	if err := os.WriteFile("./constructs/google/core/compute/region/index.ts", regionsOutput.Bytes(), 0o744); err != nil {
		return err
	}

	zonesOutput := bytes.Buffer{}
	zonesOutput.WriteString("// THIS FILE IS GENERATED VIA MAGE. DO NOT EDIT MANUALLY!\n\nexport enum Zone {\n")
	for _, r := range regions {
		for _, z := range r.Zones {
			parts := strings.Split(z, "/")
			zone := parts[len(parts)-1]
			key := strings.ToUpper(strings.ReplaceAll(zone, "-", "_"))
			line := fmt.Sprintf("  %s = \"%s\",\n", key, zone)
			zonesOutput.WriteString(line)
		}
	}
	zonesOutput.WriteString("}\n")

	if err := os.WriteFile("./constructs/google/core/compute/zone/index.ts", zonesOutput.Bytes(), 0o744); err != nil {
		return err
	}

	return nil
}
