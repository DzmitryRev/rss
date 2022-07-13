export class CheckboxFilter {
    values: string[];
    constructor() {
        this.values = [];
    }
    add(value: string) {
        this.values.push(value);
    }
    remove(value: string) {
        this.values = this.values.filter((val) => val !== value);
    }
    toggleValue(method: "ADD" | "DELETE", value: string) {
        if (method === "ADD") {
            this.add(value);
        } else {
            this.values = this.values.filter((val) => val !== value);
        }
    }
}
