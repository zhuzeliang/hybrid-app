

function scrollTo(container, top, smooth) {
    if (smooth) {
        try {
            container.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
        catch (error) {
            container.scrollTo(0, top);
        }
        return;
    }
    container.scrollTo(0, top);
}
export default function scrollIntoView(container, selected, smooth) {

    if (!selected) {
        container.scrollTop = 0;
        return;
    }

    const offsetParents = [];
    let pointer = selected.offsetParent;

    while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }

    const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        scrollTo(container, top, smooth);
        // container.scrollTop = top;
    }
    else if (bottom > viewRectBottom) {
        const topValue = bottom - container.clientHeight;
        scrollTo(container, topValue, smooth);
        // container.scrollTop = bottom - container.clientHeight;
    }
}
