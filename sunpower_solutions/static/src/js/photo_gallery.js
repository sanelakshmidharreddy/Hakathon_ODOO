/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class PhotoGalleryWidget extends Component {
    static template = "sunpower_solutions.PhotoGalleryWidget";

    get photos() {
        return this.props.record.data.photo_ids?.records || [];
    }
}

registry.category("fields").add("sunpower_photo_gallery", PhotoGalleryWidget);
