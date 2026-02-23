/**
 * Slider Control System
 * Manages dynamic sliders with user-defined output calculations
 */

class SliderController {
    constructor() {
        this.minSliders = 2;
        this.maxSliders = 12;
        this.sliderValues = [1, 1]; // Default values
        this.outputValues = [0, 0];
        
        this.container = document.getElementById('slidersContainer');
        this.addBtn = document.getElementById('addSliderBtn');
        this.countDisplay = document.getElementById('sliderCount');
        
        this.initializeEventListeners();
        this.renderSliders();
        this.calculateOutputs();
    }

    initializeEventListeners() {
        this.addBtn.addEventListener('click', () => this.addSlider());
    }

    /**
     * User-defined function that takes slider values and returns output values
     * Replace this with your calculation logic
     * 
     * @param {number[]} values - Array of slider values
     * @returns {number[]} - Array of calculated output values
     */
    calculateOutputValues(values) {
        // PLACEHOLDER: Replace this with your actual calculation
        // You have access to numeric.js for integral calculations
        // Example: return values.map(v => v * 2); // doubles each value
        
        return values.map(v => v * 2);
    }

    addSlider() {
        if (this.sliderValues.length < this.maxSliders) {
            this.sliderValues.push(1);
            this.renderSliders();
            this.calculateOutputs();
        }
    }

    deleteSlider(index) {
        if (this.sliderValues.length > this.minSliders) {
            this.sliderValues.splice(index, 1);
            this.renderSliders();
            this.calculateOutputs();
        }
    }

    updateSliderValue(index, value) {
        this.sliderValues[index] = parseFloat(value);
        this.calculateOutputs();
    }

    calculateOutputs() {
        this.outputValues = this.calculateOutputValues(this.sliderValues);
        this.updateDisplays();
    }

    renderSliders() {
        this.container.innerHTML = '';
        
        this.sliderValues.forEach((value, index) => {
            const sliderItem = document.createElement('div');
            sliderItem.className = 'slider-item';
            
            const isMin = this.sliderValues.length === this.minSliders;
            const isMax = this.sliderValues.length === this.maxSliders;
            
            sliderItem.innerHTML = `
                <div class="slider-label">
                    <span class="slider-value">${value.toFixed(2)}</span>
                </div>
                <div class="slider-wrapper">
                    <input 
                        type="range" 
                        min="0.1" 
                        max="10" 
                        step="0.1" 
                        value="${value}"
                        class="slider-input"
                        data-index="${index}"
                    >
                </div>
                <div class="slider-output" data-output="${index}">
                    ${this.outputValues[index]?.toFixed(2) || '0.00'}
                </div>
                <div class="delete-btn-wrapper">
                    <button 
                        class="btn btn-delete" 
                        data-index="${index}"
                        ${isMin ? 'disabled' : ''}
                        title="${isMin ? 'Minimum sliders reached' : 'Delete slider'}"
                    >
                        ✕
                    </button>
                </div>
            `;
            
            this.container.appendChild(sliderItem);
            
            // Add event listeners
            const slider = sliderItem.querySelector('.slider-input');
            const deleteBtn = sliderItem.querySelector('.btn-delete');
            
            slider.addEventListener('input', (e) => {
                this.updateSliderValue(index, e.target.value);
            });
            
            deleteBtn.addEventListener('click', () => {
                this.deleteSlider(index);
            });
        });
        
        this.updateButtonStates();
        this.updateCountDisplay();
    }

    updateDisplays() {
        this.sliderValues.forEach((value, index) => {
            const valueDisplay = document.querySelector(
                `.slider-item:nth-child(${index + 1}) .slider-value`
            );
            const outputDisplay = document.querySelector(
                `.slider-item:nth-child(${index + 1}) [data-output="${index}"]`
            );
            
            if (valueDisplay) {
                valueDisplay.textContent = value.toFixed(2);
            }
            if (outputDisplay) {
                outputDisplay.textContent = this.outputValues[index]?.toFixed(2) || '0.00';
            }
        });
    }

    updateButtonStates() {
        const isMax = this.sliderValues.length === this.maxSliders;
        this.addBtn.disabled = isMax;
        this.addBtn.title = isMax ? 'Maximum sliders reached' : 'Add another slider';
    }

    updateCountDisplay() {
        const count = this.sliderValues.length;
        this.countDisplay.textContent = `${count} slider${count !== 1 ? 's' : ''}`;
    }
}

// Initialize the slider controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SliderController();
});