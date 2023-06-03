package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"
)

func AWSGenerate(ctx context.Context) error {
	fmt.Println("running aws generation...")

	if err := awsGenerateIAM(ctx); err != nil {
		return err
	}

	fmt.Println("aws generation completed...")
	return nil
}

func awsGenerateIAM(ctx context.Context) error {
	response, err := http.Get("https://awspolicygen.s3.amazonaws.com/js/policies.js")
	if err != nil {
		return err
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", response.StatusCode)
	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return err
	}
	body = []byte(strings.TrimPrefix(string(body), "app.PolicyEditorConfig="))

	type Service struct {
		StringPrefix  string   `json:"StringPrefix"`
		Actions       []string `json:"Actions"`
		ARNFormat     string   `json:"ARNFormat"`
		ARNRegex      string   `json:"ARNRegex"`
		ConditionKeys []string `json:"conditionKeys"`
		HasResource   bool     `json:"HasResource"`
	}
	type Policies struct {
		ServiceMap map[string]Service `json:"serviceMap"`
	}

	policies := Policies{}
	if err := json.Unmarshal(body, &policies); err != nil {
		return err
	}

	actionsOutput := bytes.Buffer{}
	actionsOutput.WriteString("// THIS FILE IS GENERATED VIA MAGE. DO NOT EDIT MANUALLY!\n\n")
	counter := len(policies.ServiceMap)

	keys := []string{}
	for k := range policies.ServiceMap {
		keys = append(keys, k)
	}
	sort.Slice(keys, func(i, j int) bool {
		return keys[i] < keys[j]
	})

	for _, k := range keys {
		formattedService := k
		toReplace := []string{
			" ",
			"(",
			")",
			"-",
			".",
			"Amazon",
			"AWS",
		}

		for _, t := range toReplace {
			formattedService = strings.ReplaceAll(formattedService, t, "")
		}
		if formattedService[0] == '_' {
			formattedService = formattedService[1:]
		}

		actionsOutput.WriteString(fmt.Sprintf("export enum %s {\n", formattedService))

		for _, a := range policies.ServiceMap[k].Actions {
			exp, err := regexp.Compile("([A-Z])")
			if err != nil {
				return err
			}

			// Do some formatting to turn this 'BatchDetectDominantLanguage' into
			// 'BATCH_DETECT_DOMINANT_LANGUAGE = "comprehend:BatchDetectDominantLanguage",'.
			formattedKey := strings.ToUpper(strings.TrimSpace(string(exp.ReplaceAll([]byte(a), []byte("_$1"))))[1:])
			actionsOutput.WriteString(fmt.Sprintf("  %s = \"%s\",\n", formattedKey, a))
		}

		if counter == 1 {
			actionsOutput.WriteString("}\n")
		} else {
			actionsOutput.WriteString("}\n\n")
		}
		counter--
	}

	if err := os.WriteFile("./packages/aws/iam/action/action.ts", actionsOutput.Bytes(), 0o744); err != nil {
		return err
	}

	return nil
}
