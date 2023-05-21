package command

import "github.com/spf13/cobra"

func backendS3Command() *cobra.Command {
	command := &cobra.Command{
		Use:     "s3 [flags]",
		Short:   "Perform actions against CDKTF S3 backends.",
		Example: "cdktf-plus backend s3 create --bucket-name=BUCKET_NAME --table-name=TABLE_NAME",
	}
	command.SetHelpFunc(defaultHelp(command))
	command.AddCommand(backendS3CreateCommand())

	return command
}
