export function Component(
    options: {
        selector: string,
        template: string
    }) {
    return function dec<T extends { new(...args: any[]): HTMLElement }>(target: T) {
        const element = class extends target {
            [onInit: string]: any;

            constructor(...args: any) {
                super(...args);
            }

            connectedCallback() {
                this.innerHTML = options.template;
                if (this.onInit)
                    this.onInit();
            }

        };

        customElements.define(options.selector, element);
        return element;
    }
}
