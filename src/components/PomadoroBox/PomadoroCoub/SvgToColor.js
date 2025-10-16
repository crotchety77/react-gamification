/**
 * colorizeSvg - принимает SVG как строку и цвет, возвращает цветное SVG
 * @param {string} svgString - исходный черно-белый SVG
 * @param {string} color - цвет в формате HEX или RGB ("#ff0000" / "rgb(255,0,0)")
 * @returns {string} - новый SVG с применённым цветом
 */
// SvgToColor.js
export function colorizeSvg(svgString, color) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgString, "image/svg+xml");

    const elements = xmlDoc.querySelectorAll("rect, path, circle, polygon, ellipse");
    elements.forEach((el) => {
        const fill = el.getAttribute("fill");
        if (fill) {
            const match = fill.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
            if (match) {
                const r = parseInt(match[1], 16);
                const g = parseInt(match[2], 16);
                const b = parseInt(match[3], 16);

                if (r === g && g === b) {
                    // Серый → используем яркость как fill-opacity
                    const brightness = r / 255;
                    el.setAttribute("fill", color);
                    el.setAttribute("fill-opacity", brightness);
                }
            }
        }
    });

    return new XMLSerializer().serializeToString(xmlDoc);
}
