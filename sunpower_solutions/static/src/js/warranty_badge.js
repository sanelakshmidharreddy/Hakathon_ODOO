/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class WarrantyBadgeWidget extends Component {
    static template = "sunpower_solutions.WarrantyBadgeWidget";

    get stateClass() {
        const val = this.props.value;
        if (val === "active") return "badge bg-success";
        if (val === "expiring_soon") return "badge bg-warning text-dark";
        if (val === "expired") return "badge bg-danger";
        return "badge bg-secondary";
    }

    get label() {
        const val = this.props.value;
        if (val === "active") return "✓ Active Coverage (20-Year)";
        if (val === "expiring_soon") return "⚠️ Expiring Within 90 Days";
        if (val === "expired") return "✕ Warranty Expired";
        return val || "Unknown";
    }
}

registry.category("fields").add("sunpower_warranty_badge", WarrantyBadgeWidget);
