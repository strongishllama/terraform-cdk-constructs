package command

import "github.com/spf13/cobra"

func backendCommand() *cobra.Command {
	command := &cobra.Command{
		Use:     "backend <command> [flags]",
		Short:   "Perform actions against with CDKTF backends.",
		Example: "cdktf-plus backend s3 create --bucket-name=BUCKET_NAME --table-name=TABLE_NAME",
	}
	command.SetHelpFunc(defaultHelp(command))
	command.AddCommand(backendGCSCommand())
	command.AddCommand(backendS3Command())

	return command
}
