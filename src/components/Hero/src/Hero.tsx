import { Calendar } from "lucide-react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  hero: {
    position: "relative",
    height: 600,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2091")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.8))",
  },
  content: {
    position: "relative",
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 1rem",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  textContainer: {
    color: "white",
    maxWidth: 640,
  },
  title: {
    fontSize: "3.75rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    color: "rgba(229, 231, 235)",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: 500,
    borderRadius: "0.375rem",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#1d4ed8",
    },
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontWeight: 500,
    borderRadius: "0.375rem",
    backdropFilter: "blur(4px)",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: "0.5rem",
  },
});

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>Votre santé est notre priorité</h1>
          <p className={classes.subtitle}>
            Une équipe médicale expérimentée et attentionnée pour prendre soin
            de vous et de votre famille
          </p>
          <div className={classes.buttonContainer}>
            <a href="#services" className={classes.secondaryButton}>
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
