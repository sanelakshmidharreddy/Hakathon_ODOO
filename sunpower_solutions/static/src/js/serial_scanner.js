/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class SerialScannerWidget extends Component {
    static template = "sunpower_solutions.SerialScannerWidget";

    setup() {
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.state = useState({
            scannedInput: "",
            isScanning: false,
            lastScanned: null,
            scannedCount: 0,
            hasError: false,
            errorMessage: "",
        });
    }

    async onBarcodeEnter(ev) {
        if (ev.key === "Enter" && this.state.scannedInput.trim()) {
            ev.preventDefault();
            await this.processSerial(this.state.scannedInput.trim());
        }
    }

    async processSerial(serialNumber) {
        if (!serialNumber) return;
        this.state.isScanning = true;
        this.state.hasError = false;

        try {
            const dispatchId = this.props.record.resId;
            if (!dispatchId) {
                this.state.hasError = true;
                this.state.errorMessage = "Please save dispatch record before scanning.";
                this.state.isScanning = false;
                return;
            }

            const result = await this.orm.call(
                "sunpower.dispatch",
                "action_scan_serial",
                [dispatchId, serialNumber]
            );

            if (result && result.status === "success") {
                this.state.lastScanned = serialNumber;
                this.state.scannedCount += 1;
                this.state.scannedInput = "";
                this.notification.add(`Scanned: ${serialNumber}`, {
                    type: "success",
                });
                await this.props.record.load();
            } else if (result && result.error) {
                this.state.hasError = true;
                this.state.errorMessage = result.error;
                this.notification.add(result.error, {
                    type: "danger",
                });
            }
        } catch (err) {
            this.state.hasError = true;
            this.state.errorMessage = err.data ? err.data.message : err.message;
            this.notification.add(this.state.errorMessage, {
                type: "danger",
            });
        } finally {
            this.state.isScanning = false;
        }
    }

    clearError() {
        this.state.hasError = false;
        this.state.errorMessage = "";
    }
}

registry.category("fields").add("sunpower_serial_scanner", SerialScannerWidget);
