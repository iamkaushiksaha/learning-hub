# The same brute-force detection as the ARM template, expressed in Terraform.
# Deploy engine choice is an implementation detail; the ARM API is identical
# underneath. Use ONE engine per repo — this file is the Terraform variant.

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
  # In a team, keep state in a shared remote backend (never on a laptop):
  # backend "azurerm" {
  #   resource_group_name  = "rg-tfstate"
  #   storage_account_name = "sttfstatesentinel"
  #   container_name       = "tfstate"
  #   key                  = "sentinel-detections.tfstate"
  # }
}

provider "azurerm" {
  features {}
}

resource "azurerm_sentinel_alert_rule_scheduled" "brute_force_signin" {
  name                       = "AR-Ident-BruteForce-SigninLogs"
  log_analytics_workspace_id = var.workspace_id
  display_name               = "Identity - Brute force against a single account (SigninLogs)"
  description                = "Detects >= 10 failed interactive sign-ins (ResultType 50126) for one account from a single IP within an hour."
  severity                   = "Medium"
  enabled                    = true

  query = <<-KQL
    SigninLogs
    | where ResultType == 50126
    | summarize FailedAttempts = count(), FirstSeen = min(TimeGenerated), LastSeen = max(TimeGenerated) by UserPrincipalName, IPAddress, bin(TimeGenerated, 1h)
    | where FailedAttempts >= 10
  KQL

  query_frequency   = "PT1H"
  query_period      = "PT1H"
  trigger_operator  = "GreaterThan"
  trigger_threshold = 0

  tactics    = ["CredentialAccess"]
  techniques = ["T1110"]

  entity_mapping {
    entity_type = "Account"
    field_mapping {
      identifier  = "FullName"
      column_name = "UserPrincipalName"
    }
  }

  entity_mapping {
    entity_type = "IP"
    field_mapping {
      identifier  = "Address"
      column_name = "IPAddress"
    }
  }

  incident {
    create_incident_enabled = true
    grouping {
      enabled                 = true
      lookback_duration       = "PT5H"
      entity_matching_method  = "Selected"
      by_entities             = ["Account"]
    }
  }
}
