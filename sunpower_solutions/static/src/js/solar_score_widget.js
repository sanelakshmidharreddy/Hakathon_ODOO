/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SolarScoreWidget extends Component {
    static template = "sunpower_solutions.SolarScoreWidget";

    get score() {
        return Math.round(this.props.value || 0);
    }

    get scoreColor() {
        if (this.score >= 80) return "#10b981"; // Emerald
        if (this.score >= 60) return "#f59e0b"; // Amber
        return "#ef4444"; // Red
    }

    get tierLabel() {
        if (this.score >= 85) return "Prime Solar Site (Class A)";
        if (this.score >= 70) return "High Potential (Class B)";
        if (this.score >= 50) return "Moderate Potential (Class C)";
        return "Sub-Optimal / Shaded";
    }
}

registry.category("fields").add("sunpower_solar_score", SolarScoreWidget);
