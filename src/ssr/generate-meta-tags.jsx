export default (elements = []) => {
  const workElements = [...elements];
  const found = Boolean(workElements.find((element) => element.value === 'viewport'));
  if (!found) {
    workElements.push({
      attribute: 'name',
      value: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
  }

  return workElements.map((element) => {
    const props = {
      [element.attribute]: element.value,
    };

    if (element.content) {
      props.content = element.content;
    }

    const key = element.content
      ? `content:${element.content}`
      : `${element.attribute}:${element.value}`;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (<meta key={key} {...props} />);
  });
};
