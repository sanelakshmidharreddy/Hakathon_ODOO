/** @odoo-module **/

import { Component, onMounted, useRef } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class InstallationMapWidget extends Component {
    static template = "sunpower_solutions.InstallationMapWidget";

    setup() {
        this.mapRef = useRef("mapContainer");
        onMounted(() => {
            this.renderMap();
        });
    }

    get latitude() {
        return this.props.record.data.latitude || 12.9716; // Default to Bengaluru
    }

    get longitude() {
        return this.props.record.data.longitude || 77.5946;
    }

    get mapUrl() {
        const lat = this.latitude;
        const lon = this.longitude;
        // OpenStreetMap embed iframe
        return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`;
    }

    renderMap() {
        // Ready for interactive markers if needed
    }
}

registry.category("fields").add("sunpower_installation_map", InstallationMapWidget);
