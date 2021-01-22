const mixins = {
  clearfix: () =>
    `&:after {
    content: '';
    display: table;
    clear: both;
  `,

  cancelButton: () =>
    `
      background: none;
      border: 1px solid;
  `,
};

export default mixins;
