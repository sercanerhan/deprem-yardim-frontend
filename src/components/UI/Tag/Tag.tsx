// backgroundColor: color || theme.palette.primary.main,
// color: theme.palette.primary.contrastText,
// padding: theme.spacing(1, 1.2),
// borderRadius: "50px",
// fontSize: theme.typography.pxToRem(14),
// fontWeight: "500",
// display: "inline-block",
// lineHeight: 1,

const Tag = ({ children, color }: any) => {
  return <Tag color={color}>{children}</Tag>;
};

export default Tag;
