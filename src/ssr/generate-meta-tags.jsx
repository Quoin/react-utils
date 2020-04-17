export default (elements = []) => {
    const workElements = [ ...elements ];
    const found = Boolean(workElements.find((element) => element.value === "viewport"));
    if (!found) {
        workElements.push({
            attribute: 'name',
            value: 'viewport',
            content: 'width=device-width, initial-scale=1'
        });
    }

    return workElements.map((element) => {
        const props = {
            [element.attribute]: element.value,
            content: element.content
        };

        return (<meta key={element.content} {...props} />);
    });
};
