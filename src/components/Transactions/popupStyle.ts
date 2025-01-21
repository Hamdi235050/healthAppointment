import { createUseStyles } from 'react-jss';

 export const useStyles = createUseStyles((theme: { variant: string })=> ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: "8px 16px",
    fontSize: 14,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    "&.confirm": {
      backgroundColor: theme.variant,
      color: "#fff",
    },
    "&.cancel": {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
  },
  content: {
    display: 'flex',
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  sidebar: {
    width: 10,
    backgroundColor: theme.variant,
  },
  body: {
    padding: 20,
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
  },
}));