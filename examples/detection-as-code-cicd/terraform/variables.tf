variable "workspace_id" {
  type        = string
  description = "Full resource ID of the Log Analytics workspace Sentinel is enabled on. The pipeline passes a different value for dev vs prod, so the same code deploys to either."
  # example:
  # /subscriptions/<sub>/resourceGroups/rg-sentinel-dev/providers/Microsoft.OperationalInsights/workspaces/law-sentinel-dev
}
