export const DISPLAY_NAME = `TestComponent`;

const Component = (props) => `<div class="test">TestComponent content</div>`;
Component.displayName = DISPLAY_NAME;
export default Component;
