/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class SunPowerDirectorDashboard extends Component {
    static template = "sunpower_solutions.SunPowerDirectorDashboard";

    setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.state = useState({
            loading: true,
            kpis: {
                total_revenue: 0,
                total_cost: 0,
                gross_profit: 0,
                average_margin_pct: 0,
                active_leads_count: 0,
                lead_conversion_rate: 0,
                active_jobs_count: 0,
                overdue_jobs_count: 0,
                open_tickets_count: 0,
                warranties_expiring_soon: 0,
                total_inventory_value: 0,
                on_grid_revenue: 0,
                off_grid_revenue: 0,
            },
        });

        onWillStart(async () => {
            await this.loadKpis();
        });
    }

    async loadKpis() {
        this.state.loading = true;
        try {
            const data = await this.orm.call(
                "sunpower.dashboard.kpi",
                "get_executive_kpis",
                []
            );
            if (data) {
                this.state.kpis = data;
            }
        } catch (err) {
            console.error("Failed to load executive KPIs", err);
        } finally {
            this.state.loading = false;
        }
    }

    formatCurrency(val) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val || 0);
    }

    // Drill-down actions
    openQuotes() {
        this.action.doAction({
            name: "Solar Quotations",
            type: "ir.actions.act_window",
            res_model: "sunpower.quote",
            views: [[false, "tree"], [false, "form"]],
        });
    }

    openJobs() {
        this.action.doAction({
            name: "Installation Jobs",
            type: "ir.actions.act_window",
            res_model: "sunpower.job",
            views: [[false, "kanban"], [false, "tree"], [false, "form"]],
        });
    }

    openTickets() {
        this.action.doAction({
            name: "Service Tickets",
            type: "ir.actions.act_window",
            res_model: "sunpower.service.ticket",
            views: [[false, "kanban"], [false, "tree"], [false, "form"]],
        });
    }

    openWarranties() {
        this.action.doAction({
            name: "20-Year Warranties",
            type: "ir.actions.act_window",
            res_model: "sunpower.warranty",
            views: [[false, "tree"], [false, "form"], [false, "graph"]],
        });
    }

    openLeads() {
        this.action.doAction({
            name: "Solar Leads",
            type: "ir.actions.act_window",
            res_model: "sunpower.lead",
            views: [[false, "kanban"], [false, "tree"], [false, "form"]],
        });
    }
}

registry.category("actions").add("sunpower_director_dashboard", SunPowerDirectorDashboard);
