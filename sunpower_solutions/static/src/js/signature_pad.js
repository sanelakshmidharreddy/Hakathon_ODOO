/** @odoo-module **/

import { Component, onMounted, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SignaturePadWidget extends Component {
    static template = "sunpower_solutions.SignaturePadWidget";

    setup() {
        this.canvasRef = useRef("signatureCanvas");
        this.state = useState({
            isDrawing: false,
            hasSignature: false,
        });

        onMounted(() => {
            this.initCanvas();
        });
    }

    initCanvas() {
        const canvas = this.canvasRef.el;
        if (!canvas) return;
        this.ctx = canvas.getContext("2d");
        this.ctx.strokeStyle = "#0f172a";
        this.ctx.lineWidth = 2.5;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        // If value already exists
        if (this.props.value) {
            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                this.state.hasSignature = true;
            };
            img.src = `data:image/png;base64,${this.props.value}`;
        }
    }

    startDrawing(e) {
        this.state.isDrawing = true;
        const rect = this.canvasRef.el.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    draw(e) {
        if (!this.state.isDrawing) return;
        e.preventDefault();
        const rect = this.canvasRef.el.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.state.hasSignature = true;
    }

    stopDrawing() {
        if (!this.state.isDrawing) return;
        this.state.isDrawing = false;
        this.saveSignature();
    }

    clearSignature() {
        const canvas = this.canvasRef.el;
        if (!canvas || !this.ctx) return;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.state.hasSignature = false;
        this.props.update(false);
    }

    saveSignature() {
        const canvas = this.canvasRef.el;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        const base64 = dataUrl.split(",")[1];
        this.props.update(base64);
    }
}

registry.category("fields").add("sunpower_signature_pad", SignaturePadWidget);
