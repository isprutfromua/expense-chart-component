
const currentDay = new Date().getDay();
const cardWrapper = document.getElementById('svgWrapper');

class BarChart {
    activeClass = 'm-active';
    barWidth = 65;
    labelHeight = 20;

    constructor(el) {
        this.initListeners(el);
        this.showData();
    }

    showData() {
        const data = import('./data.json');

        Promise.resolve(data).then(d => {
            const mainData = this.prepareData(d);

            this.drawData(mainData);
        })
    }

    setTotals(ammountsArray, sum) {
        helpers.setText('dayPercent', helpers.formatPercents(ammountsArray[currentDay - 1] / sum));
        helpers.setText('cardTotal', helpers.formatPrice(sum));
    }

    prepareData(data) {
        const maxHeight = svgWrapper.viewBox.baseVal.height;
        const labelSize = this.labelHeight / maxHeight;
        const ammounts = data.map(({ amount }) => amount);
        const proportion = maxHeight / Math.max(...ammounts);
        const sum = ammounts.reduce((acc, el) => acc + el, 0);

        data.forEach(({ day, amount }, idx) => {
            data[idx].perc = helpers.formatPercents((ammounts[idx] / sum));
            data[idx].rectHeight = helpers.formatPercents((amount / maxHeight) * proportion - labelSize);
        })

        this.setTotals(ammounts, sum)

        return data;
    }

    drawData(data) {
        data.forEach(({ day, amount, perc, rectHeight }, idx) => {
            graphWrapper.insertAdjacentHTML(
                'beforeend',
                `<g transform="translate(${idx * this.barWidth}, 0)">
                <rect 
                    class="card__rect ${currentDay == idx + 1 ? 'm-active' : ''}" data-value="${amount}" 
                    data-perc="${perc}"
                >
                    <animate 
                            id="graph${idx + 1}" 
                            attributeName="height" 
                            repeatCount="1"
                            from="0"
                            dur="0.4s"
                            fill="freeze"
                            to="${rectHeight}"
                            begin="${idx == 0 ? '0s' : `graph${idx}.end - 0.2s`}"
                    />
                </rect>
                <text class="card__bar-text">${day}</text>
            </g>`
            )
        });
    }

    initListeners(el) {
        if (el) {
            el.addEventListener('mousemove', this.mouseMoveHandler)
            el.addEventListener('mousedown', this.mouseDownHandler.bind(this))
            el.addEventListener('mouseleave', this.mouseLeaveHandler)
        }
    }

    // HANDLERS
    mouseLeaveHandler() {
        helpers.setVar('--label-opacity', 0);
    }

    mouseDownHandler(e) {
        e.stopPropagation();

        if (e.target && e.target.nodeName == 'rect') {
            const currentRect = e.target;

            this.removeActiveClass();
            currentRect.classList.add(this.activeClass);
            helpers.setText('dayPercent', currentRect.dataset.perc);
        }
    }

    mouseMoveHandler(e) {
        e.stopPropagation();

        if (e.target.nodeName == 'rect') {
            const currentRect = e.target;
            const { height: rectHeight, left: rectLeft } = currentRect.getBoundingClientRect();
            const left = rectLeft - svgWrapper.getBoundingClientRect().left + 'px';

            helpers.setVar('--label-opacity', 1);
            helpers.setVar('--label-top', rectHeight + 'px');
            helpers.setVar('--label-left', left);

            helpers.setText('cardValue', helpers.formatPrice(currentRect.dataset.value));
        } else {
            helpers.setVar('--label-opacity', 0);
        }
    }

    removeActiveClass() {
        const generatedGraphs = Array.from(svgWrapper.getElementsByTagName('rect'));
        generatedGraphs.forEach(r => r.classList.remove(this.activeClass))
    }
}

// HELPERS
class Helpers {
    setVar(key, value) {
        document.documentElement.style.setProperty(key, value);
    }

    setText(el, value) {
        document.getElementById(el).textContent = value;
    }

    formatPrice(number) {
        const options = { style: 'currency', currency: 'USD' };
        const formatter = new Intl.NumberFormat('en-US', options);
        const formattedCurrency = formatter.format(number);

        return formattedCurrency
    }

    formatPercents(number) {
        const option = {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        const formatter = new Intl.NumberFormat("en-US", option);
        const discountFormat = formatter.format(number);

        return discountFormat
    }
}

const helpers = new Helpers;
const bar = new BarChart(cardWrapper);
