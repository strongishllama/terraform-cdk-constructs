# @terraform-cdk-constructs/aws-iam

## Installation

```
npm install @terraform-cdk-constructs/aws-iam
```

## Examples

Create policy statements using enums for actions.

```ts
new iam.PolicyStatement({
    actions: [
        DynamoDB.GET_ITEM,
        DynamoDB.PUT_ITEM,
        DynamoDB.QUERY,
    ],
    resources: [
        `${table.tableArn}/index/*`,
        table.tableArn
    ]
})
```
